const express = require('express');
const path = require('path');



const genAlphaStrike = (army, rhs) => {
	return {
		alphaShooting: 4,
		alphaMelee: 5
	}
};


// DERIVATIONS
// These are assumptions

const divineCommand = (army, rhs) => {

	return {

	};
};

const divineMove = (army, rhs) => {
	// const advanceAndFire = [], advanceAndCharge = [], psychic = [];

	army.units.forEach(unit => {
		// 

		// If unit  
	});

	return {

	};
};

const divinePsychic = (army, rhs) => {
	const 

	return {

	};
};
// TODO: Really solid hotkey support for Assist mode (whole app?)
// 	VIM CHAING? 1f2 !!!
// ASSUMPTIONS window
// "Training"  functionality that puts the user in situations and asks what they would do, doubles as training for nueral net
// Use useEffect and useMemo to only update predictions when relevant modifiers have changed (save cycles)

// ---- Divination Tool Options 
// Command 
	// 0.0 Calc tracking status for NN + graphs ( EVERY PHASE DOES THIS in n.0)
	// 0.1 Predict points + damage gained by every possible strategem (do this every phase ONLY if they have that tab open)
	// 0.2 Predict VP gained this round
// Move 
	// 1.1 Divine stats based on given configuration 
		// 3.1 and store
		// 4.1 and store
		// 5.1, and pair with fall back options
			// Highlight units that can fall back and shoot
			// Highlight if enemy unit is vulnerable to shooting (top of list for any allies)

	// 1.2 Divine moves that would capture objectives
		// Calc all units that can move to an objective
		// Calc all units that can capture an objective immediately
// Psychic
	// 2.1 
// Shoot 
	// 3.1 Divine the enemy's shooting options within engagement range
	// 3.2 Calc your shooting options within cur range 
	// 3.3 Divine expected VP, casualties, etc. from currently planned shots (on top of existing performance)
// Charge 
	// 4.1 Calc the enemy's charging options within engagement range
// Fight 
	// 5.1 Calc the enemy's fighting options as they currently stand 
	// 5.2 Calc our fighting options as they currently stand 
	// 5.3 Calc expected exchanges from each permutation of the combat order (if it's small... if over 1000, maybe don't?)
// Morale 
	// 6.1 Calc morale chances given current (or hypothetical) losses

// ---- Battle Round outline - AUTO 

// ---- Battle Round outline - ASSISTED
// Command 
	// Gain command point
	// Gain Victory Points
	// Stratagem Check 
// Move 
	// Re-divine 1.1 every time the user 
// Psychic
	// 
// Shoot 
// Charge 
// Fight 
// Morale 
	// Gain Victory Points

/**
 * 3.1 Calc the enemy's shooting options within engagement range
 */
const calcShootingWithinEngagement = (army, board, profile) => {
	// For every unit
	army.units.filter(unit => canShootNextTurn(unit, profile)).forEach(unit => {

	});
};

/**
 * 3.2 Calc your shooting options within cur range.
 */
const calcShootingOptions = (army, ctx, profile) => {
	let wepProfile;
	army.units.filter(unit => canShootNow(unit, profile)).forEach(unit => {
		// we have a list of weapons per unit
		// we want expected damage for every enemy unit
		unit.weapons && unit.weapons.forEach(wep => {
			wepProfile = profile.weapon[wep];
			const targetList = ctx.board.allInRadius(unitId, wepProfile.range, "ENEMY");
			const { expectedDamage, variance } = targetList.reduce((acc, target) => {
				const { tmpExpectedDamage, tmpVariance } = fireSalvo(unit, wepProfile, ctx, profile, target);

				acc.expectedDamage.push(tmpExpectedDamage);
				acc.variance.push(tmpVariance);
				acc.boardId.push(target);

				return acc;
			}, {boardId: [], expectedDamage: [], variance: []});
		});
	});
}

