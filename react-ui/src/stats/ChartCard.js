/**
 * FILENAME: ChartCard.js
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
import { computePDF } from './../war/utils';
import { ContentTypes } from './../common/constants';
import { BarChart } from './../stats/BarChart';
import { statCategories, ChartTypes, getChartConfig } from './constants';
import './stats.css';

const margin = { top: 10, right: 10, bottom: 40, left: 10 };
const color = ['#f05440', '#d5433d', '#b33535', '#283250'];

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
		parentHash,

		// Dispatched Actions
	} = props;

	const ref = useRef(); 
	const [initDone, finishInit] = useState(false);
	const [ infoItems, setInfoItems ] = useState([null, null]);

	const translateHistoData = histoData => {
		if (!histoData) return histoData;

		// return histoData && Object.keys(histoData).map(dmgVal => ({ name: parseInt(dmgVal), value: histoData[dmgVal] }))
		let interval = 0.5;
		let lower_bound = 0;
		let mean  = histoData.mean;
		let std = Math.sqrt(histoData.dev);
		let upper_bound = mean + (Math.max(std * 3, 5));

        var n = Math.ceil((upper_bound - lower_bound) / interval)
        var data = [];

        let distribution = gaussian(histoData.mean, histoData.dev);
        // console.log("generated gaussian", distribution, histoData);

        let x_position = lower_bound;
        for (let i = 0; i < n; i++) {
            data.push({
                // y: computePDF(mean, std, x_position),
                y: 1 - distribution.cdf(x_position),
                x: x_position
            })
            x_position += interval
        }

        return (data);
	};

	const renderHistoItems = (dist1, dist2) => {
		return [
			<div className="chart-card-cfg-item">
				<span className="title"> AVERAGE </span>
				{dist1 && <span className="primary"> {Math.floor(dist1.mean)} </span>}
				{(dist1 && dist2) && " / "}
				{dist2 && <span className="secondary"> {Math.floor(dist2.mean)} </span>}
			</div>,
			<div className="chart-card-cfg-item">
				<span className="title"> STD DEV </span>
				{dist1 && <span className="primary"> {Math.floor(Math.sqrt(dist1.dev))} </span>}
				{(dist1 && dist2) && " / "}
				{dist2 && <span className="secondary"> {Math.floor(Math.sqrt(dist2.dev))}  </span>}
			</div>
		];
	}

	const getData = () => {
		let histoData, res, tmpArr;
		// console.log("getting data...", chartName, chartData)
		if (!chartName) {
			// console.log("Exiting early....")
			return null;
		}

		let bucketName = null;
		switch(chartName) {
			case ChartTypes.ShootLightDamage:
				bucketName = 'light';
			case ChartTypes.ShootMedDamage:
				bucketName = bucketName || 'med';
			case ChartTypes.ShootEliteDamage:
				bucketName = bucketName || 'elite';
			case ChartTypes.ShootHeavyDamage:
				bucketName = bucketName || 'heavy';

				// Deal with all the shooting cases here
				tmpArr = [];
				res = chartData.scorecards.map((scorecard, i) => {
					let hasShootData = scorecard && scorecard.shoot && scorecard.shoot.dmgBuckets;

					// Get data in {mean, deviation} form
					histoData = hasShootData ? scorecard.shoot.dmgBuckets.find(bucket => bucket.name === bucketName).dist : null;
					tmpArr.push(histoData); // store mean and variance for tooltips

					// Return the data translated into a PDF array
					return translateHistoData(histoData);
				});

				setInfoItems(renderHistoItems(...tmpArr))

				return res;

			case ChartTypes.FightLightDamage:
				bucketName = 'light';
			case ChartTypes.FightMedDamage:
				bucketName = bucketName || 'med';
			case ChartTypes.FightEliteDamage:
				bucketName = bucketName || 'elite';
			case ChartTypes.FightHeavyDamage:
				bucketName = bucketName || 'heavy';
				
				// Deal with all the fight cases here
				tmpArr = [];
				res = chartData.scorecards.map((scorecard, i) => {
					let hasFightData = scorecard && scorecard.fight && scorecard.fight.dmgBuckets;

					// Get data in {mean, deviation} form
					histoData = hasFightData ? scorecard.fight.dmgBuckets.find(bucket => bucket.name === bucketName).dist : null;
					tmpArr.push(histoData); // store mean and variance for tooltips

					// Return the data translated into a PDF array
					return translateHistoData(histoData);
				});
				setInfoItems(renderHistoItems(...tmpArr))

				return res;

			default:
				return [null, null];
		}
	};

	// console.log("[render chartCart]", chartName, data, chartData, chartHash)

	const genHistogram = (svg) => {
        // scales
        // const dataMax = Math.max(data[0] ? max(data[0], d => d.y) : 0, data[1] ? max(data[1], d => d.y) : 0);
        // const nameMax = Math.max(data[0] ? max(data[0], d => d.x) : 0, data[1] ? max(data[1], d => d.x) : 0);
        // const nameMin = Math.min(data[0] ? min(data[0], d => d.x) : 100, data[1] ? min(data[1], d => d.x) : 100);
        const dataMax = 1;

		// console.log("Executing effect", config, data);

        const xScale = scaleLinear()
	        .domain([0, 50])
	        .range([margin.left, margin.left + config.width]);

        const yScale = scaleLinear()
	        .domain([0, dataMax])
	        .range([margin.top + config.height, margin.top]);

	    const line = d3.line()
	    	.curve(d3.curveBasis)
	    	.x(d => xScale(d.x))
	    	.y(d => yScale(d.y));

        if (!initDone) {
	        // Add X axis
	        svg
			    .append('g')
			    .attr('class', 'x-axis')
			    .attr('transform', `translate(0,${margin.top + config.height})`)
			    .call(axisBottom().scale(xScale).ticks(5).tickSize(10));

		    // Add y axis
		    /*
		    svg
			    .append('g')
			    .attr('class', 'y-axis')
			    .attr('transform', `translate(${margin.left},${margin.top / 2})`)
			    .call(axisLeft(yScale));
		    */

		    finishInit(true);
        } else {
        	// Remove existing lines
		   	svg
		   		.selectAll(".line") 
		    	.remove();
        }

		data.forEach((pdf, i) => {
			if (!pdf) return;
			// console.log("Processing PDF: ", pdf)
		    svg
			    .append('path')
			    // .data(data)
			    .attr('fill', 'none')
			    .attr('stroke', i ? '#3ad0ef' : '#e6505d')
			    .attr('stroke-width', 4)
			    .attr('class', 'line') 
			    .attr('d', line(pdf));
		});

	};

	// Get the data from redux if it's already there
	const data = useMemo(getData, [chartHash, parentHash])

	useEffect(() => {
		if (data && data[0] || data[1] && ref.current && config) {
			let svg = select(ref.current);
			switch (chartName) {
				case ChartTypes.ShootLightDamage:
				case ChartTypes.ShootMedDamage:
				case ChartTypes.ShootEliteDamage:
				case ChartTypes.ShootHeavyDamage:
				case ChartTypes.FightLightDamage:
				case ChartTypes.FightMedDamage:
				case ChartTypes.FightEliteDamage:
				case ChartTypes.FightHeavyDamage:
					genHistogram(svg);
					break;
				default:
					console.log("not sure what chart to display for chart name ", ChartTypes);
			}
		}
	}, [data, config, chartName, parentHash]);

	// Get the static config parameters, like description text
	const constConfig = useMemo(() => getChartConfig(chartName) || {}, [chartName, parentHash, chartHash]);
	// const desc = useMemo(genDescription, [ constConfig, chartHash ])

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

export const ChartCardContainer = connect(mapStateToProps, { })(ChartCard);
