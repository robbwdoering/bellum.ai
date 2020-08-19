import { AppActions } from './constants';

export const testAction = payload => {
	console.log('[reducer] TEST_ACTION dispatched');
	return {
		type: AppActions.TEST_ACTION,
		payload
	};
};

// TODO: add "ADD/MOD/DEL" functionality to configPane(), so callers can override a pane completely if they want to
export const configPane = (name, actionType, config) => {
	console.log('[reducer] OPEN_PANE dispatched');
	return {
		type: AppActions.OPEN_PANE,
		name,
		actionType,
		config
	};
};

export const openCanvas = payload => {
	console.log('[reducer] OPEN_CANVAS dispatched');
	return {
		type: AppActions.OPEN_CANVAS,
		payload
	};
};