applyAddMods = (origVal, unit, modTypes, optional) => {
	let ret = 0, doBreak = false;

	// Loop through every modification type, adding it's value if it's present
	modTypes
		.map(type => unit.mods.find(mod => mod.type === type))
		.filter(mod => mod && (!mod.cond || mod.cond.isSatisfied(optional)))
		.forEach(mod => {
			if (doBreak) return;
			switch(mod.type) {
				case "REPLACE_HIT":
				case "REPLACE_HIT_SHOOT":
				case "REPLACE_HIT_FIGHT":
				case "REPLACE_WOUND":
				case "REPLACE_WOUND_SHOOT":
				case "REPLACE_WOUND_FIGHT":
				case "REPLACE_SAVE":
				case "REPLACE_SAVE_SHOOT":
				case "REPLACE_SAVE_FIGHT":
				case "REPLACE_INVULN":
				case "REPLACE_INVULN_SHOOT":
				case "REPLACE_INVULN_FIGHT":
				case "REPLACE_AP":
				case "REPLACE_AP_SHOOT":
				case "REPLACE_AP_FIGHT":
				case "REPLACE_AP_TARGET":
				case "REPLACE_SHOTS":
				case "REPLACE_SHOTS_TARGET":
					// TODO: add support for multiple replaces overriding eachother. Don't just take the first one, take the best one (?)
					ret = mod.params.value - origVal; // subtract origVal to cancel out addition in return statement
					doBreak = true;
					break;

				default: 	
					ret += mod.params.value;
			}
		});

	return origVal + ret;
};

applyRerollMods = (origVal, unit, modTypes, optional) => {
	let ret, tmpVal, tmpArr;

	// Loop through every modification type, adding it's value if it's present
	tmpArr = modTypes
		.map(type => unit.mods.find(mod => mod.type === type))
		.filter(mod => mod && (!mod.cond || mod.cond.isSatisfied(optional)));

	if (tmpArr.length > 1) {
		tmpVal = tmpArr.find(e => e.params.rerollType === "ALL") || tmpArr[0];
	} else {
		tmpVal = tmpArr[0];
	}

	switch(tmpVal.params.rerollType) {
		case "ALL":
			ret = (1.0 - origVal) * origVal;
			break;
		case "ONES":
			ret = (0.16) * origVal;
			break;
		default:
			console.log("Unknown reroll type:", tmpVal.params.rerollType);
	}

	// switch(mod.type) {
	// 	default:
	// }

	return origVal + ret;
};

/* D6 CHANCES CHEATSHEET (VAL+)
1 - 1.00
2 - 0.83 
3 - 0.67
4 - 0.50 
5 - 0.33
6 - 0.16
*/

const calcToWound = (s, t) => {
	if ((2*t) <= s) {
		return 2;
	} else if (t < s) {
		return 3;
	} else if (t === s) {
		return 4;
	} else if ((2*s) > t) {
		return 5;
	} else {
		return 6;
	}
}

// Saves
/*
1 
2
3
4
5
6
*/

const calcShots = (unit, wepProfile, ctx, profile, target) => {
	let val = wepProfile.shots || 1;
	if (!wepProfile.shots) console.error("Found a weapon that doesn't have shots defined", wepProfile);

	val = applyAddMods(val, unit, ["SHOTS", "REPLACE_SHOTS"], wepProfile);
	val = applyAddMods(val, unit, ["SHOTS_TARGET", "REPLACE_SHOTS_TARGET"], wepProfile);

	if (wepProfile.type === "RAPID_FIRE" && ctx.board.distance(unit.boardId, target.boardId) <= (wepProfile.range / 2)) {
		val *= 2;
	}

	return val;
}


// HELPER
/**
 * Calculates the expected damage for one weapon for one unit against one enemy.
 * The building block upon which the shooting phase is built upon - treat with reverence and care.
 */
