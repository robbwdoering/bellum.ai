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
import { Button, Grid, Loading, Icon, Header, Sidebar } from 'semantic-ui-react';

import { testAction } from './../app/actions';
import { Pane } from './../common/pane';

// Custom
// import './dashboard.css';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSidebar: true
		};
	};

    sendReduxTest = () => {
	    this.props.testAction('FROM_DASHBOARD');
    };

  render() {
  	const { showSidebar } = this.state;
  	const { testsReceived } = this.props;

    return (
    	<div className="dashboard">
    		<Grid>
		    	{/* Header */}
    			<Grid.Row>
    				<Grid.Column floated='left' width={2}>
    					<Button
	    					icon
	    					onClick={() => this.setState({showSidebar: !showSidebar}) }
    					>
    						<Icon circular name={'chevron ' + ( showSidebar ? 'down' : 'right')} />
    					</Button>
    				</Grid.Column>
    				<Grid.Column>
    					<Header
    					/>
    				</Grid.Column>
    			</Grid.Row>

    			<Grid.Row>
		    		{/* Sidebar */}
    				<Grid.Column>
    					<Sidebar
    						animation='overlay'
    						className="db-sidebar"
    						visible={showSidebar}
    						width='very wide'
    						direction='left'
    					>
	    					<Pane>
	    						<Button onClick={this.sendReduxTest}>Update redux</Button>
	    						{testsReceived}
	    					</Pane>

    					</Sidebar>
    				</Grid.Column>

		    		{/* Main Content */}
    				<Grid.Column>
    				</Grid.Column>
    			</Grid.Row>
    		</Grid>
    	</div>
	);
  };
}

export const mapStateToProps = (state, props) => {
  return {
    testsReceived: state.appReducer.testsReceived
  };
};

export default connect(mapStateToProps, { testAction })(Dashboard);
