/**
 * FILENAME: ArmyBrowser.js
 *
 * DESCRIPTION: CRUD interaction for this user's Army List.  
 */

// React + Redux
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';
import { useCookies } from "react-cookie";

import { setMatchState } from './../war/actions';
import { openContents } from './../app/actions';
import { ContentTypes } from './../common/constants';
import './contents.css';

export const PostMatch = props => {
	const {
		// Root 
		config,
		fetchAt,

		// Parent
		key,
		name,

		// Redux
		metalist,
		metalistHash,
		primaryList,
		secondaryList,
		listHash,
		profiles,

		// Dispatched Actions
		openContents,
		setMatchState
	} = props;

	const [cookies, setCookie, removeCookie] = useCookies(['bellum_ai_match', 'bellum_ai_forces', 'bellum_ai_board']);

	useEffect(() => {
		// When we enter this screen, end the match
		setMatchState({
			turn: -1,
			phase: -1,
			activePlayer: -1	
		});

		removeCookie('bellum_ai_forces', { path: '/' });
		removeCookie('bellum_ai_match', { path: '/' });
		removeCookie('bellum_ai_board', { path: "/" });
	}, []);

	return (
		<React.Fragment>
			<div className="top-right-container">
				<Button className="prematch-start primaryButton" onClick={() => openContents(ContentTypes.Splash)} > Return to Splash </Button>
			</div>
			<Divider horizontal> <h2>Prematch</h2> </Divider>
		</React.Fragment>
	);
}

export const mapStateToProps = (state, props) => {
  return { };
};

export const PostMatchContainer = connect(mapStateToProps, {  openContents, setMatchState })(PostMatch);
