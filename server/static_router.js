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


class StaticRouter {
	constructor(app, pool, jwtCheck) {
		// HACK - post requests of type 'application/json' are having their types overriden by the mode somehow.
		// This changes them back to json. Fix when the overriding is fixed - see https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request
		// NOTE: plain text requests will NOT function while this is being executed
		app.use(
			express.json({
				type: ['application/json', 'text/plain']
			})
		);

		/**
		 * Fetch Metalist
		 * Gets the metalist for this user, returning all of that user's lists. NOTE: Does not return actual list contents, just header info for each.
		 */
		app.get('/api/static/metalist', jwtCheck, async (req, res) => {
			console.log("[fetch metalist]");

			let results = await lib.queryDB(pool, "SELECT (name, points, faction, rating, id) from war_list WHERE userId = '" + lib.userid(req) + "';");
			console.log("returning: ", results);
			lib.sendMsg(res, {type: "SET_METALIST", payload: results});
		});

		/**
		 * Fetch List Details
		 * Gets the contents of a list, along with all the relevant profile information. 
		 */
		app.get('/api/static/list/:isPrimary/:listName', jwtCheck, async (req, res) => {
			console.log("[GET list]");

			// Get the list from the database
			let results = await lib.queryDB(pool, "SELECT (json) from war_list WHERE userId = '" + lib.userid(req) + "' AND name = '" + req.params.listName + "';");
			if (results && results.results && results.results.length && results.results[0].json) {
				results = lib.massageList(results.results[0].json);
			}

			// Fetch the profiles that are needed to understand this list, and massage them
			const profiles = await lib.getProfilesForList(pool, results);
			lib.massageProfile(pool, profiles, results);

			lib.sendMsg(res, {type: req.params.isPrimary === "true" ? "SET_PRIMARY_LIST" : "SET_SECONDARY_LIST", payload: {profiles, results}});
		});

		/**
		 * POST a nest list. 
		 * Updates the list by this name for this user.
		 */
		app.post('/api/static/list', jwtCheck, async (req, res) => {
			console.log("[POST List]");
			const units = lib.processUnits(pool, req.body.detachments);
			let query = `INSERT INTO war_list (userId, name, points, faction, rating, json)
				VALUES ('${lib.userid(req)}', '${req.body.name}', ${req.body.points}, '${req.body.detachments[0].faction}', 0, '${JSON.stringify({units: units, cp: req.body.cp, name: req.body.name}).replace(/'/gm, "")}');`;
			let results = await lib.queryDB(pool, query);

			if (!req.body.profile) {
				console.log("This army doesn't have a profile - please attach one next time.");
			}  else {
				lib.processProfile(pool, req.body.profile);
			}

			results = await lib.queryDB(pool, "SELECT (name, points, faction, rating, id) from war_list WHERE userId = '" + lib.userid(req) + "';");
			lib.sendMsg(res, {type: "SET_METALIST", payload: results});
		});

		/**
		 * Fetch Unset Profiles
		 * Gets the unset profiles that still need custom meaning objects created.
		 */
		app.get('/api/static/profiles/:type/unset', jwtCheck, async (req, res) => {
			console.log("[fetch unset profiles]");

			let fields = "";
			switch (req.params.type) {
				case "desc":
					fields = "description, meaning";
					break;
				case "power":
					fields = "details, meaning";
					break;
				case "weapon":
					fields = "abilities, meaning";
					break;
				default:
					console.error("Received unset profile request of unknown type: ", req.params.type);
					return;
			}

			let results = await lib.queryDB(pool, `SELECT (name, ${fields} ) from war_${req.params.type}_profile;`);
			lib.sendMsg(res, {type: "SET_UNSET_PROFILES", payload: results});
		});

		// All remaining requests return the React app, so it can handle routing.
		app.get('*', function (request, response) {
			console.log("got uncaught...");
			response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
		});

	}
}

exports.StaticRouter = StaticRouter;
