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
import { withAuth0 } from '@auth0/auth0-react';
import { Button, Grid, Header, Tab, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { HeaderContainer } from './Header';
import { testAction, openCanvas } from './../app/actions';
import Pane from './../common/pane';
import AddEventPane from "./../common/addEvent";
import { Panes, Canvases, ContentTypes, contentStyles, initialPaneConfigs } from './../common/constants';
import ThreeMap from './../map/threeMap';
import Calculator from "./../war/calculator"; 
import ListManager from "./../war/listManager"; 
import { UnitDeck, ArmyDetails, ProfileEditor } from "./../war/strategy"; 

import { ContentContainer } from "./../contents/Content";
import './navigation.css';

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
		});
    };

    openUserGuide = () => {
    	console.log("[openUserGuide]");
    };

    renderPane = name => {
	  	const { showLogin, user, pass, curPanes, curCanvas } = this.state;
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
    };

  	render() {
	  	const { showLogin, user, pass, curPanes, curCanvas, selectedMain } = this.state;
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
	    		<HeaderContainer handleFetch={this.props.handleFetch} />
				{/* Sidebar menu that overlays on the app */}
				{/* Main Content */}
				{this.props.hoverItems && Object.keys(this.props.hoverItems).map(key => {
					return this.props.hoverItems[key];
				})}

    			{this.renderCanvas(curCanvas)}

    			<ContentContainer sendMsg={this.props.sendMsg} windowCtx={this.dbRef.current} handleFetch={this.props.handleFetch} />

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

export default withAuth0(connect(mapStateToProps, { testAction, openCanvas })(Dashboard));
