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
import { statCategories, ChartTypes } from './constants';
import './stats.css';


export const ChartCard = props => {
	const {
		// Root 
		config,

		// Parent
		height,
		width,
		chartName,

		// Redux
		chartData,
		chartHash,

		// Dispatched Actions
	} = props;

	const ref = useRef(); 

	const getData = () => {
		if (!chartName) {
			return null;
		}

		switch(chartName) {
			case ChartTypes.ShootLightDmg: 
				return ( chartData && chartData.shoot && chartData.shoot.dmgBuckets) ? chartData.shoot.dmgBuckets.find(bucket => bucket.name === "light").pdf : null;
			case ChartTypes.ShootMedDmg: 
				return ( chartData && chartData.shoot && chartData.shoot.dmgBuckets) ? chartData.shoot.dmgBuckets.find(bucket => bucket.name === "med").pdf : null;
			case ChartTypes.ShootEliteDmg: 
				return ( chartData && chartData.shoot && chartData.shoot.dmgBuckets) ? chartData.shoot.dmgBuckets.find(bucket => bucket.name === "elite").pdf : null;
			case ChartTypes.ShootHeavyDmg: 
				return ( chartData && chartData.shoot && chartData.shoot.dmgBuckets) ? chartData.shoot.dmgBuckets.find(bucket => bucket.name === "heavy").pdf : null;
			default:
				return null;
		}
	};

	const data = useMemo(getData, [chartHash])

	return (
		<Card>
			{data ? (
				"Data populated!"
			): (
					<Placeholder>
						<Placeholder.Header image>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				)
			}
 		</Card>
	);
}

export const mapStateToProps = (state, props) => {
	return {
		chartData: state.warReducer.chartData,
		chartHash: state.warReducer.chartHash
	};
};

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents })(ChartCard);
