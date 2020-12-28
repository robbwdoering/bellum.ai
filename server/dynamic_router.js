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
		 *
		 * Inputs: Match State (round+phase), Board State (Unit locations + health), Profile Keys
		 *
		 * Output: Jagged 5D Array called a "damage matrix". 
		 * D1: playerIdx
		 * D2: unitIdx
		 * D3: enemyUnitIdx
		 * D4: There is an entry in these array for every unique model/weapon combination 
		 * D5: This array holds [mean, deviation] for the expected damage
		 *
		 * By design, most entries in the third dimension will be 0 for all but the initial request.
		 * This is because we skip units in various ways:
		 * 		Only interactions involving a "flagged" unit will have non-0 entries
		 *			(i.e. every flagged unit populates a full row  in one array, and a whole column in the other)
		 *		Only interactions involving living units are run/stored
		 */
		app.post('/api/dynamic/meaning/refresh', jwtCheck, async (req, res) => {
			console.log("[POST] refresh");
			const { matchState, boardState, profiles, lists } = req.body;

			// D1 
			const dmgMatrices = boardState.units.map((units, playerIdx) => (
				// D2
				units.map(unit, unitIdx) => (
					// D3
					boardState.units[playerIdx ? 0 : 1].map((enemyUnit, enemyUnitIdx) => {
						// If either unit is dead or both are unflagged, skip this unit
						if (!unit.pos || !enemyUnit.pos || (!unit.flag && !enemyUnit.flag)) {

						}

						// Else get D4 and D5 from the divination engine
					});
				)	
			);
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
