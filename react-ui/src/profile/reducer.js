import { ProfileActions } from './constants';

const initialState = {
	data: {
		name: "",
		id: '',
		activeContacts: [],
		symptomConfidence: 0,
		riskLevel: 0,
		location: ''
	},
	paneProfile: undefined
};

export const profileReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case ProfileActions.MODIFY_PROFILE:
			newState.data = Object.assign({}, newState.data, action.payload);
			return newState;

		case ProfileActions.SET_PANE_PROFILE:
			newState.paneProfile = action.payload;
			return newState;

		default:
			return newState;
	}
};
