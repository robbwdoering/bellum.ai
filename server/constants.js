const express = require('express');

const processResults = (results) => {
	if (results && results.results && results.results.length) {
		return results.results;
	}

	return {};
}

const sanitizeString = str => str.toLowerCase().replace(/[- ]/g, "_").replace(/'/g, "");

class Profile {
	constructor() {
		this.stats = [];
		this.powers = [];
		this.desc = [];
		this.psykers = [];
		this.weapons = [];
	}

	fetchAllFromDb = async (pool, queryDB) => {
		let query, results;

		// Build queries
		if (this.desc.length) {
			query = (this.desc.reduce((acc, desc, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(desc) + "'" 
			), "SELECT * FROM war_desc_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.desc = processResults(results);
		}

		if (this.weapons.length) {
			query = (this.weapons.reduce((acc, wep, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(wep) + "'" 
			), "SELECT * FROM war_weapon_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.weapons = processResults(results);
		}

		if (this.stats.length) {
			query = (this.stats.reduce((acc, stat, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(stat) + "'" 
			), "SELECT * FROM war_stat_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.stats = processResults(results);
		}

		if (this.psykers.length) {
			query = (this.psykers.reduce((acc, psyker, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(psyker) + "'" 
			), "SELECT * FROM war_psyker_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.psykers = processResults(results);
		}

		if (this.powers.length) {
			query = (this.powers.reduce((acc, power, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(power) + "'" 
			), "SELECT * FROM war_power_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.powers = processResults(results);
		}
	}

};
exports.Profile = Profile;

exports.defaultBucketUnits = {
	// Resilience stat are used to determine the damage profile of a unit
	lightResilience = [
		{toughness: 3, save: 4, weight: 2},
		{toughness: 3, save: 5},
		{toughness: 3, save: 6, weight: 2},
	],
	medResilience = [
		{toughness: 4, save: 3, weight: 1},
		{toughness: 4, save: 4, weight: 2},
		{toughness: 4, save: 6, weight: 0.5},
		{toughness: 4, save: 5, weight: 1},
		{toughness: 5, save: 4, weight: 1},
		{toughness: 5, save: 6, weight: 0.5}
	],
	toughResilience = [
		{toughness: 5, save: 3, weight: 1},
		{toughness: 4, sav: 2, weight: 1},
		{toughness: 6, sav: 4, weight: 1}
		{toughness: 6, sav: 5, weight: 1}
	],

	tankResilience = [
		{toughness: 7, save: 3},
		{toughness: 8, save: 3},
		{toughness: 7, save: 2},
		{toughness: 8, save: 2},
		{toughness: 9, save: 4},
		{toughness: 10, save: 4, weight; 0.5},
	],

	// Threats are used to determine the resilience of a unit
	lightThreats = [
		{type: "Rapid Fire", shots: 1, strength: 3, AP:	0, damage: 1},
		{type: "Rapid Fire", shots: 1, strength: 4, AP:	0, damage: 1},
		{type: "Rapid Fire", shots: 1, strength: 5, AP:	0, damage: 1},
		{type: "Rapid Fire", shots: 1, strength: 4, AP:	-1, damage: 1},
		{type: "Assault", shots: 1, strength: 3, AP:	0, damage: 1},
		{type: "Assault", shots: 2, strength: 4, AP:	0, damage: 1},
	], 
	medThreats = [
		{type: "Heavy", shots: 3, strength: 5, AP:	-1, damage: 1},
		{type: "Heavy", shots: "D6", strength: 8, AP:	-2, damage: "D3"},
		{type: "Heavy", shots: 12, strength: 6, AP:	-1, damage: 2},
		{type: "Heavy", shots: 4, strength: 5, AP:	0, damage: 1},
	],
	antiInfantryThreats = [
		{type: "Greanade", shots: "D6", strength: 3, AP: 0, damage: "1"},
	],
	antiTankThreats = [
		{type: "Heavy", shots: "D3", strength: 9, AP:	-3, damage: "D6"},
		{type: "Assault", shots: "2", strength: 7, AP:	-1, damage: "D3"},
		{type: "Heavy", shots: "2", strength: 8, AP:	-4, damage: "D6"},
	]
};

