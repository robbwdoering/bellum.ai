/**
 * FILENAME: ArmyBrowser.js
 *
 * DESCRIPTION: CRUD interaction for this user's Army List.  
 */

// React + Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { openContents } from './../app/actions';
import Pane from './../common/pane';
import { ContentTypes } from './../common/constants';
import './contents.css';

export const PostMatch = props => {
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

	return (
		<div className="contents-container">
 		</div>
	);
}

export const mapStateToProps = (state, props) => {
  return { };
};

export const PostMatchContainer = connect(mapStateToProps, {  openContents })(PostMatch);
