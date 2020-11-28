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

export const setTestData = () => {
	return {
		type: WarActions.SET_TEST_DATA,
	};
}