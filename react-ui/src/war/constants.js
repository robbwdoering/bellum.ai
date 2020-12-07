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
	SET_TEST_DATA: "SET_TEST_DATA",
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
	detailsHeader: / Psychic Power: | Weapon: | Unit: | Abilities: | Psyker: | Wound Track: | Transport Wound Track: | Wound Track( -)* [\/\,\(\)AWTSMBS]+: | Stat Damage( -)* [\/\,\(\)AWTSMBS]+: /g,
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

