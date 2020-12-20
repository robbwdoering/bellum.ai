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
		]
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
	let metaEntry;
	let newState = Object.assign({}, state);
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case WarActions.SET_PRIMARY_LIST:
			console.log("Setting primary list: ", action.payload.results);
			newState.primaryList = action.payload.results;
			newState.primaryProfile = action.payload.profiles;

			// Translate units into class objects to give access to functions
			newState.primaryList.units = newState.primaryList.units.map(json => new Unit(json));

			if (!newState.boardState.units[0].length) {
				console.log("re-setting boardState: ", newState.boardState);
				newState.boardState.units[0] = action.payload.results.units.map((e, i) => newBoardUnit(e, i, action.payload.profiles, true));
				newState.boardHash++;
			}

			// Parse id
			metaEntry = newState.metalist.find(item => item.name === newState.primaryList.name);
			if (metaEntry) {
				newState.primaryList.id = metaEntry.id;
			}
			newState.listHash++;
			return newState;

		case WarActions.SET_SECONDARY_LIST:
			console.log("Setting secondary list: ", action.payload.results);
			newState.secondaryList = action.payload.results;
			newState.secondaryProfile = action.payload.profiles;


			// Translate units into class objects to give access to functions
			newState.secondaryList.units = newState.secondaryList.units.map(json => new Unit(json));

			if (!newState.boardState.units[1].length) {
				newState.boardState.units[1] = action.payload.results.units.map((e, i) => newBoardUnit(e, i, action.payload.profiles));
				newState.boardHash++;
			}

			console.log("got boardState: ", newState.boardState)
			metaEntry = newState.metalist.find(item => item.name === newState.secondaryList.name);
			if (metaEntry) {
				newState.secondaryList.id = metaEntry.id;
			}
			newState.listHash++;
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
			// newState.unset_profile[] = action.payload.results[0].json;
			// newState.listHash++;
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

		case WarActions.SET_CHART_DATA:
			console.log("SET_CHART_DATA received: ", action.payload)
			Object.assign(newState.chartData, action.payload);
			console.log("SET_CHART_DATA received: ", newState.chartData);
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

		case WarActions.UPDATE_UNIT:
			console.log("UPDATE UNIT received: ", action, newState.boardState.units[action.playerIdx])
			Object.assign(newState.boardState.units[action.playerIdx][action.unitIdx], action.payload);
			newState.boardHash++;
			return newState;
	}

	// Default: return state
	return state;
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
	};
}