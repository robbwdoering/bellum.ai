import React from 'react';

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

const genDmgHistInfoItems = (pdf1, pdf2) => {
	let mean = [0, 0];
	let stdDev = [0, 0];

	if (pdf1) {
		mean[0] = Object.keys(pdf1).reduce((mean, key) => (mean + (key * pdf1[key])), 0);
		stdDev[0] = Object.keys(pdf1).reduce((variance, key) => variance + Math.pow((mean[0] - (key * pdf1[key])), 2), 0);
		stdDev[0] = Math.sqrt(stdDev[0]);
	}

	if (pdf2) {
		mean[1] =  Object.keys(pdf2).reduce((acc, key) => (acc + (key * pdf2[key])), 0);
		stdDev[1] = Object.keys(pdf2).reduce((variance, key) => variance + Math.pow((mean[1] - (key * pdf2[key])), 2), 0);
		stdDev[1] = Math.sqrt(stdDev[1]);
	}

	console.log("[genDmgHistInfoItems] ", pdf1, pdf2)

	return [
		<div className="chart-card-cfg-item">
			<span className="title"> AVERAGE </span>
			<span className="primary"> {mean[0]}  </span>
			{mean[1] && " / "}
			{mean[1] && <span className="secondary"> {mean[1]}  </span>}
		</div>,
		<div className="chart-card-cfg-item">
			<span className="title"> STD DEV </span>
			<span className="primary"> {stdDev[0]}  </span>
			{stdDev[1] && " / "}
			{stdDev[1] && <span className="secondary"> {stdDev[1]}  </span>}
		</div>
	];
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
				tooltip: 'If the whole force targeted light targets, like Guardsmen, they would deal this much damage.',
				infoItems:  genDmgHistInfoItems
			};
		case ChartTypes.ShootMedDamage:
		case ChartTypes.FightMedDamage:
			return {
				title: 'Damage vs. Medium',
				tooltip: 'If the whole force targeted medium targets, like Space Marines, they would deal this much damage' ,
				infoItems:  genDmgHistInfoItems
			};
		case ChartTypes.ShootEliteDamage:
		case ChartTypes.FightEliteDamage:
			return {
				title: 'Damage vs. Elite',
				tooltip: 'If the whole force targeted elite targets, like Battlesuits, they would deal this much damage',
				infoItems:  genDmgHistInfoItems
			};
		case ChartTypes.ShootHeavyDamage:
		case ChartTypes.FightHeavyDamage:
			return {
				title: 'Damage vs. Heavy',
				tooltip: 'If the whole force targeted heavy targets, like Tanks, they would deal this much damage',
				infoItems:  genDmgHistInfoItems
			};
		default:
			return {};
	}
}

