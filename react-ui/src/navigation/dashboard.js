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
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { testAction, openCanvas } from './../app/actions';
import Pane from './../common/pane';
import AddEventPane from "./../common/addEvent";
import { Panes, Canvases, ContentTypes, contentStyles, initialPaneConfigs } from './../common/constants';
import ThreeMap from './../map/threeMap';
import Calculator from "./../war/calculator"; 
import ListManager from "./../war/listManager"; 
import { UnitDeck, ArmyDetails, ProfileEditor } from "./../war/strategy"; 

import { ContentContainer } from "./../contents/Content";
import './dashboard.css';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSidebar: false,
			showLogin: false,
			user: "",
			pass: "",
			curPanes: { },
			curCanvas: Canvases.ThreeMap,
			canvasX: 0,
			canvasY: 0,
			selectedMain: 0 
		};

		this.dbRef = React.createRef();
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
		// <div className='mytine-canvas-container'>
	    	// {/* Renders the main canvas, which always appears but is sometimes dimmed */}
			curCanvas && curCanvas.length && (() => {
				switch(curCanvas) {
					case Canvases.HexMap:
						// return (<HexMap x={this.state.canvasX} y={this.state.canvasY} />);
					case Canvases.ThreeMap:
						return (<ThreeMap />);
					default:
						return (<h3> There was an error. Please reload the page. </h3>);
				}
			})()
		// </div>
	);

    // TODO add context menu option to have mutliple of the same key at once? Would have to rework this structure 
	togglePane = name => {
		if (Object.keys(this.state.curPanes).includes(name)) {
			this.configPane(name, "DEL");
		} else {
			console.log("TOGGLING: ", initialPaneConfigs, initialPaneConfigs[name])
			this.configPane(name, "ADD", initialPaneConfigs[name]);
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

			<Menu.Item> <h2> Main Window </h2> </Menu.Item>

			<Menu.Item as='a' onClick={() => {
				this.configPane([Panes.UnitDeck, Panes.ArmyDetails], "ADD", [initialPaneConfigs[Panes.UnitDeck], initialPaneConfigs[Panes.ArmyDetails]]);
			}}
			>
				Strategic Overview
			</Menu.Item>

			<Menu.Item as='a' onClick={() => this.togglePane(Panes.ArmyDetails)}>
				Army Details	
			</Menu.Item>

			<Menu.Item as='a' onClick={() => this.togglePane(Panes.ProfileEditor)}>
				Profile Editor	
			</Menu.Item>

			<Menu.Item as='a' onClick={() => this.togglePane(Panes.ListManager)}>
				List Manager
			</Menu.Item>

			<Menu.Item> <h2> Utilities </h2> </Menu.Item>

			<Menu.Item as='a' onClick={() => this.togglePane(Panes.UnitDeck)}>
				Unit Deck	
			</Menu.Item>

			<Menu.Item as='a' onClick={() => this.togglePane(Panes.Calculator)}>
				Calculator
			</Menu.Item>

		</Menu>
    );

    configPane = (name, action, config) => {
    	const { curPanes } = this.state;
		let newPanes = action === "CLEAR" ? {} : Object.assign({}, curPanes);

    	console.log("configPane", name, action, config);
    	let nameArr = Array.isArray(name) ? name : [name];
    	let configArr = Array.isArray(config) ? config : [config];

    	nameArr.forEach((name, i) => {
			// Parse whether to replace, modify, or delete the specified pane
			switch (action) {
				case "ADD":
				case "CLEAR":
					newPanes[name] = configArr[i];
					break;
				case "MOD":
					newPanes[name] = Object.assign({}, curPanes[name] ? curPanes[name] : {}, configArr[i]);
					break;
				default:
					console.error("[dashboard|configPane] Received a pane configuration of unknown type: ", action.actionType);
				case "DEL":
					newPanes[name] = undefined;
					break;
			}
    	});

		this.setState({
			curPanes: newPanes
		})
    }

    openUserGuide = () => {
    	console.log("[openUserGuide]");
    };

    renderPane = name => {
	  	const { showSidebar, showLogin, user, pass, curPanes, curCanvas } = this.state;
	  	const { testsReceived, sendMsg, fetchAt } = this.props;
		switch(name) {
			case Panes.UnitDeck:
				return (<UnitDeck fetchAt={this.props.fetchAt} sendMsg={this.props.sendMsg} key={name} name={name} config={curPanes[name]} />);
			case Panes.ArmyDetails:
				return (<ArmyDetails fetchAt={this.props.fetchAt} sendMsg={this.props.sendMsg} key={name} name={name} config={curPanes[name]} />);
			case Panes.Calculator:
				return (<Calculator fetchAt={this.props.fetchAt} sendMsg={this.props.sendMsg} key={name} name={name} config={curPanes[name]} />);
			case Panes.ListManager:
				return (<ListManager fetchAt={this.props.fetchAt} sendMsg={this.props.sendMsg} key={name} name={name} config={curPanes[name]} />);
			default:
				return (<h3 key={name}> There was an error. Please reload the page. </h3>);
		}
    }

  	render() {
	  	const { showSidebar, showLogin, user, pass, curPanes, curCanvas, selectedMain } = this.state;
	  	const { testsReceived, fetchAt, sendMsg, curContent } = this.props;
	  	console.log("[db|render]", curPanes, this.props.hoverItems)

	  	const mainPanels = [], sidePanels = [];
    	if (curPanes) Object.keys(curPanes).forEach(name => {
    		console.log("PANES: ", curPanes);
			switch(name) {
				case Panes.UnitDeck:
				case Panes.Calculator:
					sidePanels.push(name);
					break
				case Panes.ListManager:
				case Panes.ArmyDetails:
				case Panes.ProfileEditor:
					mainPanels.push(name);
					break;
				default:
					console.log("Unknown pane name: ", name);
			}
    	});

    	const tmpPanels = mainPanels.map(name => ({
			menuItem: name,
			render: () => (
				<Tab.Pane attached={false}>
					<Pane key={name} className="db-main-pane" header name={name}>
						{this.renderPane(name)}
					</Pane>
				</Tab.Pane>
			)
		}));

	    return (
	    	<div className="dashboard" ref={this.dbRef}>
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

			    	{/* Render the panes that can appear over the main canvas */}
			    	<Grid>
			    		<Grid.Row>
					    	{/* The main display, which uses tabs*/}
			    			<Grid.Column width={12}>
			    				<Tab value={selectedMain} onChange={e => this.setState({selectedMain: e.target.value })} menu={{secondary: true, pointing: true}} panes={tmpPanels} />
			    			</Grid.Column>

					    	{/* The right sidebar of small items */}
			    			<Grid.Column width={4} className="db-small-pane-container">
				    			{sidePanels && sidePanels.length > 0 && sidePanels.slice(0, 3).map(name => 
				    				<Grid.Row> <Pane compact> {this.renderPane(name)} </Pane> </Grid.Row>
			    				)}
			    			</Grid.Column>
			    		</Grid.Row>

				    	{/* The bottom sidebar of small items */}
			    		<Grid.Row className="db-small-pane-container">
			    			{sidePanels && sidePanels.length > 3 && sidePanels.slice(3, 7).map(name => 
			    				<Grid.Column width={4}> <Pane compact> {this.renderPane(name)} </Pane> </Grid.Column>
		    				)}
			    		</Grid.Row>
			    	</Grid>
				</Sidebar>

				{/* Main Content */}
				{this.props.hoverItems && Object.keys(this.props.hoverItems).map(key => {
					return this.props.hoverItems[key];
				})}

    			{this.renderCanvas(curCanvas)}

    			<ContentContainer windowCtx={this.dbRef.current} />

	    	</div>
		);
  	};
}

export const mapStateToProps = (state, props) => {
  return {
    testsReceived: state.appReducer.testsReceived,
    curCanvas: state.appReducer.curCanvas,
    curContent: state.appReducer.curContent,
    hoverItems: state.mapReducer.hoverItems,
    hoverHash: state.mapReducer.hoverHash,
    demoState: state.appReducer.demoState
  };
};

export default connect(mapStateToProps, { testAction, openCanvas })(Dashboard);
