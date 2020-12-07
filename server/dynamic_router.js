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
const util = require('./utilities');

const derive = require("./derive");

class DynamicRouter {
	constructor(app, pool, jwtCheck) {
		app.use(
			express.json({
				type: ['application/json', 'text/plain']
			})
		);

		/**
		 * Fetch Chart 
		 * Get chart data for the chart identified.
		 */
		app.post('/api/dynamic/ForceScorecard/:listId', jwtCheck, async (req, res) => {
			console.log("[POST forcePolar]");
			let values = derive.drvScorecardVals(req.body.force, req.body.profile, constants.defTestProfile);

			console.log('got value: ', values)

			util.sendMsg(res, {type: "SET_FORCE_SCORECARD", payload: [ req.params.listId, values ]});
		});
	}
}

exports.DynamicRouter = DynamicRouter;
