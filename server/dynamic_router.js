const express = require('express');
const path = require('path');

// Database
const { sql } = require('pg');

// Authentication - auth0 JWT libraries
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// Local files
const map = require('./map');
const config = require('./config');
const constants = require('./constants');
const lib = require('./router_library');

const derive = require("./derive");

const sendMsg = (res, msg) => {
	res.set('Content-Type', 'application/json');
	res.send(JSON.stringify(msg));
};

const queryDB = async(pool, query) => {
	try {
		const client = await pool.connect();
		const result = await client.query(query);
		return { results: result ? result.rows : null};
	} catch (err) {
		console.error(err);
		return { results: null }
	}
};


class DynamicRouter {
	constructor(app, pool, jwtCheck) {
		// app.use(
		// 	express.json({
		// 		type: ['application/json', 'text/plain']
		// 	})
		// );

		/**
		 * Fetch Chart 
		 * Get chart data for the chart identified.
		 */
		app.get('/api/dynamic/forceScorecard/:listId', jwtCheck, async (req, res) => {
			console.log("[GET forcePolar]");

			let results = await queryDB(pool, "SELECT (name, points, faction, rating, id) from war_list WHERE userId = $1 AND id = $2;", [lib.userid(req), req.params.listId]);

			if (results && results.rows.length) {
				results = results.rows[0];
				console.log("Got results: ", results);

				// values = derive.drvScorecardVals(results);
			}	

			lib.sendMsg(res, {type: "SET_METALIST", payload: results});
		});
	}
}

exports.DynamicRouter = DynamicRouter;