const fireSalvo = (unit, wepProfile, ctx, profile, target) => {
	let numShots, damagePr, hitPr, woundPr, savePr, avgDamage, tmpVal;

	numShots = calcShots(wepProfile);

	// Calculate probabilty of hitting the target
	tmpVal = applyAddMods(profile.stats[unit.name].bs, unit, ["HIT", "HIT_SHOOT"], wepProfile);
	tmpVal = applyAddMods(tmpVal, target, ["BE_HIT"], wepProfile);
	hitPr = tmpVal < 7 ? (7 - tmpVal) / 6.0 : 0; // Translate "n-up" value into probability

	// Modify probabilty in response to reroll rules
	hitPr = applyRerollMods(hitPr, unit, ["HIT__REROLL", "HIT_SHOOT__REROLL"], wepProfile);
	// hitPr = applyRerollMods(hitPr, target, ["BE_HIT__REROLL", "BE_HIT_SHOOT__REROLL"], wepProfile); // TODO: Is this a rule that exists?

	// Calculate probability of wounding the target
	let tmpToughness = applyAddMods(profile.stats[target.name].t, target, ["TOUGHNESS", "TOUGHNESS_SHOOT"], wepProfile);
	tmpVal = applyAddMods(calcToWound(wepProfile.s, tmpToughness), unit, ["WOUND", "WOUND_SHOOT", "REPLACE_WOUND", "REPLACE_WOUND_SHOOT"], wepProfile);
	woundPr = tmpVal < 7 ? (7 - tmpVal) / 6.0 : 0; // Translate "n-up" value into probability

	// Calculate probability of the target saving 
	tmpVal = applyAddMods(profile.stats[target.name].save, target, ["SAVE", "REPLACE_SAVE", "SAVE_SHOOT", "REPLACE_SAVE_SHOOT"], wepProfile);
	let invuln = applyAddMods(profile.stats[target.name].invuln || 7, target, ["INVULN", "REPLACE_INVULN", "REPLACE_INVULN_SHOOT"], wepProfile);

	// Calculate AP
	let AP = applyAddMods(wepProfile.ap || 0, unit, ["AP", "AP_SHOOT", "REPLACE_AP", "REPLACE_AP_SHOOT"], wepProfile);
	AP = applyAddMods(AP, target, ["AP_TARGET", "REPLACE_AP_TARGET"], wepProfile);

	// Choose the higher of normal save with Armor Piercing applied, or invulnerable save
	if (tmpVal + AP < invuln) {
		tmpVal = invuln;	
	} else {
		tmpVal += AP;
	}

	savePr = tmpVal < 7 ? (7 - tmpVal) / 6.0 : 0; // Translate "n-up" value into probability

	damagePr = numShots * hitPr * woundPr * (1 - savePr);
};

// HELPER
const setShootingOptions = (unit, ctx, profile) => {
};

// HELPERS - Boolean checks for simplification and readbility
const isInEngagementRange = (unit, target) => {
	return ctx.board.distance(unit.boardId, target || "ENEMY") < unit.divs.engagementDistance;
};

const isValidShootingTarget = (unit, ctx, wepProf, target) => {
	return (
		(!target.status.includes("ENGAGED") || (unit.status.includes("ENGAGED") && ctx.board.distance(unit.boardId, target.boardId) < 3))
		// TODO: Do LOS / obfucscation here
	);
}

