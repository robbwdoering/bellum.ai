import { WarActions, demoData } from "./constants";
import { Unit, arrEqual } from "./utils";
import { distance } from "./../map/constants";
import { meaningObjHasCondType, checkAndApply, getUnitCover, getUnitAuras } from "./../meaning/engine";

const initialState = {
	// The metalist is the list of all forces available to a user, with basic info on each
	metalist: [],
	metalistHash: 0,

	// These objects store the force lists, and their corresponding profile objects
	forces: [null, null],
	profiles: [null, null],
	listHash: 0,

	// Match state governs game stat unrelated to specific units
	matchState: {
		turn: -1,
		phase: -1,
		activePlayer: -1,
		mapSize: 0,
		cpCount: [0, 0],
		vpCount: [
			[0, 0],
			[0, 0, 0],
			[0, 0, 0]
		],
		objectives: [
			[null], // Primary
			[null, null, null], //Secondaries
			[null, null, null]
		],
		terrain: null
	},
	matchHash: 0,

	// Board state governs the location, health, and status of units
	boardState: {
		units: [[], []]
	},
	boardHash: 0,
	pendingFlags: false,

	// Chart data is highly dynamic data used in various charts
	dynamicState: {
		scorecards: [ null, null ]
	},
	dynamicHash: 0,

	// Micellaneous
	messages: [[], []]
};

export const warReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case WarActions.SET_PRIMARY_LIST:
			console.log("Setting primary list: ", action.payload.results);
			processNewForce(newState, action, 0);
			return newState;

		case WarActions.SET_SECONDARY_LIST:
			console.log("Setting secondary list: ", action.payload.results);
			processNewForce(newState, action, 1);
			return newState;

		case WarActions.SET_METALIST:
			console.log("Metalist received: ", action.payload);
			if (!action.payload || !action.payload.results || action.payload.results.length === 0) {
				newState.metalist = [];
			} else {
				newState.metalist = action.payload.results.map(e => {
					let tmpArr = e.row.substring(1, e.row.length - 1).split(",");
					return {
						name: cleanStrInput(tmpArr[0]),
						points: parseInt(tmpArr[1]),
						faction: cleanStrInput(tmpArr[2]),
						rating: tmpArr[3],
						id: tmpArr[4]
					}
				});
			}
			newState.metalistHash++;
			return newState;

		case WarActions.SET_UNSET_PROFILES:
			console.log("Setting unset profiles:", action.payload.results);
			return newState;

		case WarActions.SET_MATCH_STATE:
			Object.assign(newState.matchState, action.payload);
			console.log("setting match state: ", newState.matchState, action.payload)
			newState.matchHash++;
			return newState;

		case WarActions.SET_BOARD_STATE:
			Object.assign(newState.boardState, action.payload);
			console.log("setting board state: ", newState.boardState, action.payload)
			newState.boardHash++;
			return newState;

		case WarActions.UPDATE_UNIT:
			console.log("UPDATE UNIT received: ", action, newState.boardState.units[action.playerIdx])
			const unit = newState.forces[action.playerIdx].units[action.unitIdx];
			// Flag any units that need refreshed damage values
			let tmpBool = applyFlags(action.payload, newState.forces, newState.profiles, unit, newState.boardState, newState.matchState);
			newState.pendingFlags = newState.pendingFlags || tmpBool; 

			Object.assign(newState.boardState.units[action.playerIdx][action.unitIdx], action.payload);
			newState.boardHash++;
			return newState;

		case WarActions.SET_CHART_DATA:
			console.log("SET_CHART_DATA received: ", action.payload)
			Object.assign(newState.dynamicState, action.payload);
			newState.dynamicHash++;
			return newState;

		case WarActions.SET_FORCE_SCORECARD:
			console.log("SET_FORCE_SCORECARD received: ", action.payload)
			if (newState.forces[0] && newState.forces[0].id === action.payload[0]) {
				newState.dynamicState.scorecards[0] = action.payload[1];
			} else {
				newState.dynamicState.scorecards[1] = action.payload[1];
			}
			newState.dynamicHash++;
			return newState;
	}

	// Default: return state
	return state;
};

const processNewForce = (newState, action, playerIdx) => {
	newState.forces[playerIdx] = action.payload.results;
	newState.profiles[playerIdx] = action.payload.profiles;

	// Translate units into class objects to give access to functions
	newState.forces[playerIdx].units = newState.force[playerIdx].units.map((json, i) => new Unit(json, i, playerIdx));

	if (!newState.boardState.units[playerIdx].length) {
		newState.boardState.units[playerIdx] = action.payload.results.units.map((e, i) => newBoardUnit(e, i, newState.profiles, newState.boardState, newState.matchState, playerIdx));
		newState.boardHash++;
	}

	// Parse id
	let metaEntry = newState.metalist.find(item => item.name === newState.forces[0].name);
	if (metaEntry) {
		newState.forces[0].id = metaEntry.id;
	}
	newState.listHash++;
}


