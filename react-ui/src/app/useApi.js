import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useApi = (url, method, options = {}, handleFetch, data, execute = true) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: false,
    data: null
  });
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [doneInit, finishInit] = useState(false);
  const perform = async (urlSuffix, overrideValues, overrideMethod) => {
      /*
      if (!isAuthenticated) {
        console.log("We're not authenticated!");
        return;
      }
      */


      try {
        const { audience, scope, ...fetchOptions } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });

        let msg = {
          method: overrideMethod || method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        };

        // Append data if it was passed
        if (overrideValues) {
          msg.body = JSON.stringify(overrideValues);

        // 
        } else if (data && method !== "GET") {
          msg.body = JSON.stringify(data);
        }
        setState(Object.assign({}, state, { loading: true }))

        // Perform the fetch asynchrounously
        console.log("[CALLING API] ", url + (urlSuffix || ""), msg.method, msg.body);
        fetch(url + (urlSuffix || ""), msg)
          .then(response => {
            if (!response.ok) {
              console.error('[sendMsg] Received a bad status from the server: ', response.status);
              throw new Error(`status ${response.status}`);
            }
            return response.json();
          })
          .then((json) => {
            // This line handles all responses - created at app root to hook into redux
            if (handleFetch) {
              handleFetch(json);
            }

            setState(Object.assign({}, state, {data: json}))

            // Turn off loading indicator
            setState(Object.assign({}, state, { loading: false }));
          })
          .catch(e => {
            console.log('call failed', e);
          });
      } catch (error) {
        console.log('useApi FAILURE from exception: ', error);
        setState({
          ...state,
          error,
          loading: false
        });
      }
  };

  // Every time we're told to refresh, call async.
  // useEffect(() => perform, [refreshIndex]);

  return {
    ...state,
    // refresh: () => setRefreshIndex(refreshIndex + 1)
    refresh: perform
  };
};
