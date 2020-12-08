/**
 * FILENAME: ForceCard.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match.
 */

// React + Redux
import React, { useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Placeholder, Card, Table } from 'semantic-ui-react';

import { setDemoState } from './../app/actions';
import { CircularChartContainer } from './../stats/CircularChart';
import { sanitizeString } from './../war/utils';
import { datasheetFields } from './../war/constants';
import { ChartTypes, getChartConfig } from './constants';
import './stats.css';

export const ForceCard = props => {
	const {
		// Root

		// Parent
		data,
		style,
		profile,

		// Redux
		metalist,
		metalistHash,
		listHash,

		// Dispatched Actions
	} = props;

	const ref = useRef();
	const [unitShowIdx, setShowIdx] = useState(-1); 

	const renderModel = (unit, model, i) => {
		let stemName, stat;
		stemName = sanitizeString(model.unit);
		if (!stemName) {
			return null;	
		}

		// Get the stat block for this name
		stat = profile.stats.find(statBlock => statBlock.name === stemName) || {};

		// A lot of models have an "s", like "Space Marines" need "space_marine" - no "s"
		// So double check for that if we couln't find the first time
		if (!Object.entries(stat).length && (stemName.endsWith('s') || stemName.endsWith('z'))) {
			stat = profile.stats.find(statBlock => stemName.startsWith(statBlock.name)) || {};
		}

		// Get wound track full health info
		if (unit.wound_track && unit.wound_track.length) {
			const target = sanitizeString(unit.wound_track[0]);
			let woundStat = profile.stats.find(statBlock => statBlock.name === target) || {};
			if (woundStat) {
				Object.assign(stat, Object.keys(woundStat).reduce((acc, key) => {
					if (woundStat[key] && woundStat[key] !== -1 && key !== "name") {
						acc[key] = woundStat[key];
					}
					return acc;
				}, {}));
			}
		}

		// Built return statement of cells
		return [
			stat,
			<Table.Row className={"subrow" + (i ? "" : " first") + (i === unit.models.length - 1 ? " last" : "")}>
				<Table.Cell> {model.quantity > 1 && (model.quantity + "x ")}<strong>{model.name}</strong> </Table.Cell>
				{datasheetFields.map(field => <Table.Cell>{stat[field] || '-'}</Table.Cell>)}
			</Table.Row>
		];
	};

	// Renders the table contents for one unit - the unit itself, then the sub rows which represent the individual models
	const renderUnit = (unit, i) => {

		// Render all the models in this unit, and store the stats of the one with the least leadership
		const { stat, modelRows } = unit.models ? unit.models.reduce((acc, m, j) => {
			let ret = renderModel(unit, m, j);

			if (ret && ret.length === 2) {
				// console.log("handling models", ret)
				if (ret[0].leadership < acc.stat.leadership) {
					acc.stat = ret[0];
				}
				acc.modelRows.push(ret[1]);
			}

			return acc;
		}, {stat: {leadership: 100}, modelRows: [] }) : // init val
		{stat: {}, modelRows: []}; // def val

		// console.log("[render unit]", stat);

		return [
			<Table.Row onClick={() => setShowIdx(unitShowIdx === i ? -1 : i)}>
				<Table.Cell> <strong>{unit.name}</strong> </Table.Cell>
				{datasheetFields.map(field => ( <Table.Cell> {stat[field] || '-'} </Table.Cell> ))}
			</Table.Row>
		].concat(unitShowIdx === i ? modelRows : null);
	};

	const renderAllUnits = () => (
		(data && data.units) ? data.units.reduce((acc, e, i) => acc.concat(renderUnit(e, i)), []) : []
	);

	const calcPolarConfig = () => {
		return !header ? {} : {
			height: 120,
			width: 120,
			data: {
				variables: getChartConfig(ChartTypes.SummaryRadar).variables,
				sets: [{
					key: 1,
					label: 'Force Scores',
					values: {
						shoot: header.shoot,
						fight: header.fight,
						control: header.control,
						resil: header.resil 
					}
				}]
			}
		};
	}

	// LIFECYCLE


	// Get the metalist entry for this list
	const header = useMemo(() => data && metalist && metalist.find(e => e.id === data.id), [data && data.id, metalistHash]);

	// Fetch data and size for the chart
	const polarConfig = useMemo(calcPolarConfig, [style, listHash]);

	// Populate the table
	const unitRows = useMemo(renderAllUnits, [listHash, unitShowIdx] );

	/*
	const unitRowsTransitions = useTransition(unitRows, null, {
		from: { transform: 'translate3d(0,-40px,0)' },
		enter: { transform: 'translate3d(0,0px,0)' },
		leave: { transform: 'translate3d(0,-40px,0)' },
	});
	console.log("render", unitRows, unitRowsTransitions);
	*/


	return (
		<Card ref={ref} className={'force-card' + (data ? '' : ' empty')} style={style}>
			{data &&
				(profile && profile.stats.find) && [
					<div key={'fcheader'} className="fc-header-container">
						<CircularChartContainer type={ChartTypes.SummaryRadar} {...polarConfig} />
					</div>,
					<div key={'fctable'} className="fc-table-container">
						<Table sortable basic="very" style={{ width: '100%' }}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>UNIT</Table.HeaderCell>
									<Table.HeaderCell>M</Table.HeaderCell>
									<Table.HeaderCell>WS</Table.HeaderCell>
									<Table.HeaderCell>BS</Table.HeaderCell>
									<Table.HeaderCell>S</Table.HeaderCell>
									<Table.HeaderCell>T</Table.HeaderCell>
									<Table.HeaderCell>W</Table.HeaderCell>
									<Table.HeaderCell>A</Table.HeaderCell>
									<Table.HeaderCell>LD</Table.HeaderCell>
									<Table.HeaderCell>SV</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{/*unitRowsTransitions.map(({ unitRow, key, props }) => <animated.tr key={key} style={props}> {unitRow} </animated.tr>)*/}
								{unitRows}
							</Table.Body>
						</Table>
						{(!data.units || !data.units.length) && [
							<Table.Row key={1}>
								<Placeholder>
									<Placeholder.Line />
								</Placeholder>
							</Table.Row>,
							<Table.Row key={2}>
								<Placeholder>
									<Placeholder.Line />
								</Placeholder>
							</Table.Row>,
							<Table.Row key={3}>
								<Placeholder>
									<Placeholder.Line />
								</Placeholder>
							</Table.Row>
						]}
					</div>
				]}
		</Card>
	);
};

export const mapStateToProps = (state, props) => {
	return {
		metalist: state.warReducer.metalist,
		metalistHash: state.warReducer.metalistHash,
		listHash: state.warReducer.listHash,
	};
};

export const ForceCardContainer = connect(mapStateToProps, { setDemoState })(ForceCard);
