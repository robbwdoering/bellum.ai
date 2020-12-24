/**
 * FILENAME: PreMatch.js
 *
 * DESCRIPTION: Allows user to setup a match, see prediction info for the matchup, and begin the match. 
 */

// React + Redux
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Divider, Dropdown, Tab, Menu } from 'semantic-ui-react';
import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from "react-cookie";

import { openContents, setDemoState } from './../app/actions';
import { ContentTypes, apiOpts } from './../common/constants';
import { ForceCardContainer } from './../stats/ForceCard';
import { ChartCardContainer } from './../stats/ChartCard';
import { statCategories, mainCategoryNames, ChartTypes } from './../stats/constants';
import { useApi } from "./../app/useApi";
import { setMatchState } from "./../war/actions";
import './contents.css';

export const PreMatch = props => {
	const {
		// Root 

		// Parent
		height,
		width,
		handleFetch,

		// Redux
		metalist,
		metalistHash,
		primaryList,
		secondaryList,
		listHash,
		primaryProfile,
		secondaryProfile,
		matchState,
		boardState,

		// Dispatched Actions
		openContents,
		setMatchState
	} = props;

	const childHash = useRef(0);
	const [activeCategory, setActiveCategory] = useState(0);

	const filterPrimaryList = () => {
		console.log("filtering primary list", metalist, primaryList); 
		return metalist.map(e => ({ text: e.name, value: e.id }));
	};

	const filterSecondaryList = () => {
		if (!primaryList) {
			return [];
		}

		console.log("filtering second list", metalist, primaryList, secondaryList); 
		return metalist.filter(e => e.name !== primaryList.name).map(e => ({ text: e.name, value: e.id }));
	};

	const handleForceSelection = (e, { name, value }) => {
		const item = metalist.find(e => e.id === value);
		console.log("Handling force selection", metalist, item, value)
		// Fetch data for this list if it's a legal id 
		if (item) {
			if (name === "primary") {
				primaryListApi.refresh(value);
			} else {
				secondaryListApi.refresh(value);
			}
		} else {
			console.error("Couldn't find item", value);
		}
	};


	const startMatch = e => {
		setMatchState({
			turn: 0, // setup turn
			phase: 0, // command phase
			cpCount: [primaryList.cp, secondaryList.cp],
			activePlayer: -1,
			mapSize: 0,
			vpCount: [
				[0, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			objectives: [
				[null], // Primary
				[null, null, null], //Secondaries
				[null, null, null]
			]
		});

		setCookie('bellum_ai_match', { matchState }, { path: "/" });
		setCookie('bellum_ai_forces', { lists: [primaryList.id, secondaryList.id] }, { path: "/" });
		setCookie('bellum_ai_board', boardState, { path: "/" });

		openContents(ContentTypes.Match);
	}

	const renderCategory = categoryName => ({
		menuItem: (
			<Menu.Item as="div" className="tab-menu-item">
				<div className={"custom-icon large " + categoryName + (activeCategory === categoryName ? " primary" : "")} />
				<span> {statCategories[categoryName].title} </span>
			</Menu.Item>
		),
		render: () => (
			statCategories[categoryName].charts.map(chartName =><ChartCardContainer chartName={chartName} config={scorecardConfig} parentHash={childHash.current}/>)
		)
	});

	// --------------------
	// FUNCTIONAL LIFECYCLE
	// --------------------

	// Get hooks in browser cookies	
	const [cookies, setCookie] = useCookies(['bellum_ai_match']);

	// Static Apis - to fetch various json objects
	const primaryListApi = useApi('/api/static/list/true/', 'GET', apiOpts, handleFetch);
	const secondaryListApi = useApi('/api/static/list/false/', 'GET', apiOpts, handleFetch);

	// Dyanmic Apis - for chart data
	const scorecardApi = useApi(`/api/dynamic/${ChartTypes.ForceScorecard}/`, 'POST', apiOpts, handleFetch);

	const primaryOptions 	= useMemo(filterPrimaryList, [metalistHash]);
	const secondaryOptions 	= useMemo(filterSecondaryList, [metalistHash, primaryList]);
	const isEngaged 		= useMemo(() => primaryList !== null && secondaryList !== null, [listHash]);
	const panes 			= useMemo(() => mainCategoryNames.map(categoryName => renderCategory(categoryName)), [activeCategory]);

	const cardStyle = useMemo(() => ({
		height: Math.min(Math.max(height * 0.4, 100), 400)
	}), [ height, width ]);

	// Build the config for the scorecard charts
	const scorecardConfig = useMemo(() => {
		return {
			height: 120,
			width: 120
		};
	}, []);

	// Fetch scorecard data
	useEffect(() => {
		if (primaryList) {
			scorecardApi.refresh(primaryList.id, { force: primaryList, profile: primaryProfile });
		} 

		if (secondaryList) {
			scorecardApi.refresh(secondaryList.id, { force: secondaryList, profile: secondaryProfile });
		}
	}, [ listHash ]);

	return (
		<React.Fragment>
			<div className="top-right-container">
				<Button className="prematch-start primaryButton" disabled={!isEngaged} onClick={startMatch} > Start Match </Button>
			</div>

			<Divider horizontal> <h2>Prematch</h2> </Divider>
			<Grid>
				<Grid.Row className="prematch-header-row" centered>
					<Grid.Column width={8}>
	 					<Dropdown
	 						labeled
	 						placeholder="First Force..."
	 						className="neu"
	 						button
	 						options={primaryOptions}
	 						selection
	 						search
	 						floating
	 						name="primary"
	 						onChange={handleForceSelection}
	 					/>
					</Grid.Column>

					<Grid.Column width={8}>
	 					<Dropdown 
	 						labeled
	 						placeholder="Second Force..."
	 						className="neu"
	 						button
	 						options={secondaryOptions}
	 						selection
	 						search
	 						floating
	 						name="secondary"
	 						disabled={primaryList === null}
	 						onChange={handleForceSelection}
	 					/>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row className="prematch-force-row" centered>
					<Grid.Column width={8} style={cardStyle} >
						<ForceCardContainer key={"primary-force-card"} data={primaryList} profile={primaryProfile} handleFetch={handleFetch} playerIdx={0}/>
					</Grid.Column>

					<Grid.Column width={8} style={cardStyle} >
						<ForceCardContainer key={"secondary-force-card"} data={secondaryList} profile={secondaryProfile} handleFetch={handleFetch} playerIdx={1}/>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Card.Group>
						<Tab
							activeIndex={activeCategory}
							menu={{secondary: true }}
							panes={panes}
							onTabChange={(e, { activeIndex }) => {childHash.current++; setActiveCategory(activeIndex)}}
						/>
					</Card.Group>
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
	  	secondaryProfile: state.warReducer.secondaryProfile,
	  	matchState: state.warReducer.matchState,
	  	matchHash: state.warReducermatchHash,
	  	boardState: state.warReducerboardState
    };
};

export const PreMatchContainer = connect(mapStateToProps, { setDemoState, openContents, setMatchState })(PreMatch);
