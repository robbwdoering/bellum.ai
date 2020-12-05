const express = require('express');

const processResults = (results) => {
	if (results && results.results && results.results.length) {
		return results.results;
	}

	return {};
}

const sanitizeString = str => str.toLowerCase().replace(/[- ]/g, "_").replace(/'/g, "");

class Profile {
	constructor() {
		this.stats = [];
		this.powers = [];
		this.desc = [];
		this.psykers = [];
		this.weapons = [];
	}

	fetchAllFromDb = async (pool, queryDB) => {
		let query, results;

		// Build queries
		if (this.desc.length) {
			query = (this.desc.reduce((acc, desc, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(desc) + "'" 
			), "SELECT * FROM war_desc_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.desc = processResults(results);
		}

		if (this.weapons.length) {
			query = (this.weapons.reduce((acc, wep, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(wep) + "'" 
			), "SELECT * FROM war_weapon_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.weapons = processResults(results);
		}

		if (this.stats.length) {
			query = (this.stats.reduce((acc, stat, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(stat) + "'" 
			), "SELECT * FROM war_stat_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.stats = processResults(results);
		}

		if (this.psykers.length) {
			query = (this.psykers.reduce((acc, psyker, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(psyker) + "'" 
			), "SELECT * FROM war_psyker_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.psykers = processResults(results);
		}

		if (this.powers.length) {
			query = (this.powers.reduce((acc, power, i) => (
				acc + (i > 0 ? " OR " : " ") + "name = '" + sanitizeString(power) + "'" 
			), "SELECT * FROM war_power_profile WHERE ") + ";");
			console.log("Sending Query: ", query);
			results = await queryDB(pool, query);
			// console.log("Received results for profile request: ", results);
			this.powers = processResults(results);
		}
	}

};
exports.Profile = Profile;

// NOTE: ORdering of this list matters - searched top to bottom, and takes the first it finds
exports.nameSuffixMarkers = [
	/ [wW]\/ /g, // abbreviation for with, describes equipment
	/ s$\/ /g, // S at end of line could indicate an unnecessary plural
];

exports.defBucketTargets = {
	// Resilience stat are used to determine the damage profile of a unit
	lightResilience: [
		{toughness: 3, save: 4, weight: 2},
		{toughness: 3, save: 5},
		{toughness: 3, save: 6, weight: 2},
	],
	medResilience: [
		{toughness: 4, save: 3, weight: 1},
		{toughness: 4, save: 4, weight: 2},
		{toughness: 4, save: 6, weight: 1},
		{toughness: 4, save: 5, weight: 1},
		{toughness: 5, save: 4, weight: 1},
		{toughness: 5, save: 6, weight: 0.5}
	],
	toughResilience: [
		{toughness: 5, save: 3, weight: 1},
		{toughness: 4, sav: 2, weight: 1},
		{toughness: 6, sav: 4, weight: 1},
		{toughness: 6, sav: 5, weight: 1}
	],
	tankResilience: [
		{toughness: 7, save: 3},
		{toughness: 8, save: 3},
		{toughness: 7, save: 2},
		{toughness: 8, save: 2},
		{toughness: 9, save: 4},
		{toughness: 10, save: 4, weight: 0.5},
	],

	// Threats are used to determine the resilience of a unit
	lightThreats: [
		{type: "Rapid Fire", shots: 1, strength: 3, AP:	0, damage: 1},
		{type: "Rapid Fire", shots: 1, strength: 4, AP:	0, damage: 1},
		{type: "Rapid Fire", shots: 1, strength: 5, AP:	0, damage: 1},
		{type: "Rapid Fire", shots: 1, strength: 4, AP:	-1, damage: 1},
		{type: "Assault", shots: 1, strength: 3, AP:	0, damage: 1},
		{type: "Assault", shots: 2, strength: 4, AP:	0, damage: 1},
	], 
	medThreats: [
		{type: "Heavy", shots: 3, strength: 5, AP:	-1, damage: 1},
		{type: "Heavy", shots: "D6", strength: 8, AP:	-2, damage: "D3"},
		{type: "Heavy", shots: 12, strength: 6, AP:	-1, damage: 2},
		{type: "Heavy", shots: 4, strength: 5, AP:	0, damage: 1},
	],
	antiInfantryThreats: [
		{type: "Grenade", shots: "D6", strength: 3, AP: 0, damage: 1},
		{type: "Rapid Fire", shots: 4, strength: 4, AP: 0, damage: 1},
		{type: "Heavy", shots: "D6", strength: 5, AP: -1, damage: 1}, 
		{type: "Heavy", shots: "D3", strength: 5, AP: -2, damage: 2}, // BLAST
	],
	antiTankThreats: [
		{type: "Heavy", shots: "D3", strength: 9, AP:	-3, damage: "D6"},
		{type: "Assault", shots: 2, strength: 7, AP:	-1, damage: "D3"},
		{type: "Heavy", shots: 2, strength: 8, AP:	-4, damage: "D6"},
		{type: "Heavy", shots: 2, strength: 9, AP:	-3, damage: "D6"}, //MELTA
		{type: "Heavy", shots: 1, strength: 8, AP:	-3, damage: "D6"}
	]
};

exports.statFields = ["m", "ws", "bs", "s", "t", "w", "a", "ld", "sv"];

// Pascals triangle, for use as coeffecients for number of shots value expansion
exports.pascals = [
	[1, 1],
	[1, 2, 1],
	[1, 3, 3, 1],
	[1, 4, 6, 4, 1],
	[1, 5, 10, 10, 5, 1],
	[1, 6, 15, 20, 15, 6, 1],
	[1, 7, 21, 35, 35, 21, 7, 1],
	[1, 8, 28, 56, 70, 56, 28, 8, 1],
	[1, 9, 36, 84, 126, 126, 84, 36, 9, 1],
	[1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1],
	[1, 11, 55, 165, 330, 462, 462, 330, 165, 55, 11, 1],
	[1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1],
	[1, 13, 78, 286, 715, 1287, 1716, 1716, 1287, 715, 286, 78, 13, 1],
	[1, 14, 91, 364, 1001, 2002, 3003, 3432, 3003, 2002, 1001, 364, 91, 14, 1],
	[1, 15, 105, 455, 1365, 3003, 5005, 6435, 6435, 5005, 3003, 1365, 455, 105, 15, 1]
];

// Stored probability distributions for summations of series of dice rolls
exports.d3 = [
	[[1, .33333], [2, .33333], [3, .33333]],
	[[2, .11111], [3, .22222], [4, .33333], [5, .22222], [6, .11111]],
	[[3,.03704], [4, .11111], [5, .22222], [6, .25926], [7, .22222], [8, .11111], [9,.03704]],
	[[4,.01235], [5,.04938], [6, .12346], [7, .19753], [8, .23457], [9, .19753], [10, .12346], [11,.04938], [12,.01235]],
	[[5,.00412], [6,.02058], [7,.06173], [8, .12346], [9, .18519], [10, .20988], [11, .18519], [12, .12346], [13,.06173], [14,.02058], [15,.00412]],
	[[6,.00137], [7,.00823], [8,.02881], [9,.06859], [10, .12346], [11, .17284], [12, .19342], [13, .17284], [14, .12346], [15,.06859], [16,.02881], [17,.00823], [18,.00137]],
	[[8,.00320], [9,.01280], [10,.03521], [11,.07362], [12, .12163], [13, .16324], [14, .17970], [15, .16324], [16, .12163], [17,.07362], [18,.03521], [19,.01280], [20,.00320]],
	[[9,.00122], [10,.00549], [11,.01707], [12,.04054], [13,.07682], [14, .11949], [15, .15485], [16, .16872], [17, .15485], [18, .11949], [19,.07682], [20,.04054], [21,.01707], [22,.00549], [23,.00122]],
	[[11,.00229], [12,.00793], [13,.02103], [14,.04481], [15,.07895], [16, .11706], [17, .14769], [18, .15948], [19, .14769], [20, .11706], [21,.07895], [22,.04481], [23,.02103], [24,.00793], [25,.00229]],
	[[13,.00356], [14,.01042], [15,.02459], [16,.04827], [17,.08027], [18, .11457], [19, .14141], [20, .15162], [21, .14141], [22, .11457], [23,.08027], [24,.04827], [25,.02459], [26,.01042], [27,.00356],
];

exports.d6 = [
	[[1, .16667], [2, .16667], [3, .16667], [4, .16667], [5, .16667], [6, .16667]],
	[[2,.02778], [3,.05556], [4,.08333], [5, .11111], [6, .13889], [7, .16667], [8, .13889], [9, .11111], [10,.08333], [11,.05556], [12,.02778]],
	[[3,.00463], [4,.01389], [5,.02778], [6,.04630], [7,.06944], [8,.09722], [9, .11574], [10, .12500], [11, .12500], [12, .11574], [13,.09722], [14,.06944], [15,.04630], [16,.02778], [17,.01389], [18,.00463]],
	[[5,.00309], [6,.00772], [7,.01543], [8,.02701], [9,.04321], [10,.06173], [11,.08025], [12,.09645], [13, .10802], [14, .11265], [15, .10802], [16,.09645], [17,.08025], [18,.06173], [19,.04321], [20,.02701], [21,.01543], [22,.00772], [23,.00309]],
	[[6,.00064], [7,.00193], [8,.00450], [9,.00900], [10,.01620], [11,.02636], [12,.03922], [13,.05401], [14,.06944], [15,.08372], [16,.09452], [17, .10031], [18, .10031], [19,.09452], [20,.08372], [21,.06944], [22,.05401], [23,.03922], [24,.02636], [25,.01620], [26,.00900], [27,.00450], [28,.00193]],
	[[9,.00120], [10,.00270], [11,.00540], [12,.00977], [13,.01620], [14,.02488], [15,.03571], [16,.04816], [17,.06121], [18,.07354], [19,.08372], [20,.09047], [21,.09285], [22,.09047], [23,.08372], [24,.07354], [25,.06121], [26,.04816], [27,.03571], [28,.02488], [29,.01620], [30,.00977], [31,.00540], [32,.00270], [33,.00120]],
	[[12,.00165], [13,.00328], [14,.00595], [15,.01003], [16,.01578], [17,.02336], [18,.03266], [19,.04328], [20,.05454], [21,.06547], [22,.07499], [23,.08204], [24,.08579], [25,.08579], [26,.08204], [27,.07499], [28,.06547], [29,.05454], [30,.04328], [31,.03266], [32,.02336], [33,.01578], [34,.01003], [35,.00595], [36,.00328], [37,.00165]],
	[[14,.00102], [15,.00201], [16,.00366], [17,.00624], [18,.01001], [19,.01517], [20,.02184], [21,.02994], [22,.03918], [23,.04905], [24,.05883], [25,.06769], [26,.07477], [27,.07936], [28,.08094], [29,.07936], [30,.07477], [31,.06769], [32,.05883], [33,.04905], [34,.03918], [35,.02994], [36,.02184], [37,.01517], [38,.01001], [39,.00624], [40,.00366], [41,.00201], [42,.00102]],
	[[17,.00124], [18,.00226], [19,.00390], [20,.00635], [21,.00982], [22,.01448], [23,.02040], [24,.02753], [25,.03567], [26,.04442], [27,.05324], [28,.06148], [29,.06844], [30,.07349], [31,.07615], [32,.07615], [33,.07349], [34,.06844], [35,.06148], [36,.05324], [37,.04442], [38,.03567], [39,.02753], [40,.02040], [41,.01448], [42,.00982], [43,.00635], [44,.00390], [45,.00226], [46,.00124]],
	[[20,.00141], [21,.00245], [22,.00403], [23,.00634], [24,.00954], [25,.01375], [26,.01904], [27,.02539], [28,.03262], [29,.04046], [30,.04846], [31,.05612], [32,.06287], [33,.06816], [34,.07153], [35,.07269], [36,.07153], [37,.06816], [38,.06287], [39,.05612], [40,.04846], [41,.04046], [42,.03262], [43,.02539], [44,.01904], [45,.01375], [46,.00954], [47,.00634], [48,.00403], [49,.00245], [50,.00141]],
	[[23,.00154], [24,.00257], [25,.00409], [26,.00625], [27,.00919], [28,.01301], [29,.01778], [30,.02347], [31,.02995], [32,.03702], [33,.04432], [34,.05145], [35,.05793], [36,.06331], [37,.06715], [38,.06916], [39,.06916], [40,.06715], [41,.06331], [42,.05793], [43,.05145], [44,.04432], [45,.03702], [46,.02995], [47,.02347], [48,.01778], [49,.01301], [50,.00919], [51,.00625], [52,.00409], [53,.00257], [54,.00154]],
	[[26,.00163], [27,.00263], [28,.00409], [29,.00611], [30,.00882], [31,.01230], [32,.01661], [33,.02174], [34,.02759], [35,.03400], [36,.04069], [37,.04733], [38,.05353], [39,.05889], [40,.06303], [41,.06564], [42,.06654], [43,.06564], [44,.06303], [45,.05889], [46,.05353], [47,.04733], [48,.04069], [49,.03400], [50,.02759], [51,.02174], [52,.01661], [53,.01230], [54,.00882], [55,.00611], [56,.00409], [57,.00263], [58,.00163]],
	[[28,.00104], [29,.00170], [30,.00266], [31,.00404], [32,.00593], [33,.00843], [34,.01161], [35,.01553], [36,.02017], [37,.02549], [38,.03133], [39,.03748], [40,.04367], [41,.04958], [42,.05485], [43,.05916], [44,.06221], [45,.06379], [46,.06379], [47,.06221], [48,.05916], [49,.05485], [50,.04958], [51,.04367], [52,.03748], [53,.03133], [54,.02549], [55,.02017], [56,.01553], [57,.01161], [58,.00843], [59,.00593], [60,.00404], [61,.00266], [62,.00170], [63,.00104]],
	[[31,.00109], [32,.00173], [33,.00266], [34,.00397], [35,.00573], [36,.00803], [37,.01095], [38,.01453], [39,.01876], [40,.02360], [41,.02894], [42,.03462], [43,.04040], [44,.04601], [45,.05116], [46,.05554], [47,.05890], [48,.06100], [49,.06172], [50,.06100], [51,.05890], [52,.05554], [53,.05116], [54,.04601], [55,.04040], [56,.03462], [57,.02894], [58,.02360], [59,.01876], [60,.01453], [61,.01095], [62,.00803], [63,.00573], [64,.00397], [65,.00266], [66,.00173], [67,.00109]],
	[[34,.00113], [35,.00175], [36,.00264], [37,.00387], [38,.00551], [39,.00764], [40,.01033], [41,.01360], [42,.01747], [43,.02190], [44,.02681], [45,.03206], [46,.03746], [47,.04278], [48,.04777], [49,.05217], [50,.05572], [51,.05822], [52,.05951], [53,.05951], [54,.05822], [55,.05572], [56,.05217], [57,.04777], [58,.04278], [59,.03746], [60,.03206], [61,.02681], [62,.02190], [63,.01747], [64,.01360], [65,.01033], [66,.00764], [67,.00551], [68,.00387], [69,.00264], [70,.00175], [71,.00113]],
	[[37,.00115], [38,.00175], [39,.00260], [40,.00376], [41,.00529], [42,.00727], [43,.00974], [44,.01274], [45,.01629], [46,.02036], [47,.02488], [48,.02974], [49,.03479], [50,.03984], [51,.04466], [52,.04902], [53,.05270], [54,.05548], [55,.05723], [56,.05782], [57,.05723], [58,.05548], [59,.05270], [60,.04902], [61,.04466], [62,.03984], [63,.03479], [64,.02974], [65,.02488], [66,.02036], [67,.01629], [68,.01274], [69,.00974], [70,.00727], [71,.00529], [72,.00376], [73,.00260], [74,.00175], [75,.00115]],
	[[40,.00116], [41,.00174], [42,.00255], [43,.00364], [44,.00507], [45,.00690], [46,.00918], [47,.01195], [48,.01521], [49,.01896], [50,.02314], [51,.02765], [52,.03238], [53,.03716], [54,.04179], [55,.04608], [56,.04982], [57,.05282], [58,.05491], [59,.05599], [60,.05599], [61,.05491], [62,.05282], [63,.04982], [64,.04608], [65,.04179], [66,.03716], [67,.03238], [68,.02765], [69,.02314], [70,.01896], [71,.01521], [72,.01195], [73,.00918], [74,.00690], [75,.00507], [76,.00364], [77,.00255], [78,.00174], [79,.00116]],
	[[43,.00116], [44,.00172], [45,.00248], [46,.00351], [47,.00485], [48,.00655], [49,.00866], [50,.01121], [51,.01422], [52,.01768], [53,.02155], [54,.02575], [55,.03018], [56,.03470], [57,.03915], [58,.04334], [59,.04710], [60,.05024], [61,.05260], [62,.05407], [63,.05457], [64,.05407], [65,.05260], [66,.05024], [67,.04710], [68,.04334], [69,.03915], [70,.03470], [71,.03018], [72,.02575], [73,.02155], [74,.01768], [75,.01422], [76,.01121], [77,.00866], [78,.00655], [79,.00485], [80,.00351], [81,.00248], [82,.00172], [83,.00116]],
	[[46,.00116], [47,.00169], [48,.00241], [49,.00338], [50,.00463], [51,.00621], [52,.00817], [53,.01053], [54,.01331], [55,.01651], [56,.02010], [57,.02401], [58,.02817], [59,.03244], [60,.03670], [61,.04078], [62,.04452], [63,.04775], [64,.05032], [65,.05211], [66,.05303], [67,.05303], [68,.05211], [69,.05032], [70,.04775], [71,.04452], [72,.04078], [73,.03670], [74,.03244], [75,.02817], [76,.02401], [77,.02010], [78,.01651], [79,.01331], [80,.01053], [81,.00817], [82,.00621], [83,.00463], [84,.00338], [85,.00241], [86,.00169], [87,.00116]],
	[[49,.00114], [50,.00165], [51,.00234], [52,.00325], [53,.00441], [54,.00589], [55,.00770], [56,.00989], [57,.01247], [58,.01544], [59,.01877], [60,.02242], [61,.02632], [62,.03037], [63,.03444], [64,.03839], [65,.04209], [66,.04536], [67,.04808], [68,.05013], [69,.05139], [70,.05182], [71,.05139], [72,.05013], [73,.04808], [74,.04536], [75,.04209], [76,.03839], [77,.03444], [78,.03037], [79,.02632], [80,.02242], [81,.01877], [82,.01544], [83,.01247], [84,.00989], [85,.00770], [86,.00589], [87,.00441], [88,.00325], [89,.00234], [90,.00165], [91,.00114]],
	[[52,.00113], [53,.00161], [54,.00226], [55,.00311], [56,.00421], [57,.00558], [58,.00727], [59,.00930], [60,.01169], [61,.01445], [62,.01755], [63,.02097], [64,.02463], [65,.02845], [66,.03234], [67,.03616], [68,.03979], [69,.04308], [70,.04591], [71,.04814], [72,.04970], [73,.05049], [74,.05049], [75,.04970], [76,.04814], [77,.04591], [78,.04308], [79,.03979], [80,.03616], [81,.03234], [82,.02845], [83,.02463], [84,.02097], [85,.01755], [86,.01445], [87,.01169], [88,.00930], [89,.00727], [90,.00558], [91,.00421], [92,.00311], [93,.00226], [94,.00161], [95,.00113]]
];

