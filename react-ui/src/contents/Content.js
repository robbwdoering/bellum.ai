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
import { ContentTypes, contentStyles } from './../common/constants';

import { SplashContainer } from "./Splash";
import { DemoTransitionContainer } from "./DemoTransition";
import { PreMatchContainer } from "./PreMatch";
import { PostMatchContainer } from "./PostMatch";
import { MatchContainer } from "./Match";
import './contents.css';

export const Content = props => {
	const { curContent, windowCtx, demoState } = props;

	const [w, setWidth] = useState(0);
	const [h, setHeight] = useState(0);

	// const [contentRef, { height }] = useMeasure();

	const spring = useSpring({
		config: { friction: 15 },
		height: h + "px",
		width: w + "px",
		top: (h === 150 ? "70%" : (w > h ? "50%" : "2.5%")),
		left: (w === 500 ? "55%" : (w > h ? "2.5%" : "55%"))
	});

	useEffect(() => {
		const midH = windowCtx ? ((windowCtx.clientHeight * .95) / 2) : 500;
		const midW = windowCtx ? ((windowCtx.clientWidth * .95) / 2) : 1000;

    	switch(curContent) {
			case ContentTypes.Splash:
				setHeight(150);
				setWidth(500);
				break;
			case ContentTypes.DemoTransition:
			if (demoState.step === 1) {
				setHeight(150);
				setWidth(500);
			} else {
				setHeight(midH);
				setWidth(midW * 2);
			}
				break;
			case ContentTypes.PreMatch:
			case ContentTypes.Match:
			case ContentTypes.PostMatch:
				setHeight(midH);
				setWidth(midW * 2);
				break;
			case ContentTypes.Auth:
				setHeight(midH * 2);
				setWidth(midW);
				break;
		}
	}, [ curContent ])

    const renderContent = () => {
    	if (!windowCtx) {
    		return null;
    	}

    	switch(curContent) {
			case ContentTypes.Splash:
				return (
					<SplashContainer />
				);

			case ContentTypes.DemoTransition:
				return (
					<DemoTransitionContainer />
				);
			case ContentTypes.PreMatch:
				return (
					<PreMatchContainer windowCtx={windowCtx} />
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

    const genContentStyles = () => {
    	switch(curContent) {
			case ContentTypes.Splash:
				return contentStyles.popup;

			case ContentTypes.PreMatch:
			case ContentTypes.Match:
			case ContentTypes.PostMatch:
				return contentStyles.full_horiz;

			case ContentTypes.Auth:
				return contentStyles.full_vertical;

			case ContentTypes.DemoTransition:
				return demoState.step === 1 ? contentStyles.popup : contentStyles.full_horiz;
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
  	demoState: state.appReducer.demoState
  };
};

export const ContentContainer = connect(mapStateToProps, { setDemoState, openContents })(Content);
