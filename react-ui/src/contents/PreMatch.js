/**
 * FILENAME: PreMatch.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match. 
 */

// React + Redux
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Dropdown, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
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

		// Redux
		metalist,
		metalistHash,
		primaryList,
		secondaryList,
		listHash,
		profiles,

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

	const primaryOptions = useMemo(filterPrimaryList, [listHash])
	const secondaryOptions = useMemo(filterSecondaryList, [listHash])
	const isEngaged = useMemo(() => primaryList !== null && secondaryList !== null, [listHash])

	return (
		<div className="contents-container">
			<Menu className="myt-ad-top-menu">
 				<Menu.Item position="left">
 					<Dropdown
 						button
 						options={primaryOptions}
 						selection
 						search
 						floating
 						name="primary"
 						value={primaryList ? primaryList.name : undefined}
 						onChange={handleArmySelection}
 					/>
 				</Menu.Item>

 				<Menu.Item as="h2" className={"ud-splitter" + (isEngaged ? "" : " disabled")}>
 					Vs
 				</Menu.Item>

 				<Menu.Item position="right">
 					<Dropdown 
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
 				</Menu.Item>
			</Menu>

			<Button disabled={!isEngaged} onClick={startMatch} > Start Match </Button>
 		</div>
	);
}

export const mapStateToProps = (state, props) => {
  return {
  	demoState: state.appReducer.demoState
  };
};

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents })(PreMatch);
