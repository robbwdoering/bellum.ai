/**
 * FILENAME: CircularChart.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match. 
 */

// React + Redux
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import Radar from 'react-d3-radar';

import { setDemoState } from './../app/actions';
import './stats.css';


// RADAR FORMAT: 
/*
	{variables: [
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
	]}
*/

export const CircularChart = props => {
	const {
		// Root 
		// Parent
		height,
		width,
		defaultValue,
		data,

		// Redux
		chartHash

		// Dispatched Actions
	} = props;

	const ref = useRef(); 

	const [currentChart, setCurrentChart] = useState(defaultValue || "radar");

	console.log('rendering...', chartHash, data);
	return (
		<div ref={ref} hash={chartHash} className="circular-chart-container">
			{currentChart === "radar" && data && (
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
					data={data}
						/*
					}
						*/
				/>
			)}
		</div>
	);
}

export const mapStateToProps = (state, props) => {
  return {};
};

export const CircularChartContainer = connect(mapStateToProps, { setDemoState })(CircularChart);
