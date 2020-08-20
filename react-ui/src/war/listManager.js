/**
 * FILENAME: listManager.js
 *
 * DESCRIPTION: A widget to allow the entry of new list, and editing of existing ones.
 *
 * OWNER: RWD
 */

// React + Redux
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Grid, Form, Header, Label, Table, TextArea, Input, Icon, Loading, Menu, Sidebar, Step } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Pane from "./../common/pane";
// import { Panes, eventTypeOptions, eventTestSubtypeOptions, eventTypeIconMap, eventSocDistOptions, locationOptions } from './constants';
import { FormBody } from './../common/formCommon';

import { processWarAction } from "./actions";
import { parsePlainText } from "./utils";

import "./war.css";

// Custom
// import './dashboard.css';
// TODO for profile form, ask "how many people do you come in contact with inside at work? Outside? What percentage are wearing masks?"

export const ListManager = props => {
	const {
		// Parent
		config,
		key,
		sendMsg,
		fetchAt,

		// Redux
		metalist,
		metalistHash,

		// Dispatched actions
		processWarAction
	} = props;

	const [listStr, setListStr] = useState("");

	const addList = e => {
		if (listStr && listStr.length) {
			const json = parsePlainText(listStr);

			sendMsg('/api/db/war/list', 'POST', json);
		} else {
			console.error("Cannot add to list - no string to process");
		}
	}
	console.log("Rendering list... ", metalist);

	// Request list on startup
	useEffect(() => sendMsg("/api/db/war/metalist", 'GET', {}), []);

	return (
		<Grid>
			<Form className="list-manager">
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell> List Name </Table.HeaderCell>
							<Table.HeaderCell> Pts </Table.HeaderCell>
							<Table.HeaderCell> Factions </Table.HeaderCell>
							<Table.HeaderCell> Rating </Table.HeaderCell>
							<Table.HeaderCell>  </Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{metalist && metalist.map((e, i) => {
							console.log("Rending list ", e, i)
							return (
							<Table.Row key={i}>
								<Table.Cell> {e.name} </Table.Cell>
								<Table.Cell> {e.points} </Table.Cell>
								<Table.Cell> {e.faction} </Table.Cell>
								<Table.Cell> {e.rating} </Table.Cell>
								<Table.Cell> 
									<Button.Group className="slim-button">
										<Button> Edit </Button>
										<Button> Delete </Button>
										<Button> Use </Button>
									</Button.Group>
								</Table.Cell>
							</Table.Row>
							);

						})}
						<Table.Row>
							<Table.Cell> 
								<TextArea onChange={(e, { value }) => setListStr(value)} placeholder="C/P List here..."/>
							</Table.Cell> 
							<Table.Cell />
							<Table.Cell> 
								<Button icon="plus" disabled={listStr.length==0} onClick={addList}/>
							</Table.Cell> 
						</Table.Row>
					</Table.Body>
				</Table>
			</Form>
		</Grid>
	);
};

export const mapStateToProps = (state, props) => {
	return {
		metalist: state.warReducer.metalist,
		metalistHash: state.warReducer.metalistHash
		// curConfidence: state.profileReducer.data.symptomConfidence
	}
}

export default connect(mapStateToProps, { processWarAction })(ListManager);
