/**
 * FILENAME: CircularChart.js
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


export const CircularChart = props => {
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

	const [currentChart, setCurrentChart] = useState();

	return (
		<div ref={ref} className="circular-chart-container">
			{currentChart === "radar" && (
				<Radar
					width={height}
					height={width}
					padding={15}
					domainMax={100}
					highlighted={null}
					onHover={point => {
						if (point) {
							console.log('hovered over a data point');
						} else {
							console.log('not over anything');
						}
					}}
					data={{
						variables: [
							{ key: 'shoot', label: "" },
							{ key: 'fight', label: '' },
							{ key: 'control', label: '' },
							{ key: 'resil', label: '' }
						],
						sets: [
							{
								key: 1,
								label: 'Force Scores',
								values: {
									shoot: 40,
									fight: 60,
									control: 30,
									resil: 70
								}
							}
						]
					}}
				/>
			)}
		</div>
	);
}

export const mapStateToProps = (state, props) => {
  return {
		primaryList: state.warReducer.primaryList,
		listHash: state.warReducer.listHash,
	  	prematchData: state.warReducer.prematchData,
    };
};

export const CircularChartContainer = connect(mapStateToProps, { setDemoState, openContents })(CircularChart);