// HELPER
const canShootNextTurn = (unit, profile, ctx) => {
	let hasCantShootTag = unit.mods.includes("CANNOT_SHOOT");
	if (hasCantShootTag) hasCantShootTag = unit.mods.find("CANNOT_SHOOT").expiration > ctx.curTime + 10;
	const engagedExceptions = e => e.type === "FALLBACK_SHOOT" || e.type === "SHOOT_ENGAGED" || e.type === "BIG_GUNS_NEVER_TIRE";

	return (
		// Units that are engaged usually can't shoot next turn, unless there's an exception for them or they have pistols
		(!unit.status.includes("ENGAGED") || !unit.mods.find(engagedExceptions) || unit.weapons.find(wep => profile.weapons[wep].type === "PISTOL")) &&

		// Units that don't have ranged weapons can't shoot
		(unit.weapons.find(wep => profile.weapons[wep].range)) && 

		(!isInEngagementRange(unit)) &&

		// Units that have a "CANNOT_SHOOT" tag can't shoot!
		(!hasCantShootTag)
};

const canShootNow = (unit, profile) => {
	let hasCantShootTag = unit.mods.includes("CANNOT_SHOOT");

	return (
		// Units that are engaged usually can't shoot next turn, unless there's an exception for them or they have pistols
		(!unit.status.includes("ENGAGED") || unit.weapons.find(wep => profile.weapons[wep].type === "PISTOL")) &&

		// Units that don't have ranged weapons, or aren't within range of any enemies can't shoot
		(unit.weapons.find(wep => profile.weapons[wep].range && profile.weapons[wep].range > ctx.board.distance(unit.boardId, "ENEMY"))) && 

		// Units that have a "CANNOT_SHOOT" tag can't shoot!
		(!hasCantShootTag)
}

// HELPER
const addWeapon = (profile, dict, mods = []) => {
	if (dict[profile.name]) {
		dict[profle.name].quantity += (profile.quantity || 1);
	} else {
		dict[profile.name] = Object.assign({}, profile, {quantity: profile.quanity || 1, mods});
	}
}

// HELPER
const getFiringList = (unit, profile) => {
	let hasThrownGrenade = false;
	let wepMods;
	let ret = {};

	// If not engaged or we're excepted, shoot with everything normal (non pistols, one grenade)
	if (!unit.status.includes("Engaged") || unit.modifiers.find(mod => mod.type === "fireInEngaged")) {
		// If unit has weapons, add them
		if (unit.weapon && unit.weapon.length) {
			unit.weapon.forEach(weapon => {
				wepMods = [];
				wepProfile = army.profile.weapons[weapon];
				if (wepProfile) {
					switch(wepProfile.type) {
						case "Assault":
							if (unit.status.includes("ADVANCED")) {

							}
							addWeapon(wepProfile, ret, wepMods);	
							break;

						case "Heavy":
							addWeapon(wepProfile, ret, wepMods);	
							break;

						case "Rapid Fire":
							wepMods.push({type: "ATTACKS_SHOOTING", val: "*2"})
							break;

						// Throw one grenade always
						// TODO - Change this! Kinda rediculous
						case "Grenade":
							if (!hasThrownGrenade) {
								hasThrownGrenade = true;

								addWeapon(wepProfile, ret);	
							}
							break;
						// Skip pistols
						case "Pistol":
							break;
					}
				} else {
					console.error("Cannot fire gun - lacking profile: ", weapon);
				}
			})
		}

		// If models have weapons, add them
		if (unit.models && unit.models.length) {
			unit.models.filter(e => e.weapon).forEach(model => {


			});
		}

	// Vehicles can shoot at -1
	} else if (unit.status.includes("Engaged") && unit.categories.includes("Vehicle")) {

	// Everything else shoots with pistols
	} else {

	}
}

const divineShooting = (army, rhs) => {
	let firingList, targetList, wepProfile, mods, hasThrownGrenade;
	let ret = {
	}

	army.units.forEach(unit => {
		mods = [];

		firingList = getFiringList(unit, army.profile);

		unit.shootingArr = unit.

		unit.models.forEach(model => {

		});
	});

	return ret;
};

const divineCharge = (army, rhs) => {
	const whoCanChargeTurnOne = [];

	return {

	};
};

const divineFight = (army, rhs) => {

	return {

	};
};

const divineMorale = (army, rhs) => {

	return {

	};
};

exports.divineArmyStats = (origArmy, rhs) => {
	let army = Object.assign({}, origArmy);

	let ret = {
		divineCommand(army, rhs),
		divineMove(army, rhs),
		divinePsychic(army, rhs),
		divineShooting(army, rhs),
		divineCharge(army, rhs),
		divineFight(army, rhs),
		divineMorale(army, rhs),
		genAlphaStrike(army, rhs)
	};

	return ret;
};

	// army.detachments.forEach(detach => {
	// 	detach.units.forEach(unit => {
	// 		unit.models.forEach(model => {

	// 		});
	// 	});
	// });
