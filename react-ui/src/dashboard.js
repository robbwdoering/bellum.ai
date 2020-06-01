// FILENAME: dashboard.js
// DESCRIPTION: This is the component rendered at the top of the visible tree, just below App.
// Contains hooks for the sidebar, header bar / menu, heads up status, and main content.

// React + Redux
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import store from './store';

// Custom
import './dashboard.css';

export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Button> TEST TEST TEST </Button>
      </div>
    );
  }
}

export default connect;
