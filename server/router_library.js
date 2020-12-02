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

/**
 * Convenience function for sending reponses to clients
 */
const sendMsg = (res, msg) => {
	res.set('Content-Type', 'application/json');
	res.send(JSON.stringify(msg));
	console.log("Sending message: ", JSON.stringify(msg));
};
exports.sendMsg = sendMsg;

/**
 * query the database - supply values parameters to use prepared statements.
 */
const queryDB = async(pool, query, values) => {
	try {
		const client = await pool.connect();
		let result;

		// Prepared statement
		if (values) {
			result = await client.query(query, values);

		// Non-prepared statement
		} else {
			result = await client.query(query);
		}
		return { results: result ? result.rows : null};
	} catch (err) {
		console.error(err);
		return { results: null }
	}
};
exports.queryDB = queryDB;

/**
 * Take in a profile from the front end, and do all the translations we need before storing it.
 * Also consists of santitizing strings and inserting each part of the profile into it's respective table.
 */
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
			// console.log("enterying query: ", query);

			results = await queryDB(pool, query);
			// console.log("Got results: ", results);
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
			// console.log("enterying query: ", str);

			results = await queryDB(pool, str);
			// console.log("Got results: ", results);
		}
	}

	if (profile.psykers) {
		str = Object.keys(profile.psykers).reduce((acc, e, i ) => {
			acc += `${i > 0 ? "," : ""} ('${e}', ${profile.psykers[e].cast}, ${profile.psykers[e].deny}, '${profile.psykers[e].other}', '${profile.psykers[e].powers_known}')`
			return acc;
		}, "");

		if (str.length) {
			str = "INSERT INTO war_psyker_profile (name, castNum, deny, other, powers_known) VALUES " + str + " ON CONFLICT (name) DO NOTHING RETURNING name;";
			// console.log("enterying query: ", str);

			results = await queryDB(pool, str);
			// console.log("Got results: ", results);
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
			// console.log("enterying query: ", str);

			results = await queryDB(pool, str);
			// console.log("Got results: ", results);
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
			// console.log("enterying query: ", str);

			results = await queryDB(pool, str);
			// console.log("Got results: ", results);
		}
	}
}
exports.processProfile = processProfile;

const massageProfile = (pool, profile, army) => {
	let idx;

	profile.weapons && profile.weapons.forEach(obj => {
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
exports.massageProfile = massageProfile;

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
	node.psykers && node.psykers.forEach(psyker => {
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
	console.log("[getProfilesForList]", army);
	let ret = new constants.Profile();
	army.units.forEach(unit => {
		getAllDetailsFromNode(ret, unit);
		unit.models.forEach(model => {
			getAllDetailsFromNode(ret, model);
		});
	});

	await ret.fetchAllFromDb(pool, queryDB);

	return ret;
};
exports.getProfilesForList = getProfilesForList;

// Translates the database entry into a fully fleshed out object
const massageList = (list) => {
	return list;
};
exports.massageList = massageList;

const processUnits = (pool, detachments) => {
	// If the unit has no model children, or it's a special case that's missing a model for itself (vehicles and characters) add the model
	let ret = [];
	detachments.forEach(detach => {
		detach.units.forEach(unit => {
			if (unit.equipment) {
				console.log("Fixing entry for unit ", unit.name, "models: ", unit.models.length);

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
exports.processUnits = processUnits;

const userid = req => req.user.sub.split("|")[1];
exports.userid = userid;

const sanitizeStr = str => str.replace(/'/gm, "");
exports.sanitizeStr = sanitizeStr;
