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
import Radar from 'react-d3-radar';

import { openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes, apiOpts } from './../common/constants';
import { BarChart } from './../stats/BarChart';
import { sanitizeString } from './../war/utils';
import { useApi } from './../app/useApi';
import { statCategories } from './constants';
import './stats.css';

export const ForceCard = props => {
	const {
		// Root
		config,
		sendMsg,
		fetchAt,

		// Parent
		key,
		style,
		force,
		profile,
		handleFetch,

		// Redux
		data,
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

	// const forcePolarApi = useApi('/api/dynamic/forcePolar/', 'GET', apiOpts, handleFetch);

	/*
	useEffect(() => {
		if (force && force.id) {
			forcePolarApi.refresh(force.id);
		}
	}, [force && force.id]);
	*/

	const isEngaged = useMemo(() => primaryList !== null, [listHash]);

	// Fetch Data
	const polarConfig = useMemo(() => {
		const retSize = style ? style.width * 0.4 : 250;
		return {
			height: retSize,
			width: retSize
		};
	}, [style]);

	console.log('Current profile: ', profile);

	return (
		<Card className={'force-card' + (data ? '' : ' empty')} style={style}>
			{data &&
				profile && [
					<div key={'fcheader'} className="fc-header-container">
						<CircularChart type={ChartTypes.}height={120} width={120} data={primaryList} />
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
									const stemName = sanitizeString(unit.name);
									let stat = profile.stats.find(statBlock => statBlock.name === stemName) || {};

									// A lot of units have an "s", like "Space Marines" need "space_marine" - no "s"
									if (!Object.entries(stat).length && stemName.endsWith('s')) {
										stat =
											profile.stats.find(statBlock => stemName.startsWith(statBlock.name)) || {};
									}
									console.log('got stat: ', stemName, stat);
									// if (!stat) return null;

									return (
										<Table.Row>
											<Table.Cell>
												<strong>{unit.name}</strong>
											</Table.Cell>
											<Table.Cell>{stat.move || '-'}</Table.Cell>
											<Table.Cell>{stat.weapons || '-'}</Table.Cell>
											<Table.Cell>{stat.ballistics || '-'}</Table.Cell>
											<Table.Cell>{stat.strength || '-'}</Table.Cell>
											<Table.Cell>{stat.toughness || '-'}</Table.Cell>
											<Table.Cell>{stat.wounds || '-'}</Table.Cell>
											<Table.Cell>{stat.attacks || '-'}</Table.Cell>
											<Table.Cell>{stat.leadership || '-'}</Table.Cell>
											<Table.Cell>{stat.save || '-'}</Table.Cell>
										</Table.Row>
									);
								})}
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
						</Table>
					</div>
				]}
		</Card>
	);
};

export const mapStateToProps = (state, props) => {
	return {
		primaryList: state.warReducer.primaryList,
		listHash: state.warReducer.listHash,
		prematchData: state.warReducer.prematchData
	};
};

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents })(ForceCard);
