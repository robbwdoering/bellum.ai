import { MapActions } from './constants';

export const initAction = payload => {
	return {
		type: MapActions.INIT_MAP_DATA,
		payload
	};
};

export const modData = payload => {
	return {
		type: MapActions.MOD_DATA,
		payload
	};
};

export const delData = payload => {
	return {
		type: MapActions.DEL_DATA,
		payload
	};
};

export const ctrlHover = payload => {
	return {
		type: MapActions.CTRL_HOVER,
		payload
	};
};
