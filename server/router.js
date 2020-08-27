const express = require('express');
const path = require('path');
const map = require('./map');
const config = require('./config');
const constants = require('./constants');
const { sql } = require('pg');

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


class MytRouter {
	constructor(app, pool) {
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
		app.get('/api/db/war/metalist/:userId', async (req, res) => {
			console.log("Fetching metalist.");

			let results = await queryDB(pool, "SELECT (name, points, faction, rating, id) from war_list WHERE userId = " + req.params.userId + ";");
			sendMsg(res, {type: "SET_METALIST", payload: results});
		});

		/**
		 * Fetch Unset Profiles
		 * Gets the unset profiles that still need custom meaning objects created.
		 */
		app.get('/api/war/profiles/:type/unset/:userId', async (req, res) => {
			console.log("Fetching unset profiles");

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

			let results = await queryDB(pool, `SELECT (name, ${fields} ) from war_${req.params.type}_profile;`);
			console.log("RESULTS", results);
			sendMsg(res, {type: "SET_UNSET_PROFILES", payload: results});
		});

		/**
		 * Fetch List Details
		 * Gets the contents of a list, along with all the relevant profile information. 
		 */
		app.get('/api/db/war/list/:isPrimary/:listId/:userId', async (req, res) => {
			console.log("Fetching list for user", req.params.userId, req.params.listId);

			// Get the list from the database
			let results = await queryDB(pool, "SELECT (json) from war_list WHERE userId = " + req.params.userId + " AND id = " + req.params.listId + ";");
			console.log("Dealing with results: ", results);
			if (results && results.results && results.results.length && results.results[0].json) {
				console.log("Massaging list.");
				results = massageList(results.results[0].json);
			}

			// Fetch the profiles that are needed to understand this list, and 
			const profiles = getProfilesForList(pool, results);
			massageProfile(pool, profiles, results);

			sendMsg(res, {type: req.params.isPrimary === "true" ? "SET_PRIMARY_LIST" : "SET_SECONDARY_LIST", payload: {profiles, results}});
		});

		/**
		 * Fetch List Details
		 * Gets the contents of a list, along with all the relevant profile information. 
		 */
		app.post('/api/db/war/list', async (req, res) => {
			console.log("Posting list from user.");
			const units = processUnits(pool, req.body.detachments);
			let query = `INSERT INTO war_list (userId, name, points, faction, rating, json)
				VALUES (${req.body.userId}, '${req.body.name}', ${req.body.points}, '${req.body.detachments[0].faction}', 0, '${JSON.stringify({units: units, cp: req.body.cp, name: req.body.name}).replace(/'/gm, "")}');`;
			console.log("enterying query: ", query);
			let results = await queryDB(pool, query);

			if (!req.body.profile) {
				console.log("This army doesn't have a profile - please attach one next time.");
			}  else {
				processProfile(pool, req.body.profile);
			}

			results = await queryDB(pool, "SELECT (name, points, faction, rating, id) from war_list WHERE userId = " + req.params.userId + ";");
			sendMsg(res, {type: "SET_METALIST", payload: results});
		});

		app.post('/api/db', async (req, res) => {
			console.log("got a db post...");
		});

		// app.get('/api/map/init', function (req, res) {
		// 	console.error('[connection] Received GET request.');
		// 	sendMsg(res, {type: "INIT_MAP_DATA", payload: {
		// 		oceans: this.mapGen.oceans,
		// 		hexRad: config.RAD,
		// 		gridSize: config.SIZE
		// 	}});
		// });

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

const processProfile = async(pool, profile) => {
	let str;
	const curSec = Math.floor(Date.now / 1000)
	// Handle Psychic Powers
	if (profile.powers) {
		str = Object.keys(profile.powers).reduce((acc, e, i ) => {
			str += `${i > 0 ? "," : ""} ('${profile.powers[e].name}', ${profile.powers[e].warp_charge}, '${profile.powers[e].range}', '${profile.powers[e].details}', '${JSON.stringify({lastUpdated: curSec})}')`
			return acc;
		}, "");

		if (str.length) {
			str = "INSERT INTO war_power_profile (name, warp_charge, range, details, `meaning) VALUES " + str + " ON CONFLICT (name) DO NOTHING RETURNING name;";
			console.log("enterying query: ", query);

			results = await queryDB(pool, query);
			console.log("Got results: ", results);
		}
	}

	// Handle "Description" attributes (general rules)
	if (profile.desc) {
		str = Object.keys(profile.desc).reduce((acc, e, i ) => {
			acc += `${i > 0 ? "," : ""} ('${e}', '${profile.desc[e].replace(/'/gm, "")}', '${JSON.stringify({lastUpdated: curSec})}')`
			return acc;
		}, "");

		if (str.length) {
			str = "INSERT INTO war_desc_profile (name, description, meaning) VALUES " + str + " ON CONFLICT (name, description) DO NOTHING RETURNING name;";
			console.log("enterying query: ", str);

			results = await queryDB(pool, str);
			console.log("Got results: ", results);
		}
	}

	if (profile.psykers) {
		str = Object.keys(profile.psykers).reduce((acc, e, i ) => {
			acc += `${i > 0 ? "," : ""} ('${e}', ${profile.psykers[e].cast}, ${profile.psykers[e].deny}, '${profile.psykers[e].other}', '${profile.psykers[e].powers_known}')`
			return acc;
		}, "");

		if (str.length) {
			str = "INSERT INTO war_psyker_profile (name, castNum, deny, other, powers_known) VALUES " + str + " ON CONFLICT (name) DO NOTHING RETURNING name;";
			console.log("enterying query: ", str);

			results = await queryDB(pool, str);
			console.log("Got results: ", results);
		}
	}

	if (profile.stats) {
		str = Object.keys(profile.stats).reduce((acc, e, i ) => {
			let obj = profile.stats[e];
			acc += `${i > 0 ? "," : ""} ('${e}', '${obj.a}', ${parseInt(obj.bs) || -1}, ${parseInt(obj.ws) || -1}, ${parseInt(obj.m) || -1}, ${parseInt(obj.save) || -1}, ${obj.save.match && obj.save.match(/[0-9]+\+\/[0-9]+\+\+/g) ? parseInt(obj.save.substring(obj.save.indexOf("/") + 1)) : 0}, ${parseInt(obj.t)}, ${parseInt(obj.w)}, ${parseInt(obj.ld)})`
			return acc;
		}, "");

		if (str.length) {
			str = "INSERT INTO war_stat_profile (name, attacks, ballistics, weapons, move, save, invuln, toughness, wounds, leadership) VALUES " + str + " ON CONFLICT (name) DO NOTHING RETURNING name;";
			console.log("enterying query: ", str);

			results = await queryDB(pool, str);
			console.log("Got results: ", results);
		}
	}

	if (profile.weapons) {
		let type, shots, idx, tmpStr;
		str = Object.keys(profile.weapons).reduce((acc, e, i ) => {
			let obj = profile.weapons[e];

			// Parse shots to a string here, and from a string to a float after loading from database in massageProfile funciton
			if (obj.type === "Melee") {
				type = "Melee";
			} else { 
				idx = obj.type.lastIndexOf(" ");
				type = obj.type.substring(0, idx);

				if (obj.type.match(/(Rapid Fire |Heavy |Pistol |Assault |Grenade )(\d+|\d+D\d+|D\d+)$/g)) { 
					shots = obj.type.substring(idx + 1);
				} else {
					console.error("Problem parsing weapon type: ", obj.type);
				}
			}

			acc += `${i > 0 ? "," : ""} ('${e}', ${obj.ap || 0}, '${obj.d || 1}', ${parseInt(obj.range) || 0}, ${parseInt(obj.s) || -1}, '${obj.type}', '${obj.abilities || ""}', '${JSON.stringify({lastUpdated: curSec})}')`;
			return acc;
		}, "");

		if (str.length) {
			str = "INSERT INTO war_weapon_profile (name, ap, damage, range, strength, weaponType, abilities, meaning) VALUES " + str + " ON CONFLICT (name) DO NOTHING RETURNING name;";
			console.log("enterying query: ", str);

			results = await queryDB(pool, str);
			console.log("Got results: ", results);
		}
	}
}

const massageProfile = (pool, profile, army) => {
	let idx;
	console.log("Massaging profile:", profile, profile.weapons);

	profile.weapons = profile.weapons && profile.weapons.forEach(obj => {
		// Parse shots from a string to a float after loading
		if (obj.weaponType === "Melee") {
			obj.type = "Melee";
		} else { 
			idx = obj.type.lastIndexOf(" ");
			obj.type = obj.type.substring(0, idx);

			if (obj.weaponType.match(/(Rapid Fire |Heavy |Pistol |Assault |Grenade )\d+$/g)) { 
				obj.shots = obj.weaponType.substring(idx + 1);
			} else if (obj.weaponType.match(/(Rapid Fire |Heavy |Pistol |Assault |Grenade )\d+D\d+$/g)) { 
				idx = tmpStr.indexOf("D");
				obj.dice = parseInt(tmpStr.substring(0, idx));
				obj.dieSize = parseInt(tmpStr.substring(idx+1));

				obj.shots = obj.dice * ((dieSize + 1) / 2);
			} else if (obj.weaponType.match(/(Rapid Fire |Heavy |Pistol |Assault |Grenade )D\d+$/g)) { 
				obj.dieSize = parseInt(tmpStr.substring(idx + 2));

				obj.shots = (obj.dieSize + 1) / 2;
			}
		}
	});
};

const getAllDetailsFromNode = (ret, node) => {
	node.abilities && node.abilities.forEach(ability => {
		if (!ret.desc.includes(ability)) {
			ret.desc.push(ability);
		}
	});
	node.weapons && node.weapons.forEach(wep => {
		if (!ret.weapons.includes(wep)) {
			ret.weapons.push(wep);
		}
	});
	node.models && node.models.forEach(model => {
		if (!ret.stats.includes(model.name)) {
			ret.stats.push(model.name);
		}
	});
	node.psyker && node.psykers.forEach(psyker => {
		if (!ret.psykers.includes(psyker)) {
			ret.psykers.push(psyker);
		}
	});
	node.powers && node.powers.forEach(power => {
		if (!ret.powers.includes(power)) {
			ret.powers.push(power);
		}
	});
}

const getProfilesForList = async(pool, army) => {
	console.log("getProfilesForList init processing ", army.units.length, " units.");
	let ret = new constants.Profile();
	army.units.forEach(unit => {
		getAllDetailsFromNode(ret, unit);
		unit.models.forEach(model => {
			// console.log("model: ", model);
			getAllDetailsFromNode(ret, model);
		});
	});

	console.log("Fetching all from DB, starting with: ", ret.desc, ret.weapons, ret.stats, ret.psykers, ret.powers);
	await ret.fetchAllFromDb(pool, queryDB);
	console.log("Fetched all from DB, returning: ", ret.desc, ret.weapons, ret.stats, ret.psykers, ret.powers);
};

// Translates the database entry into a fully fleshed out object
const massageList = (list) => {
	return list;
};

const processUnits = (pool, detachments) => {
	// If the unit has no model children, or it's a special case that's missing a model for itself (vehicles and characters) add the model
	let ret = [];
	detachments.forEach(detach => {
		detach.units.forEach(unit => {
			if (unit.equipment) {
				console.log("FIXING ENTRY FOR UNIT ", unit.name, "MODELS: ", unit.models);

				unit.models = unit.models || [];
				unit.models.push({
					name: unit.name || "UNKNOWN_NAME",
					quantity: unit.quantity || 1,
					// abilities: unit.abilities || [],
					// categories: unit.categories || [],
					// weapon: unit.weapon || []
					equipment: unit.equipment
				});

				delete unit.unit;
				delete unit.quantity;
				delete unit.equipment;
			}

			ret.push(unit);

			// TODO: deal with drones
		});
	});

	/* INPUT: [
		{
			units: [
				{
					weapons: []
					models: [
						{
							weapons: []
						}
					]	
				}
			]
		}	

	]*/


	/* OUTPUT: [
		{
			units: [
				{
					models: [
						{
							weapons: []
							categories: []
						}
					]	
				}
			]
		}	

	]*/


	return ret;
};

exports.MytRouter = MytRouter;
