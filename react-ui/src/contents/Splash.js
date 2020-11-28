/**
 * FILENAME: Splash.js
 *
 * DESCRIPTION: Component that displays the splash / landing page for non-authenticated users.
 */

// React + Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { testAction, openCanvas, openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
import './contents.css';

export const Splash = props => {
	const { openContents, setDemoState } = props;
	const { loginWithRedirect } = useAuth0();

	const signUp = e => {
		// openContents(ContentTypes.Auth);
	};

	const openDemo = e => {
		setDemoState({ step: 1});
		openContents(ContentTypes.DemoTransition);
	};

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
				<Button onClick={loginWithRedirect} className="primaryButton"> Login / Signup </Button>
				<Button onClick={openDemo} className="primaryButton"> See A Demo </Button>
			</Button.Group>
		</React.Fragment>
	);
}

export const mapStateToProps = (state, props) => {
  return { };
};

export const SplashContainer = connect(mapStateToProps, { setDemoState, openContents })(Splash);
