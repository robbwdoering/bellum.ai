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
 * Router Library
 * 
 * Stores conveince code for routers that relates to IO (db connections or rest calls) or data translation.
 * Any divination/derivation should go in the respected war library.
 */

const userid = req => req.user.sub.split("|")[1];
exports.userid = userid;

const sanitizeStr = str => str.replace(/'/gm, "");
exports.sanitizeStr = sanitizeStr;

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
	let client, result;
	try {
		client = await pool.connect();

		// Prepared statement
		if (values) {
			result = await client.query(query, values);

		// Non-prepared statement
		} else {
			result = await client.query(query);
		}
	} catch (err) {
		// client.release();
		console.error("[PGSQL ERR]", err);
	} finally {
		client ? client.release() : null;
	}

	return { results: result ? result.rows : null};
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

			results = await queryDB(pool, query);
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

			results = await queryDB(pool, str);
		}
	}

	if (profile.psykers) {
		str = Object.keys(profile.psykers).reduce((acc, e, i ) => {
			acc += `${i > 0 ? "," : ""} ('${e}', ${profile.psykers[e].cast}, ${profile.psykers[e].deny}, '${profile.psykers[e].other}', '${profile.psykers[e].powers_known}')`
			return acc;
		}, "");

		if (str.length) {
			str = "INSERT INTO war_psyker_profile (name, castNum, deny, other, powers_known) VALUES " + str + " ON CONFLICT (name) DO NOTHING RETURNING name;";

			results = await queryDB(pool, str);
		}
	}

	if (profile.stats) {
		let args = [];
		console.log("------------------")
		console.log("PROCESSING STATS: ")
		console.log("------------------")
		let pC = 0; // paramCount
		str = Object.keys(profile.stats).reduce((acc, e, i ) => {
			let obj = profile.stats[e];
			acc += `${i > 0 ? "," : ""} ($${++pC}, $${++pC}, $${++pC}, $${++pC}, $${++pC}, $${++pC}, $${++pC}, $${++pC}, $${++pC}, $${++pC}, $${++pC})`;
			 
			 args = args.concat([
				obj.name,
		 		obj.a,
			 	parseInt(obj.bs) || -1,
			 	parseInt(obj.ws) || -1,
			 	parseInt(obj.strength) || -1,
			 	parseInt(obj.m) || -1,
			 	parseInt(obj.save) || -1,
			 	(obj.save.match && obj.save.match(/[0-9]+\+\/[0-9]+\+\+/g)) ? parseInt(obj.save.substring(obj.save.indexOf("/") + 1)) : 0,
			 	parseInt(obj.t),
			 	parseInt(obj.w),
			 	parseInt(obj.ld)
		 	]);
			return acc;
		}, "");

		if (str.length && pC == args.length) {
			str = "INSERT INTO war_stat_profile (name, attacks, ballistics, weapons, strength, move, save, invuln, toughness, wounds, leadership) VALUES " + str + " ON CONFLICT (name) DO NOTHING RETURNING name;";

			console.log("issued request ", str)
			results = await queryDB(pool, str, args);
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

			results = await queryDB(pool, str);
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

/**
 * Given a "Node", which basically means a unit or a model, check all of it's properties to build a series of arrays of strings.
 * These arrays contain all the database entries that we should request to use this list.
 */
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
			getModelOrUnitDetails(model.name, ret);
		}
	});
	node.unit && node.unit.forEach(unit => {
		if (!ret.stats.includes(unit)) {
			getModelOrUnitDetails(unit, ret);
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
};

const getProfilesForList = async (pool, army) => {
	console.log("[getProfilesForList]");
	let ret = new constants.Profile();
	army.units.forEach(unit => {
		console.log("---Starting unit", unit.name, unit)
		getAllDetailsFromNode(ret, unit);
		unit.models.forEach(model => {
			getAllDetailsFromNode(ret, model);
		});
		console.log("---Finished unit", ret.stats);
	});

	await ret.fetchAllFromDb(pool, queryDB);
	// console.log("returning: ", ret.stats)

	return ret;
};
exports.getProfilesForList = getProfilesForList;

/**
 * Reads the name of a unit or model and accounts for all sorts of weird inconsistencies between these
 * names and the names found in the profiles (and thus the strings that we need to feed into the database).
 */
const getModelOrUnitDetails = (name, ret) => {
	ret.stats.push(name);
	let val;

	// Find the index of a any substring that indicates this might have a "suffix", such as a plural "s"
	let marker = constants.nameSuffixMarkers.find(regex => name.match(regex));
	if (marker) {
		let markerIdx = name.indexOf(marker);
		let tmpStr = name.substring(0, markerIdx);
		if (!ret.stats.includes(tmpStr)) {
			ret.stats.push(tmpStr);
		}
	}
};
exports.getModelOrUnitDetails = getModelOrUnitDetails;

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
				// console.log("Fixing entry for unit ", unit.name, "models: ", unit.models.length);

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
