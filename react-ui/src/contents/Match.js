/**
 * FILENAME: Match.js
 *
 * DESCRIPTION: The main content for an ongoing match.
 */

import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Dropdown, Modal, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { openContents, setDemoState } from './../app/actions';
import { ContentTypes } from './../common/constants';
import Pane from './../common/pane';
import { phases, mapSizeOptions, terrainOptions, objectiveOptions, missionOptions } from './../war/constants';
import { ChartCardContainer } from './../stats/ChartCard';
import { ForceCardContainer } from './../stats/ForceCard';
import { setMatchState } from './../war/actions';
import './contents.css';

export const Match = props => {
	const {
		// Root 
		config,
		handleFetch,

		// Parent

		// Redux
		metalist,
		metalistHash,
		primaryList,
		secondaryList,
		listHash,
		prematchData,
		primaryProfile,
		secondaryProfile,
		matchState,
		matchHash,

		// Dispatched Actions
		openContents,
		setMatchState
	} = props;

	const [ phaseMask, setPhaseMask ] = useState(matchState.phase);
	const [ turnMask, setTurnMask ]  = useState(matchState.turn);
	const [ turnAccordionArr, setTurnAccordionArr ]  = useState([false, false, false, false, false, false]);
	const [ modalContent, setModalContent ]  = useState(false);
	const [ activeTab, setActiveTab ]  = useState(0);

	const handleVpChange = (e, { playerIdx, objIdx, value }) => {
		let newCount = [...matchState.vpCount];

		newCount[playerIdx][objIdx] = value; 

		setMatchState({
			vpCount: value
		});
	};

	const handleMapSizeSelection = (e, { value }) => {
		setMatchState({
			mapSize: value
		});
	};

	const handleTerrainSelection = (e, { value }) => {
		setMatchState({
			terrain: value
		});
	};

	const handleObjectiveSelection = (e, { playerIdx, objIdx, value }) => {
		let newObjectives = [...matchState.objectives];

		newObjectives[playerIdx + 1][objIdx] = value; 

		setMatchState({
			objectives: newObjectives
		});
	};

	const renderObjectiveDropdown = (playerIdx, objIdx) => (
		<Dropdown
			onChange={handleObjectiveSelection}
			defaultValue={matchState.objectives[playerIdx + 1][objIdx]}
			placeholder={`Secondary ${objIdx+1}...`}
			options={objectiveOptions}
			playerIdx={playerIdx}
			objIdx={objIdx}
			selection
			floating
			button
			search
		/>
	);

	const renderPhaseContent = () => {
		const phase = matchState.phase; 
		switch(phase) {
			case 0: // 
				return (
					<div className="setup-content">
						<div className="setup-option">
							<div> Map Size </div>
		 					<Dropdown
		 						button
		 						options={mapSizeOptions}
								defaultValue={matchState.mapSize}
		 						selection
		 						floating
		 						onChange={handleMapSizeSelection}
		 					/>
						</div>
						<div className="setup-option">
							<div> Terrain </div>
		 					<Dropdown
		 						button
		 						options={terrainOptions}
								defaultValue={matchState.terrain}
		 						selection
		 						floating
		 						onChange={handleTerrainSelection}
		 					/>
						</div>
						<div className="setup-option">
							<div> Objectives </div>
							{/* Primary (Shared) Objective */}
							<div>
			 					<Dropdown
			 						className="mission-dropdown"
			 						fluid
			 						button
			 						placeholder="Mission..."
									defaultValue={matchState.objectives[0][0]}
			 						options={missionOptions}
			 						selection
			 						floating
			 						onChange={(e, { value }) => handleObjectiveSelection(e, {playerIdx: -1, objIdx: 0})}
			 					/>
							</div>

							{/* Secondary (Per-Player) Objectives */}
							<div>
								{renderObjectiveDropdown(0, 0)}
								{renderObjectiveDropdown(1, 0)}
							</div>
							<div>
								{renderObjectiveDropdown(0, 1)}
								{renderObjectiveDropdown(1, 1)}
							</div>
							<div>
								{renderObjectiveDropdown(0, 2)}
								{renderObjectiveDropdown(1, 2)}
							</div>
						</div>
					</div>
				);
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

	const handlePhaseClick = (e, { turn, phase }) => {
		setPhaseMask(phase);
		setTurnMask(turn);
	};

	const handleTurnClick = (e, { turn, phase }) => {
		let newArr = [...turnAccordionArr];
		newArr[turn] = !newArr[turn];
		setTurnAccordionArr(newArr);
	};


	const advancePhase = () => {
		let newState = Object.assign({}, matchState)
		newState.phase++; // go the next phase

		switch(matchState.phase) {
			case 0: // Setup
			case 1: // Command
			case 2: // Movement 
			case 3: // Psychic 
			case 4: // Shooting 
			case 5: // Charge 
			case 6: // Fight 
				// Do nothing - add behavior here that needs to be done on phase init for each phase
				break;
			case 7: // Morale 
				newState.phase = 1;
				if (newState.turn === 5) {
					setModalContent("Are you sure?", "This will end the game, and is not reversible - be sure you agree on who won!");
				}
				break;
			default:
				console.log("Couldn't advance phase - unknown current phase ", newState.phase);
				return null;
		}
	};

	const renderPhaseControl = () => {
		let ret = [];
		for (let i = 0; i < 6; i++) {
			// Add headers
			ret.push(
				<Menu.Item
					as="a"
					key={i}
					turn={i}
					className="turn-header"
					onClick={handleTurnClick}
				>
					{i ? `Round ${i}` : 'Setup'}
				</Menu.Item>
			);

			if (turnAccordionArr[i] && i) {
				ret = ret.concat(phases.map((phase, j) => (
					<Menu.Item
						as="a"
						key={i + "-" + j}
						turn={i}
						phase={j}
						active={matchState.turn === i && matchState.phase === j}
						// onClick={handlePhaseClick}
					>
						{phases[j]}
					</Menu.Item>
				)));
			}
		}

		console.log("returning phase ctrl array: ", ret);
		return ret;
	};

	const renderObjectiveControlRow = (playerIdx, objIdx) => (
		<Input
			label={matchState.objectives[playerIdx + 1][objIdx]}
			defaultValue={matchState.vpCount[playerIdx][objIdx]}
			labelPosition={playerIdx ? "right" : undefined}
			playerIdx={playerIdx}
			objIdx={objIdx}
			onChange={handleVpChange}
			transparent
		/> 
	);

	const renderMatchStatus = () => {
		let totals = [
			matchState.vpCount[0].reduce((acc, e) => acc + e, 0),
			matchState.vpCount[1].reduce((acc, e) => acc + e, 0),
		];

		return (
			<Grid doubling>
				<Grid.Row columns={2}>
					{/* Victory Points */}
					<Grid.Column className="victory-point-summary">
						VP: 
						<span className={`total-primary ${totals[0] > totals[1] ? "active" : ""}`}> {totals[0]} </span> /
						<span className={`total-secondary ${totals[1] > totals[0] ? "active" : ""}`}> {totals[1]} </span>
					</Grid.Column>

					<Grid.Column className="objective-controls">
						<div className="top">
							{renderObjectiveControlRow(0, 0)}
							{renderObjectiveControlRow(0, 1)}
							{renderObjectiveControlRow(0, 2)}
							{renderObjectiveControlRow(0, 3)}
						</div>
						<div className="bottom">
							{renderObjectiveControlRow(1, 0)}
							{renderObjectiveControlRow(1, 1)}
							{renderObjectiveControlRow(1, 2)}
							{renderObjectiveControlRow(1, 3)}
						</div>
					</Grid.Column>
				</Grid.Row>

				{/* Command Points */}
				<Grid.Row>
				</Grid.Row>

				<Grid.Row>
				</Grid.Row>
			</Grid>
		);
	};

	// End this match and display the postmatch screen
	const endMatch = () => {
		setModalContent([]);
		openContents(ContentTypes.PostMatch);
	};

	const content = useMemo(renderPhaseContent, [ matchState.phase, matchHash ]);
	const phaseControlArray = useMemo(renderPhaseControl, [ matchState.phase, matchHash ]);
	const tabPanes = useMemo(() => ([
		{
			menuItem: (
				<Menu.Item as="div" className="tab-menu-item inline">
					<Icon size="large" name="balance scale"/>
					<span> Match Status </span>
				</Menu.Item>
			),
			render: renderMatchStatus
		},
		{
			menuItem: (
				<Menu.Item as="div" className="tab-menu-item inline">
					<Icon size="large" name="address card outline" />
					<span> Force Status </span>
				</Menu.Item>
			),
			render: () => (
				<ForceCardContainer key="primary-force-card" data={primaryList} profile={primaryProfile} handleFetch={handleFetch}/>
			)
		},
		{
			menuItem: (
				<Menu.Item as="div" className="tab-menu-item inline secondary">
					<Icon size="large" name="address card outline"/>
					<span> Opponent Status </span>
				</Menu.Item>
			),
			render: () => (
				<ForceCardContainer key="secondary-force-card" data={secondaryList} profile={secondaryProfile} handleFetch={handleFetch}/>
			)
		}
		// Secondary Force Status
	]), [activeTab, listHash, matchHash]);

	console.log("Rendering match", primaryList, matchState);
	return (
		<React.Fragment>
			<div className="top-right-container">
				<Button className="primaryButton" onClick={advancePhase} > Finish {phases[matchState.turn]} Phase </Button>
			</div>

			<Menu vertical className="phase-control">
				{phaseControlArray}
			</Menu>

			<div className="match-phase-content">
				{content}
			</div>

			<div className="match-tabs">
				<Card.Group>
					<Tab
						activeIndex={activeTab}
						menu={{ secondary: true }}
						panes={tabPanes}
						onTabChange={(e, { activeIndex }) => setActiveTab(activeIndex)}
					/>
				</Card.Group>
			</div>

			<Modal open={modalContent.length}>
				<Modal.Header> {modalContent[0]} </Modal.Header>
				<Modal.Content> {modalContent[1]} </Modal.Content>
				<Modal.Actions> 
					<Button onClick={() => setModalContent([])}> Cancel </Button>
					<Button onClick={endMatch}> Proceed </Button>
				</Modal.Actions>
			</Modal>
 		</React.Fragment>
	);
}

export const mapStateToProps = (state, props) => {
    return {
		metalist: state.warReducer.metalist,
		metalistHash: state.warReducer.metalistHash,
		primaryList: state.warReducer.primaryList,
		secondaryList: state.warReducer.secondaryList,
		listHash: state.warReducer.listHash,
	  	demoState: state.appReducer.demoState,
	  	primaryProfile: state.warReducer.primaryProfile,
	  	secondaryProfile: state.warReducer.secondaryProfile,
	  	matchState: state.warReducer.matchState,
	  	matchHash: state.warReducer.matchHash
    };
};

export const MatchContainer = connect(mapStateToProps, { setDemoState, openContents, setMatchState })(Match);
