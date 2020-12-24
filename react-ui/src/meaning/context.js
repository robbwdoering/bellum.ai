export const statuses = [
	["advanced", {
		type: "ADD_STATUSES",
		params: ["ADVANCED"]
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
					params: { cat: "infantry" }
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
					params: { cat: "infantry" }
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
								type: "HAS_CHARACTERISTIC",
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

/*
I think this is going to be faction specific
export const affects = [
	["", {}],
];
*/

export const flags = [
	["safe", {}]
];