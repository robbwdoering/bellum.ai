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

export const ChartTypes = {
	ForceScorecard: "ForceScorecard",
	LightDmg: "LightDmg",
	MedDmg: "MedDmg",
	ToughDmg: "ToughDmg",
	TankDmg: "TankDmg",
	LightResil: "LightResil",
	MedResil: "MedResil",
	ToughResil: "ToughResil",
	TankResil: "TankResil",
	Move: "Move",
	Range: "Range",
	Screen: "Screen",
	Toughness: "Toughness"
};