const express = require('express');
const path = require('path');

const isNormalGun = weapon => {
	return weapon.type === "Pistol" || weapon.type === "Grenade";
}

const deriveCommand = army => {
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

const deriveMove = army => {
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

const derivePsychic = army => {
	return {
	};
};

const deriveShooting = army => {
	return {
	};
};

const deriveCharge = army => {
	return {
	};
};

const deriveFight = army => {
	return {
	};
};

const deriveMorale = army => {
	return {
	};
};

exports.deriveArmyStats = orig => {
	let army = Object.assign({}, orig);
	return ({
		name: army.name,
		command: deriveCommand(army),
		move: deriveMove(army),
		psychic: derivePsychic(army),
		shooting: deriveShooting(army),
		charge: deriveCharge(army),
		fight: deriveFight(army),
		morale: deriveMorale(army)
	});
};
