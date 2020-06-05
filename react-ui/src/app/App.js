/* Node Modules */
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCheckSquare, faChevronCircleRight, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';


/* Local */
import Dashboard from './../dashboard/dashboard';
import logo from './logo.svg';
import { AppActions } from "./constants";
import { testAction, openPane, openCanvas } from "./actions";
import './App.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import 'semantic-ui-css/semantic.min.css';

const App = ({ testAction }) => {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  // TODO - this doesn't seem like it's going to support multiple concurrent requests... I don't think we should just hope that doesn't happen,
  // especially if future functionality requires frequent handshakes
  // TODO - move this to 'common'
  const fetchData = url => {
    setIsFetching(true);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setIsFetching(false);
        switch(json.type) {
          case AppActions.TEST_ACTION:
            testAction(json.message);
            break;
          case AppActions.OPEN_PANE:
            openPane(json.message);
            break;
          case AppActions.OPEN_CANVAS:
            openCanvas(json.message);
            break;
          default:
            throw new Error(`Unrecognized Type: ${json.type}`)
        }
      })
      .catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      });
  };

  // useEffect(() => {
  //   setIsFetching(true);
  //   fetchData();
  // }, [fetchData]);

  return (
    <div className="App">
      <Dashboard fetchAt={fetchData} />
    </div>
  );
}

export default connect(null, { testAction })(App);
