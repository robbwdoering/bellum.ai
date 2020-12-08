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
		charts: [ChartTypes.FightLightDamage, ChartTypes.FightMedDamage, ChartTypes.FightEliteDamage, ChartTypes.FightHeavyDamage]
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


export const getChartConfig = (type) => {
	switch (type){
		case ChartTypes.SummaryRadar:
			return {
				title: 'Force Summary',
				variables: [
					{ key: 'shoot', label: '' },
					{ key: 'fight', label: '' },
					{ key: 'control', label: '' },
					{ key: 'resil', label: '' }
				]
			};
		case ChartTypes.ShootLightDamage:
		case ChartTypes.FightLightDamage:
			return {
				title: 'Damage vs. Light',
				tooltip: 'If the whole force targeted light targets like Guardsmen for a turn, they would deal this much damage.',
			};
		case ChartTypes.ShootMedDamage:
		case ChartTypes.FightMedDamage:
			return {
				title: 'Damage vs. Medium',
				tooltip: 'If the whole force targeted medium targets like Space Marines for a turn, they would deal this much damage' ,
			};
		case ChartTypes.ShootEliteDamage:
		case ChartTypes.FightEliteDamage:
			return {
				title: 'Damage vs. Elite',
				tooltip: 'If the whole force targeted elite targets like Battlesuits for a turn, they would deal this much damage',
			};
		case ChartTypes.ShootHeavyDamage:
		case ChartTypes.FightHeavyDamage:
			return {
				title: 'Damage vs. Heavy',
				tooltip: 'If the whole force targeted heavy targets like Land Raiders for a turn, they would deal this much damage',
			};
		default:
			return {};
	}
}

