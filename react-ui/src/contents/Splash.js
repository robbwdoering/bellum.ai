/**
 * FILENAME: Splash.js
 *
 * DESCRIPTION: Component that displays the splash / landing page for non-authenticated users.
 */

// React + Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { testAction, openCanvas, openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
import './contents.css';

export const Splash = props => {
	const { openContents, setDemoState } = props;

	const signUp = e => {
		openContents(ContentTypes.Auth);
	};

	const openDemo = e => {
		setDemoState({ step: 1});
		openContents(ContentTypes.DemoTransition);
	};

	return (
		<React.Fragment>
			<h3> Welcome to Bellum.ai </h3>
			<span> Your path to faster + more effective Warhammer 40,000 play. </span>
			<br/>
			<Button.Group>
				<Button onClick={signUp} className="primaryButton"> Sign Up </Button>
				<Button onClick={openDemo} className="primaryButton"> See A Demo </Button>
			</Button.Group>
		</React.Fragment>
	);
}

export const mapStateToProps = (state, props) => {
  return { };
};

export const SplashContainer = connect(mapStateToProps, { setDemoState, openContents })(Splash);
