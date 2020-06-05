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
import { Button, Card } from 'semantic-ui-react';

import { testAction } from './../app/actions';

/* Local */
import './pane.css';

// TODO Use <Step> once a form is clicked on to show status

export const Pane = ({ style, className, children }) => {

    return (
    	<Card 
	    	className={`myt-pane ${className ? className : ""}`}
	    	style={style ? style : undefined}
    	>
    		{children}
    	</Card>
	);
};
