export const statuses = [
	["advanced", {
		type: "ADVANCED",
		phase: 0
	}],

	["charged", {
		type: "CHARGED",
		phase: 0
	}],

	["engaged", {
		cond: {
			type: "IN_RANGE",
			subType: "ENEMY",
			params: { range: 1 }
		},
		type: "SHOOT_RESTRICTION",
		subtype: "ENGAGED",
		target: "SELF"
	}],

	["in_cover_defensible", {
		cond: { 
			type: "AND",
			params: [
				{
					type: "HAS_CATEGORY",
					params: ["infantry"]
				},
				{
					type: "IN_COVER",
					subType: "DEFENSIBLE"
				}
			]
		},
		type: "ADD_STATUSES",
		params: ["DEFENSIBLE"]
	}],

	["in_cover_light", {
		cond: { 
			type: "AND",
			params: [
				{
					type: "HAS_CATEGORY",
					params: "infantry"
				},
				{
					type: "IN_COVER",
					subType: "LIGHT"
				}
			]
		},
		type: "ADD_STATUSES",
		params: ["LIGHT_COVER"]
	}],

	["in_cover_heavy", {
		cond: { 
			type: "AND",
			params: [
				{
					type: "HAS_CATEGORY",
					params: ["infantry"]
				},
				{
					type: "IN_COVER",
					subType: "HEAVY"
				},
				{
					unit.
				}
			]
		},
		type: "ADD_STATUSES",
		params: ["HEAVY_COVER"]
	}],

	["in_cover_dense", {
		cond: { 
			type: "AND",
			params: [
				{
					type: "NOT",
					params: {
						type: "OR",
						params: [
							{
								type: "HAS_CATEGORY",
								params: ["aircraft"]
							},
							{
								type: "HAS_STAT",
								params: { field: "wounds", val: 18 }
							},
						]
					} 
				},
				{
					type: "IN_COVER",
					subType: "DENSE"
				}
			]
		},
		type: "BE_HIT__SHOOT",
		params: -1 
	}]
];

// Affects are stored / calculated against army-specific forces
export const flags = [
	["safe", {
		cond: { type: "IS_SAFE" },


	}]
];