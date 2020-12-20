import { WarActions } from './constants';

export const processWarAction = (type, payload)  => {
	console.log("processing action, returning : ", { type, payload } )
	return { type, payload };
}

export const requestChartRefresh = payload => {
	return {
		type: WarActions.REQUEST_CHART_REFRESH,
		payload
	};
}

export const clearChartQueue = () => {
	return {
		type: WarActions.CLEAR_CHART_QUEUE
	};
}

export const setBoardState = payload => {
	return {
		type: WarActions.SET_BOARD_STATE,
		payload
	};
}

export const setMatchState = payload => {
	return {
		type: WarActions.SET_MATCH_STATE,
		payload
	};
}

export const updateUnit = (playerIdx, unitIdx, payload) => {
	return {
		type: WarActions.UPDATE_UNIT,
		unitIdx,
		playerIdx,
		payload
	};
}
