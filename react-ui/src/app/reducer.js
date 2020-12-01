import { AppActions } from './constants';
import { Panes, Canvases, ContentTypes } from './../common/constants';

const initialState = {
	curPanes: {},
	curCanvas: Canvases.HEX_MAP,
	curContent: ContentTypes.Splash,
	demoState: {
		step: -1,
		knowldege: 1
	},
	authStatus: false
};

export const appReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case AppActions.OPEN_PANE:
			let newVal;

			// Parse whether to replace, modify, or delete the specified pane
			switch (action.actionType) {
				case "ADD":
					newVal = action.config;
					break;
				case "MOD":
					newVal = Object.assign({}, newState.curPanes[action.name] ? newState.curPanes[action.name] : {}, action.config);
					break;
				default:
					console.error("[appReducer] Received a pane configuration on unknown type: ", action.actionType);
				case "DEL":
					newVal = undefined;
					break;
			}

			// Set the value and return
			newState.curPanes[action.name] = newVal;
			return newState;

		case AppActions.OPEN_CANVAS:
			return Object.assign({}, state, {
				curCanvas: action.payload || ''
			});

		case AppActions.OPEN_CONTENT:
			console.log("setting content", action.payload);
			return Object.assign({}, state, {
				curContent: action.payload || ''
			});

		case AppActions.SET_DEMO_STATE:
			return Object.assign({}, state, {
				demoState: Object.assign({}, state.demoState, action.payload)
			});

		case AppActions.SET_AUTH_STATUS:
			return Object.assign({}, state, {
				authStatus: action.payload 
			});
	}

	// Default: return state
	return state;
};
