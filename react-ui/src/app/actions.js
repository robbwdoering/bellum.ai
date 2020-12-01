import { AppActions } from './constants';

export const testAction = payload => {
	console.debug('[reducer] TEST_ACTION dispatched');
	return {
		type: AppActions.TEST_ACTION,
		payload
	};
};

// TODO: add "ADD/MOD/DEL" functionality to configPane(), so callers can override a pane completely if they want to
export const configPane = (name, actionType, config) => {
	console.debug('[reducer] OPEN_PANE dispatched');
	return {
		type: AppActions.OPEN_PANE,
		name,
		actionType,
		config
	};
};

export const openCanvas = payload => {
	console.debug('[reducer] OPEN_CANVAS dispatched');
	return {
		type: AppActions.OPEN_CANVAS,
		payload
	};
};

export const openContents = payload => {
	console.debug('[reducer] OPEN_CONTENTS dispatched');
	return {
		type: AppActions.OPEN_CONTENT,
		payload
	};
};

export const setDemoState = payload => {
	console.debug('[reducer] SET_DEMO_STATE dispatched');
	return {
		type: AppActions.SET_DEMO_STATE,
		payload
	};
};

export const setAuthStatus = payload => {
	console.debug('[reducer] SET_AUTH_STATUS dispatched');
	return {
		type: AppActions.SET_AUTH_STATUS,
		payload
	};
};
