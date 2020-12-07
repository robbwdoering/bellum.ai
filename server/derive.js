const express = require('express');
const path = require('path');
const constants = require('./constants');
const util = require('./utilities');
const divine  = require('./divine');


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

const sumPdf = pdf => {
	if (!pdf) {
		return null;
	} else if (Array.isArray(pdf)) {
		return pdf.reduce((acc, pair) => (acc + (pair[0] * pair[1])), 0);
	} else {
		return Object.keys(pdf).reduce((acc, key) => (acc + (key * pdf[key])), 0);
	}
};

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

exports.drvScorecardVals = (army, profile, testProfile) => {
	let ret = {
		shoot: {
			avg: 0,
			var: 0,
			attrCount: 0,
			dmgBuckets: [
				{name: 'light', dist: null},
				{name: 'med', dist: null},
				{name: 'elite', dist: null},
				{name: 'heavy', dist: null}
			],
		},
		fight: {
			avg: 0,
			var: 0,
			attrCount: 0,
			dmgBuckets: [
				{name: 'light', dist: null},
				{name: 'med', dist: null},
				{name: 'elite', dist: null},
				{name: 'heavy', dist: null}
			],
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
			resilBuckets: []
		},
	};

	let stats, targetList;

	console.log("[drvScorecardVals] init", !army, !profile, !testProfile);

	const finalProfile = {
		stats: profile.stats.concat(testProfile.stats || []),
		weapons: profile.weapons.concat(testProfile.weapons || []),
		psykers: profile.psykers.concat(testProfile.psykers || []),
		desc: profile.desc.concat(testProfile.desc || []),
		powers: profile.powers.concat(testProfile.powers || [])
	};

	army.units.forEach(unit => {
		if (unit.models && unit.models.length) {
			stats = finalProfile.stats[unit.models[0].name];

			// Loop through every model
			unit.models.forEach(model => {
				// Shoot

				// Get shoot values 
				let newBucket = (['light', 'med', 'elite', 'heavy']).map(str => {
					targetList = testProfile.stats.filter(stat => stat.name.includes(str+"_resil")).map(stat => stat.name);
					const { retDamagePdf, interData } = runShootTest(model, finalProfile, targetList, testProfile.context, true);

					let oldBucket = ret.shoot.dmgBuckets.find(bucket => bucket && bucket.name === str);
					if (retDamagePdf && oldBucket) {
						return {
							name: str,
							dist: addPdfs(oldBucket.dist, retDamagePdf)
						};

					}
					return oldBucket;
				})


				if (newBucket && newBucket.length === 4) {
					console.log("SETTING BUCKETS: ", newBucket);
					ret.shoot.dmgBuckets = newBucket;
				}

					// Attribute count

					// Damage 

				// Fight

				// Control

				// Resilience
			});
		}
	});

	// console.log("TEST TEST: ", addPdfs({mean: 1, dev: 0.25}, {mean: 2, dev: 0.25});

	return ret;	
};

const runShootTest = (model, profile, targetArr, context, storeInterData) => {
	let interData = {};
	let retDamagePdf, key, mean, dev;
	// console.log("[runShootTest] init w/", profile.weapons.length, "weapons")

	if (model.weapon) {
		// Get damage pdf if this unit fired at every target in the array once
		retDamagePdf = model.weapon.reduce((retDamagePdf, wep) => {
			// Fetch the stats for this weapon
			let stemName = util.formatStr(wep);
			let wepProfile = profile.weapons.find(compWep => compWep.name === stemName);

			// Exit early if this melee
			if (wepProfile.weapontype === "Melee") {
				return retDamagePdf;
			}

			console.log("[runShootTest]", model.unit, "-->", wep, ",", !wepProfile);
			if (wepProfile) {
				// Get overrall damage if they fired with this weapon at every target
				let targetPdf = targetArr.reduce((targetPdf, target) => {
					// Get the damage PDF for this combo
					let salvoResult = divine.fireSalvo(model, wepProfile, context, profile, { unit: target });

					// Store this specific result if asked to
					// AKA damage this gun would do to this unit
					if (storeInterData) {
						if (interData[target]) {
							interData[target][stemName] = salvoResult;
						} else {
							interData[target] = { [stemName]: salvoResult };
						}
					}

					mean = calcMean(salvoResult);
					dev = calcDeviation(salvoResult, mean);

					// console.log("[runShootTesh] done w/ target: ", target, sumPdf(salvoResult), mean, dev);
					// Return the new PDF - damages go up but all probabilities still add to 1
					return addPdfs({mean, dev}, targetPdf);
				}, null);

				// console.log("[runShootTesh] done w/ weapon ", wep, sumPdf(targetPdf));

				// Add these values to the overall result for this set
				return addPdfs(retDamagePdf, targetPdf);
			}

			return retDamagePdf;
		}, null);

		// console.log("[runShootTesh] done w/ model ", model.unit, sumPdf(retDamagePdf));
	}

	// console.log("Returning from runShootTest", retDamagePdf);

	return { retDamagePdf, interData };
};

const calcMean = (pdf) => Object.keys(pdf || {}).reduce((mean, key) => mean + (key * pdf[key]), 0);
const calcDeviation = (pdf, mean) => Object.keys(pdf || {}).reduce((dev, key) => dev + (Math.pow(key - mean, 2) * pdf[key]), 0);

const addPdfs = (lhs, rhs) => {
	let key, pr;

	// Edge case - null argument
	if (!lhs) return rhs;
	if (!rhs) return lhs;

	// Edse case - null deviation (i.e. absolute value)
	if (lhs.dev === 0) {
		return { mean: rhs.mean + lhs.mean, dev: rhs.dev}
	} else if (rhs.dev === 0) {
		return { mean: rhs.mean + lhs.mean, dev: lhs.dev}
	}

	// NOTE: Whoops this code does the mixture distribution, not the sum :grimace_emoji:
	// let invDev1 = 1 / lhs.dev;
	// let invDev2 = 1 / rhs.dev
	// See: https://www.johndcook.com/blog/2012/10/29/product-of-normal-pdfs/
	// newMean = ((invDev1 * lhs.mean) + (invDev2 * rhs.mean)) / (invDev1 + invDev2);
	// newDev = (lhs.dev * rhs.dev) / (lhs.dev + rhs.dev);

	// OLD IMPLEMENTATION: Manually walks each possibility
	// let ret = {};
	// Object.keys(rhs).forEach(rhsDmg => {
	// 	Object.keys(lhs).forEach(lhsDmg => {
	// 		key = parseInt(rhsDmg) + parseInt(lhsDmg);
	// 		pr = lhs[lhsDmg] * rhs[rhsDmg]
	// 		ret[key] = (ret[key] || 0) + pr;
	// 	});
	// })
	// Object.keys(ret).forEach(key => ret[key] < 0.001 ? delete ret[key] : null);

	return {mean: rhs.mean + lhs.mean, dev:  rhs.dev + lhs.dev};
}

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
