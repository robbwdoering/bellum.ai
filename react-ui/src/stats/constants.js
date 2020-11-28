/**
 * FILENAME: constants.js
 *
 * DESCRIPTION: Constants for the `stats` package. 
 *
 * OWNER: RWD
 */

export const mainCategoryNames = [ "shoot", "fight", "control", "vuln"];

export const statCategories = {
	mainPreMatch: {
		charts: ['categoryRatios', 'vulnRatios', 'damageRatios']
	},
	mainPostMatch: {
		charts: ['categoryRatios', 'survivabilityRatios', 'damageRatios']
	},
	shoot: {
		title: "Shooting",
		charts: ['shootingAttrCount', 'lightDamage', 'medDamage', 'toughDamage', 'tankDamage']
	},
	fight: {
		title: "Fighting",
		charts: ['fightingAttrCount', 'lightDamage', 'medDamage', 'toughDamage', 'tankDamage']
	},
	control: {
		title: "Control",
		charts: ['move', 'range']
	},
	vuln: {
		title: "Vulnerability",
		charts: ['invuln', 'toughtness', 'feelNoPain', 'vulnAttrCount']
	},
}