/**
 * FILENAME: ForceCard.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match.
 */

// React + Redux
import React, { useMemo, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	Accordion,
	Placeholder,
	Card,
	Button,
	Table,
	Grid,
	Step,
	Dropdown,
	Header,
	Tab,
	Input,
	Icon,
	Loading,
	Menu,
	Sidebar
} from 'semantic-ui-react';

import { openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes, apiOpts } from './../common/constants';
import { BarChart } from './../stats/BarChart';
import { CircularChartContainer } from './../stats/CircularChart';
import { sanitizeString } from './../war/utils';
import { datasheetFields } from './../war/constants';
import { useApi } from './../app/useApi';
import { statCategories, ChartTypes, chartConfigs } from './constants';
import './stats.css';

export const ForceCard = props => {
	const {
		// Root
		config,
		sendMsg,
		fetchAt,

		// Parent
		key,
		data,
		style,
		profile,
		handleFetch,

		// Redux
		metalist,
		metalistHash,
		secondaryList,
		listHash,
		prematchData,

		// Dispatched Actions
		openContents
	} = props;

	const ref = useRef();

	const renderStatCat = (name, chartCfg) => {
		return (
			<Accordion>
				<Accordion.Title className="telem-item">
					<div className="telem-title">{statCategories[name].title}</div>
					<div className={`telem-primary${prematchData.isPrimary[name] ? ' active' : ''}`}>
						{prematchData.primary[name]}
					</div>
					<div className={`telem-secondary${prematchData.isPrimary[name] ? '' : ' active'}`}>
						{prematchData.secondary[name]}
					</div>
				</Accordion.Title>

				<Accordion.Content>
					{statCategories[name].charts.map(chartName => {
						return <BarChart config={chartCfg} name={chartName} />;
					})}
				</Accordion.Content>
			</Accordion>
		);
	};

	const header = useMemo(() => metalist && metalist.find(e => e.id === data.id), [data && data.id, metalistHash]);

	// Fetch Data
	const polarConfig = useMemo(() => {
		const retSize = style ? style.width * 0.2 : 250;

		return !header ? {} : {
			height: retSize,
			width: retSize,
			data: {
				variables: chartConfigs[ChartTypes.SummaryRadar],
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
	}, [style, listHash]);

	console.log('Current profile: ', profile);

	return (
		<Card className={'force-card' + (data ? '' : ' empty')} style={style}>
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
							{data.units &&
								data.units.map(unit => {
									// Set the name to use. Prefer the "Unit" field, since this is exactly what its for
									// (i.e. to serve as a map key)
									let stemName = (unit.unit && unit.unit[0]) || unit.name
									stemName = sanitizeString(stemName);
									if (!stemName) {
										return null;	
									}

									// Get the stat block for this name
									let stat = profile.stats.find(statBlock => statBlock.name === stemName) || {};

									// A lot of units have an "s", like "Space Marines" need "space_marine" - no "s"
									// So double check for that
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

									// NOTE: Example of how to get description fields here
									// if (datasheetFields.some(field => !stat[field] || stat[field] === -1 || stat[field] === "*")) {
										// let descItem = profile.desc.find(e => e.name == (sanitizeString(stemName) + "1"));
										// if (descItem && descItem.meaning) {
										// 	stat = Object.assign({}, stat, descItem.meaning);
										// }
									// }

									return (
										<Table.Row>
											<Table.Cell>
												<strong>{unit.name}</strong>
											</Table.Cell>
											{datasheetFields.map(field => (
												<Table.Cell>{stat[field] || '-'}</Table.Cell>
											))}
										</Table.Row>
									);
								})}
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
		prematchData: state.warReducer.prematchData
	};
};

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents })(ForceCard);
