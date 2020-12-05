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
		app.post('/api/dynamic/ForceScorecard/:listId', jwtCheck, async (req, res) => {

			let json = req.body;
			let profiles = [];
			console.log("[POST forcePolar]", json, "THEN", req.body);
			let { results } = await lib.queryDB(pool, "SELECT (json) from war_list WHERE userId = $1 AND id = $2;",  [lib.userid(req), req.params.listId]);

			console.log("Got results: ", results);
			if (results && results[0] && results[0].json) {
				json = results[0].json;
				console.log("got json", json);
				
				values = derive.drvScorecardVals(results);
			}	

			lib.sendMsg(res, {type: "SET_CHART_DATA", payload: results});
		});
	}
}

exports.DynamicRouter = DynamicRouter;
