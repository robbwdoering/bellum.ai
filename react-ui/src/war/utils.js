/**
 * FILENAME: utils.js
 *
 * DESCRIPTION: Utilites for the war processing functionality, except for text parsing.
 *
 * OWNER: RWD
 */

import { regex, typoMap } from "./constants";
import { statuses, flags } from "./../meaning/context"
import { evalCond } from "./../meaning/engine"

// NOTE: Only works for strings
export const arrEqual = (lhs, rhs) => {
	if (!lhs && !rhs) {
		return true;
	}

	if (!lhs || !rhs || lhs.length !== rhs.length) {
		return false;
	}

	return !lhs.some((e, i) => {
		switch(typeof e) {
			//2D arrays not supported
			case "array":
				return true;

			// If it's an object, assume its a rule object and base the equality of the rule types and orderings
			// It's theoretically possible that this will give a false positive.
			// Likely scenario for that is a change in paramater value - is that a thing?
			case "object":
				return typeof rhs[i] !== "object" || e.type !== rhs[i].type;

			// For all others, run a simple equality
			case "number":
			case "string":
			default:
				return e !== rhs[i];
		}
	});
}

export const sanitizeString = str => {
	if (!str) return null;
	let ret = str.toLowerCase()
		.replace(/[- ]/g, "_")
		.replace(/'/g, "");

	// Return the formatted value, or an override value if one is found
	return typoMap[ret] || ret;
};

// Source: https://www.math.ucla.edu/~tom/distributions/normal.html
export const normalcdf = (X) => {   //HASTINGS.  MAX ERROR = .000001
	let T = 1 / (1 + 0.2316419 * Math.abs(X));
	let D = 0.3989423 * Math.exp(-X * X / 2);
	let ret = D * T * (0.3193815 + T * (-0.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))));
	if (X > 0) {
		ret = 1 - ret;
	}
	return ret;
};

export const computePDF = (mean, dev, x) => {
    let ret;
	if (!dev) {
	    if (x < mean){
	        ret = 0
	    } else {
		    ret = 1
		}
	} else {
		ret = normalcdf( (x-mean) / dev );
	}

	return ret;
};

/**
 * This class represents one model. It is built to be STATELESS - see Unit class for explanation.
 */
export class Model {
	constructor(json) {
		Object.assign(this, json);

		this.key = sanitizeString(this.unit || "");

		// Set null arrays to empty arrays to avoid need for null checks down the line
		if (!this.weapon) {
			this.weapon = [];
		}
	}

	getWoundTrack = (unit, profile, wRemaining) => {
		let stat;

		// Find the current wound track
		// NOTE: This assumes that the wound track array is sorted in descending order
		// NOTE: We're doing some scope trickery here - note the use of wStat
		let idx = unit.wound_track.findIndex(trackName => {
			const tmpStr = sanitizeString(trackName);
			wStat = profile.stats.find(statBlock => statBlock.name === tmpStr) || {};

			return wRemaining >= wStat.wounds;
		})

		return [stat, idx];
	};

	getStat = (profile, unit, boardState, playerIdx, unitIdx, modelIdx) => {
		// Get the stat block for this name
		let stat = profile.stats.find(statBlock => statBlock.name === this.key) || {};

		// A lot of models have an "s", like "Space Marines" need "space_marine" - no "s"
		// So double check for that if we couln't find the first time
		if (!Object.entries(stat).length && (this.key.endsWith('s') || this.key.endsWith('z'))) {
			stat = profile.stats.find(statBlock => this.key.startsWith(statBlock.name)) || {};
		}

		// The model idx we get is out of all model types, we want to translate into a literal model idx
		// i.e. from "this is a space marine" to "this is this specific space marine model"
		let finalModelIdx = 0;
		for (let j = 0; j < modelIdx; j++) {
			finalModelIdx += unit.models[j].quantity;
		}


		// Get wound track health info
		if (unit.wound_track && unit.wound_track.length) {
			// Find the current number of wounds
			const wRemaining = boardState.units[playerIdx][unitIdx].wounds[finalModelIdx];

			// Find the wound track stat block
			const [wStat] = getWoundTrack(unit, profile, wRemaining);

			// If we found a wound track, use all its non-null values to override the default stat block's values
			if (wStat) {
				Object.assign(stat, Object.keys(wStat).reduce((acc, key) => {
					if (wStat[key] && wStat[key] !== -1 && key !== "name") {
						acc[key] = wStat[key];
					}
					return acc;
				}, {}));
			}
		}

		return stat;
	};
};

/**
 * This class represents one unit. It is built to be STATELESS - all fields are expected to be final.
 * This is because we do not store this data in cookie form or on the server. Rather, it is inferred
 * every time we load in a new List/Profile combination. See warReducer for details.
 */
