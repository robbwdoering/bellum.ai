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

import './map.css';


export class HexMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	};

  	render() {
	    return (
	    	<div className="hexmap">
	    		<h2> Rendering a hexmap! </h2>
	    	</div>
		);
  	};
}

export const mapStateToProps = (state, props) => {
  return {
  };
};

export default connect(mapStateToProps, { })(HexMap);
