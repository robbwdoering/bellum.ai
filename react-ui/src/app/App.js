/* Node Modules */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCheckSquare, faChevronCircleRight, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

/* Local */
import Dashboard from './../navigation/dashboard';
import logo from './logo.svg';
import { AppActions } from './constants';
import { testAction, configPane, openCanvas, setAuthStatus } from './actions';
import { ProfileActions } from './../profile/constants';
import { modifyProfile, setPaneProfile } from './../profile/actions';
import { WarActions } from './../war/constants';
import { processWarAction } from './../war/actions';
import { useApi } from "./../app/useApi";

import './App.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import 'semantic-ui-css/semantic.min.css';

const App = props => {
	const { testAction, configPane, openCanvas, modifyProfile, setPaneProfile, processWarAction } = props;

	const { user, isAuthenticated, isLoading } = useAuth0();
	const [message, setMessage] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const [userId, setUserId] = useState(1);

	const sendMsg = (url, method, data) => {
		setIsFetching(true);
		let msg = {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		};

		let finalUrl = url;
		if (data && method !== "GET") {
			msg.body = JSON.stringify(Object.assign({}, data, { userId }));
		} else {
			finalUrl += "/" + userId;
		}

		console.log('[sendMsg] msg: ', msg, finalUrl, method);
		fetch(finalUrl, msg)
			.then(response => {
				if (!response.ok) {
					console.error('[sendMsg] Received a bad status from the server: ', response.status);
					throw new Error(`status ${response.status}`);
				}
				return response.json();
			})
			.then(json => {
				setIsFetching(false);
				console.log('[sendMsg] Received ' + json.type);
				switch (json.type) {
					case AppActions.TEST_ACTION:
						testAction(json.payload);
						break;
					case AppActions.CONFIG_PANE:
						configPane(json.payload);
						break;
					case AppActions.OPEN_CANVAS:
						openCanvas(json.payload);
						break;
					case ProfileActions.MODIFY_PROFILE:
						modifyProfile(json.payload);
						break;
					case ProfileActions.SET_PANE_PROFILE:
						setPaneProfile(json.payload);
						break;
					case WarActions.SET_PRIMARY_LIST:
					case WarActions.SET_SECONDARY_LIST:
					case WarActions.SET_METALIST:
					case WarActions.SET_UNSET_PROFILES:
					case WarActions.SET_CHART_DATA:
						processWarAction(json.type, json.payload);
						break;
					case 'DB_ACTION':
						console.log('[sendMsg] DB action json: ', json);
						break;
					default:
						throw new Error(`Unrecognized Type: ${json.type}`);
				}
			})
			.catch(e => {
				setMessage(`API call failed: ${e}`);
				setIsFetching(false);
			});
	};

	/**
	 * This callback understands every redux-oritented response from the server, storing the relevant data in redux
	 * through the use of package-specific reducers.
	 */
	const handleFetch = useMemo(() => (json) => {
		console.log("Handling fetch!", json);
		if (!json) {
			return;
		}
		switch (json.type) {
			case AppActions.TEST_ACTION:
				testAction(json.payload);
				break;
			case AppActions.CONFIG_PANE:
				configPane(json.payload);
				break;
			case AppActions.OPEN_CANVAS:
				openCanvas(json.payload);
				break;
			case ProfileActions.MODIFY_PROFILE:
				modifyProfile(json.payload);
				break;
			case ProfileActions.SET_PANE_PROFILE:
				setPaneProfile(json.payload);
				break;
			case WarActions.SET_PRIMARY_LIST:
			case WarActions.SET_SECONDARY_LIST:
			case WarActions.SET_METALIST:
			case WarActions.SET_UNSET_PROFILES:
			case WarActions.SET_CHART_DATA:
				processWarAction(json.type, json.payload);
				break;
			case 'DB_ACTION':
				console.log('[sendMsg] DB action json: ', json);
				break;
			default:
				throw new Error(`Unrecognized Type: ${json.type}`);
		}
	}, []);

	// -------
	// EFFECTS
	// -------
	// Request startup data
	useEffect(() => {
		if (isAuthenticated) {
			console.log("We're already authenticated!");
			setAuthStatus(isAuthenticated);
		} else {
			console.log("not authenticated...", isAuthenticated, isLoading)
		}
		// sendMsg('/api/map/init', 'GET');

	}, []);

	return (
		<div className="App">
			<Dashboard fetchAt={() => console.warn('STUB - got fetchAt() call')} sendMsg={sendMsg} handleFetch={handleFetch} />
		</div>
	);
};

export default connect(null, { testAction, configPane, openCanvas, modifyProfile, setPaneProfile, processWarAction, setAuthStatus })(App);
