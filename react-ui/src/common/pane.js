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
	config,
	configPane,
	key
}) => {
    return (
    	<Card 
	    	className={`myt-pane ${className ? className : ""} ${config && config.size ? config.size : ""}`}
	    	style={style ? style : undefined}
	    	key={key}
    	>
    		{header && (
    			<Header className='myt-pane-header'>
    				<Menu>
	    				{config.headerItems}

	    				<Menu.Menu position='right'>
		    				<Menu.Item name='expand' onClick={() => configPane(name, "MOD", {expand: !config.expand})}>
		    					<Icon name={config.expand ? 'compress' : 'expand'}/>
		    				</Menu.Item>

		    				<Menu.Item name='close' onClick={() => configPane(name, "DEL")}>
		    					<Icon name='x'/>
		    				</Menu.Item>
	    				</Menu.Menu>
    				</Menu>
    			</Header>
			)}
    		{children}
    	</Card>
	);
};

// const mapStateToProps = (state, props) => {
// 	return {
// 		config: state.appReducer.curPanes[props.name || "default"]
// 	}	
// }

export default connect(null, { configPane })(Pane);