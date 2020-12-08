/**
 * FILENAME: DemoTransition.js
 *
 * DESCRIPTION: Component that is used to blurbs in between demo steps.
 */

// React + Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { openCanvas, openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
import './contents.css';

export const DemoTransition = props => {
	const { openContents, setDemoState, demoState } = props;

	const signUp = e => {
		openContents(ContentTypes.Auth);
	};

	const handleKnowledgeSelect = (e, { key }) => {
		// Advance the demo, and remember their answer here
		setDemoState({ step: 2, knowledge: key})

		openContents(ContentTypes.PreMatch);
	};

	if (!demoState) {
		return null;
	}

	return (
		<React.Fragment>
			{/* Introduction */}
			{demoState.step === 1 && (
				<React.Fragment>
					<h3> Before we go too far... </h3>
					<span> How familiar are you with miniature wargames? </span>
					<br />
					<Button.Group className="bot-right-container neu"> 
						<Button key={0} onClick={handleKnowledgeSelect} className="primaryButton"> I'm not </Button>
						<Button key={1} onClick={handleKnowledgeSelect} className="primaryButton"> I know the basics </Button>
						<Button key={2} onClick={handleKnowledgeSelect} className="primaryButton"> There Is Only War </Button>
					</Button.Group>
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

export const mapStateToProps = (state, props) => {
  return { 
  	demoState: state.appReducer.demoState
  };
};

export const DemoTransitionContainer = connect(mapStateToProps, { setDemoState, openContents })(DemoTransition);
