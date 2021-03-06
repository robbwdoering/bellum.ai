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
exports.drvScorecardVals = (army, profile, testProfile) => {
	let ret = {
		shoot: {
			score: 0,
			avg: 0,
			attrCount: 0,
			dmgBuckets: [
				{name: 'light', dist: null},
				{name: 'med', dist: null},
				{name: 'elite', dist: null},
				{name: 'heavy', dist: null}
			],
		},
		fight: {
			score: 0,
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
			range: 0,
			score: 0,
			move: [],
			ptsTransports: 0,
			screen: 0, //MSUs
			attrCount: 0
		},
		resil: {
			score: 0,
			invuln: 0,
			toughness: 0,
			feelNoPain: 0,
			resilAttrCount: 0,
			dmgBuckets: [
				{name: 'light', dist: null},
				{name: 'med', dist: null},
				{name: 'antitank', dist: null},
				{name: 'antihorde', dist: null}
			]
		},
	};

	let stats, targetList;

	const finalProfile = {
		stats: profile.stats.concat(testProfile.stats || []),
		weapons: profile.weapons.concat(testProfile.weapons || []),
		psykers: profile.psykers.concat(testProfile.psykers || []),
		desc: profile.desc.concat(testProfile.desc || []),
		powers: profile.powers.concat(testProfile.powers || [])
	};

	// Loop through every model
	let modelCounter = 0;
	army.units.forEach(unit => {
		if (unit.models && unit.models.length) {
			unit.models.forEach(model => {
				const modelStat = finalProfile.stats.find(stat => stat.name === util.formatStr(model.unit));
				modelCounter += model.quanitity;

				// ------------
				// CAT 1: Shoot
				// ------------
				// Get shoot damage buckets - if this model fired at a target in this category, how much damage would they deal?
				let newBucket = (['light', 'med', 'elite', 'heavy']).map(str => {
					targetList = testProfile.stats
						.filter(stat => stat.name.includes(str+"_resil"))
						.map(stat => stat.name);
						
					const { retDamagePdf, interData } = runShootTest(model, finalProfile, targetList, testProfile.context, true);

					let oldBucket = ret.shoot.dmgBuckets.find(bucket => bucket && bucket.name === str);
					if (retDamagePdf && oldBucket) {
						return {
							name: str,
							dist: addPdfs(oldBucket.dist, retDamagePdf)
						};

					}
					return oldBucket;
				});
				if (newBucket && newBucket.length === 4) {
					ret.shoot.dmgBuckets = newBucket;
				}

				// Attribute count

				// Damage 

				// ------------
				// CAT 2: FIGHT 
				// ------------
				// Get fight damage buckets - if this model attacked a target in this category, how much damage would they deal?
				newBucket = (['light', 'med', 'elite', 'heavy']).map(str => {
					targetList = testProfile.stats.filter(stat => stat.name.includes(str+"_resil")).map(stat => stat.name);
					const { retDamagePdf, interData } = runFightTest(model, finalProfile, targetList, testProfile.context, true);

					let oldBucket = ret.fight.dmgBuckets.find(bucket => bucket && bucket.name === str);
					if (retDamagePdf && oldBucket) {
						return {
							name: str,
							dist: addPdfs(oldBucket.dist, retDamagePdf)
						};

					}
					return oldBucket;
				});
				if (newBucket && newBucket.length === 4) {
					ret.fight.dmgBuckets = newBucket;
				}

				// --------------
				// CAT 3: CONTROL 
				// --------------
				console.log("adding ctrl scores...", ret.control, modelStat.move)
				ret.control.avg += (parseInt(modelStat.move) || 6) * (model.quanitity || 1);
				ret.control.screen += parseInt(model.quantity);
				console.log("got", ret.control)

				// -----------------
				// CAT 4: RESILIENCE 
				// -----------------
				newBucket = (['light', 'med', 'antihorde', 'antitank']).map(str => {
					targetList = testProfile.weapons.filter(weapon => weapon.name.includes(str+"_")).map(weapon => weapon.name);
					const { retDamagePdf, interData } = runResilTest(model, finalProfile, targetList, testProfile.context);

					let oldBucket = ret.resil.dmgBuckets.find(bucket => bucket && bucket.name === str);
					if (retDamagePdf && oldBucket) {
						return {
							name: str,
							dist: addPdfs(oldBucket.dist, retDamagePdf)
						};
					}
					return oldBucket;
				});
				if (newBucket && newBucket.length === 4) {
					ret.resil.dmgBuckets = newBucket;
				}
			});
		}
	});

	ret.control.avg /= modelCounter;

	// Set final scores
	ret.shoot.score = ret.shoot.dmgBuckets.reduce((score, bucket) => score + bucket.dist.mean, 0);
	ret.shoot.score = Math.min(ret.shoot.score, 100);
	ret.fight.score = ret.fight.dmgBuckets.reduce((score, bucket) => score + bucket.dist.mean, 0);
	ret.fight.score = Math.min(ret.fight.score, 100);
	ret.resil.score = ret.resil.dmgBuckets.reduce((score, bucket) => score + bucket.dist.mean, 0);
	ret.resil.score = Math.min(ret.resil.score, 100);
	console.log("CALCING CTRL: ", ret.control)
	ret.control.score = ret.control.avg + ret.control.screen;
	ret.control.score = Math.min(ret.control.score, 100);

	return ret;	
};

