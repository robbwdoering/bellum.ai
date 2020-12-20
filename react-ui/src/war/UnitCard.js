/**
 * FILENAME: UnitCard.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match. 
 */

// React + Redux
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { Accordion, Placeholder, Card, Button, Popup, Grid, Step, Dropdown, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';
import { select } from 'd3-selection';
import { max, min } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { curveMonotoneX } from 'd3-shape';
import * as d3 from "d3";
import * as gaussian from "gaussian";

import { openContents, setDemoState } from './../app/actions';
import { ContentTypes } from './../common/constants';
import { BarChart } from './../stats/BarChart';
import { statCategories, ChartTypes, getChartConfig } from './constants';
import './stats.css';

const margin = { top: 10, right: 10, bottom: 40, left: 10 };
const color = ['#f05440', '#d5433d', '#b33535', '#283250'];

export const UnitCard = props => {
	const {
		// Root 
		config,

		// Parent
		unitIdx,
		playerIdx,
		
		height,
		width,
		chartName,

		// Redux
		chartData,
		chartHash,
		parentHash,

		// Dispatched Actions
	} = props;

	const ref = useRef(); 

	if (!data || (!data[0] && !data[1])) {
		return (
			<Card className="chart-card">
				<Placeholder>
					<Placeholder.Header image>
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Header>
				</Placeholder>
			</Card>
		)
	}

	return (
		<Card className="chart-card">
			{constConfig.title && (
				<Card.Header>
					<h3>{constConfig.title}</h3>
					{constConfig.tooltip && <Popup content={constConfig.tooltip} trigger={<Icon name="info" />} />}
				</Card.Header>
			)}

			<Card.Content>
				<svg
					className="main-chart-container"
					width={config.width + margin.left + margin.right}
					height={config.height + margin.top + margin.bottom}
					role="img"
					ref={ref}
				/>

				{infoItems && infoItems.length && (infoItems[0] || infoItems[1]) && (
					<div className="chart-card-item-container">
						{infoItems}
					</div>
				)}
			</Card.Content>
 		</Card>
	);
}

export const mapStateToProps = (state, props) => {
	return {
		chartData: state.warReducer.chartData,
		chartHash: state.warReducer.chartHash
	};
};

export const UnitCardContainer = connect(mapStateToProps, { })(UnitCard);
