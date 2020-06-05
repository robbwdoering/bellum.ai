import { AppActions } from './constants';

export const testAction = payload => {
	console.log('[reducer] TEST_ACTION dispatched');
	return {
		type: AppActions.TEST_ACTION,
		payload
	};
};

export const openPane = payload => {
	console.log('[reducer] OPEN_PANE dispatched');
	return {
		type: AppActions.OPEN_PANE,
		payload
	};
};

export const openCanvas = payload => {
	console.log('[reducer] OPEN_CANVAS dispatched');
	return {
		type: AppActions.OPEN_CANVAS,
		payload
	};
};
