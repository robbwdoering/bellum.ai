import { AppActions } from './constants';

const initialState = {
  testsReceived: 0,
  curPane: '',
  curCanvas: ''
};

export const appReducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  console.log('[reducer]', action);

  switch (action.type) {
    case AppActions.TEST_ACTION:
      return Object.assign({}, state, {
        testsReceived: action.payload || state.testsReceived + 1
      });

    case AppActions.OPEN_PANE:
      return Object.assign({}, state, {
        curPane: action.payload || ''
      });

    case AppActions.OPEN_CANVAS:
      return Object.assign({}, state, {
        curCanvas: action.payload || ''
      });
  }

  // Default: return state
  return state;
};
