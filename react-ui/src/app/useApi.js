import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useApi = (url, method, options = {}, handleFetch, data, execute = true) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null
  });
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [doneInit, finishInit] = useState(false);

  // Every time we're told to refresh, call async.
  useEffect(() => {
    (async () => {
      /*
      if (!isAuthenticated) {
        console.log("We're not authenticated!");
        return;
      }
      */

      // This block stops these calls from taking place until refresh is called
      if (refreshIndex == 0) {
        return;
      }
      console.log("CALLING API: ", url, method, data);

      try {
        const { audience, scope, ...fetchOptions } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });

        let msg = {
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        };

        // Append data if it was passed
        if (data && method !== "GET") {
          msg.body = JSON.stringify(data);
        }

        // Perform the fetch asynchrounously
        fetch(url, msg)
          .then(response => {
            if (!response.ok) {
              console.error('[sendMsg] Received a bad status from the server: ', response.status);
              throw new Error(`status ${response.status}`);
            }
            return response.json();
          })
          .then(handleFetch)
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
    })();
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1)
  };
};
