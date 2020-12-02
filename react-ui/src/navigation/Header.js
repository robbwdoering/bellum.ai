/**
 * FILENAME: Header.js
 *
 * DESCRIPTION: This is the component rendered at the top of the visible tree, just below App.
 * Contains hooks for the sidebar, header bar / menu, heads up status, and main content.
 *
 * OWNER: RWD
 */
import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";

import { openContents } from './../app/actions';
import { Button, Grid, Tab, Input, TextArea, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';
import Pane from './../common/pane';
import { useApi } from "./../app/useApi";
import { ContentTypes, apiOpts } from "./../common/constants";
import { parsePlainText } from "./../war/utils";
import "./navigation.css";

export const Header = props => {
	const { openContents, handleFetch } = props;
	const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
	const [showSidebar, toggleSidebar] = useState(false);
	const [showAddForce, toggleAddForce] = useState(false);
	const [tmpForce, setTmpForce] = useState("");
	const [requestVal, setRequestVal] = useState("");


	const { loading, error, refresh } = useApi('/api/static/list', 'POST', apiOpts, handleFetch, requestVal, false);

	/**
	 * Callback to turn the contents of the copy/paste box into a new force in  the database.
	 */
	const addForce = (e) => {
		if (tmpForce && tmpForce.length) {
			setTmpForce(null);
			const json = parsePlainText(tmpForce);
			console.log('got ', json);
			if (json) {
				toggleAddForce(false);
				setRequestVal(json);

				// Perform the POST
				refresh();
			} else {
				console.error("Could not parse pasted text.")
			}


		}
	}

	console.log("loading", loading);
	return (
		<Menu
			className='db-header'
			style={{zIndex: '1000'}}
		>
			<Menu.Item position="left">
				<div className="custom-icon logo large" />
			</Menu.Item>

			<Menu.Item className="header-item" name='showSidebar' position="right">
				<Button
					icon
					circular
					onClick={() => toggleSidebar(!showSidebar)}
				>
					<Icon name={'chevron ' + (showSidebar ? 'down' : 'left')} />
				</Button>

				{showSidebar && (
					<Sidebar
						animation='overlay'
						className="db-sidebar"
						visible={showSidebar}
						// width='very wide'
						direction='top'
					>
						<Pane compact className='db-sidebar-menu'>
							<Menu
								className='db-sidebar-menu'
								vertical={true}
								fluid={true}
							>
								{isAuthenticated ? (
									<React.Fragment> 
										<Menu.Item> <h3> Welcome Back </h3> <br/> Logged in as {user.name} </Menu.Item>
										<Menu.Item as='a' onClick={() => openContents(ContentTypes.ForceManager)}>
											Manage Forces	
										</Menu.Item>
										<Menu.Item as='a' onClick={() => toggleAddForce(!showAddForce)}>
											Add Force	
										</Menu.Item>
										{showAddForce && (
											<Menu.Item as='div' className="header-seamless-input">
													<TextArea onChange={(e, { value }) => setTmpForce(value)} placeholder="Copy/Pase List here..."/>
													<Button size="tiny" onClick={addForce} icon="angle right"/>

											</Menu.Item>
										)}
										<Menu.Item as='a' onClick={() => openContents(ContentTypes.PreMatch)}>
											Start Match	
										</Menu.Item>
										<Menu.Item as='a' onClick={() => logout({ returnTo: window.location.origin })}>
											Logout
										</Menu.Item>
									</React.Fragment>
								) : (
									<React.Fragment> 
										<Menu.Item as='a' onClick={() => loginWithRedirect(apiOpts)}>
											Login
										</Menu.Item>
									</React.Fragment>
								)}
							</Menu>
						</Pane>
					</Sidebar>
				)}
			</Menu.Item>
		</Menu>
	);
};

export const mapStateToProps = (state, props) => {
  return {
  	matchState: state.warReducer.matchState
  };
};

export const HeaderContainer = connect(mapStateToProps, { openContents })(Header);