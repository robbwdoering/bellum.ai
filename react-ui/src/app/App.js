/* Node Modules */
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCheckSquare, faChevronCircleRight, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

/* Local */
import Dashboard from './../dashboard/dashboard';
import logo from './logo.svg';
import { AppActions } from './constants';
import { testAction, configPane, openCanvas } from './actions';
import { ProfileActions } from './../profile/constants';
import { modifyProfile, setPaneProfile } from './../profile/actions';

import './App.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import 'semantic-ui-css/semantic.min.css';

const App = ({ testAction, configPane, openCanvas, modifyProfile, setPaneProfile }) => {
	const [message, setMessage] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const [url, setUrl] = useState('/api');

	// TODO - this doesn't seem like it's going to support multiple concurrent requests... I don't think we should just hope that doesn't happen,
	// especially if future functionality requires frequent handshakes
	// TODO - move this to 'common'
	// TODO - add splash pages to market to different groups, i.e. educators, friends, employers, etc.
	// TODO - add ability to batch add planned contacts, like for example, in a school with class schedules
	// TODO - customizable toolbar to the right, or maybe on the bottom of the left sidebar? Mabe not neccessary if the UX is good enogugh (i.e. small enough # of clicks per story)

	const sendMsg = (url, method, data) => {
		setIsFetching(true);
		let msg = {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		};

		if (data) {
			msg.body = JSON.stringify(data);
		}

		console.log('[sendMsg] msg: ', msg);
		fetch(url, msg)
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

	// -------
	// EFFECTS
	// -------
	// Request startup data
	useEffect(() => {
		sendMsg('/api/map/init', 'GET');
	}, []);

	return (
		<div className="App">
			<Dashboard fetchAt={() => console.warn('STUB - got fetchAt() call')} sendMsg={sendMsg} />
		</div>
	);
};

export default connect(null, { testAction, configPane, openCanvas, modifyProfile, setPaneProfile })(App);
