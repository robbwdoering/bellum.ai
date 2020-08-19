const express = require('express');
const path = require('path');

class MytRouter {
	constructor(app) {
		this.app = app;

		// HACK - post requests of type 'application/json' are having their types overriden by the mode somehow.
		// This changes them back to json. Fix when the overriding is fixed - see https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request
		// NOTE: plain text requests will NOT function while this is being executed
		app.use(
			express.json({
				type: ['application/json', 'text/plain']
			})
		);

		// Answer API requests.
		app.get('/api', function (req, res) {
			console.error('[connection] Received GET request.');
			res.set('Content-Type', 'application/json');
			res.send('{"payload":"Hello from the custom server!", "type": "TEST_ACTION"}');
		});

		app.post('/api', function (req, res) {
			console.error('[connection] Received POST request. BODY:', req.body);
			res.set('Content-Type', 'application/json');
			res.send('{"payload":"Hello from the custom server!", "type": "TEST_ACTION"}');
		});

		// All remaining requests return the React app, so it can handle routing.
		app.get('*', function (request, response) {
			console.error('Got another request...');
			response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
		});
	}
}

const initRouter = app => {
};

exports.initRouter = initRouter;
