const express = require('express');
const path = require('path');
const map = require('./map');
const config = require('./config');
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
			acc += `${i > 0 ? "," : ""} ('${e}', ${parseInt(obj.a)}, ${parseInt(obj.bs)}, ${parseInt(obj.ws)}, ${parseInt(obj.m)}, ${parseInt(obj.save)}, ${obj.save.match(/[0-9]+\+\/[0-9]+\+\+/g) ? parseInt(obj.save.substring(obj.save.indexOf("/") + 1)) : 0}, ${parseInt(obj.t)}, ${parseInt(obj.w)}, ${parseInt(obj.ld)})`
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
		str = Object.keys(profile.weapons).reduce((acc, e, i ) => {
			let obj = profile.weapons[e];

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

// const calcDpr = weapon => {
// 	let idx;
// 	let tmpArr = weapon.type.split(" ");
// 	let numAttacks = tmpArr[tmpArr.length - 1];
// 	let damage = parseInt(weapon.d);
// 	if (numAttacks.match(/^[0-9]+D[1-6]/g)) {
// 		idx = numAttacks.indexOf("D");

// 		numAttacks = parseInt(numAttacks.substring(0, idx)) * ((parseInt(numAttacks.substring(idx+1)) + 1.0) / 2.0)
// 	} else if (numAttacks.match(/^[0-9]+/g)) {
// 		numAttacks = parseInt(numAttacks) * 1.0;
// 	} else {
// 		console.error("Cannot calculate DPR since numAttacks is: ", numAttacks);
// 	}

// 	if (weapon.type.includes("Assualt")) {
// 		return 

// 	} else if (weapon.type.includes("Rapid Fire")) {
// 		return numAttacks * 2 * damage;

// 	} else if (weapon.type.includes("Heavy")) {

// 	} else if (weapon.type.includes("Pistol")) {

// 	} else if (weapon.type.includes("Grenade")) {

// 	} else if (weapon.type.includes("Blast")) {

// 	}
// }

class MytRouter {
	constructor(app, pool) {
		// this.app = app;
		// this.mapGen = new map.MapGenerator(config.RAD, config.SIZE)

		// HACK - post requests of type 'application/json' are having their types overriden by the mode somehow.
		// This changes them back to json. Fix when the overriding is fixed - see https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request
		// NOTE: plain text requests will NOT function while this is being executed
		app.use(
			express.json({
				type: ['application/json', 'text/plain']
			})
		);


		// app.get('/api/db', async (req, res) => {
		// 	const results = await queryDB(pool, 'SELECT * FROM test_table;');
		// 	sendMsg(res, {type: "DB_ACTION", results});
		// });
		// Answer API requests.
		app.get('/api/db/war/metalist/:userId', async (req, res) => {
			console.log("Doing metalist.", req.params.userId);
			let results = await queryDB(pool, "SELECT (name, points, faction, rating, id) from war_list WHERE userId = " + req.params.userId + ";");
			console.log("METALIST REQUEST: ", results, req.body);
			sendMsg(res, {type: "SET_METALIST", payload: results});
		});

		app.get('/api/db/war/list/:isPrimary/:listId/:userId', async (req, res) => {
			console.log("Doing list from user ", req.params.userId);
			let results = await queryDB(pool, "SELECT (json) from war_list WHERE userId = " + req.params.userId + " AND id = " + req.params.listId + ";");
			sendMsg(res, {type: req.params.isPrimary === "true" ? "SET_PRIMARY_LIST" : "SET_SECONDARY_LIST", payload: results});
		});

		app.post('/api/db/war/list', async (req, res) => {
			console.log("got a db/war/list post...", req.body);
			let query = `INSERT INTO war_list (userId, name, points, faction, rating, json)
				VALUES (${req.body.userId}, '${req.body.name}', ${req.body.points}, '${req.body.detachments[0].faction}', 0, '${JSON.stringify({detachments: req.body.detachments, cp: req.body.cp, name: req.body.name}).replace(/'/gm, "")}');
			`
			console.log("enterying query: ", query);
			let results = await queryDB(pool, query);

			if (!req.body.profile) {
				console.log("This army doesn't have a profile - please attach one next time.");
			}  else {
				processProfile(pool, req.body.profile);
			}

			results = await queryDB(pool, "SELECT (name, points, faction, rating) from war_list WHERE userId = " + req.body.userId + ";");
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

exports.MytRouter = MytRouter;