// things that can happen:
// 	unit can enter or leave cover
// 	unit changes wound track
// 	unit falls a blast tier	
// 		only refresh enemies with blast weapons
// 	phase/round changes and there are roster rules for that
// 	unit is affected by a psychic power
const applyFlags = (payload, forces, profiles, unit, boardState, matchState) => {
	let ret = false;
	const curUnit = boardState.units[unit.playerIdx][unit.unitIdx];
	const newUnit = Object.assign({}, curUnit, payload);

	// If the unit moved
	if (payload.pos) {
		// Check if the unit has entered or left cover
		newUnit.curCover = getUnitCover(newUnit, boardState, matchState);
		if (!arrEqual(curUnit.curCover, newUnit.curCover)) {
			newUnit.flag = true;
			ret = true;
		}

		// Check if the unit has entered or left an aura
		newUnit.curAuras = getUnitAuras(newUnit, boardState, forces, profiles);
		if (!newUnit.flag && !arrEqual(newUnit.curAuras, curUnit.curAuras)) {
			newUnit.flag = true;
			ret = true;
		}

		// Check if the unit has an aura that a has a new list of effected units
		if (unit.allyAuras) {
			unit.allyAuras.forEach(auraObj => {
				boardState.units[unit.playerIdx].forEach(cmpUnit => unitAffectedByAuraMove(cmpUnit, curUnit.pos, newUnit.pos, auraObj));
			});
		}
		if (unit.enemyAuras) {
			unit.enemyAuras.forEach(auraObj => {
				boardState.units[unit.playerIdx ? 0 : 1].forEach(cmpUnit => unitAffectedByAuraMove(cmpUnit, curUnit.pos, newUnit.pos, auraObj));
			});
		}
	}

	// If the unit had models that changed in wounds remaining
	if (!newUnit.flag && payload.wounds) {
		newUnit.wounds.some((newWounds, modelIdx) => {
			// If this model changed wounds
			if (newWounds !== curUnit.wounds[modelIdx]) {
				// If this unit has a wound track
				if (unit.woundTrack && unit.woundTrack.length) {
					const oldTrackInfo = unit.models[modelIdx].getWoundTrack(unit, profiles[unit.playerIdx], curUnit.wounds[modelIdx]);
					const newTrackInfo = unit.models[modelIdx].getWoundTrack(unit, profiles[unit.playerIdx], newWounds);

					if (oldTrackInfo[1] !== newTrackInfo[1]) {
						newUnit.flag = true;
						ret = true;
						return true;
					}
				}
			}
		})

		newUnit.modelsRemaining = newUnit.wounds.reduce((count, val) => val ? count + 1 : count, 0);
		if (!newUnit.flag && newUnit.modelsRemaining !== curUnit.modelsRemaining && (
			(newUnit.modelsRemaining < 6) != (curUnit.modelsRemaining < 6) || // Crossed first blast barrier (6)
			(newUnit.modelsRemaining < 11) != (curUnit.modelsRemaining < 11) || // Crossed first blast barrier (11)
			(unit.watchers.include("HAS_MODEL_QUANTIY")) // We're watching for any model count changes
		)) {
			newUnit.flag = true;
			ret = true;
		}
	}

	return ret;
}
// TODO performance - only do this computation if the unit is affected by this aura
const unitAffectedByAuraMove = (cmpUnit, oldPos, newPos, auraObj) => {
	const isInOld = distance(cmpUnit.pos(), oldPos) <= auraObj.radius;
	const isInNew = distance(cmpUnit.pos(), newPos) <= auraObj.radius;
	if (isInOld != isInNew) {
		cmpUnit.flag = true;	
	}
};

// Cleans strings that we got from the database, doing things like removing wrapping quotes.
const cleanStrInput = str => {
	let ret = str;

	// Check for wrapping quotes
	if (ret.match(/^".*"$/g)) {
		ret = ret.substring(1, ret.length - 1);
	}

	return ret;
};

// Translate a unit from the normal format into what the board wants
const newBoardUnit = (unit, i, profiles, boardState, matchState, playerIdx) => {
	let watching = [];


	// Iterate over ability that this unit has, constructing the inital effect list and remembering changes to watch for
	const {effects, allyAuras, enemyAuras} = unit.ruleKeys.reduce((acc, idx) => {
		const ability = profiles[playerIdx].desc[idx];
		// Add any important things to watch for, like round num or model quantity
		if (!watching.includes("HAS_MODEL_QUANTIY") && meaningObjHasCondType(ability.meaning, "HAS_MODEL_QUANTIY")) {
			watching.push("HAS_MODEL_QUANTIY");
		}
		if (!watching.includes("IS_PHASE") && meaningObjHasCondType(ability.meaning, "IS_PHASE")) {
			watching.push("IS_PHASE");
		}
		if (!watching.includes("IS_ROUND") && meaningObjHasCondType(ability.meaning, "IS_ROUND")) {
			watching.push("IS_ROUND");
		}

		// Get the array of applied rules
		const newArr = checkAndApply(ability.meaning, unit, profiles, boardState, matchState);

		// Separate out the aura effects, since they're important
		newArr.forEach(effect => {
			if (effect.type === "AURA") {
				if (effect.target === "ENEMY") {
					acc.enemyAuras.push(effect);
				} else {
					acc.allyAuras.push(effect);	
				}
			} else {
				acc.effects.push(effect);
			}

		})

		return acc.concat(newArr);
	}, { effects: [], allyAuras: [], enemyAuras: [] });


	return {
		// Position in inches - in rows along the long board edges, separated by force
		pos: [
			4 + ((i*4) % 40),
			(playerIdx === 0) ? (3 + Math.ceil(i / 10) * 3) : 26 - (3 * Math.ceil(i / 10))
		],

		// Start everyone at full health
		wounds: unit.models.reduce((res, model) => {
			let stat = profiles[playerIdx].stats.find(e => e.name === model.key)
			for (let j = 0; j < model.quantity; j++) {
				res.push(stat.wounds);
			}

			return res;	
		}, []),

		// Array of meaning objects that apply to this unit at game start
		effects,

		// Array of strings that engine uses to know when to flag this unit for refresh
		watching,

		// Arrays of aura objects
		allyAuras,
		enemyAuras,

		// All units are initialized without damage information from the server
		flag: true
	};
};
