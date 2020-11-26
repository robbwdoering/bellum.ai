import { WarActions, regex } from "./constants";

const initialState = {
	metalist: [],
	metalistHash: 0,
	primaryList: null,
	secondaryList: null,
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
		vpCount: [0, 0],
		cpCount: [0, 0]
	},
	matchHash: 0
};

export const warReducer = (state = initialState, action) => {
	const msg = action.payload;
	let newState = Object.assign({}, state);
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case WarActions.SET_PRIMARY_LIST:
			console.log("Setting primary list: ", action.payload.results);
			newState.primaryList = action.payload.results;
			newState.primaryProfile = action.payload.profile;
			newState.listHash++;
			return newState;
		case WarActions.SET_SECONDARY_LIST:
			console.log("Setting secondary list: ", action.payload.results);
			newState.secondaryList = action.payload.results;
			newState.secondaryProfile = action.payload.profile;
			newState.listHash++;
			return newState;
		case WarActions.SET_METALIST:
			console.log("Metalist received: ", action.payload);
			if (!action.payload || !action.payload.results || action.payload.results.length === 0) {
				console.error("Cannot parse metalist - null.");
			} else {
				newState.metalistHash++;
				newState.metalist = action.payload.results.map(e => {
					let tmpArr = e.row.substring(1, e.row.length - 1).split(",");
					return {
						name: tmpArr[0],
						points: parseInt(tmpArr[1]),
						faction: tmpArr[2],
						rating: tmpArr[3],
						id: tmpArr[4]
					}
				});
			}
			return newState;

		case WarActions.SET_UNSET_PROFILES:
			console.log("Setting unset profiles:", action.payload.results);
			// newState.unset_profile[] = action.payload.results[0].json;
			// newState.listHash++;
			return newState;

		case WarActions.SET_MATCH_STATE:
			Object.assign(newState.matchState, action.payload);
			newState.matchHash++;
			return newState;

		default:
			console.warn("Received war action of unknown type.");
	}

	// Default: return state
	return state;
};


