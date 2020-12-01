/**
 * FILENAME: Splash.js
 *
 * DESCRIPTION: Component that displays the splash / landing page for non-authenticated users.
 */

// React + Redux
import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { testAction, openCanvas, openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes, apiOpts } from './../common/constants';
import './contents.css';

import { useApi } from "./../app/useApi";

const domain = "bellum.us.auth0.com";

export const Splash = props => {
	const { openContents, setDemoState, handleFetch } = props;
	const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

	const signUp = e => {
		// openContents(ContentTypes.Auth);
	};

	const openDemo = e => {
		setDemoState({ step: 1});
		openContents(ContentTypes.DemoTransition);
	};

	const [userMetadata, setUserMetadata] = useState(null);

	/*
	useEffect(() => {
		const getUserMetadata = async () => {

			console.log("Setting user data...");
			try {
				const accessToken = await getAccessTokenSilently({
					audience: `https://${domain}/api/v2/`,
					scope: "read:current_user",
				});

				const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

				const metadataResponse = await fetch(userDetailsByIdUrl, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const { user_metadata } = await metadataResponse.json();

				setUserMetadata(user_metadata);
			} catch (e) {
				console.log("Got fetchUserData error", e.message);
			}
		};

		getUserMetadata();
	}, []);
	*/

	// const { loading, error, refresh, data: users } = useApi('/api/stats/war/metalist/1', 'GET', apiOpts, handleFetch);

	return (
		<React.Fragment>
			<h2> Welcome to Bellum.ai </h2>
			<ul>
				<li> <strong> Analyse Lists: </strong> Upload your <a href="https://battlescribe.net">Battlescribe</a> lists for next level Mathhammer.</li>
				<li> <strong> Play Faster: </strong> Update the tool as you play to always know which dice come next. </li>
				{/*<li> <strong> Battle Reports </strong> Share detailed, customizable reports. </li>**/}
				<li> <strong> Learn Tactics: </strong> Live statistical feedback, suggested paths of action, and more... </li>
			</ul>
			<Button.Group className="bot-right-container">
				{/*<Button onClick={loginWithRedirect} className="primaryButton"> Login / Signup </Button>*/}
				<Button onClick={() => loginWithRedirect(apiOpts)} className="primaryButton"> Login / Signup </Button>
				<Button onClick={openDemo} className="primaryButton"> See A Demo </Button>
			</Button.Group>
		</React.Fragment>
	);
}

export const mapStateToProps = (state, props) => {
  return { };
};

export const SplashContainer = connect(mapStateToProps, { setDemoState, openContents })(Splash);
