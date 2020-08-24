/**
 * FILENAME: dashboard.js
 *
 * DESCRIPTION: This is the component rendered at the top of the visible tree, just below App.
 * Contains hooks for the sidebar, header bar / menu, heads up status, and main content.
 *
 * OWNER: RWD
 */

/* React + Redux */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Menu, Icon, Header } from 'semantic-ui-react';

import { testAction, configPane, openCanvas } from './../app/actions';
import { Panes, paneHeaderItems } from "./constants";

/* Local */
import './pane.css';

// TODO Use <Step> once a form is clicked on to show status
// TODO: HOTKEYS, and all the mouse-overs are for the hotkeys, and doc with master hotkey outline / list
// TODO: Add spinning icon that changes shadow orientation while loading stuff. Minimum one rotation? Or would that be dizzy-ing? Def include disable option


export const Pane = ({
	style,
	className,
	children,
	compact,
	header,
	name,
	key
}) => {
    return (
    	<Card className={`myt-pane ${className || ""}`} style={style} key={key} >
    		{children}
    	</Card>
	);
};

		    				// <Menu.Item name='expand' onClick={() => configPane(name, "MOD", {expand: config && !config.expand})}>
		    				// 	<Icon name={config.expand ? 'compress' : 'expand'}/>
		    				// </Menu.Item>

// const mapStateToProps = (state, props) => {
// 	return {
// 		config: state.appReducer.curPanes[props.name || "default"]
// 	}	
// }

export default connect(null, { configPane })(Pane);