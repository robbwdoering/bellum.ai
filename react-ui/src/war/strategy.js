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
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Grid, Form, Placeholder, Header, Table, Label, Input, Icon, Loading, Menu, Sidebar, Step } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Pane from "./../common/pane";
import { FormBody } from './../common/formCommon';

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
		profiles

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
		<Pane key={key} className="myt-unit-deck" header name={name} config={config}>
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
 		</Pane>
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

	const primaryOptions = useMemo(filterPrimaryList, [listHash])
	const secondaryOptions = useMemo(filterSecondaryList, [listHash])

	const isEngaged = useMemo(() => primaryList !== null && secondaryList !== null, [listHash])
	// const unitList = useMemo(parseUnitList, [listHash]);

 	return (
		<Pane key={key} className="myt-army-details" header name={name} config={config}>
	 		<Grid>
	 			<Grid.Row>
	 				<Menu>
		 				<Menu.Item position="left">
		 					<Dropdown 
		 						options={primaryOptions}
		 						selection
		 						search
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
		 						options={secondaryOptions}
		 						selection
		 						search
		 						name="secondary"
		 						value={secondaryList ? secondaryList.name : undefined}
		 						disabled={primaryList === null}
		 						onChange={handleArmySelection}
		 					/>
		 				</Menu.Item>
	 				</Menu>
	 			</Grid.Row>

	 			<Grid.Row>
	 				{(primaryList ? (
		 				<Table>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell> Unit </Table.HeaderCell>
									{isEngaged && (
										<React.Fragment>
											<Table.HeaderCell>  </Table.HeaderCell>
											<Table.HeaderCell> Factions </Table.HeaderCell>
											<Table.HeaderCell> Rating </Table.HeaderCell>
										</React.Fragment>
									)}
								</Table.Row>
							</Table.Header>

							<Table.Body>
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
	 			</Grid.Row>
	 		</Grid>
 		</Pane>
 	);
};

export const mapStateToProps = (state, props) => {
	return {
		metalist: state.warReducer.metalist,
		metalistHash: state.warReducer.metalistHash,
		primaryList: state.warReducer.primaryList,
		secondaryList: state.warReducer.secondaryList,
		listHash: state.warReducer.listHash,
		profiles: state.warReducer.profiles
		// curConfidence: state.profileReducer.data.symptomConfidence
	}
};

export const ArmyDetails = connect(mapStateToProps, { })(ArmyDetailsComponent);
export const UnitDeck = connect(mapStateToProps, { })(UnitDeckComponent);
