/**
 * FILENAME: Content.js
 *
 * DESCRIPTION: Root compoonent for content.
 */

// React + Redux
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';
import { useCookies } from "react-cookie";
import { useAuth0 } from "@auth0/auth0-react";

import { useUpdate, useSpring, useSprings, animated, config }  from 'react-spring';

import { openContents, setDemoState } from './../app/actions';
import { setMatchState, processWarAction, clearChartQueue } from './../war/actions';
import { ContentTypes, apiOpts } from './../common/constants';
import { WarActions } from './../war/constants';
import { useApi } from "./../app/useApi";

import { SplashContainer } from "./Splash";
import { DemoTransitionContainer } from "./DemoTransition";
import { PreMatchContainer } from "./PreMatch";
import { PostMatchContainer } from "./PostMatch";
import { MatchContainer } from "./Match";
import { ForceManagerContainer } from "./ForceManager";
import './contents.css';

export const Content = props => {
	const {
		primaryList,
		secondaryList,
		matchState,
		curContent,
		windowCtx,
		demoState,
		chartQueue,
		clearChartQueue,
		handleFetch,
		openContents,
		processWarAction,
		setMatchState
	} = props;

	const [w, setWidth] = useState(600);
	const [h, setHeight] = useState(175);
	const [isHoriz, setIsHoriz] = useState(false);
	const [fetchInterval, setFetchInterval] = useState(-1);

	const spring = useSpring({
		config: { friction: 15 },
		height: h + "px",
		width: w + "px",
		top: (h === 175 ? "70%" : (isHoriz ? "50%" : "5rem")),
		left: (w === 600 ? "55%" : (isHoriz ? "3rem" : "3rem"))
	});

	const primaryListApi = useApi('/api/static/list/true/', 'GET', apiOpts, handleFetch);
	const secondaryListApi = useApi('/api/static/list/false/', 'GET', apiOpts, handleFetch);
	const [ cookies, setCookie ] = useCookies(['bellum_ai_forces', 'bellum_ai_match']);

	// Store whatever data we have in a cookie before exit.
	// TODO:  Is this good practice? Seems rude - research this.
	const cleanupCookies = () => {
		setCookie('bellum_ai_match', { matchState }, { path: "/" });
		setCookie('bellum_ai_forces', { lists: [primaryList.id, secondaryList.id] }, { path: "/" });
	}

	// Check for a previously loaded match on mount, and jump back into it if found
	useEffect(() => {
		// If we found stored forces, fetch them
		// We can't store them in cookies directly since they're too big :(
		// TODO: Move this cookie to local storage?
		if (cookies.bellum_ai_forces) {
			let stored = cookies.bellum_ai_forces;
			primaryListApi.refresh(stored.lists[0]);
			secondaryListApi.refresh(stored.lists[1]);
		}

		if (cookies.bellum_ai_match) {
			let stored = cookies.bellum_ai_match;
			openContents(ContentTypes.Match);
			setMatchState(stored.matchState);
		}

		window.addEventListener('beforeunload', cleanupCookies); // Clean up on page unload
		return cleanupCookies; // Clean up on unmount
	}, []);

	useEffect(() => {
		const midH = windowCtx ? ((windowCtx.clientHeight * .90) / 2) : 600;
		const midW = windowCtx ? ((windowCtx.clientWidth * .90) / 2) : 1000;

    	switch(curContent) {
			case ContentTypes.Splash:
				setHeight(175);
				setWidth(600);
				setIsHoriz(false);
				break;
			case ContentTypes.DemoTransition:
			if (demoState.step === 1) {
				setHeight(175);
				setWidth(600);
				setIsHoriz(false);
			} else {
				setHeight(midH);
				setWidth(midW * 2);
				setIsHoriz(true);
			}
				break;

			// Half screen - for when we want to show the map too
			case ContentTypes.Match:
			case ContentTypes.PostMatch:
				setHeight(windowCtx ? (windowCtx.clientHeight / 2) : 600);
				setWidth(windowCtx ? (windowCtx.clientWidth - 84) : 1000);
				setIsHoriz(true);
				break;

			// Full Screen
			case ContentTypes.ForceManager:
			case ContentTypes.PreMatch:
			case ContentTypes.Auth:
				setHeight(windowCtx ? (windowCtx.clientHeight - 24) : 600);
				setWidth(windowCtx ? (windowCtx.clientWidth - 84) : 1000);
				setIsHoriz(false);
				break;
		}
	}, [ curContent, windowCtx && windowCtx.clientHeight, windowCtx && windowCtx.clientWidth]);

    const renderContent = () => {
    	if (!windowCtx) {
    		return null;
    	}

    	switch(curContent) {
			case ContentTypes.Splash:
				return (
					<SplashContainer handleFetch={handleFetch} />
				);
			case ContentTypes.DemoTransition:
				return (
					<DemoTransitionContainer />
				);
			case ContentTypes.PreMatch:
				return (
					<PreMatchContainer height={h} width={w}  handleFetch={handleFetch} />
				);
			case ContentTypes.Match:
				return (
					<MatchContainer />
				);
			case ContentTypes.PostMatch:
				return (
					<PostMatchContainer />
				);
			case ContentTypes.ForceManager:
				return (
					<ForceManagerContainer handleFetch={handleFetch} />
				);
		}
    };

	return (
		// <animated.div className={`contents-container ${curContent}`} style={spring}>
		<animated.div className={`contents-container ${curContent}`} style={spring}>
			{renderContent()}
		</animated.div>
	);
};

export const mapStateToProps = (state, props) => {
  return {
  	curContent: state.appReducer.curContent,
  	demoState: state.appReducer.demoState,
  	matchState: state.warReducer.matchState,
	primaryList: state.warReducer.primaryList,
	secondaryList: state.warReducer.secondaryList,
  	chartQueue: state.warReducer.chartQueue
  };
};

export const ContentContainer = connect(mapStateToProps, { setDemoState, openContents, clearChartQueue, setMatchState, processWarAction })(Content);
