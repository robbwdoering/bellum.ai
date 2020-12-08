import { WarActions, demoData } from "./constants";

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
		cpCount: [0, 0],
		vpCount: [
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		objectives: [
			[null], // Primary
			[null, null, null], //Secondaries
			[null, null, null]
		]
	},
	matchHash: 0,
	prematchData: {
		primary: {},
		secondary: {},
		isPrimary: {}
	},
	chartData: {
		scorecards: [ null, null ]
	},
	chartHash: 0,
	chartQueue: []
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

		case WarActions.REQUEST_CHART_REFRESH:
			newState.chartQueue.push(action.payload);
			return newState;

		case WarActions.CLEAR_CHART_QUEUE:
			newState.chartQueue = [];
			return newState;

		case WarActions.SET_TEST_DATA:
			Object.assign(newState, demoData);
			newState.metalistHash++;
			return newState;

		default:
			console.warn("Received war action of unknown type.");
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
