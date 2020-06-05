import { TEST_ACTION } from './constants'

const initialState = {
	testsReceived: 0
}

export const appReducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
  	case TEST_ACTION:
  		console.log("Handling TEST_ACTION in reducer.");
  		return Object.assign({}, state, {
  			testsReceived: state.testsReceived + 1
  		});
  }

  // Default: return state
  return state
};