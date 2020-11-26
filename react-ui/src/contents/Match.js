/**
 * FILENAME: ArmyBrowser.js
 *
 * DESCRIPTION: CRUD interaction for this user's Army List.  
 */

// React + Redux
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
import './contents.css';

export const Match = props => {
	const {
		// Root 
		config,
		sendMsg,
		fetchAt,

		// Parent
		key,
		name,

		// Redux
		matchState,
		matchHash,

		// Dispatched Actions
		openContents
	} = props;

	const [ phaseMask, setPhaseMask ] = useState(matchState.phase);

	const renderPhaseContent = phase => {
		switch(phase) {
			case 1:
				return (
					<div className="command-content">
					</div>
				);
			case 2:
				return (
					<div className="movement-content">
					</div>
				);
			case 3:
				return (
					<div className="psychic-content">
					</div>
				);
			case 4:
				return (
					<div className="shooting-content">
					</div>
				);
			case 5:
				return (
					<div className="charge-content">
					</div>
				);
			case 6:
				return (
					<div className="fight-content">
					</div>
				);
			case 7:
				return (
					<div className="morale-content">
					</div>
				);
		}
	};

	const handlePhaseClick = (e, { key }) => {
		setPhaseMask(key);
	};

	const content = useMemo(renderPhaseContent, [ matchState.phase ])

	const commandContent = useMemo(() => renderPhaseContent(1), [ matchState.phase === 1 ]);
	const movementContent = useMemo(() => renderPhaseContent(2), [ matchState.phase === 1 ]);
	const psychicContent = useMemo(() => renderPhaseContent(3), [ matchState.phase === 1 ]);
	const shootingContent = useMemo(() => renderPhaseContent(4), [ matchState.phase === 1 ]);
	const chargeContent = useMemo(() => renderPhaseContent(5), [ matchState.phase === 1 ]);
	const fightContent = useMemo(() => renderPhaseContent(6), [ matchState.phase === 1 ]);
	const moraleContent = useMemo(() => renderPhaseContent(7), [ matchState.phase === 1 ]);

	return (
		<div className="contents-container match">
			<Menu className="phase-control">
				<Menu.Item
					as="a"
					key={2}
					active={matchState.phase === 2}
					onClick={handlePhaseClick}
					children={"Movement"}
				/>
				<Menu.Item
					as="a"
					key={3}
					active={matchState.phase === 3}
					onClick={handlePhaseClick}
					children={"Psychic"}
				/>
				<Menu.Item
					as="a"
					key={4}
					active={matchState.phase === 4}
					onClick={handlePhaseClick}
					children={"Shooting"}
				/>
				<Menu.Item
					as="a"
					key={5}
					active={matchState.phase === 5}
					onClick={handlePhaseClick}
					children={"Charge"}
				/>
				<Menu.Item
					as="a"
					key={6}
					active={matchState.phase === 6}
					onClick={handlePhaseClick}
					children={"Fight"}
				/>
			</Menu>

			<div className="match-main">
				{content}
			</div>
 		</div>
	);
}

export const mapStateToProps = (state, props) => {
  return {
  	matchState: state.warReducer.matchState
  };
};

export const MatchContainer = connect(mapStateToProps, { setDemoState, openContents })(Match);
