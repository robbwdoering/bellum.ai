/**
 * FILENAME: Match.js
 *
 * DESCRIPTION: The main content for an ongoing match.
 */

import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Dropdown, Popup, Divider, Checkbox, Modal, Tab, Table, Input, Icon, Menu } from 'semantic-ui-react';
import PropagateLoader from "react-spinners/PropagateLoader"

import { openContents, setDemoState } from './../app/actions';
import { ContentTypes } from './../common/constants';
import { phases, mapSizeOptions, terrainOptions, objectiveOptions, missionOptions } from './../war/constants';
import { ForceCardContainer } from './../stats/ForceCard';
import { setMatchState, setBoardState, updateUnit } from './../war/actions';
import { sanitizeString } from './../war/utils';
import './contents.css';

export const Match = props => {
	const {
		// Root 
		handleFetch,

		// Parent

		// Redux
		primaryList,
		secondaryList,
		listHash,
		primaryProfile,
		secondaryProfile,
		matchState,
		matchHash,
		messages,

		boardState,
		boardHash,

		// Dispatched Actions
		openContents,
		setMatchState,
		updateUnit,
		setBoardState
	} = props;

	const [ phaseMask, setPhaseMask ] = useState(matchState.phase);
	const [ turnMask, setTurnMask ]  = useState(matchState.turn);
	const [ turnAccordionArr, setTurnAccordionArr ]  = useState([false, false, false, false, false, false]);
	const [ modalContent, setModalContent ]  = useState(false);
	const [ activeTab, setActiveTab ]  = useState(0);

	const handleCpChange = (e, { val, playeridx }) => {
		let newCount = [...matchState.cpCount];

		newCount[playeridx] += val;  // add -1 for a decrement

		setMatchState({
			cpCount: newCount 
		});
	}

	const handleVpChange = (e, { playeridx, objidx, value }) => {
		let newCount = [...matchState.vpCount];

		newCount[playeridx + 1][objidx] = value; 

		setMatchState({
			vpCount: newCount 
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

	const handleObjectiveSelection = (e, { playeridx, objidx, value }) => {
		let newObjectives = [...matchState.objectives];

		newObjectives[playeridx + 1][objidx] = value; 

		setMatchState({
			objectives: newObjectives
		});
	};

	const handleUnitDoneToggle = (e, { idx }) => {
		const playerIdx = matchState.activePlayer;
		const oldVal = boardState.units[playerIdx][idx];
		updateUnit(playerIdx, idx, { acted: !oldVal.acted });
	};

	const renderObjectiveDropdown = (playeridx, objidx) => (
		<Dropdown
			onChange={handleObjectiveSelection}
			defaultValue={matchState.objectives[playeridx + 1][objidx]}
			placeholder={`Secondary ${objidx+1}...`}
			options={objectiveOptions}
			playeridx={playeridx}
			objidx={objidx}
			selection
			floating
			button
			search
		/>
	);

	const renderMoveCard = ([unit, i]) => {
		const hasActed = boardState.units[matchState.activePlayer][i].acted;
		return (
			<Card key={i} className={"move-card" + (hasActed ? " dimmed" : "" )}>
				<Card.Header>
					<Checkbox idx={i} onChange={handleUnitDoneToggle} defaultChecked={hasActed} />
					<span className="unit-name"> {unit.name}: </span>
					{unit.models[0].getStat(profile, unit, boardState, matchState.activePlayer, i, 0).move}"
				</Card.Header>
			</Card>
		);
	};

	const renderPsykerCard = ([unit, i]) => {
		const hasActed = boardState.units[matchState.activePlayer][i].acted;
		const psykProf = profile.psykers.find(prof => prof.name === sanitizeString(unit.psyker[0]));
		return (
			<Card key={i} className={"psyker-card" + (hasActed ? " dimmed" : "" )}>
				<Card.Header>
					<Checkbox idx={i} onChange={handleUnitDoneToggle} defaultChecked={hasActed} />
					<span className="unit-name"> {unit.name} </span>
					<div className="unit-card-subheader"> Casts: {psykProf.castnum} </div>
				</Card.Header>
				<Card.Content>
					{unit.psychic_power.map(power => {
						// Get the profile for this power
						const powerProf = profile.powers.find(prof => prof.name === sanitizeString(power));
						if (!powerProf) return null;

						// All of the remaining logic will depend on the meaning object...
						// i.e. finding targets if applicable, identifying affect in DPR, disabled unusable powers, etc.
						const options = [];
						return (
							<div className="unit-card-row">
								<Popup content={powerProf.descrition} trigger={power} />
								<Dropdown options={options} />
							</div>
						);
					})}
				</Card.Content>
			</Card>
		);
	};

	const renderShootCard = ([unit, i]) => {
		const hasActed = boardState.units[matchState.activePlayer][i].acted;
		const psykProf = profile.psykers.find(prof => prof.name === sanitizeString(unit.psyker[0]));
		return (
			<Card key={i} className={"shoot-card" + (hasActed ? " dimmed" : "" )}>
				<Card.Header>
					<Checkbox idx={i} onChange={handleUnitDoneToggle} defaultChecked={hasActed} />
					<span className="unit-name"> {unit.name} </span>
					<div className="unit-card-subheader"> Casts: {psykProf.castnum} </div>
				</Card.Header>
				<Card.Content>
					{unit.psychic_power.map(power => {
						// Get the profile for this power
						const powerProf = profile.powers.find(prof => prof.name === sanitizeString(power));
						if (!powerProf) return null;

						// All of the remaining logic will depend on the meaning object...
						// i.e. finding targets if applicable, identifying affect in DPR, disabled unusable powers, etc.
						const options = [];
						return (
							<div className="unit-card-row">
								<Popup content={powerProf.descrition} trigger={power} />
								<Dropdown options={options} />
							</div>
						);
					})}
				</Card.Content>
			</Card>
		);
	};
	const renderPhaseContent = () => {
		const phase = matchState.phase; 
		console.log("rendering phase ", phase, force, profile)

		if(!force) {
			return (
				<div className="loader-container" >
					<div>
						<PropagateLoader loading={true} size={40} color='#e6505d' />
					</div>
					<span> Authenticating... </span>
				</div>
			);
		}

		switch(phase) {
			case 0:
				return (
					<div className="setup-content">
						<div className="setup-option">
							<div> Map Size </div>
		 					<Dropdown
		 						button
			 					defaultValue={0}
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
			 						onChange={(e, { value }) => handleObjectiveSelection(e, {playeridx: -1, objidx: 0, value})}
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
						Spend your command points now.
					</div>
				);
			case 2:
				let moveBuckets = force.units.reduce((acc, unit, i) => {
					// Collect units that have one assault weapon, which means they can advance and still fire 
					// TODO: Other rules with same effect
					const isAssault = unit.wepSome((wepProfile, model) => wepProfile.weapontype.includes("Assault"), profile);
					if (isAssault) {
						acc.assault.push([unit, i])
						return acc;
					} 

					// Collect units that have one heavy weapon, and thus -1 to hit after moving
					// TODO: Rules that allow units to move and shoot
					const isHeavy = unit.wepSome((wepProfile, model) => wepProfile.weapontype.includes("Heavy"), profile);
					if (isHeavy) {
						acc.heavy.push([unit, i])
						return acc;
					} 

					// Else, it's a normal unit
					acc.normal.push([unit, i]);
					return acc;
				}, {assault: [], normal: [], heavy: []});

				console.log("moveBuckets: ", moveBuckets);

				return (
					<div className="movement-content">
						{moveBuckets.assault.length && <div> <h2>Assault Units</h2> <span className="subtext"> Can advance without penalty </span> </div>}
						{moveBuckets.assault.length && moveBuckets.assault.map(renderMoveCard)}
						{moveBuckets.normal.length && <div> <h2>Normal Units</h2> </div>}
						{moveBuckets.normal.length && moveBuckets.normal.map(renderMoveCard)}
						{moveBuckets.heavy.length && <div> <h2>Heavy Units</h2> <span className="subtext"> -1 to hit after moving </span> </div>}
						{moveBuckets.heavy.length && moveBuckets.heavy.map(renderMoveCard)}
					</div>
				);
			case 3:
				let psykers = force.units.reduce((psykers, unit, i) => {
					if (unit.categories.includes("Psyker")) {
						psykers.push([unit, i]);
					}
					return psykers;
				}, []);

				return (
					<div className="psychic-content">
						{psykers.map(renderPsykerCard)}
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
			default:
				return null;
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
		let newBoard = [...boardState];	
		let newMatch = {}; 
		newMatch.phase = matchState.phase + 1; // go the next phase

		switch(matchState.phase) {
			case 0: // Setup
				newMatch.turn = 1;
				newMatch.activePlayer = 0;
				break;
			case 1: // Command
			case 2: // Movement 
			case 3: // Psychic 
			case 4: // Shooting 
			case 5: // Charge 
			case 6: // Fight 
				// Do nothing - add behavior here that needs to be done on phase init for each phase
				break;
			case 7: // Morale 
				newMatch.phase = 1;
				newMatch.turn++;
				if (matchState.turn === 5) {
					setModalContent("Are you sure?", "This will end the game, and is not reversible - be sure you agree on who won!");
				}
				break;
			default:
				console.log("Couldn't advance phase - unknown current phase ", newMatch.phase);
				return null;
		}

		setMatchState(newMatch);

		// Reset the "acted" property of every unit
		newBoard.units.forEach(unitArr => unitArr.forEach(unit => delete unit.acted));
		setBoardState(newBoard);
	};

	const renderPhaseControl = () => {
		let ret = [];
		for (let i = 0; i < 6; i++) {
			for (let k = 0; k < 2; k++) {
				if (i === 0 && k === 1) continue; // There should only be one setup round
				// Add headers for every Round+Turn combo
				ret.push(
					<Menu.Item
						as="div"
						key={i+"-"+k}
						turn={i}
						className="turn-header"
					>
						{i ? `ROUND ${i}-${k}` : 'SETUP'}
					</Menu.Item>
				);

				if (i) {
					ret = ret.concat(phases.map((phase, j) => j ? (
						<Menu.Item
							as="div"
							key={i + "-" + j + "-" + k}
							player={k}
							turn={i}
							phase={j}
							className={`${(matchState.turn === i && matchState.activePlayer === k && matchState.phase === j) ? (k ? 'secondary active' : 'primary active') : ''}`}
						>
							{phases[j].toUpperCase()}
						</Menu.Item>
					) : null));
				}
			}
		}

		return ret;
	};

	const renderObjectiveVpBox = (playeridx, objidx) => (
		<Popup
			content={matchState.objectives[playeridx + 1][playeridx === -1 ? 0 : objidx]}
			trigger={
				<Input
					defaultValue={matchState.vpCount[playeridx + 1][objidx]}
					labelPosition={playeridx ? "right" : undefined}
					playeridx={playeridx}
					objidx={objidx}
					onChange={handleVpChange}
					className="inline-input"
				/> 
		}
		/>
	);

	const renderMatchStatus = () => {
		if (!matchState || !matchState.vpCount.length) {
			return null;
		}
		
		// Get each player's current point total
		let totals = [
			matchState.vpCount[1].reduce((acc, e) => acc + parseInt(e), 0) + parseInt(matchState.vpCount[0][0]),
			matchState.vpCount[2].reduce((acc, e) => acc + parseInt(e), 0) + parseInt(matchState.vpCount[0][1]),
		];

		return (
			<Grid doubling>
				<Grid.Row>
					{/* Victory Points */}
					<Grid.Column width={6} className="point-summary">
						<span className={`total-primary ${totals[0] > totals[1] ? "active" : ""}`}> {isNaN(totals[0]) ? 0 : totals[0]} </span> /
						<span className={`total-secondary ${totals[1] > totals[0] ? "active" : ""}`}> {isNaN(totals[1]) ? 0 : totals[1]} </span>
						<span className="under-title">VICTORY POINTS</span>
					</Grid.Column>

					<Grid.Column width={10} className="objective-controls">
						<div className="top">
							{renderObjectiveVpBox(-1, 0)}
							{renderObjectiveVpBox(0, 0)}
							{renderObjectiveVpBox(0, 1)}
							{renderObjectiveVpBox(0, 2)}
						</div>
						<div className="bottom">
							{renderObjectiveVpBox(-1, 1)}
							{renderObjectiveVpBox(1, 0)}
							{renderObjectiveVpBox(1, 1)}
							{renderObjectiveVpBox(1, 2)}
						</div>
					</Grid.Column>
				</Grid.Row>

				{/* Victory Points */}
				<Grid.Row>
					<Grid.Column width={6} className="point-summary">
						<Button.Group vertical size="tiny" className="increment-control">
							<Button icon val={1} playeridx={0} onClick={handleCpChange}> <Icon name="plus" /> </Button>
							<Button icon val={-1} playeridx={0} onClick={handleCpChange}> <Icon name="minus" /> </Button>
						</Button.Group>

						{/* values */}
						<span className='total-primary'> {isNaN(matchState.cpCount[0]) ? 0 : matchState.cpCount[0]} </span> /
						<span className='total-secondary'> {isNaN(matchState.cpCount[1]) ? 0 : matchState.cpCount[1]} </span>

						<Button.Group vertical size="tiny" className="increment-control secondary">
							<Button icon val={1} playeridx={1} onClick={handleCpChange}> <Icon name="plus" /> </Button>
							<Button icon val={-1} playeridx={1} onClick={handleCpChange}> <Icon name="minus" /> </Button>
						</Button.Group>
						<span className="under-title"> COMMAND POINTS</span>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<span className="neu-table-title"> MESSAGES </span>
					<Table className="neu">
						<Table.Body>
							{matchState.activePlayer >= 0 && messages[matchState.activePlayer].map((msg, i) => (
								<Table.Row key={"msg"+i}>
								</Table.Row>
							))}
						</Table.Body>	
					</Table>
					{(matchState.activePlayer < 0 || !messages[matchState.activePlayer]) && (
						<div className="table-empty-message">
							Warnings and alerts will appear here when identified.
						</div>
					)}
				</Grid.Row>
			</Grid>
		);
	};

	// End this match and display the postmatch screen
	const endMatch = () => {
		setModalContent([]);
		openContents(ContentTypes.PostMatch);
	};

	// --------------------
	// FUNCTIONAL LIFECYCLE
	// --------------------

	const force = useMemo(() => matchState.activePlayer ? secondaryList : primaryList, [matchHash, listHash]);
	const profile = useMemo(() => matchState.activePlayer ? secondaryProfile : primaryProfile, [matchHash, listHash]);
	const content = useMemo(renderPhaseContent, [ matchState.phase, matchHash, listHash, boardHash ]);
	const phaseControlArray = useMemo(renderPhaseControl, [ matchState.phase, matchHash, turnAccordionArr ]);
	const tabPanes = useMemo(() => ([
		{
			menuItem: (
				<Menu.Item key={0} as="div" className="tab-menu-item inline">
					<Icon size="large" name="balance scale"/>
					<span> Match Status </span>
				</Menu.Item>
			),
			render: renderMatchStatus
		},
		{
			menuItem: (
				<Menu.Item key={1} as="div" className="tab-menu-item inline">
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
				<Menu.Item key={2} as="div" className="tab-menu-item inline secondary">
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

	// console.log("Rendering match", primaryList, matchState);
	return (
		<React.Fragment>
			<div className="top-right-container">
				<Button className="primaryButton" onClick={advancePhase} > Finish {phases[matchState.phase]} Phase </Button>
			</div>

			<Menu vertical className="phase-control">
				{phaseControlArray}
			</Menu>

			<div className="match-phase-content">
				{content}
			</div>

			{matchState.turn > 0 && (
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
			)}


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
	  	matchHash: state.warReducer.matchHash,
	  	messages: state.warReducer.messages,
	  	boardState: state.warReducer.boardState,
	  	boardHash: state.warReducer.boardHash
    };
};

export const MatchContainer = connect(mapStateToProps, { setDemoState, openContents, setMatchState, updateUnit, setBoardState })(Match);
