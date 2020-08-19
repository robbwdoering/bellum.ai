import { ProfileActions } from './constants';

export const modifyProfile = payload => {
	return {
		type: ProfileActions.MODIFY_PROFILE,
		payload
	};
};

export const setPaneProfile = payload => {
	return {
		type: ProfileActions.SET_PANE_PROFILE,
		payload
	};
};
