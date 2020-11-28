/* Node Modules */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Auth0Provider } from '@auth0/auth0-react';

/* Local Modules */
import App from './app/App';
import { appReducer } from './app/reducer';
import { profileReducer } from "./profile/reducer";
import { mapReducer } from "./map/reducer";
import { warReducer } from "./war/reducer";

/* Source (this package) */
import * as serviceWorker from './serviceWorker';
import './index.css';

// Create redux store
const rootReducer = combineReducers({
	appReducer: appReducer,
	profileReducer: profileReducer,
	mapReducer: mapReducer,
	warReducer: warReducer
})
const store = createStore(rootReducer);

render(
	(
		<Provider store={store}>
			<Auth0Provider
				domain="bellum.us.auth0.com"
				clientId="Un24eSvE9XDEbTIVAo9PkCf7bMLzBdiZ"
				redirectUri={window.location.origin}
			>
				<App />
			</Auth0Provider>
		</Provider>
	),
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
