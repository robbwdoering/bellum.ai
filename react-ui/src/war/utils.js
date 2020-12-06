/**
 * FILENAME: utils.js
 *
 * DESCRIPTION: Utilites for the war processing functionality. Currently focused on text parsing. 
 *
 * OWNER: RWD
 */

import { regex, typoMap } from "./constants";

export const sanitizeString = str => {
	if (!str) return null;
	let ret = str.toLowerCase()
		.replace(/[- ]/g, "_")
		.replace(/'/g, "");

	// Return the formatted value, or an override value if one is found
	return typoMap[ret] || ret;
};

/**
 * Takes in a string that's directly from battlescribe, and turns it into a JSON object.
 * NOTE: The only changes you need to make are "Minimal Output", "Root Costs", and "Profile Summary".
 */
export const parsePlainText = str => {
	if (!str) {
		console.error("Can't parse plain text, no string provided.");
		return false;
	}

	let idx, tmpArr, curLine;

	let newArmy = {
		detachments: []
	};

	// Sanitize all types of linebreaks into \n characters
	const allLines = str.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
	let lines = [...allLines];

	// Get Name
	newArmy.name = lines[0].substring(4, lines[0].indexOf(" (Warhammer"));

	// Parse bracket contents
	idx = lines[0].indexOf(") [");
	tmpArr = lines[0].substring(idx + 3, lines[0].indexOf("]", idx)).split(", ");
	newArmy.pl = parseInt(tmpArr[0]);
	newArmy.cp = parseInt(tmpArr[1]);
	newArmy.points = parseInt(tmpArr[2].replace(/,/g, ""));

	// console.log("Parsed newArmy meta values: ", newArmy, tmpArr);

	// Count the number of detachment header lines
	const numDetachments = lines.filter(line => line.match(regex.detachmentHeader)).length;
	console.log("Dealing with ", numDetachments, " detachments.");

	// Loop through every detachment, remembering the end time of the last one to save processing
	let startLine = -1, endLine = -1;
	for (let dIdx = 0; dIdx < numDetachments; dIdx++) {
		startLine = (endLine !== -1 && endLine+1 < lines.length) ?
			endLine + 1 :
			lines.findIndex(line => line.match(regex.detachmentHeader));

		// Find the end of this detachment, which is either the start of another or the profile section
		endLine = lines.slice(startLine + 1).findIndex(line => line.match((dIdx === numDetachments - 1) ? regex.profile : regex.detachmentHeader));
		endLine += startLine;

		console.log(`Starting parsing of detachment in line range (${startLine}, ${endLine})`);
		if (endLine !== -1) {
			newArmy.detachments.push(parseDetachment(lines.slice(startLine, endLine)));
		}
	}

	newArmy.profile = parseProfile(lines.slice(endLine), newArmy.detachments);

	console.log("Storing newArmy", newArmy)
	return newArmy;
};

const parseUnit = (lines, curRole) => {
	// console.log("[parseUnit]", lines);
	let newUnit = { models: [] };
	let newModel = null; 
	let curLine = 0;
	let tmpArr, idx, tmpStr;

	// Find the name
	idx = lines[0].indexOf(" [");
	newUnit.name = lines[0].substring(0, idx);
	newUnit.name = typoMap[newUnit.name] || newUnit.name;  // Correct any typos

	// Parse the first line brackets for points
	// Points is the third thing if CP is listed, so check for that
	idx += 2;
	tmpArr = lines[0].substring(idx, lines[0].indexOf("]", idx)).split(", ");
	newUnit.pl = parseInt(tmpArr[0]);
	newUnit.points = parseInt(tmpArr[(tmpArr.length === 2) ? 1 : 2]);
	newUnit.role = curRole;

	// Read the unit's equipment (this happens when the unit should be understood as it's own IMPLIED model)
	// Yes this is really how battlescribe is structured, no this is somehow not a crime
	idx = lines[0].indexOf(": ", idx + 1) + 2;
	if (idx != 1) {
		newUnit.equipment = lines[0].substring(idx).split(", ")
	}

	// Read every line of this unit after the first one
	// const numSubsections = lines.filter(line => line.match(regex.subsection)).length;
	lines.slice(1).forEach(line => {
		// Handle Categories - like "Troop" or "Flyer"
		if (line.includes(". Categories: ")) {
			processTokenHeader(line, newUnit, newModel, "categories");

		// Handle rules lists, which are like categories for the token lib 
		} else if (line.match(regex.rulesHeader)) {
			processTokenHeader(line, newUnit, newModel, "rules");

		// Handle "detail headers", which contain a lot of information concatenated onto one line
		// If we've started a model, these are headers for the model
		} else if (line.match(regex.detailsHeader) && !newModel) {
			processDetailsHeader(line, newUnit);

		// Subsections are for models - only proceed if we've started one
		} else if (newModel && line.match(regex.secSection)) {
			// console.log('starting secondary section', line);
			// If this line minues the first ". " looks like a details header, load it as one for the model
			let tmpStr = line.substring(2)
			if (tmpStr.match(regex.detailsHeader)) {
				processDetailsHeader(tmpStr, newModel);
			}

		// Tertiary sections are a noop atm
		} else if (newModel && line.match(regex.tertSection)) {
			// console.log('Skipping tertiary section...');

		// Interpret all other subsection lines as Models
		} else if (line.match(regex.subsection)) {
			// Store the previous model
			if (newModel != null) newUnit.models.push(newModel);

			// Start a new model
			newModel = { quantity: 1 };
			idx = 2;

			// Quantified Model
			if (line.match(regex.quantifiedModel)) {
				idx = line.indexOf("x ", idx);
				newModel.quantity = parseInt(line.substring(2, idx));
				idx += 2;
			}

			newModel.name = line.substring(idx, line.indexOf(": ", idx + 1));
			idx = line.indexOf(": ", idx + 1) + 2;
			newModel.equipment = line.substring(idx).split(", ");
		}

	});

	// Store the last model
	if (newModel != null) newUnit.models.push(newModel);

	// console.log("adding unit: ", newUnit);
	return newUnit;
};

const parseDetachment = (lines) => {
	// console.log("[parseDetachment]", lines);
	let ret = {
		units: []
	};

	let idx, tmpArr, curRole;

	if (!lines || !lines.length) {
		console.log("Found an empty detachment. This should not happen.")
		return ret;
	}

	// Parse type and faction
	idx = lines[0].indexOf(" Detachment");
	ret.type = lines[0].substring(3, idx);
	idx = lines[0].indexOf(" (", idx + 1);
	ret.faction = lines[0].substring(idx + 2, lines[0].indexOf(")", idx));

	// Parse points
	idx = lines[0].indexOf(" [", idx) + 2;
	tmpArr = lines[0].substring(idx, lines[0].indexOf("]", idx)).split(", ");
	ret.pl = parseInt(tmpArr[0]);
	ret.cp = parseInt(tmpArr[1]);
	ret.points = parseInt(tmpArr[2]);

	// Parse all slots
	const pArr = lines.slice(2).join("\n").split("\n\n");

	// Process every paragraph if configuration isn't found. Otherwise wait to pass it
	let doBegin = !lines.join("").includes("+ Configuration");
	pArr.forEach(para => {
		const pLines = para.split("\n");
		// console.log("[paragraph]", pLines, doBegin, pLines[0].match(regex.slotHeader));

		// If this paragraph is a slot header, note that the configuration section is over
		if (pLines[0].match(regex.roleHeader)) {
			doBegin = true;
			curRole = pLines[0].substring(2, pLines[0].length - 2);
		} else if (doBegin) {
			ret.units.push(parseUnit(pLines, curRole));
		}
	});

	// console.log("Adding detachment: ", ret);
	return ret;
};

/** 
 * Parse the profile section, which contains a variety of different pieces of information. They fall into the categories enumerated in the if/else
 * blocks below.
 */
const parseProfile = (lines, detachments) => {
	// console.log("[parseProfile]", lines);
	let tmpStr, tmpArr, idx;

	// Nested function used to take in a tokenized statblock string and output a JSON version of that stat block
	const handleEntry = arr => arr.reduce((subAcc, str, i) => {
		idx = str.indexOf(":");
		let name = sanitizeString(str.substring(0, idx));
		let val = str.substring(idx + 1).replace(/'/g, "");

		if (name === "remaining_w" || name === "wounds") {
			name = "w";

			// Update the val to be the minimum amount of wounds for every track
			val = parseInt(str.substring(idx + 1, str.indexOf("-", idx)));
		} else if (name === "movement") {
			name = "m";
		} else if (name === "toughness") {
			name = "t";
		} else if (name === "ballistics" || name === "ballistics_skill") {
			name = "bs";
		} else if (name === "attacks") {
			name = "a";
		} else if (name === "strength") {
			name = "s";
		} else if (name === "weapons_skill") {
			name = "ws";
		} else if (name === "leadership") {
			name = "ld";
		}

		subAcc[name] = val;
		return subAcc;
	}, {});

	return lines.filter(line => line.match(regex.subsection)).reduce((acc, rawLine, i) => {
		let catName, propName;
		let line = rawLine;

		// These properties requiere "meaning" object to have effect on gameplay, and are just string:string pairs at this stage
		if (line.match(regex.profileDescription)) {
			idx = line.indexOf(": Description:");
			propName = sanitizeString(line.substring(2, idx));
			acc.desc[propName] = line.substring(idx + 14);
		} else if (line.match(regex.profileEffect)) {
			idx = line.indexOf(": Effect:");
			propName = sanitizeString(line.substring(2, idx));
			acc.desc[propName] = line.substring(idx + 9);
		} else if (line.match(regex.profileRules)) {
			idx = line.indexOf(": Rules:");
			propName = sanitizeString(line.substring(2, idx));
			acc.desc[propName] = line.substring(idx + 8);

		// These properties can be generally described as "entities" and processed together - see catName block below
		} else if (line.match(regex.profilePower)) {
			idx = line.indexOf(": Warp Charge:");
			catName = "power";
		} else if (line.match(regex.profileStats)) {
			idx = line.indexOf(": M:");
			catName = "stats";
		} else if (line.match(regex.profileWeapon)) {
			idx = line.indexOf(": Range:");
			catName = "weapons";
		} else if (line.match(regex.profilePsyker)) {
			idx = line.indexOf(": Cast:");
			catName = "psykers";
		} else if (line.match(regex.profileWoundTrack)) {
			idx = line.indexOf(": ");
			catName = "stats";
		// If we don't recognize this line, treat it as a description
		} else {
			idx = line.indexOf(": ");
			propName = sanitizeString(line.substring(2, idx));
			acc.desc[propName] = line.substring(idx + 2);
			console.log("Cannot parse profile line ", line)
		}

		// Deal with entitied memtioned above
		if (catName) {
			propName = sanitizeString(line.substring(2, idx));

			// Handle special cases
			// There's various kinds, like "transport_wound_track". ignore them - we want one unified field
			// if (propName.includes("wound_track")) {
			// 	propName = "wound_track";
			// }

			tmpArr = line.substring(idx + 2).split("|");
			acc[catName][propName] = handleEntry(tmpArr);

			// Handle propName edge cases where we add two entries to be safe
			// One with parens, one without
			// for names like "Big Mek (Da Kleverest Boss)", where the unit is just "Big Mek"
			if (propName.match(regex.parenthesisName)) {
				acc[catName][propName.substring(0, propName.indexOf(" ("))] = handleEntry(tmpArr);
			}
		}	

		return acc;
	}, { desc: {}, power: {}, stats: {}, weapons: {}, psykers: {}});
};

/** 
 * Process a detail header section, which is a basically a map with string keys and values that are arrays of strings. 
 * See the contents of the detailsHeader regex for the kinds of information that can exist here.
 * NOTE: These exist for both units and models.
 */
const processDetailsHeader = (line, obj) => {
	const lineSectionHeaders = line.match(regex.detailsHeader);
	let idx;

	lineSectionHeaders.forEach((e, i) => {
		idx = line.indexOf(e) + e.length;
		const propertyName = sanitizeString(e.substring(1, e.length-2));
		const endIndex = (i + 1 < lineSectionHeaders.length) ? line.indexOf(lineSectionHeaders[i+1], idx) : undefined;

		obj[propertyName] = line.substring(idx, endIndex).split(", ").filter(e => e.length).map(e => e.replace(/,/g, ""));
	});
}

/** 
 * Process a token header, which is an array of strings. Examples are "Categories" and "Rules".
 * NOTE: These exist for both units and models.
 */
const processTokenHeader = (line, newUnit, newModel, fieldName) => {
	let tmpArr = line.substring(line.indexOf(": ") + 2).split(", ");
	
	// Add subsections to the unit
	if (line.match(regex.subsection)) {
		newUnit[fieldName] = tmpArr;

	// Add everything else to the model
	} else if (newModel != null) {
		newModel[fieldName] = tmpArr;
	}
}
