/**
 * FILENAME: constants.js
 *
 * DESCRIPTION: Constants for the `stats` package. 
 *
 * OWNER: RWD
 */

export const mainCategoryNames = [ "shoot", "fight", "control", "resil"];

export const statCategories = {
	mainPreMatch: {
		charts: ['categoryRatios', 'resilRatios', 'damageRatios']
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
		charts: ['controlAttrCount', 'move', 'range', 'screen']
	},
	resil: {
		title: "Resiliance",
		charts: ['invuln', 'toughtness', 'feelNoPain', 'resilAttrCount']
	},
}