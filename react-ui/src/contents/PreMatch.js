/**
 * FILENAME: PreMatch.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match. 
 */

// React + Redux
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Step, Dropdown, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
import { BarChart } from './../stats/BarChart';
import './contents.css';

export const PreMatch = props => {
	const {
		// Root 
		config,
		sendMsg,
		fetchAt,

		// Parent
		key,
		name,
		windowCtx,

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

	const filterPrimaryList = () => {
		return metalist.map(e => ({ text: e.name, value: e.name }));
	};

	const filterSecondaryList = () => {
		if (!primaryList) {
			return [];
		}

		const item = metalist.find(e => e.name === primaryList.name);
		console.log("filtering second list", metalist, item, primaryList); 
		return metalist.filter(e => (e.name !== primaryList.name) && (e.points > item.points - 100) && (e.points < item.points + 100)).map(e => ({ text: e.name, value: e.name }));
	};

	const handleArmySelection = (e, { name, value }) => {
		const item = metalist.find(e => e.name === value);
		if (item) {
			sendMsg(`/api/db/war/list/${name === "primary" ? "true" : "false"}/${item.id}`, 'GET');
		} else {
			console.error("Couldn't find item", value);
		}
	};

	const startMatch = e => {
		openContents(ContentTypes.Match);
	}

	const renderTelemComp = (title, name) => {
		return (
			<div className="telem-item">
				<div className="telem-title">
					{title}	
				</div>
				<div className={`telem-primary${prematchData.isPrimary[name] ? " active" : ""}`}>
					{prematchData.primary[name]}
				</div>
				<div className={`telem-secondary${prematchData.isPrimary[name] ? "" : " active"}`}>
					{prematchData.secondary[name]}
				</div>
			</div>
		);
	}

	const primaryOptions = useMemo(filterPrimaryList, [listHash])
	const secondaryOptions = useMemo(filterSecondaryList, [listHash])
	const isEngaged = useMemo(() => primaryList !== null && secondaryList !== null, [listHash])
	const height = useMemo(() => windowCtx ? ((((windowCtx.clientHeight * 0.95) / 2) - 100) + "px"): "80%", [ windowCtx && windowCtx.clientHeight]);

	return (
		<React.Fragment>
			<div className="horiz-button-container">
				<Button className="primaryButton" disabled={!isEngaged} onClick={startMatch} > Start Match </Button>
			</div>

			<Grid>
				<Grid.Row>
					<Grid.Column>
						<BarChart data={[
							{ a: 4, b: 2},
							{ a: 2, b: 3},
							{ a: 12, b: 10},
							{ a: 3, b: 9},
							{ a: 15, b: 8},
							{ a: 6, b: 3}
						]} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
				</Grid.Row>
			</Grid>

			{/* Stats */}
			{/* Compared Telemetry */}
			<div className="telemetry-comp-container">
				<Step.Group className="prematch-launch-conditions neu">
	 				<Step>
	 					<Dropdown
	 						labeled
	 						text="First Force..."
	 						button
	 						options={primaryOptions}
	 						selection
	 						search
	 						floating
	 						name="primary"
	 						value={primaryList ? primaryList.name : undefined}
	 						onChange={handleArmySelection}
	 					/>
	 				</Step>

	 				<Step>
	 					<Dropdown 
	 						labeled
	 						text="Second Force..."
	 						button
	 						options={secondaryOptions}
	 						selection
	 						search
	 						floating
	 						name="secondary"
	 						value={secondaryList ? secondaryList.name : undefined}
	 						disabled={primaryList === null}
	 						onChange={handleArmySelection}
	 					/>
	 				</Step>
				</Step.Group>
				<div className="scrollable-box" style={{height}}>
					{renderTelemComp("Speed", "speed" )}
					{renderTelemComp("Weapon Skill", "ws")}
					{renderTelemComp("Ballistic Skill", "bs")}
					{renderTelemComp("Strength", "strength")}
					{renderTelemComp("Toughness", "toughness")}
					{renderTelemComp("Wounds", "wounds")}
					{renderTelemComp("Attacks", "attacks")}
					{renderTelemComp("Saves", "saves")}
					{renderTelemComp("Range", "range")}
					{renderTelemComp("AP", "ap")}
				</div>
			</div>
 		</React.Fragment>
	);
}

export const mapStateToProps = (state, props) => {
  return {
		metalist: state.warReducer.metalist,
		metalistHash: state.warReducer.metalistHash,
		primaryList: state.warReducer.primaryList,
		secondaryList: state.warReducer.secondaryList,
		listHash: state.warReducer.listHash,
	  	demoState: state.appReducer.demoState,
	  	prematchData: state.warReducer.prematchData,
    };
};

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents })(PreMatch);
