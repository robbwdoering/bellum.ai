/**
 * FILENAME: ForceCard.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match. 
 */

// React + Redux
import React, { useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { Accordion, Placeholder, Card, Button, Table, Grid, Step, Dropdown, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
import { BarChart } from './../stats/BarChart';
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
					<div className="telem-title">
						{statCategories[name].title}	
					</div>
					<div className={`telem-primary${prematchData.isPrimary[name] ? " active" : ""}`}>
						{prematchData.primary[name]}
					</div>
					<div className={`telem-secondary${prematchData.isPrimary[name] ? "" : " active"}`}>
						{prematchData.secondary[name]}
					</div>
				</Accordion.Title>

				<Accordion.Content>
					{statCategories[name].charts.map(chartName => {
						return (
							<BarChart config={chartCfg} name={chartName} />
						);
					})}
				</Accordion.Content>
			</Accordion>
		);
	}

	const isEngaged = useMemo(() => primaryList !== null, [listHash])

	// Fetch Data
	const mainChartConfig = useMemo(() => {
		const retSize = style.width * 0.4;
		return ({
			height: retSize,
			width: retSize
		});
	}, [style]);

	const smallChartConfig = useMemo(() => {
		const retSize = 150;
		return ({
			height: retSize,
			width: retSize
		});
	}, [style]);

	console.log("Current profile: ", profile);

	return (
		<Card className={"force-card" + (data ? "" : " empty")} style={style}>
			{data && profile && (
				<Grid>
					<Grid.Row key="force-card-header">
						<Grid.Column width={6}>
							[mainStatusHere]	
						</Grid.Column>
						<Grid.Column width={10}>
							<Table style={{width: "100%"}}>
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
								{data.units.map(unit => {
									const stat = profile.stats.find(statBlock => statBlock.name === unit.name);
									if (!stat) return null;

									return (
										<Table.Row>
											<Table.Cell>{unit.name}</Table.Cell>
											<Table.Cell>{stat.m || 0}</Table.Cell>
											<Table.Cell>{stat.ws || 0}</Table.Cell>
											<Table.Cell>{stat.bs || 0}</Table.Cell>
											<Table.Cell>{stat.s || 0}</Table.Cell>
											<Table.Cell>{stat.t || 0}</Table.Cell>
											<Table.Cell>{stat.a || 0}</Table.Cell>
											<Table.Cell>{stat.ld || 0}</Table.Cell>
											<Table.Cell>{stat.sv || 0}</Table.Cell>
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
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
					</Grid.Row>
				</Grid>
			)}
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

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents })(ForceCard);
