import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useApi = (url, method, options = {}, handleFetch, data, execute = true) => {
    const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
    const [state, setState] = useState({
        error: null,
        loading: false,
        data: null
    });


    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const perform = async (urlSuffix, overrideValues, overrideMethod) => {
        let count = 20;
        while ((!isAuthenticated) && count > 0) {
            count--;
            console.log("We're not authenticated - looping.");
            await sleep(1000);
        }

        try {
            const { audience, scope  } = options;
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
                    console.error('[useApi] Received a bad status from the server: ', response.status);
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
