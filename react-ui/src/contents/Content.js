/**
 * FILENAME: Content.js
 *
 * DESCRIPTION: Root compoonent for content.
 */

// React + Redux
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { useUpdate, useSpring, useSprings, animated, config }  from 'react-spring';

import { openContents, setDemoState } from './../app/actions';
import { clearChartQueue } from './../war/actions';
import { ContentTypes, contentStyles } from './../common/constants';

import { SplashContainer } from "./Splash";
import { DemoTransitionContainer } from "./DemoTransition";
import { PreMatchContainer } from "./PreMatch";
import { PostMatchContainer } from "./PostMatch";
import { MatchContainer } from "./Match";
import './contents.css';

export const Content = props => {
	const { curContent, windowCtx, demoState, chartQueue, clearChartQueue, handleFetch, sendMsg } = props;

	const [w, setWidth] = useState(600);
	const [h, setHeight] = useState(175);
	const [isHoriz, setIsHoriz] = useState(false);
	const [fetchInterval, setFetchInterval] = useState(-1);

	// const [contentRef, { height }] = useMeasure();

	// Setup fetch timers
	const fetchQueued = () => {
		if (chartQueue.length) {
			sendMsg(`/api/calc/charts`, 'GET', { chartQueue });
		}
	};
	useEffect(() => {
		setFetchInterval(setInterval(fetchQueued, 1000));
		return () => clearInterval(fetchInterval);
	}, [])

	const spring = useSpring({
		config: { friction: 15 },
		height: h + "px",
		width: w + "px",
		top: (h === 175 ? "70%" : (isHoriz ? "50%" : "10%")),
		left: (w === 600 ? "55%" : (isHoriz ? "2.5%" : "5%"))
	});

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
			case ContentTypes.Match:
			case ContentTypes.PostMatch:
				setHeight(midH);
				setWidth(midW * 2);
				setIsHoriz(true);
				break;
			case ContentTypes.PreMatch:
			case ContentTypes.Auth:
				setHeight((midH * 2) - 40);
				setWidth(midW * 2);
				setIsHoriz(false);
				break;
		}
	}, [ curContent ]);

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
			case ContentTypes.Auth:
				return (
					// <AuthContainer />
					null
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
  	chartQueue: state.warReducer.chartQueue
  };
};

export const ContentContainer = connect(mapStateToProps, { setDemoState, openContents, clearChartQueue })(Content);
