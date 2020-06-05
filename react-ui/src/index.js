/* Node Modules */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

/* Local Modules */
import App from './app/App';
import { appReducer } from './app/reducer';

/* Source (this package) */
import * as serviceWorker from './serviceWorker';
import './index.css';

// Create redux store
const rootReducer = combineReducers({
	appReducer: appReducer
})
const store = createStore(rootReducer);

render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
