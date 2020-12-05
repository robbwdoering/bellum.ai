const express = require('express');
const path = require('path');
const constants = require('constants');


/** 
 * Derivation Library
 * 
 * These functions return outputs that can be deterministically determined from the inputs with minimal assumptions necessary.
 * Some examples are the "Scorecard" values for forces, or the phase status indicators.
 * If it requires positioning information, it shouldn't be handled here.
 */
const isNormalGun = weapon => {
	return weapon.type === "Pistol" || weapon.type === "Grenade";
}

const drvCommandPhase = army => {
	let ret = {
		numUnits: 0, 
		numModels: 0, 
		numWounds: 0,
		savePerWound: 0,
		toughnessPerWound: 0,
		avgDefSave: 0,
		numInvuln: 0,
		avgInvuln: 0,
		armoredWounds: 0,
		resilientWounds: 0
	};

	let stats;


	army.units.forEach(unit => {
		ret.numUnit++;

		unit.models && unit.models.forEach(model => {
			ret.numModels++;

			stats = army.profile.stats[model.name];

			ret.numWounds += stats.w;

			ret.totalSave += stats.save;

			ret.savePerWound += (stats.save * stats.w);
			ret.toughnessPerWound += (stats.t * stats.w);

			if (stats.invuln) {
				ret.numInvuln++;
				avgInvuln += stats.invuln;
			}

			if (stats.t > config.threshold.armored) {
				armoredWounds += stats.w
			}

			if (stats.save < config.threshold.resilient) {
				resilientWounds += stats.w
			}
		});
	});

	ret.savePerWound /= ret.numWounds;
	ret.toughtnessPerWound /= ret.numWounds;
	ret.avgInvuln /= ret.numInvuln;
	ret.avgDefSave /= numUnits;

	return ret;
};

const drvMovePhase = army => {
	let ret = {
		totalMove: 0,
		movePerWound: 0,
		numMobile: 0,
		numHeavy: 0,
		numAssault: 0,
		avgAssaultDistance: 0,
		numAdvanceCharge: 0,
		numTransports: 0,
		transportMove: 0,	
	};

	let stats;

	army.units.forEach(unit => {
		if (unit.models && unit.models.length) {
			stats = army.profile.stats[unit.models[0].name];
			// Loop through every model
			let avgMove = 0;
			let avgMovePerWound = 0;
			let isMobile = false

			unit.models.forEach(model => {
				weapons = model.equipment.map(wep =>  army.profile.weapons[wep]).filter(e => e);

				avgMove += stats.m;
				avgMovePerWound += stats.w * stats.m;

				if (stats.m > config.threshold.mobile) {
					isMobile = true;
				}
			});

			ret.totalMove += avgMove / unit.models.length;
			ret.avgMovePerWound += avgMovePerWound / unit.models.length;
			if (isMobile) ret.numMobile++;
		} else {
			stats = army.profile.stats[unit.name];
		}

		// TODO: Add check for other rules that allow moving and shooting heavy
		if (weapons.find(wep => wep.type === "heavy") && !unit.categories.includes("Vehicle")) {
			numHeavy++;
		}

		exception = unit.abilities && unit.abilities.some(ability => army.profile.abilities[ability].type === "advanceShootAsNormal");
		if (weapons.find(wep => wep.type === "assault") || exception) {
			numAssault++;

			// TODO: Support for units that advance farther than 3.5
			const shortestRange = weapons.filter(wep => wep.type === "assault").reduce((shortest, wep) => shortest > wep.range ? wep.range : shortest, 1000);
			ret.avgAssaultDistance += stats.m + 3.5 + shortestRange;
		}

		exception = unit.abilities.some(ability => army.profile.abilities[ability].type === "advanceCharge");
		if (unit.abilities || exception) {
			ret.numAdvanceCharge++;
		}
	});

	return ret;
};

const drvPsychicPhase = army => {
	return {
	};
};

const drvShootingPhase = army => {
	return {
	};
};

const drvChargePhase = army => {
	return {
	};
};

const drvFightPhase = army => {
	return {
	};
};

const drvMoralePhase = army => {
	return {
	};
};

const drvShootScorecard = (unit, ret) => {

};

exports.drvScorecardVals = (army, profile, testData, ) => {
	let ret = {
		shoot: {
			avg: 0,
			var: 0,
			attrCount: 0,
			dmgBuckets: [],
		},
		fight: {
			avg: 0,
			var: 0,
			attrCount: 0,
			dmgBuckets: [],
		},
		control: {
			avg: 0,
			var: 0,
			move: [],
			range: [],
			ptsTransports: 0,
			screen: 0, //MSUs
			attrCount: 0
		},
		resil: {
			invuln: 0,
			toughness: 0,
			feelNoPain: 0,
			resilAttrCount: 0,
			resilBuckers: []
		}
	};

	let stats;

	console.log("Calculating scorecard values...")
	army.units.forEach(unit => {
		if (unit.models && unit.models.length) {
			stats = army.profile.stats[unit.models[0].name];
			console.log("Stats", stats)

			// Loop through every model
			unit.models.forEach(model => {
				// Shoot
					let shootRes = divine.fireSalvo(model, )
					// Attribute count

					// Damage 

				// Fight

				// Control

				// Resilience

			});
		}
	});

	return ret;	
};

exports.deriveArmyStats = orig => {
	let army = Object.assign({}, orig);
	return ({
		name: army.name,
		command: drvCommandPhase(army),
		move: drvMovePhase(army),
		psychic: drvPsychicPhase(army),
		shooting: drvShootingPhase(army),
		charge: drvChargePhase(army),
		fight: drvFightPhase(army),
		morale: drvMoralePhase(army)
	});
};
