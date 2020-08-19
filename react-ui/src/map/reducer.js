import { MapActions, START_RAD } from "./constants";

const initialState = {
	data: {
		0: {
			0: [
				{name: 'HexBox', r: START_RAD, z: 50, color: "#2f2", fill: true, key: "HexBox|"+START_RAD+"|"+50}
			]
		}
	},
	hexRad: 100,
	gridSize: {q: 10, r: 10},
	oceans: [],
	oceanHash: 0,
	dataHash: 0
};

export const mapReducer = (state = initialState, action) => {
	const msg = action.payload;
	let newState = Object.assign({}, state);
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case MapActions.INIT_MAP_DATA:
			newState.oceans = msg.oceans;
			newState.oceanHash++;
			newState.hexRad = msg.hexRad;
			newState.gridSize = msg.gridSize;

			return newState;

		case MapActions.MOD_DATA:
			newState.dataHash++;
			if (newState.data[msg.q][msg.r][msg.id]) {
				newState.data[msg.q][msg.r][msg.id] = Object.assign({}, newState.data[msg.q][msg.r][msg.id], msg.data);
			} else {
				newState.data[msg.q][msg.r][msg.id] = msg.data;
			}

			return newState;

		case MapActions.DEL_DATA:
			if (newState.data[msg.q][msg.r][msg.id]) {
				newState.dataHash++;
				newState.data[msg.q][msg.r].delete(msg.id);
			}

			return newState;
	}

	// Default: return state
	return state;
};
