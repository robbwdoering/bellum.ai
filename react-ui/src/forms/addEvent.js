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
import { Button, Dropdown, Grid, Header, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as consts from './constants';
import { FormBody } from './formCommon';

// Custom
// import './dashboard.css';

export const AddEventForm = ({ }) => {
	const [type, setType] = useState('');
	const [date, setDate] = useState(0);
	const [data, setData] = useState({
		testType: "",
	});

	const rowData = [
		{
			label: 'Event Type',
			name: 'type',
			value: type,
			type: 'dropdown',
			options: consts.eventTypeOptions,
			callback: setType,
			length: 'short'
		},
		{
			label: 'Date',
			name: 'date',
			value: date,
			type: 'date',
			callback: setDate,
			length: 'short'
		},
		{
			label: 'Test Type',
			name: 'testType',
			value: data.testType,
			type: 'dropdown',
			options: consts.eventTestSubtypeOptions,
			hidden: type !== "test",
			callback: val => setData(Object.assign({}, data, { testType: val })),
			length: 'short'
		}
	];

    return (
    	<Grid>
    		<Grid.Row>
	    		<Grid.Column floated='left' textAlign='left'>
	    			<Header>
	    				What happened?
	    			</Header>
	    		</Grid.Column>
    		</Grid.Row>

    		<FormBody data={rowData} />
    	</Grid>
	);
}
