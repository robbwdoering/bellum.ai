/**
 * FILENAME: utils.js
 *
 * DESCRIPTION: Utilites for the war processing functionality. Currently focused on text parsing. 
 *
 * OWNER: RWD
 */


 // TODO: Paths to victory feature ?????????????
 // Three levels of support: 1. Info w/o Probabilities 2. Info w/ Probabilities 3. Suggestions 
 // TODO: AR feature to show where all the units are / import them!!!!!
 // TODO: A "Chances this survives till next turn" feature

 import { regex } from "./constants";

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
	newArmy.points = parseInt(tmpArr[2]);

	console.log("Parsed newArmy meta values: ", newArmy);

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
		endLine = lines.slice(startLine).findIndex(line => line.match(dIdx === (numDetachments - 1) ? regex.profile : regex.detachmentHeader));

		console.log(`Starting parsing of detachment in line range (${startLine}, ${endLine})`, lines);
		newArmy.detachments.push(parseDetachment(lines.slice(startLine, endLine)));
	}

	newArmy.profile = parseProfile(lines.slice(endLine));

	console.log("Storing newArmy", newArmy)
	return newArmy;
}

const sanitizeString = str => str.toLowerCase().replace(/[- ]/g, "_").replace(/'/g, "");

const parseUnit = (lines) => {
	let newUnit = { models: [] };
	let newModel = null; 
	let curLine = 0;
	let tmpArr, idx, tmpStr;

	// Find the name
	idx = lines[0].indexOf(" [");
	newUnit.name = lines[0].substring(0, idx);

	// Parse the first line brackets for points
	// Points is the third thing if CP is listed, so check for that
	idx += 2;
	tmpArr = lines[0].substring(idx, lines[0].indexOf("]", idx)).split(", ");
	newUnit.pl = parseInt(tmpArr[0]);
	newUnit.points = parseInt(tmpArr[(tmpArr.length === 2) ? 1 : 2]);

	// Read the unit's equipment (this happens when the unit should be understood as it's own IMPLIED model)
	// Yes this is really how battlescribe is structured, no this is somehow not a crime
	idx = lines[0].indexOf(": ", idx + 1) + 2;
	newUnit.equipment = lines[0].substring(idx).split(", ")

	// Read every line of this unit after the first one
	// const numSubsections = lines.filter(line => line.match(regex.subsection)).length;
	lines.slice(1).forEach(line => {
		// Handle Categories 
		if (line.includes(". Categories: ")) {
			tmpArr = line.substring(line.indexOf(": ") + 2).split(", ");

			// Add subsections to the unit
			if (line.match(regex.subsection)) {
				newUnit.categories = tmpArr;
			// Add everything else to the model
			} else if (newModel != null) {
				newModel.categories = tmpArr;
			}

		// Handle Abilities 
		} else if (line.match(regex.detailsHeader)) {
			const lineSectionHeaders = line.match(regex.detailsHeader);
			lineSectionHeaders.forEach((e, i) => {
				idx = line.indexOf(e) + e.length;
				const propertyName = sanitizeString(e.substring(1, e.length-2));
				const endIndex = (i + 1 < lineSectionHeaders.length) ? line.indexOf(lineSectionHeaders[i+1], idx) : undefined;

				newUnit[propertyName] = line.substring(idx, endIndex).split(", ").filter(e => e.length).map(e => e.replace(/,/g, ""));
				console.log("Adding line section ", e, propertyName, idx, endIndex, newUnit[propertyName]);
			});

		// Add Models
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
			newModel.equipment = line.substring(idx).split(", ")

		} else if (line.match(regex.secSection)) {
			console.log('Skipping secondary section...');

		} else if (line.match(regex.tertSection)) {
			console.log('Skipping tertiary section...');
		}
	});

	// Store the last model
	if (newModel != null) newUnit.models.push(newModel);

	console.log("adding unit: ", newUnit);
	return newUnit;
}

const parseDetachment = (lines) => {
	let ret = {
		units: []
	};

	let idx, tmpArr;

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
	const numSlots = lines.filter(line => line.match(regex.slotHeader)).length;

	const pArr = lines.slice(2).join("\n").split("\n\n");

	// Process every paragraph if configuration isn't found. Otherwise wait to pass it
	let doBegin = !lines.join("").includes("+ Configuration");
	pArr.forEach(para => {
		const pLines = para.split("\n");
		console.log("dealing with paragraph:", pLines)

		// If this paragraph is a slot header, skip it and note that the configuration section is over
		if (pLines[0].match(regex.slotHeader)) {
			console.log("Skipping header.");
			doBegin = true;
		} else if (doBegin) {
			ret.units.push(parseUnit(pLines));
		}
	});

	console.log("Adding detachment: ", ret);
	return ret;
}

const parseProfile = lines => {
	let tmpStr, tmpArr, idx;

	const handleEntry = arr => arr.reduce((subAcc, str, i) => {
		idx = str.indexOf(":");
		let name = sanitizeString(str.substring(0, idx));
		let val = str.substring(idx + 1).replace(/'/g, "");

		if (name === "remaining_w") {
			name = "w";

			// If this is a wound track, add some init values since we won't fill out every field of the statblock
			subAcc.m = -1;
			subAcc.bs = -1;
			subAcc.ws = -1;
			subAcc.t = -1;
			subAcc.s = -1;
			subAcc.a = -1;
			subAcc.save = "0";
			subAcc.ld = 0;

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

	return lines.filter(line => line.match(regex.subsection)).reduce((acc, line, i) => {
		let catName, propName;

		if (line.match(regex.profileDescription)) {
			idx = line.indexOf(": Description:");
			propName = sanitizeString(line.substring(2, idx));
			acc.desc[propName] = line.substring(idx + 14);
		} else if (line.match(regex.profileEffect)) {
			idx = line.indexOf(": Effect:");
			propName = sanitizeString(line.substring(2, idx));
			acc.desc[propName] = line.substring(idx + 9);
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
		} else {
			console.log("Cannot parse profile line ", line)
		}

		if (catName) {
			propName = sanitizeString(line.substring(2, idx));
			tmpArr = line.substring(idx + 2).split("|");
			acc[catName][propName] = handleEntry(tmpArr);
		}	

		return acc;
	}, { desc: {}, power: {}, stats: {}, weapons: {}, psykers: {}});
}

