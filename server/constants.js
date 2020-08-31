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
