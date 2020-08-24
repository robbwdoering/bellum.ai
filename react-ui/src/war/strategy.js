/**
 * FILENAME: strategy.js
 *
 * DESCRIPTION: Contains UX for the general strategic overview screen. Features:
 * 		TODO list of cards, each of which is a unit...	
 * 		TODO controls to enter "battle" mode, which turn on turn counter and highlights
 * 		TODO detailed army stats	
 * 		TODO projected deficiencies (i.e. You wouldn't be able to kill a dreadnaught, or you what have you)
 * 		TODO 	
 *
 * OWNER: RWD
 */

// React + Redux
import React, { useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Grid, Form, Placeholder, Header, Table, Label, Input, Icon, Loading, Menu, Sidebar, Step } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FormBody } from './../common/formCommon';

import "./war.css";

export const UnitDeckComponent = props => {
	const {
		// Root 
		config,
		sendMsg,
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
		alerts

		// Dispatched Actions
	} = props;

	const [collapse, setCollapse] = useState(true);

	const parseUnitList = () => {
		if (primaryList === null) return [];

		return primaryList.detachments.reduce((acc, detach, i) => {
			console.log("doing detachment ", detach.type, detach.faction)
			detach.units.forEach(unit => {
				acc.push(unit);
			});

			return acc;
		}, []);
	};

	const isEngaged = useMemo(() => primaryList !== null && secondaryList !== null, [listHash])

	const unitList = useMemo(parseUnitList, [listHash]);
	console.log('rendering with unit list: ', unitList);

 	return (
		<div className="myt-unit-deck">
			{(primaryList ? (
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell  />
							<Table.HeaderCell> Unit Name </Table.HeaderCell>
							{isEngaged && (
								<React.Fragment>
									<Table.HeaderCell> Max DPR </Table.HeaderCell>
									<Table.HeaderCell> Avg DPR </Table.HeaderCell>
									<Table.HeaderCell> Max DPS </Table.HeaderCell>
									<Table.HeaderCell> Max DPF </Table.HeaderCell>
									<Table.HeaderCell> Max WPR </Table.HeaderCell>
								</React.Fragment>
							)}
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{unitList && unitList.map((e, i) => (
							<Table.Row key={i} >
								<Table.Cell> <Button icon="arrow alternate circle left outline" onClick={() => console.log("Exporting unit stub...", e, i)} /> </Table.Cell>
								<Table.Cell> {e.name} </Table.Cell>

								{isEngaged && (
									<React.Fragment>
										<Table.Cell> {e.maxDPR || ""} </Table.Cell>
										<Table.Cell> {e.avgDPR || ""} </Table.Cell>
										<Table.Cell> {e.maxDPS || ""} </Table.Cell>
										<Table.Cell> {e.maxDPF || ""} </Table.Cell>
										<Table.Cell> {e.maxWPR || ""} </Table.Cell>
									</React.Fragment>
								)}
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			) : (
				<Placeholder>
					<Placeholder.Paragraph>
						<Placeholder.Line length="long" />
						<Placeholder.Line length="medium" />
						<Placeholder.Line length="medium" />
						<Placeholder.Line length="medium" />
					</Placeholder.Paragraph>
				</Placeholder>
			))}
 		</div>
 	);
};

export const ArmyDetailsComponent = props => {
	const {
		// Root 
		config,
		sendMsg,
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
		profiles

		// Dispatched Actions
	} = props;

	const filterPrimaryList = () => {
		return metalist.map(e => ({ text: e.name, value: e.name }));
	};

	const filterSecondaryList = () => {
		if (!primaryList) {
			return [];
		}

		const item = metalist.find(e => e.name === primaryList.name);
		console.log("filtering second list", metalist, item, primaryList); 
		return metalist.filter(e => (e.name !== primaryList.name) && (e.points > item.points - 100) && (e.points < item.points + 100)).map(e => ({ text: e.name, value: e.name }));
	};

	const handleArmySelection = (e, { name, value }) => {
		const item = metalist.find(e => e.name === value);
		if (item) {
			sendMsg(`/api/db/war/list/${name === "primary" ? "true" : "false"}/${item.id}`, 'GET');
		} else {
			console.error("Couldn't find item", value);
		}
	};

	// Army details: 
	// damage per turn avg
	// Chart Ideas:
		// Damage by category
		// Wounds by category


	const genDetails = isPrimary => (
		<Grid>
			<Grid.Row>
				{/* Percentiles */}
				<Grid.Column>
					<span> </span>
				</Grid.Column>

				{/* Best Unit in each role */}
				<Grid.Column>
					<strong> Best Anti-Tank </strong>
					<strong> Best Anti-Troop </strong>
					<strong> Best Overall </strong>
				</Grid.Column>

				{/* Alerts */}
				<Grid.Column>
					{alerts}
				</Grid.Column>
				
			</Grid.Row>

			<Grid.Row>
			</Grid.Row>

		</Grid>
	);

	const primaryOptions = useMemo(filterPrimaryList, [listHash])
	const secondaryOptions = useMemo(filterSecondaryList, [listHash])

	const isEngaged = useMemo(() => primaryList !== null && secondaryList !== null, [listHash])
	// const unitList = useMemo(parseUnitList, [listHash]);

 	return (
		<div className="myt-army-details">
 				<Menu className="myt-ad-top-menu">
	 				<Menu.Item position="left">
	 					<Dropdown
	 						button
	 						options={primaryOptions}
	 						selection
	 						search
	 						floating
	 						name="primary"
	 						value={primaryList ? primaryList.name : undefined}
	 						onChange={handleArmySelection}
	 					/>
	 				</Menu.Item>

	 				<Menu.Item as="h2" className={"ud-splitter" + (isEngaged ? "" : " disabled")}>
	 					Vs
	 				</Menu.Item>

	 				<Menu.Item position="right">
	 					<Dropdown 
	 						button
	 						options={secondaryOptions}
	 						selection
	 						search
	 						floating
	 						name="secondary"
	 						value={secondaryList ? secondaryList.name : undefined}
	 						disabled={primaryList === null}
	 						onChange={handleArmySelection}
	 					/>
	 				</Menu.Item>
 				</Menu>

	 			{isEngaged ? (
 					<div className="army-details-lhs-container"> {genDetails(true)} </div>
 					<div className="army-details-rhs-container"> {genDetails(false)} </div>
 				) : (
 					genDetails(true);
 				)}
	 			<Grid.Row>
	 			</Grid.Row>
	 		</Grid>
 		</div>
 	);
};

export const ProfileEditor = props => {
	const {
		// Root 
		config,
		sendMsg,
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
		unsetProfiles,

		// Dispatched Actions
	} = props;

	const [mode, setMode] = useState("weapon");

	useEffect(() => {
		sendMsg("/api/war/profiles/"+mode+"/unset", "GET");
	}, [mode]);

	const isEngaged = useMemo(() => primaryList !== null && secondaryList !== null, [listHash])
	// const unitList = useMemo(parseUnitList, [listHash]);

 	return (
		<div key={key} className="myt-army-details">
	 		<Grid>
	 			<Grid.Row>
	 				<Menu>
		 				<Menu.Item>
		 					<Button.Group>
		 						<Button onClick={() => setMode('weapon')}> Weapons </Button>
		 					</Button.Group>
		 					<Button.Group>
		 						<Button onClick={() => setMode('power')}> Powers </Button>
		 					</Button.Group>
		 					<Button.Group>
		 						<Button onClick={() => setMode('desc')}> Rules </Button>
		 					</Button.Group>
		 				</Menu.Item>


				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell> Name </Table.HeaderCell>
							<Table.HeaderCell> Text </Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{unsetProfiles[mode] && unsetProfiles[mode].map((e, i) => (
							<Table.Row key={i} >
								<Table.Cell> {e.name} </Table.Cell>
								<Table.Cell> {e.text} </Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>

	 				</Menu>
	 			</Grid.Row>
	 			<Grid.Row>
		 			<Grid.Column>
		 				<strong> Name: </strong> &nbsp; {unsetProfiles[mode] && unsetProfiles[mode].name}
		 			</Grid.Column>

		 			<Grid.Column>
		 				<strong> Text: </strong> &nbsp; {unsetProfiles[mode] && unsetProfiles[mode].text}
		 			</Grid.Column>
	 			</Grid.Row>

	 			<Grid.Row>
	 			</Grid.Row>
	 		</Grid>
 		</div>
 	);
};

export const mapStateToProps = (state, props) => {
	return {
		metalist: state.warReducer.metalist,
		metalistHash: state.warReducer.metalistHash,
		primaryList: state.warReducer.primaryList,
		secondaryList: state.warReducer.secondaryList,
		listHash: state.warReducer.listHash,
		profiles: state.warReducer.profiles,
		alerts: state.warReducer.alerts
		// curConfidence: state.profileReducer.data.symptomConfidence
	}
};

export const ArmyDetails = connect(mapStateToProps, { })(ArmyDetailsComponent);
export const UnitDeck = connect(mapStateToProps, { })(UnitDeckComponent);
