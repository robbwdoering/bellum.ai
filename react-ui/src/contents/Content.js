/**
 * FILENAME: Content.js
 *
 * DESCRIPTION: Root compoonent for content.
 */

// React + Redux
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useCookies } from "react-cookie";

import { useSpring, animated }  from 'react-spring';

import { openContents, setDemoState } from './../app/actions';
import { setMatchState, setBoardState } from './../war/actions';
import { ContentTypes, apiOpts } from './../common/constants';
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
		forces,
		curContent,
		windowCtx,
		matchState,
		matchHash,
		boardState,
		boardHash,
		demoState,
		handleFetch,
		openContents,
		setMatchState,
		setBoardState
	} = props;

	const [w, setWidth] = useState(600);
	const [h, setHeight] = useState(175);
	const [isHoriz, setIsHoriz] = useState(false);

	const spring = useSpring({
		config: { friction: 15 },
		height: h + "px",
		width: w + "px",
		top: (h === 175 ? "70%" : (isHoriz ? "50%" : "5rem")),
		left: (w === 600 ? "55%" : (isHoriz ? "3rem" : "3rem"))
	});

	const metalistApi = useApi('/api/static/metalist', 'GET', apiOpts, handleFetch);
	const primaryForceApi = useApi('/api/static/list/true/', 'GET', apiOpts, handleFetch);
	const secondaryForceApi = useApi('/api/static/list/false/', 'GET', apiOpts, handleFetch);
	const [ cookies, setCookie ] = useCookies([]);
	const [cookieSaveInt, setCookieSaveInt] = useState(-1);

	// Store whatever data we have in a cookie before exit.
	// TODO:  Is this good practice? Seems rude - research this.
	const saveToCookies = () => {
		// Only store if we're already storing
		console.log("checking before cleanup...", curContent)
		if (curContent === ContentTypes.Match && cookies.bellum_ai_match) {
			console.log("SAVING CONTENT", { matchState, boardState });
			setCookie('bellum_ai_match', { matchState }, { path: "/" });
			setCookie('bellum_ai_board', { boardState } , { path: "/" });
		}
	};

	useEffect(() => {
		if (curContent === ContentTypes.Match && forces[0] && forces[1]) {
			saveToCookies();
		}
	}, [matchState && matchState.phase])

	// Check for a previously loaded match on mount, and jump back into it if found
	useEffect(() => {
		// If we found stored forces, fetch them
		// We can't store them in cookies directly since they're too big :(
		// TODO: Move this cookie to local storage?
		if (cookies.bellum_ai_forces) {
			let stored = cookies.bellum_ai_forces;
			primaryForceApi.refresh(stored.lists[0]);
			secondaryForceApi.refresh(stored.lists[1]);
		}

		if (cookies.bellum_ai_match) {
			let stored = cookies.bellum_ai_match;
			console.log("[COOKIE] got match: ", stored.matchState);
			openContents(ContentTypes.Match);
			setMatchState(stored.matchState);
		}

		if (cookies.bellum_ai_board) {
			console.log("[COOKIE] got board: " , cookies.bellum_ai_board);
			setBoardState(cookies.bellum_ai_board.boardState);
		}
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
			default:
				setHeight(windowCtx ? (windowCtx.clientHeight - 24) : 600);
				setWidth(windowCtx ? (windowCtx.clientWidth - 84) : 1000);
				setIsHoriz(false);
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

    useEffect(() => {
    	metalistApi.refresh();
    }, []);

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
	matchHash: state.warReducer.matchHash,
	forces: state.warReducer.forces,
	boardState: state.warReducer.boardState,
	boardHash: state.warReducer.boardHash
  };
};

export const ContentContainer = connect(mapStateToProps, { setDemoState, openContents, setMatchState, setBoardState })(Content);
