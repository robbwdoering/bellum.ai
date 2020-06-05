/**
 * FILENAME: dashboard.js
 *
 * DESCRIPTION: This is the component rendered at the top of the visible tree, just below App.
 * Contains hooks for the sidebar, header bar / menu, heads up status, and main content.
 *
 * OWNER: RWD
 */

// React + Redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { AddEventForm } from "./../forms/addEvent";
import { testAction, openPane, openCanvas } from './../app/actions';
import { Pane } from './../common/pane';
import { Panes, Canvases } from './../app/constants';
import HexMap from './../map/hexMap';
import './dashboard.css';

// Custom
// import './dashboard.css';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSidebar: true,
			showLogin: false,
			user: "",
			pass: ""
		};
	};

    sendReduxTest = () => {
	    this.props.testAction('FROM_DASHBOARD');
    };

    login = () => {
    	const { showLogin, loginReady } = this.state;

    	// Show Login form
    	if (!showLogin && !loginReady) {
    		this.setState({
    			showLogin: true	
    		});

    	// Send Login
    	} else if (loginReady) {
	    	console.log("HOOK: [sendLogin] called");
    	}
    };

    handleChange = (event, data) => {
    	let ret = {};
    	// Handle special case of password changes, to account for "*" obfuscation
    	// TODO: There has to be a library that does this better + faster + more securely. See MYT-14
    	if (data.name === 'pass') {
    		const { pass } = this.state;
    		const delta = pass.length - data.value.length;
 	   		if (delta > 0) {
 	   			ret.pass = pass.substring(0, data.value.length);
    		} else if (delta == 0) {
    			ret.pass = pass;
    		} else {
    			ret.pass = pass + data.value.charAt(data.value.length - 1);
    		}

    	// Handle the general case - state variable should be replaced
    	} else {
    		ret[data.name] = data.value;
    	}

    	this.setState(ret);
    };

    searchContacts = () => {
    	console.log("[searchContacts]");
    	//TODO - MYT-21
    };

    renderMainContent = () => {
    	const { fetchAt, curPane, curCanvas } = this.props;
    	console.log("redner, ", curPane, curCanvas)

    	return (
    		<div className='mytine-main-content-container'>
		    	{/* Renders the pane that can appear over the main canvas */}
    			{curPane && (() => {
    				switch(curPane) {
    					case Panes.AddEvent:
    						return (<AddEventForm />);
    					case Panes.Regulations:
    						return (<h3> REGULATIONS </h3>);
    					case Panes.PlanContact:
    						return (<h3> PLAN CONTACT </h3>);
    					default:
    						return (<h3> There was an error. Please reload the page. </h3>);
    				}
    			})()}

		    	{/* Renders the main canvas, which always appears but is sometimes dimmed */}
    			{curCanvas && (() => {
    				switch(curCanvas) {
    					case Panes.Map:
    						return (<HexMap />);
    					default:
    						return (<h3> There was an error. Please reload the page. </h3>);
    				}
    			})()}
    		</div>
		);
    };

    renderSidebarMenu = (vertical) => (
		<Menu
			className='db-sidebar-menu'
			vertical={vertical}
			fluid={vertical}
		>
			<Menu.Item name='update'>
				<Input 
					// label='Contact Search'
					name='contactSearchVal'
					placeholder='Search Contacts...'
					onChange={this.handleChange}
					fluid
					action={{
						icon: 'search'
					}}
				/>
			</Menu.Item>

			<Menu.Item>
				<Button onClick={() => this.props.openPane(Panes.AddEvent)}>Add Event</Button>
			</Menu.Item>

			<Menu.Item>
				<Button onClick={() => this.props.openPane(Panes.PlanContact)}>Plan Contact</Button>
			</Menu.Item>

			<Menu.Item>
				<Button onClick={() => this.props.openPane(Panes.Regulations)}>Regulation Map</Button>
			</Menu.Item>
		</Menu>
    );

    openUserGuide = () => {
    	console.log("[openUserGuide]");
    };

  	render() {
	  	const { showSidebar, showLogin, user, pass } = this.state;
	  	const { testsReceived, fetchAt } = this.props;

	    return (
	    	<div className="dashboard">
				<Menu
					className='db-header'
					style={{zIndex: '1000'}}
				>
					<Menu.Item name='showSidebar'>
						<Button
	    					icon
	    					circular
	    					onClick={() => this.setState({showSidebar: !showSidebar}) }
						>
		    				<Icon name={'chevron ' + (showSidebar ? 'down' : 'right')} />
						</Button>
						{!showSidebar && false && (this.renderSidebarMenu(false))}
					</Menu.Item>
					<Menu.Menu position='right'>
						{showLogin && (
							<Menu.Item name='login-form'>
								<Input
									label='Username'
									name='user'
									placeholder='anthony.fauci'
									onChange={this.handleChange}
								/>
								<Input
									label='Password'
									name='pass'
									placeholder='i_<3_m4sks'
									value={'*'.repeat(pass.length)}
									onChange={this.handleChange}
								/>
							</Menu.Item>
						)}
						<Menu.Item name='login-button' className='db-header-login'>
							<Button
		    					onClick={this.login}
							>
								Login
							</Button>
						</Menu.Item>
						<Menu.Item name='login'>
							<Button
		    					onClick={this.openUserGuide}
							>
								Getting Started	
							</Button>
						</Menu.Item>
						<Menu.Item name='login'>
							<Button
		    					icon
		    					onClick={() => this.setState({showSidebar: !showSidebar}) }
							>
			    				<Icon name='setting' />
							</Button>
						</Menu.Item>
					</Menu.Menu>
				</Menu>

				{/* Sidebar menu that overlays on the app */}
				<Sidebar
					animation='overlay'
					className="db-sidebar"
					visible={showSidebar}
					// width='very wide'
					direction='top'
				>
					<div className='db-sidebar-main-contents'>
						<Pane>
							{this.renderSidebarMenu(true)}
						</Pane>
					</div>
				</Sidebar>

				{/* Main Content */}
	    		<Grid>
	    			{this.renderMainContent()}
	    		</Grid>
	    	</div>
		);
  	};
}

export const mapStateToProps = (state, props) => {
  return {
    testsReceived: state.appReducer.testsReceived,
    curPane: state.appReducer.curPane,
    curCanvas: state.appReducer.curCanvas
  };
};

export default connect(mapStateToProps, { testAction, openPane, openCanvas })(Dashboard);
