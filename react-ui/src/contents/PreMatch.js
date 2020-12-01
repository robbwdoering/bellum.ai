/**
 * FILENAME: PreMatch.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match. 
 */

// React + Redux
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Step, Divider, Dropdown, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';
import { useAuth0 } from "@auth0/auth0-react";

import { openContents, setDemoState } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes, apiOpts } from './../common/constants';
import { BarChart } from './../stats/BarChart';
import { ForceCard } from './../stats/ForceCard';
import { ChartCard } from './../stats/ChartCard';
import { statCategories, mainCategoryNames } from './../stats/constants';
import { useApi } from "./../app/useApi";
import './contents.css';

const minChartSize = 300;
const maxChartSize = 600;

export const PreMatch = props => {
	const {
		// Root 
		config,
		sendMsg,
		fetchAt,

		// Parent
		key,
		name,
		height,
		width,
		handleFetch,

		// Redux
		metalist,
		metalistHash,
		primaryList,
		secondaryList,
		listHash,
		prematchData,
		primaryProfile,
		secondaryProfile,

		// Dispatched Actions
		openContents
	} = props;

	const ref = useRef(); 
	const userLists = useRef({primary: null, secondary: null});
	const [activeCategory, setActiveCategory] = useState("shoot");

	const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

	const filterPrimaryList = () => {
		console.log("filtering primary list", metalist, primaryList); 
		return metalist.map(e => ({ text: e.name, value: e.name }));
	};

	const filterSecondaryList = () => {
		if (!primaryList) {
			return [];
		}

		const item = metalist.find(e => e.name === primaryList.name);
		console.log("filtering second list", metalist, item, secondaryList); 
		return metalist.filter(e => (e.name !== primaryList.name) && (e.points > item.points - 100) && (e.points < item.points + 100)).map(e => ({ text: e.name, value: e.name }));
	};

	const handleArmySelection = (e, { name, value }) => {
		const item = metalist.find(e => e.name === value);
		if (item && userLists.current) {
			// Record this name
			userLists.current[name] = value;

			// Fetch data for this list
			if (name === "primary") {
				primaryListApi.refresh();
			} else {
				secondaryListApi.refresh();
			}
		} else {
			console.error("Couldn't find item", value);
		}
	};

	const startMatch = e => {
		openContents(ContentTypes.Match);
	}

	const renderCategory = categoryName => ({
		menuItem: (
			<Menu.Item as="div" className="tab-menu-item">
				<div className={"custom-icon large " + categoryName + (activeCategory === categoryName ? " primary" : "")} />
				<span> {statCategories[categoryName].title} </span>
			</Menu.Item>
		),
		render: () => statCategories[categoryName].charts.map(chartName => <ChartCard name={chartName} />)
	});

	const metalistApi = useApi('/api/static/metalist', 'GET', apiOpts, handleFetch);
	const primaryListApi = useApi('/api/static/list/true/'+userLists.current.primary, 'GET', apiOpts, handleFetch);
	const secondaryListApi = useApi('/api/static/list/false/'+userLists.current.secondary, 'GET', apiOpts, handleFetch);

	const primaryOptions = useMemo(filterPrimaryList, [metalistHash])
	const secondaryOptions = useMemo(filterSecondaryList, [metalistHash])
	const isEngaged = useMemo(() => primaryList !== null && secondaryList !== null, [listHash])
	const panes = useMemo(() => mainCategoryNames.map(categoryName => renderCategory(categoryName)), [activeCategory]);

	const cardStyle = useMemo(() => ({
		width: "100%",
		height: Math.min(Math.max(height * 0.4, 100), 400)
	}), [ height, width ]);

	useEffect(() => {
		metalistApi.refresh();
	}, []);

	return (
		<React.Fragment>
			<div className="bot-right-container">
				<Button className="prematch-start primaryButton" disabled={!isEngaged} onClick={startMatch} > Start Match </Button>
			</div>

			<Divider horizontal> <h2>Forces</h2> </Divider>
			<Grid>
				<Grid.Row className="prematch-header-row" centered>
					<Grid.Column width={8}>
	 					<Dropdown
	 						labeled
	 						text={primaryList ? undefined : "First Force..."}
	 						className="neu"
	 						button
	 						options={primaryOptions}
	 						selection
	 						search
	 						floating
	 						name="primary"
	 						value={primaryList ? primaryList.name : undefined}
	 						onChange={handleArmySelection}
	 					/>
					</Grid.Column>
					<Grid.Column width={8}>
	 					<Dropdown 
	 						labeled
	 						text={primaryList ? undefined : "Second Force..."}
	 						className="neu"
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
					</Grid.Column>
				</Grid.Row>

				<Grid.Row className="prematch-force-row" centered>
					<Grid.Column width={8}>
						<ForceCard key={"primary-force-card"} style={cardStyle} data={primaryList} profile={primaryProfile}/>
					</Grid.Column>
					<Grid.Column width={8}>
						<ForceCard key={"primary-force-card"} style={cardStyle} data={secondaryList} profile={secondaryProfile}/>
					</Grid.Column>
				</Grid.Row>

					<Divider horizontal> <h2>Analysis</h2> </Divider>

				<Grid.Row>
					<Tab menu={{secondary: true }} panes={panes} onTabChange={(e, { activeIndex }) => {console.log("tab changed!"); setActiveCategory(mainCategoryNames[activeIndex])}} />
				</Grid.Row>
			</Grid>
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
	  	primaryProfile: state.warReducer.primaryProfile,
	  	secondaryProfile: state.warReducer.secondaryProfile
    };
};

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents })(PreMatch);
