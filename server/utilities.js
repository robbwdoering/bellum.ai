const express = require('express');
const path = require('path');
// Database
const { sql } = require('pg');

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

const formatStr = str => {
	if (!str) return "";
	return str.toLowerCase()
		.replace(/[- ]/g, "_")
		.replace(/'/g, "");
};
exports.formatStr = formatStr;

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
