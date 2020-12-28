import { terrains, distance } from "./../map/constants";
import { sanitizeString } from "./../war/utils";

/**
 * Evaluate one conditional. This seems complex, but boils down to a switch statement that supports recursion.
 * For details on the objects you can feed into here, see meaningFormats.txt.
 * @return boolean corresponding to the evaluated conditional 
 */
export const evalCond = (cond, profiles, unit, boardState, matchState, originUnit) => {
	switch(cond.type) {
		// ------------------
		// BOOLEAN OPERATIONS
		// ------------------
		case "AND":
			// Coded as De Morgan's negation of AND for convenience
			return !cond.params.some(subCond => !evalCond(subCond, profiles, unit, boardState));
		case "OR":
			return cond.params.some(subCond => evalCond(subCond, profiles, unit, boardState));
		// case "XOR":
			// TODO - is this ever used?
		case "NOT":
			return !evalCond(cond.params, profiles, unit, boardState);

		// --------
		// STATUSES 
		// --------
		case "IN_COVER":
		case "HAS_CHARACTERISTIC":
			// If unit's stat X is more than or equal to Y
			const stat = unit.getStat(profiles[unit.playerIdx], unit, boardState);
			return stat[cond.params.field] >= cond.params.val;

		case "SHARE_SUBFACTION":
			// TODO: Implement backend support for getting subfaction from detachment header
			return originUnit.subfaction === unit.subfaction;
		case "HAS_CATEGORY":
			// If unit has any of these categories
			// To do "Unit has all these categories", chain these manually with "AND" statements
			return (unit.categories && unit.categories.find(cat => cond.params.includes(sanitizeString(cat))));
		case "HAS_FACTION":
			return true;
		case "HAS_STATUS":
			return true;
		case "HAS_STAT":
			return true;
		case "IN_DETACHMENT_TYPE":
			return true;
		case "HAS_MODEL_QUANTITY":
			return true;
		case "IS_PHASE":
			return true;
		case "IS_ROUND":
			return true;
	}
	return false;
};

export const getUnitCover = (unit, boardState, matchState) => {
	if (!matchState.terrain && !terrains[matchState.terrain]) {
		return false;
	}
	const [x, y] = unit.pos(boardState);	

	// Filter the list of terrain pieces that could theoretically be in range
	let relevantCover = terrains[matchState.terrain].reduce((relevantCover, piece, i) => {
		if (distance(piece.center, [x, y]) < Math.max(...piece.dim)) {
			relevantCover.push(i);
		}
		return relevantCover;
	}, []);

	// Perform the final calculations by rotating the point and shape, then performing axis-aligned collision checks
	let ret = null;
	const coverIdx = relevantCover.find(idx => {
		const piece = terrains[matchState.terrain][idx];
		const rotatedPos = [
			(x - piece.center[0]) * Math.cos(piece.a) - (y - piece.center[1]) * Math.sin(piece.a) + piece.center[0],
            (x - piece.center[0]) * Math.sin(piece.a) + (y - piece.center[1]) * Math.cos(piece.a) + piece.center[1] 
        ];
        // Shape is rotated by simply not taking angle into account below

		switch (piece.type) {
			case "RECTANGLE":
	            return (
	            	Math.abs(rotatedPos[0] - piece.center[0]) < piece.dim[0] &&
	            	Math.abs(rotatedPos[1] - piece.center[1]) < piece.dim[1]
            	);

	        // https://stackoverflow.com/questions/7946187/point-and-ellipse-rotated-position-test-algorithm
			case "ELLIPSE":
	            return 1 > (
	            	( Math.pow(rotatedPos[0] - piece.center[0], 2) /  Math.pow(piece.dim[0], 2) ) +
	            	( Math.pow(rotatedPos[1] - piece.center[1], 2) /  Math.pow(piece.dim[1], 2) )
	            );

			default:
				console.error("Unrecognized terrain type: ", piece.type);
				return false;
		}
	});

	if (coverIdx !== -1) {
		return terrains[matchState.terrain][coverIdx];
	}

	return [];
};

export const getUnitAuras = (unit, forces, profiles, boardState, matchState) => {
	const allyIdx = unit.playerIdx, enemyIdx = allyIdx ? 0 : 1;
	let ret = [];

	// Iterate over every living ally
	mapLiving(boardState.units[allyIdx], (auraHolder, idx) => {
		if (forces[allyIdx].units[idx].allyAuras) {
			forces[allyIdx].units[idx].allyAuras.forEach((auraObj, i) => {
				if (
					distance(boardState.units[allyIdx][idx].pos, auraHolder.pos) <= auraObj.radius) {
					ret = ret.concat(checkAndApply(auraObj.params, auraHolder, profiles, boardState, matchState, forces[allyIdx].units[idx]));
				}
			})
		}
	});

	// Iterate over every living enemy
	mapLiving(boardState.units[enemyIdx], (auraHolder, idx) => {
		if (forces[enemyIdx].units[idx].enemyAuras) {
			forces[enemyIdx].units[idx].enemyAuras.forEach((auraObj, i) => {
				if (distance(boardState.units[enemyIdx][idx].pos, auraHolder.pos) <= auraObj.radius) {
					ret = ret.concat(checkAndApply(auraObj.params, auraHolder, profiles, boardState, matchState, forces[enemyIdx].units[idx]));
				}
			})
		}
	});

	return ret;
};

// Calls the callback on every living unit in the given array, returning each value in the resulting array.
// Note that the returned array will be the length of the number of living units, NOT the length of all units
export const mapLiving = (unitArr, callback) => {
	// Build an array of every unit index that has living models
	let tmpArr = unitArr.reduce((tmpArr, unit, i) => {
		if (unit.wounds.some(e => e > 0)) {
			tmpArr.push(i);
		}
	}, []);

	// Call the callback on each of the above
	return tmpArr.map(idx => callback(unitArr[idx], idx));
};

// Returns an array of every rule that has been successfully applied to this unit
// Neccessary to wrap effects with subrules, and automaticcaly performs to the evaluation
export const checkAndApply = (meaningObj, unit, profiles, boardState, matchState, originUnit) => {
	if (evalCond(meaningObj.cond, profiles, unit, boardState, matchState, originUnit)) {
		switch(meaningObj.type) {
			case "AND":
			case "OR":
				return meaningObj.params.reduce((ret, subObj) => {
					const subRes = checkAndApply(subObj, unit, profiles, boardState, matchState, originUnit)
					if (subRes.length) {
						ret = ret.concat(subRes);
					}
				}, []);
			default:
				return [meaningObj];
		};
	};

	return [];
};

export const meaningObjHasCondType = (meaning, type) => {
	switch (meaning.type) {
		case "AND":
		case "OR":
		case "XOR":
			return meaning.params.some(obj => meaningObjHasCondType(obj, type));
		case "NOT":
			return meaningObjHasCondType(meaning.params, type);
		default:
			return meaning.type === type;
	}
}