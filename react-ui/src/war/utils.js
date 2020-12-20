/**
 * FILENAME: utils.js
 *
 * DESCRIPTION: Utilites for the war processing functionality, except for text parsing.
 *
 * OWNER: RWD
 */

import { regex, typoMap } from "./constants";

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

export class Model {
	constructor(json) {
		Object.assign(this, json);

		this.key = sanitizeString(this.unit || "");

		// Set null arrays to empty arrays to avoid need for null checks down the line
		if (!this.weapon) {
			this.weapon = [];
		}
	}

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

		// Find the current number of wounds
		const wRemaining = boardState.units[playerIdx][unitIdx].wounds[finalModelIdx];

		// Get wound track health info
		if (unit.wound_track && unit.wound_track.length) {
			let wStat;

			// Find the current wound track
			// NOTE: This assumes that the wound track array is sorted in descending order
			// NOTE: We're doing some scope trickery here - note the use of wStat
			let trackName = unit.wound_track.find(trackName => {
				wStat = profile.stats.find(statBlock => statBlock.name === sanitizeString(trackName)) || {};
				return wRemaining >= wStat.wounds;
			})

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


export class Unit {
	constructor(json) {
		Object.assign(this, json, { models: json.models.map(model => new Model(model)) });
	}

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
}

/**
 * 
 */
export const warMap = (type, unit, callback) => {

};