const runFightTest = (model, profile, targetArr, context, storeInterData) => {
	let retDamagePdf, key, mean, dev, exitEarly;
	let interData = {};
	let alreadyFiredWeapons = [];

	// Null checks
	if (!model.weapon) {
		return { retDamagePdf, interData };
	}

	// Get the profiles of every weapon before proceeding for convenience
	let wepProfiles = model.weapon.map(wep => profile.weapons.find(compWep => compWep.name === util.formatStr(wep)));
	if (wepProfiles.find(e => !e)) {
		console.error("Could not find profile for a weapon!");
		return { retDamagePdf, interData };
	}

	// If this unit doesn't have any real melee weapons, use the implied default
	if (!wepProfiles.find(e => e.weapontype === "Melee")) {
		wepProfiles.push({name: "Punch", weapontype: "Melee", strength: "User", damage: '1'});
	}

	// ----------------------
	// LOOP - for each weapon 
	// ----------------------
	// Get damage pdf if this unit fired at every target in the array once
	retDamagePdf = wepProfiles.reduce((retDamagePdf, wepProfile, i) => {
		// Fetch the stats for this weapon
		let stemName = util.formatStr(wepProfile.name);

		exitEarly = (
			// Exit if we're not a melee weapon
			wepProfile.weapontype !== "Melee" ||

			// Exit if this is the second version of a weapon with multiple types
			stemName.match(/_\(.+\)/g) && alreadyFiredWeapons.find(name => name === stemName.substring(stemName.indexOf("_(")))
		);

		if (exitEarly) {
			return retDamagePdf;
		}

		alreadyFiredWeapons.push(stemName);

		// ----------------------
		// LOOP - for each target 
		// ----------------------
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

			// Return the new PDF - damages go up but all probabilities still add to 1
			return addPdfs({mean, dev}, targetPdf);
		}, null);

		// Add these values to the overall result for this set
		return addPdfs(retDamagePdf, targetPdf);
	}, null);

	if (retDamagePdf) {
		let factor = (model.quanitity || 1) / targetArr.length;
		retDamagePdf.mean *= factor; 
		retDamagePdf.dev *= factor; 
	}

	return { retDamagePdf, interData };
}

