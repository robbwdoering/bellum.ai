import { WarActions, demoData } from "./constants";
import { Unit } from "./utils";

const initialState = {
	metalist: [],
	metalistHash: 0,
	primaryList: null,
	secondaryList: null,
	primaryProfile: null,
	secondaryProfile: null,
	listHash: 0,
	profiles: {
		weapons: [],
		psykers: [],
		descs: [],
		stats: [],
		powers: []
	},
	alerts: [],

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
	boardState: {
		units: [[], []]
	},
	boardHash: 0,
	matchHash: 0,
	// One array for each player
	messages: [[], []],
	chartData: {
		scorecards: [ null, null ]
	},
	chartHash: 0
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
			// Flag any units that need refreshed damage values
			applyFlags(action.payload, forces, profiles, forces[action.playerIdx].units[action.unitIdx], newState.boardState, newState.matchState);


			Object.assign(newState.boardState.units[action.playerIdx][action.unitIdx], action.payload);
			newState.boardHash++;
			return newState;

		case WarActions.SET_CHART_DATA:
			console.log("SET_CHART_DATA received: ", action.payload)
			Object.assign(newState.chartData, action.payload);
			newState.chartHash++;
			return newState;

		case WarActions.SET_FORCE_SCORECARD:
			console.log("SET_FORCE_SCORECARD received: ", action.payload)
			if (newState.primaryList && newState.primaryList.id === action.payload[0]) {
				newState.chartData.scorecards[0] = action.payload[1];
			} else {
				newState.chartData.scorecards[1] = action.payload[1];
			}
			newState.chartHash++;
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
		newState.boardState.units[playerIdx] = action.payload.results.units.map((e, i) => newBoardUnit(e, i, action.payload.profiles, true));
		newState.boardHash++;
	}

	// Parse id
	let metaEntry = newState.metalist.find(item => item.name === newState.primaryList.name);
	if (metaEntry) {
		newState.primaryList.id = metaEntry.id;
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
	const curUnit = boardState.units[unit.playerIdx][unit.unitIdx];
	const newUnit = Object.assign({}, curUnit, payload);

	// If the unit moved
	if (payload.pos) {
		// Check if the unit has entered or left cover
		newUnit.curCover = getUnitCover(newUnit, boardState, matchState);
		if (!arrEqual(oldUnit.curCover, newUnit.curCover)) {
			newUnit.flag = true;
		}

		// Check if the unit has entered or left an aura
		newUnit.curAuras = getUnitAuras(newUnit, boardState, forces, profiles);
		if (!newUnit.flag && !arrEqual(newUnit.curAuras, curUnit.curAuras) {
			newUnit.flag = true;
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
					const oldTrackInfo = unit.models[modelIdx].getWoundTrack(unit, profile, curUnit[]);
					const newTrackInfo = unit.models[modelIdx].getWoundTrack(unit, profile, curUnit[]);

					if (oldTrackInfo[1] !== newTrackInfo[1]) {
						newUnit.flag = true;
						return true;
					}
				}
			}
		})

		newUnit.modelsRemaining = newUnit.wounds.reduce((count, val) => val ? count + 1 : count, 0);
		if (!newUnit.flag && newUnit.modelsRemaining !== oldUnit.modelsRemaining && (
			// Crossed first blast barrier (6)
			// Crossed second blast barrier (11)
			(unit.)// Crossed another barrier
		)) {
			newUnit.flag = true;
		}
	}

	// TODO - psychic update
	// if (changedPsychicEffect()) {
	// }
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
const newBoardUnit = (unit, i, profile, isPrimary) => {
	let watching = [];
	const activeEffects = unit.abilities.reduce((acc, ability) => {
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
		const newArr = checkAndApply(ability.meaning, profiles, unit, boardState, matchState, originUnit);
		return acc.concat();
	}, []);


	return {
		// Position in inches - in rows along the long board edges, separated by force
		pos: [
			4 + ((i*4) % 40),
			isPrimary ? (3 + Math.ceil(i / 10) * 3) : 26 - (3 * Math.ceil(i / 10))
		],

		// Start everyone at full health
		wounds: unit.models.reduce((res, model) => {
			let stat = profile.stats.find(e => e.name === model.key)
			for (let j = 0; j < model.quantity; j++) {
				res.push(stat.wounds);
			}

			return res;	
		}, []),

		activeEffects,
		// Array of strings to "watch" (i.e. when to auto-flag this unit)
		watching: [],

		allyAuras: [],

		// Keys of all the rules that "apply" to this unit
		// These are "desc" general rules that are not interaction-specific
		keys: [
			[], // Statuses
			[], // Ally Rules
			[]  // Enemy Rules
		]
	};
};
