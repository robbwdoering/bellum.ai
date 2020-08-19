/**
 * FILENAME: dashboard.js
 *
 * DESCRIPTION: This is the component rendered at the top of the visible tree, just below App.
 * Contains hooks for the sidebar, header bar / menu, heads up status, and main content.
 *
 * OWNER: RWD
 */

// React + Redux
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Grid, Form, Header, Label, Input, Icon, Loading, Menu, Sidebar, Step } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Pane from "./../common/pane";
import { FormBody } from './../common/formCommon';

// Custom
// import './dashboard.css';
// TODO for profile form, ask "how many people do you come in contact with inside at work? Outside? What percentage are wearing masks?"

export const Calculator = props => {
	const { config, key, name, sendMsg, fetchAt } = props;

	return (
		<Form>
			<Grid>
				<Grid.Row>
					<Grid.Column>
					</Grid.Column>

					<Grid.Column>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
					</Grid.Column>

				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
					</Grid.Column>

				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
					</Grid.Column>

				</Grid.Row>
			</Grid>
		</Form>
	);
};

export const mapStateToProps = (state, props) => {
	return {
		// curConfidence: state.profileReducer.data.symptomConfidence
	}
}

export default connect(mapStateToProps, {})(Calculator);