const runShootTest = (model, profile, targetArr, context, storeInterData) => {
	let retDamagePdf, key, mean, dev, exitEarly;
	let interData = {};
	let alreadyFiredWeapons = [];


	// Null checks
	if (!model.weapon) {
		return { retDamagePdf, interData };
	}

	// Get the profiles of every weapon before proceeding for convenience
	let wepProfiles = model.weapon.map(wep => profile.weapons.find(compWep => compWep.name === util.formatStr(wep)));
	if (wepProfiles.find(e => !e)) {
		console.error("Could not find weapone profile for a weapon!");
		return { retDamagePdf, interData };
	}

	// ----------------------
	// LOOP - for each weapon 
	// ----------------------
	// Get damage pdf if this unit fired at every target in the array once
	retDamagePdf = model.weapon.reduce((retDamagePdf, wep, i) => {
		// Fetch the stats for this weapon
		let stemName = util.formatStr(wep);

		exitEarly = (
			// Exit if we're not a gun
			wepProfiles[i].weapontype === "Melee" ||
			wepProfiles[i].weapontype === "Greenade" || 

			// Exit if this is a pistol and we have other non-pistol guns
			(wepProfiles[i].weapontype === "Pistol" && wepProfiles.find(tmpwep => (
				tmpwep.name !== wep.name || !(["Grenade", "Melee", "Pistol"]).includes(tmpwep.weapontype)
			))) || 

			// Exit if this is the second version of a weapon with multiple types
			stemName.match(/_\(.+\)/g) && alreadyFiredWeapons.find(name => name === stemName.substring(stemName.indexOf("_(")))
		);

		// Exit early if asked to
		if (exitEarly) {
			return retDamagePdf;
		}

		alreadyFiredWeapons.push(stemName);

		// ----------------------
		// LOOP - for each target 
		// ----------------------
		// Get overall damage if they fired with this weapon at every target
		let targetPdf = targetArr.reduce((targetPdf, target) => {
			// Get the damage PDF for this combo
			let salvoResult = divine.fireSalvo(model, wepProfiles[i], context, profile, { unit: target });

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

			// Return the new PDF - damages go up but all probabilities still add to 1
			return addPdfs({mean, dev}, targetPdf);
		}, null);

		// Add these values to the overall result for this set
		return addPdfs(retDamagePdf, targetPdf);
	}, null);

	// Divide by number by targets - this means we are now returning avg dmg done to a target of this type
	if (retDamagePdf) {
		let factor = (model.quanitity || 1) / targetArr.length;
		retDamagePdf.mean *= factor; 
		retDamagePdf.dev *= factor; 
	}

	return { retDamagePdf, interData };
};

runResilTest = (model, profile, attackerArr, context, storeInterData) => {
	let retDamagePdf, key, mean, dev, exitEarly;
	let interData = {};

	// Null checks
	if (!model.unit) {
		return { retDamagePdf, interData };
	}

	// ----------------------
	// LOOP - for each target 
	// ----------------------
	// Get overall damage if they fired with this weapon at this model 
	retDamagePdf = attackerArr.reduce((retDamagePdf, target) => {
		// Get the damage PDF for this combo
		let salvoResult = divine.fireSalvo({unit: 'light_resil_1'}, profile.weapons.find(wep => wep.name === target), context, profile, model);

		// Store this specific result if asked to
		// AKA damage this attack would do to this unit
		if (storeInterData) {
			if (interData[target]) {
				interData[target][stemName] = salvoResult;
			} else {
				interData[target] = { [stemName]: salvoResult };
			}
		}

		mean = calcMean(salvoResult);
		dev = calcDeviation(salvoResult, mean);

		// Return the new PDF - damages go up but all probabilities still add to 1
		return addPdfs({mean, dev}, retDamagePdf);
	}, null);

	// Divide by number by targets - this means we are now returning avg dmg done to a target of this type
	if (retDamagePdf) {
		let factor = 1 /  attackerArr.length;
		if (attackerArr[0].includes("light")) {
			factor *= 10;
		// } else if (target.includes("med")) {
			// factor *= 5;
		// } else if (target.includes("antihorde")) {
		// 	factor /= 5;
		// } else if (target.includes("antihorde")) {
		// 	factor /= 5;
		// }
		}
		retDamagePdf.mean *= factor; 
		retDamagePdf.dev *= factor; 
	}

	return { retDamagePdf, interData };
}

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

	return {mean: rhs.mean + lhs.mean, dev: rhs.dev + lhs.dev};
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