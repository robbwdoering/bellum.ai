import { terrains, distance } from "./../map/constants";

/**
 * Evaluate one conditional. This seems complex, but boils down to a switch statement that supports recursion.
 * For details on the objects you can feed into here, see meaningFormats.txt.
 * @return boolean corresponding to the evaluated conditional 
 */
export const evalCond = (cond, profile, unit, boardState, matchState, playerIdx, unitIdx, modelIdx) => {
	switch(cond.type) {
		// ------------------
		// BOOLEAN OPERATIONS
		// ------------------
		case "AND":
			// Coded as De Morgan's negation of AND for convenience
			return !cond.params.some(subCond => !evalCond(subCond, profile, unit, boardState, playerIdx, unitIdx, modelIdx));
		case "OR":
			return cond.params.some(subCond => evalCond(subCond, profile, unit, boardState, playerIdx, unitIdx, modelIdx));
		// case "XOR":
			// TODO - is this ever used?
		case "NOT":
			return !evalCond(subCond, profile, unit, boardState, playerIdx, unitIdx, modelIdx);

		// --------
		// STATUSES 
		// --------
		case "IN_COVER":
			if (!matchState.terrain && !terrains[matchState.terrain]) {
				return false;
			}

			// Filter the list of terrain pieces that could theoretically be in range
			let relevantCover = terrains[matchState.terrain].reduce((relevantCover, piece, i) => {
				const isRightType = piece.traits.includes(cond.subType);
				if (isRightType && distance(piece.center, unit.pos()) < Math.max(...piece.dim)) {
					relevantCover.push([piece, i]);
				}
				return relevantCover;
			}, []);

			// Perform the final calculations by rotating the point and shape, then performing axis-aligned collision checks
			return relevantCover.some(([piece, i]) => {
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

		// -------
		// AFFECTS 
		// -------

		// -----
		// FLAGS 
		// -----

		// ------------------
		// STATIC UNIT FIELDS 
		// ------------------
		// These aren't always completely static - it's a rough grouping. As opposed to highly dynamic fields, like status or position
		case "HAS_CATEGORY":
			// If unit has any of these categories
			// To do "Unit has all these categories", chain these manually with "AND" statements
			return (unit.categories && unit.categories.find(cat => cond.params.includes(sanitizeString(cat))));

		case "HAS_CHARACTERISTIC":
			// If unit's stat X is more than or equal to Y
			const stat = unit.getStat();
			return stat[cond.params.field] >= val;
	}
	return false;
};

const buildResultArr = (meaning) => {
	let ret = [];
	// TODO - support infinitely nested levels here
	// TODO - add separate logic for handling "OR" results, like defensible cover
	// Right now, all "OR" results are treated as "and"s
	if (meaning.type === "AND" || meaning.type === "OR") {
		return meaning.params;
	}

	let res = Object.assign({}, meaning);
	delete res.cond; // We don't need to store the conditional, since it's already been passed 

	return [meaning];
}
