/**
 * FILENAME: constants.js
 *
 * DESCRIPTION: Constants for the `stats` package. 
 *
 * OWNER: RWD
 */

export const mainCategoryNames = [ "shoot", "fight", "control", "resil"];


export const ChartTypes = {
	ForceScorecard: "ForceScorecard",

	ShootLightDamage: "ShootLightDamage",
	ShootMedDamage: "ShootMedDamage",
	ShootEliteDamage: "ShootEliteDamage",
	ShootHeavyDamage: "ShootHeavyDamage",

	FightLightDamage: "FightLightDamage",
	FightMedDamage: "FightMedDamage",
	FightEliteDamage: "FightEliteDamage",
	FightHeavyDamage: "FightHeavyDamage",
	
	LightResil: "LightResil",
	MedResil: "MedResil",
	ToughResil: "ToughResil",
	TankResil: "TankResil",
	Move: "Move",
	Range: "Range",
	Screen: "Screen",
	Toughness: "Toughness",
	SummaryRadar: "SummaryRadar"
};

export const statCategories = {
	mainPreMatch: {
		charts: ['categoryRatios', 'resilRatios', 'damageRatios']
	},
	mainPostMatch: {
		charts: ['categoryRatios', 'survivabilityRatios', 'damageRatios']
	},
	shoot: {
		title: "Shooting",
		charts: [ChartTypes.ShootLightDamage, ChartTypes.ShootMedDamage, ChartTypes.ShootEliteDamage, ChartTypes.ShootHeavyDamage]
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
		title: "Resilience",
		charts: ['invuln', 'toughness', 'feelNoPain', 'resilAttrCount']
	},
}

export const chartConfigs = {
	[ChartTypes.SummaryRadar]: {
		variables: [
			{ key: 'shoot', label: '' },
			{ key: 'fight', label: '' },
			{ key: 'control', label: '' },
			{ key: 'resil', label: '' }
		]
	}
}
