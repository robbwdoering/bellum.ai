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


import { testAction, openCanvas } from './../app/actions';
import Pane from './../common/pane';
import AddEventPane from "./../common/addEvent";
import { Panes, Canvases, initialPaneConfigs } from './../common/constants';
// import HexMap from './../map/hexMap';
import Calculator from "./../war/calculator"; 
import ListManager from "./../war/listManager"; 
import './dashboard.css';

// Custom
// import './dashboard.css';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSidebar: false,
			showLogin: false,
			user: "",
			pass: "",
			curPanes: { },
			curCanvas: Canvases.HexMap,
			canvasX: 0,
			canvasY: 0
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

    renderCanvas = (curCanvas) => (
		<div className='mytine-canvas-container'>

	    	{/* Renders the main canvas, which always appears but is sometimes dimmed */}
			{curCanvas && curCanvas.length && (() => {
				switch(curCanvas) {
					case Canvases.HexMap:
						// return (<HexMap x={this.state.canvasX} y={this.state.canvasY} />);
					default:
						return (<h3> There was an error. Please reload the page. </h3>);
				}
			})()}
		</div>
	);

    // TODO add context menu option to have mutliple of the same key at once? Would have to rework this structure 
	togglePane = name => {
		if (Object.keys(this.state.curPanes).includes(name)) {
			this.configPane(name, "DEL");
		} else {
			console.log("TOGGLING: ", initialPaneConfigs, initialPaneConfigs[name])
			this.configPane(name, "CLEAR", initialPaneConfigs[name]);
		}
	};

    renderSidebarMenu = (vertical) => (
		<Menu
			className='db-sidebar-menu'
			vertical={vertical}
			fluid={vertical}
		>
			<Menu.Item name='update'>
				{/* TODO: Change this to be a dropdown multiselect once the contacts packages is up */}
				<Input 
					name='contactSearchVal'
					placeholder='Search Contacts...'
					onChange={this.handleChange}
					fluid
					action={{
						icon: 'search'
					}}
				/>
			</Menu.Item>

			<Menu.Item> <h2> WAR </h2> </Menu.Item>

			<Menu.Item>
				<Button onClick={() => this.togglePane(Panes.Calculator)}>Calculator</Button>
			</Menu.Item>

			<Menu.Item>
				<Button onClick={() => this.togglePane(Panes.ListManager)}>List Manager</Button>
			</Menu.Item>

			<Menu.Item> <h2> COVID-19 </h2> </Menu.Item>

			<Menu.Item>
				<Button onClick={() => this.togglePane(Panes.AddEvent)}>Add Event</Button>
			</Menu.Item>

			<Menu.Item>
				<Button onClick={() => this.togglePane(Panes.PlanContact)}>Plan Contact</Button>
			</Menu.Item>

			<Menu.Item>
				<Button onClick={() => this.togglePane(Panes.Regulations)}>Regulation Map</Button>
			</Menu.Item>


			{/* TEST BUTTONS */}
			<Menu.Item>
				<Button
					onClick={() => {
						this.props.sendMsg('/api/db', 'GET');
					}}
				>
					DB GET
				</Button>
			</Menu.Item>
		</Menu>
    );

    configPane = (name, action, config) => {
    	const { curPanes } = this.state;
		let newPanes = Object.assign({}, curPanes);

		// Parse whether to replace, modify, or delete the specified pane
		switch (action) {
			case "ADD":
				newPanes[name] = config;
				break;
			case "MOD":
				newPanes[name] = Object.assign({}, curPanes[name] ? curPanes[name] : {}, config);
				break;
			case "CLEAR":
				newPanes = { [name]: config };
				break;
			default:
				console.error("[dashboard|configPane] Received a pane configuration of unknown type: ", action.actionType);
			case "DEL":
				newPanes[name] = undefined;
				break;
		}

		this.setState({
			curPanes: newPanes
		})
    }

    openUserGuide = () => {
    	console.log("[openUserGuide]");
    };

  	render() {
	  	const { showSidebar, showLogin, user, pass, curPanes, curCanvas } = this.state;
	  	const { testsReceived, fetchAt } = this.props;
	  	console.log("[render]", curPanes)


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
					<Pane compact className='db-sidebar-menu'>
						{this.renderSidebarMenu(true)}
					</Pane>

			    	{/* Renders the pane that can appear over the main canvas */}
			    	{curPanes && Object.keys(curPanes).map(name => {
			    		console.log("PANES: ", curPanes);
						switch(name) {
							case Panes.Calculator:
								return (<Calculator fetchAt={this.props.fetchAt} sendMsg={this.props.sendMsg} key={name} name={name} config={curPanes[name]} />);
							case Panes.ListManager:
								return (<ListManager fetchAt={this.props.fetchAt} sendMsg={this.props.sendMsg} key={name} name={name} config={curPanes[name]} />);
							default:
								return (<h3 key={name}> There was an error. Please reload the page. </h3>);
						}
			    	})}
				</Sidebar>

				{/* Main Content */}
	    		<Grid>
	    			{this.renderCanvas(curCanvas)}
	    		</Grid>
	    	</div>
		);
  	};
}

export const mapStateToProps = (state, props) => {
  return {
    testsReceived: state.appReducer.testsReceived,
    curCanvas: state.appReducer.curCanvas
  };
};

export default connect(mapStateToProps, { testAction, openCanvas })(Dashboard);