export class Unit {
	constructor(json, unitIdx, playerIdx, profile) {
		Object.assign(this, json, { models: json.models.map(model => new Model(model)) });
		this.unitIdx = unitIdx;
		this.playerIdx = playerIdx;



		// Find the indices of all this units abilities and rules, for ease of access
		if (this.abilities) {
			this.ruleKeys = this.abilites.map(name => {
				const sanName = sanitizeString(name);
				return profile.desc.findIndex(obj => obj.name === sanName);
			});
		} else {
			this.ruleKeys = [];
		}
		if (this.rules) {
			this.ruleKeys = this.ruleKeys.concat(this.rules.map(name => {
				const sanName = sanitizeString(name);
				return profile.desc.findIndex(obj => obj.name === sanName);
			});
		}

	}

	// --------------
	// CONTEXT ENGINE
	// --------------
	/* CORE TERMS
	 * 	Status - Actual effects on a unit captured just from basic rules (like Advanced, Engaged, or In Cover)
	 *  Affect - Affects from meaning objects on this unit or others, like Auras, Psychic Powers, or Strategem affects.
	 * 		Can be Permament, Timed, or Fluid (to be re-evaluated on board state change)
	 *  Flags - Projections from the engine that don't have direct effects on the game, like Can Take Objective, or Safe 
	 */

	/**
	 * The core of the context engine - called for one of the core categories above at the start of a phase.
	 * The end goal is to build an array of indices, where each corresponds to an entry in the "allPossibilites" array that applies
	 * to this unit in this phase.
	 * Also needs to take into account the previous state of the relevant array.
	 */
	applyContextCat = (allPossibilites, oldArr, matchState, boardState, profile) => {
		let stat, thisPhase, thisRound;

		// Iterate over every possible status that a unit can have 
		return allPossibilites.reduce((ret, obj, idx) => {
			stat = obj[1];
			// Build booleans for if this status "expires" right now, and thus should be reevaluated
			// An undefined value for phase/turn means "reevaluated every phase/turn" respectively
			thisPhase = stat.phase === undefined || stat.phase === matchState.phase;
			thisRound = stat.round === undefined || stat.round === matchState.round;

			// Check for statuses that are applied manually that might stick around, like Advanced or Charged
			if (oldArr.includes(idx) && (!thisPhase || !thisRound) && !stat.cond) {
				ret.push(idx);

			// Evaluate all rules that have conditionals, and are marked for reevaluation 
			} else if (thisPhase && thisRound && evalCond(stat.cond)) {
				ret.push(idx);	
			}

			return ret;
		}, []);
	};

	applyAffects = (profiles, oldAffects, matchState, boardState, profile) => {
		return this.applyContextCat(oldAffects)
	};

	// applyFlags = ();

	// -----------------------
	// ACCESSORS / CONVENIENCE
	// -----------------------

	getStat = (profile, unit, boardState) => unit.models[0].getStat(profile, unit, boardState, unit.playerIdx, unit.unitIdx, 0);

	pos = (boardState) => boardState.units[this.playerIdx][this.unitIdx].pos;

	// Calls the callback on every weapon we can find, and returns each result in an array
	// Callback prof: (wepProfile, model, unit)
	wepMap = (callback, profile) => {
		return this.models.reduce((ret, model) => {
			if (model.weapon) {
				ret = ret.concat(model.weapon.reduce((wepAcc, wep) => {
					const wepProfile = profile.weapons.find(prof => prof.name === sanitizeString(wep));
					if (wepProfile) {
						wepAcc.push(callback(wepProfile, model));
					} else {
						console.log("Can't find weapon: ", wep);
					}

					return wepAcc;
				}, []));
			} else {
				console.log("Model doesn't have any weapons: ", model);
			}

			return ret;
		}, []);
	};

	// Calls the callback on every weapon we can find, returning if any instance returns a truthy value 
	// Callback prof: (wepProfile, model, unit)
	wepSome = (callback, profile) => {
		return this.models.some(model => {
			if (model.weapon) {
				return model.weapon.some(wep => {
					const wepProfile = profile.weapons.find(prof => prof.name === sanitizeString(wep));
					if (wepProfile) {
						return callback(wepProfile, model);
					} else {
						console.log("Can't find weapon: ", wep);
					}

					return false;
				});
			} else {
				console.log("Model doesn't have any weapons: ", model);
			}

			return false;
		});
	};

	canShoot = () => {
		// if (unit.)
		return this.wepSome((wepProfile, model) => wepProfile.weapontype);
	}
}

/**
 * 
 */
export const warMap = (type, unit, callback) => {

};