/**
 * FILENAME: ChartCard.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match. 
 */

// React + Redux
import React, { useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { Accordion, Placeholder, Card, Button, Grid, Step, Dropdown, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
import { BarChart } from './../stats/BarChart';
import { statCategories } from './constants';
import './stats.css';


export const ChartCard = props => {
	const {
		// Root 
		config,
		sendMsg,
		fetchAt,

		// Parent
		key,
		height,
		width,
		force,

		// Redux
		metalist,
		metalistHash,
		primaryList,
		secondaryList,
		listHash,
		prematchData,

		// Dispatched Actions
		openContents
	} = props;

	const ref = useRef(); 

	return (
		<Card>
			<Placeholder>
				<Placeholder.Header image>
					<Placeholder.Line />
					<Placeholder.Line />
				</Placeholder.Header>
			</Placeholder>
 		</Card>
	);
}

export const mapStateToProps = (state, props) => {
  return {
		primaryList: state.warReducer.primaryList,
		listHash: state.warReducer.listHash,
	  	prematchData: state.warReducer.prematchData,
    };
};

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents })(ChartCard);
