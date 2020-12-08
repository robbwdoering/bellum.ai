/**
 * FILENAME: constants.js
 *
 * DESCRIPTION: Constants for the `war` package. 
 *
 * OWNER: RWD
 */

export const WarActions = {
	SET_PRIMARY_LIST: "SET_PRIMARY_LIST",
	SET_SECONDARY_LIST: "SET_SECONDARY_LIST",
	SET_METALIST: "SET_METALIST",
	SET_UNSET_PROFILES: "SET_UNSET_PROFILES",
	SET_CHART_DATA: "SET_CHART_DATA",
	REQUEST_CHART_REFRESH: "REQUEST_CHART_REFRESH",
	SET_MATCH_STATE: "SET_MATCH_STATE",
	SET_FORCE_SCORECARD: "SET_FORCE_SCORECARD",
};

export const regex = {
	roleHeader: /^\+ (HQ|Troops|Fast Attack|Elites|Heavy Support|Flyer|Dedicated Transport|Transport) .*\+/g,
	detachmentHeader: /\+\+ [A-z]+ Detachment .+ \+\+/g,
	profile: /^\+\+ Profile Summary \+\+/g,
	subsection: /^\. .*.+/g,
	secSection: /^\. \. .*.+/g,
	tertSection: /^\. \. \. .*.+/g,
	quantifiedModel: /^\. [0-9]+x .+/g,
	detailsHeader: / Psychic Power: | Weapon: | Unit: | Abilities: | Psyker: | Wound Track: | Transport Wound Track: | Wound Track( -)* [/,()AWTSMBS]+: | Stat Damage( -)* [/,()AWTSMBS]+: /g,
	rulesHeader: /^\. Rules: .+/g,
	profileDescription: /^\. .+: Description:/g,
	profileRules: /^\. .+: Rules:/g,
	profilePower: /^\. .+: Warp Charge:/g,
	profileStats: /^\. .+: M:/g,
	profileWeapon: /^\. .+: Range:/g,
	profilePsyker: /^\. .+: Cast:/g,
	profileEffect: /^\. .+: Effect:/g,
	profileWoundTrack: /^\. .+: (Remaining W|Wounds):/g,
	parenthesisName: /^.+ (.+).*/g
};

export const datasheetFields = ['move', 'weapons', 'ballistics', 'strength', 'toughness', 'wounds', 'attacks', 'leadership', 'save'];

export const typoMap = {
	// ["big_mek_in_mega_armour_(da_kleverest_boss)"]: "big_mek_in_mega_armour",
	// ["ghazghkul_thraka"]: "ghazghkull_thraka"
};

export const demoData = {
};

export const phases = ['Setup', 'Command', 'Movement', 'Psychic', 'Shooting', 'Charge', 'Fight', 'Morale'];
export const mapSizeOptions = [
	{ text: '44" x 30"', value: 0},
	{ text: '44" x 60"', value: 1},
	{ text: '44" x 90"', value: 2},
];

export const terrainOptions = [
	{ text: "No Terrain", value: "No Terrain"},
	{ text: "FTC", value: "FTC"},
	{ text: "NOVA", value: "NOVA"},
	{ text: "ITC", value: "ITC"}
];

export const objectiveOptions = [
	{ text: 'Assassinate', value: 'Assassinate', objCat: 'Purge The Enemy' },
	{ text: 'Bring It Down', value: 'Bring It Down', objCat: 'Purge The Enemy' },
	{ text: 'Titan Slayers', value: 'Titan Slayers', objCat: 'Purge The Enemy' },
	{ text: 'Slay The Warlord', value: 'Slay The Warlord', objCat: 'Purge The Enemy' },

	{ text: 'Thin Their Ranks', value: 'Thin Their Ranks', objCat: 'No Mercy, No Respite' },
	{ text: 'Attrition', value: 'Attrition', objCat: 'No Mercy, No Respite'  },
	{ text: 'While We Stand, We Fight', value: 'While We Stand, We Fight', objCat: 'No Mercy, No Respite'  },
	{ text: 'First Strike', value: 'First Strike', objCat: 'No Mercy, No Respite'  },

	{ text: 'Engage On All Fronts', value: 'Engage On All Fronts', objCat: 'Battlefield Supremacy'  },
	{ text: 'Linebreaker', value: 'Linebreaker', objCat: 'Battlefield Supremacy'  },
	{ text: 'Domination', value: 'Domination', objCat: 'Battlefield Supremacy'  },

	{ text: 'Investigate Sites', value: 'Investigate Sites', objCat: 'Purge The Enemy'  },
	{ text: 'Repair Teleport Homer', value: 'Repair Teleport Homer', objCat: 'Purge The Enemy'  },
	{ text: 'Raise The Banners High', value: 'Raise The Banners High', objCat: 'Purge The Enemy'  },

	{ text: 'Mental Interrogation', value: 'Mental Interrogation', objCat: 'Warpcraft'  },
	{ text: 'Psychic Ritual', value: 'Psychic Ritual', objCat: 'Warpcraft'  },
	{ text: 'Abhor The Witch', value: 'Abhor The Witch', objCat: 'Warpcraft'  }
];

export const missionOptions = [
	{ text: "Only War", value: "Only War"},
	{ text: "Retrieval Mission", value: "Retrieval Mission"},
	{ text: "Frontline Warfare", value: "Frontline Warfare"},
	{ text: "Four Pillars", value: "Four Pillars"},
	{ text: "No Man's Land", value: "No Man's Land"},
	{ text: "Scorched Earth", value: "Scorched Earth"},
	{ text: "Vital Intelligence", value: "Vital Intelligence"},
];
