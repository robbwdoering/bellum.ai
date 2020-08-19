const express = require('express');
const path = require('path');
const map = require('./map');
const config = require('./config');

const sendMsg = (res, msg) => {
	res.set('Content-Type', 'application/json');
	res.send(JSON.stringify(msg));
};

const queryDB = async(pool, query) => {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT * FROM test_table;");
		return { results: result ? result.rows : null};
	} catch (err) {
		console.error(err);
		return { results: null }
	}
};

class MytRouter {
	constructor(app, pool) {
		this.app = app;
		this.mapGen = new map.MapGenerator(config.RAD, config.SIZE)

		// HACK - post requests of type 'application/json' are having their types overriden by the mode somehow.
		// This changes them back to json. Fix when the overriding is fixed - see https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request
		// NOTE: plain text requests will NOT function while this is being executed
		app.use(
			express.json({
				type: ['application/json', 'text/plain']
			})
		);

		// Answer API requests.
		app.get('/api/db', async (req, res) => {
			const results = await queryDB(pool, 'SELECT * FROM test_table;');
			sendMsg(res, {type: "DB_ACTION", results});
		});

		app.post('/api/db', async (req, res) => {
			console.log("got a db post...");
		});

		app.get('/api/map/init', function (req, res) {
			console.error('[connection] Received GET request.');
			sendMsg(res, {type: "INIT_MAP_DATA", payload: {
				oceans: this.mapGen.oceans,
				hexRad: config.RAD,
				gridSize: config.SIZE
			}});
		});
		app.get('/api', function (req, res) {
			console.error('[connection] Received GET request.');
			sendMsg(res, {type: "TEST_ACTION", payload: "Responding to a GET request."});
		});

		app.post('/api', function (req, res) {
			console.error('[connection] Received POST request. BODY:', req.body);
			sendMsg(res, {type: "TEST_ACTION", payload: "Responding to a POST request."});
		});

		// All remaining requests return the React app, so it can handle routing.
		app.get('*', function (request, response) {
			console.error('Got another request...');
			response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
		});
	}
}

exports.MytRouter = MytRouter;
