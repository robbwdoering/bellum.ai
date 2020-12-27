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
		 * Meaning Engine Refresh
		 * This is the main entry point for calculations performed during the course of a game.
		 * Inputs: Match State (round+phase), Board State (Unit locations + health), Profile Keys
		 * Output: Object that contains an array of active rules for every unit, outgoing dmg matrix, incoming dmg matrix
		 */
		app.post('/api/dynamic/meaning/refresh', jwtCheck, async (req, res) => {
			console.log("[POST] refresh");
			const { matchState, boardState, profiles, lists } = req.body;

			// Build an array of all the "desc" rules that apply to each of the listed units

			// Build the model damage matrices, but only if the inputs have changed
		});

		/**
		 * Fetch Force Scorecard 
		 * Get the chart data for a force. 
		 */
		app.post('/api/dynamic/ForceScorecard/:listId', jwtCheck, async (req, res) => {
			console.log("[POST force scorecard]");
			const { force, profile } = req.body;
			let scorecard = derive.drvScorecardVals(force, profile, constants.defTestProfile);

			console.log('got value: ', scorecard)

			util.sendMsg(res, {type: "SET_FORCE_SCORECARD", payload: [ req.params.listId, scorecard ]});
		});

	}
}

exports.DynamicRouter = DynamicRouter;
