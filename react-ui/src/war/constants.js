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
	SET_UNSET_PROFILES: "SET_UNSET_PROFILES"
};

export const regex = {
	slotHeader: /^\+ (HQ|Troops|Fast Attack|Elites|Heavy Support|Flyer) .*\+/g,
	detachmentHeader: /\+\+ [A-z]+ Detachment .+ \+\+/g,
	profile: /^\+\+ Profile Summary \+\+/g,
	subsection: /^\. [A-z].+/g,
	secSection: /^\. \. [A-z].+/g,
	tertSection: /^\. \. \. [A-z].+/g,
	quantifiedModel: /^\. [0-9]+x .+/g,
	detailsHeader: / Psychic Power: | Weapon: | Unit: | Abilities: | Psyker: | Wound Track( -)* [\/\,\(\)AWTSMBS]+: | Stat Damage( -)* [\/\,\(\)AWTSMBS]+: /g,
	profileDescription: /^\. .+: Description:/g,
	profilePower: /^\. .+: Warp Charge:/g,
	profileStats: /^\. .+: M:/g,
	profileWeapon: /^\. .+: Range:/g,
	profilePsyker: /^\. .+: Cast:/g,
	profileEffect: /^\. .+: Effect:/g,
	profileWoundTrack: /^\. .+: Remaining W:/g,
}
