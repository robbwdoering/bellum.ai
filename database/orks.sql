INSERT INTO war_desc_profile (name, faction, meaning) VALUES
("big_mekaniak", "orks", {}),
("da_kleverest_boss", "orks", {
	"type": "AND",
	"params": [
		{
			"type": "ADD_STAT",
			"params": {
				"field": "wounds",
				"val": 1
			}
		},
		{
			"type": "ADD_STAT",
			"params": {
				"field": "attacks",
				"val": 1
			}
		},
		{
			"type": "SET_STAT",
			"params": {
				"field": "weapons",
				"val": 2
			}
		}
	]
}),
("doks_tools", "orks", {
	"type": "AURA",
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "SHARE_SUBFACTION",
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry", "biker"]
				}
			]
		},
		"type": "FNP",
		"range": 3,
		"params": 6
	}
}),
("explodes", "orks", {
	"type": "EXPLODES",
	"params": {
		"threshold": 6,
		"range": 6,
		"dmg": "D3M",
	} 
}),
("goffs_is_da_best", "orks", {
	"type": "AURA",
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["goff_ork"]
		},
		"range": 6,
		"type": "HIT_REROLL__FIGHT",
		"params": [1]
	}
}),
("grand_warboss", "orks", {}),
("great_waagh!", "orks", {
	"type": "AND",
	"params": [
		{
			"type": "AURA",
			"params": {
				"cond": {
					"type": "AND",
					"params": [
						{
							"type": "HAS_FACTION",
							"params": ["ork"]
						},
						{
							"type": "HAS_CATEGORY",
							"params": ["infantry", "monster"]
						}
					]
				},
				"range": 6,
				"type": "ADVANCE_AND_CHARGE",
			}
		},
		{
			"type": "AURA",
			"params": {
				"cond": {
					"type": "AND",
					"params": [
						{
							"type": "HAS_FACTION",
							"params": ["ork"]
						},
						{
							"type": "HAS_CATEGORY",
							"params": ["infantry"]
						},
						{
							"type": "HAS_STATUS",
							"params": ["CHARGED"]
						}
					]
				},
				"range": 6,
				"type": "ADD_STAT",
				"params": { "field": "attacks", "val": 1 }
			}
		}
	}
}),
("green_tide", "orks", {
	"cond": {
		"type": "HAS_MODEL_QUANTITY",
		"params": 20 
	},
	"type": "ADD_STAT",
	"params": { "field": "attacks", "val": 1 }
}),
("grot_oiler", "orks", {}),
("grot_orderly", "orks", {}),
("keepin_order", "orks", {
	"type": "AURA",
	"params": {
		"cond": {
			"type": "SHARE_SUBFACTION"
		}
		"range": 3,
		"type": "MORALE_FNP",
		"params": 6
	} 
}),
("kunnin_infiltrators", "orks", {
	"type": "DEEPSTRIKE"
}),
("kustom_force_field", "orks", {
	"type": "AURA",
	"warning": "If embarked, this applies to just the transport instead all units in an aura.",
	"params": {
		"cond": {
			"type": "HAS_FACTION",
			"params": ["ork"] 
		},
		"type": "INVULN__SHOOT",
		"params": 5
	}

}),
("no_clan", "orks", {}),
("open_topped", "orks", {
	"type": "OPEN_TOPPED"
}),
("prophet_of_gork_and_mork", "orks", {
	"type": "AND",
	"params": [
		{
			"type": "INVULN",
			"params": 4
		},
		{
			"type": "MAX_WOUNDS_TAKEN_IN_ROUND",
			"params": 4
		}
	]
}),
("ramshackle", "orks", {
	"type": "RAMSHACKLE"
}),
("sawbonez", "orks", {}),
("sneaky_gits", "orks", {
	"cond": {
		"type": "AND",
		"params": [
			{ "type": "IN_COVER" },
			{ "type": "IS_PHASE", "params": 4},
		]
	},
	"warning": "Only applies if the targeted MODEL is in cover.",
	"type": "ADD_STAT",
	"params": {"field": "save", "val": -1}
}),
("the_boss_is_watchin", "orks", {
	"type": "AURA",
	"params": {
		"cond": {
			"type": "HAS_FACTION",
			"params": ["ork"] 
		},
		"range": 6,
		"type": "MORALE_EXECUTION",
		"params": "D3M"
	}
}),
("throat_slittas", "orks", {
	"cond": {
		"type": "IN_COVER",
		"target": "ENEMY"
	},
	"warning": "Applies to units in any terrain feature, not just those that give cover.",
	"type": "WOUND__FIGHT",
	"params": 1
}),
("waaagh!_energy", "orks", {}),
("warphead_(1_cp)", "orks", {
	"type": "ADD_PSYKER_CASTS",
	"params": 1
}),
("trukk", "orks", {
	"type": "TRANSPORT",
	"params": 12,
	"warning": "Additional restrictions apply."
}),
("dis_is_ours!_zog_off!", "orks", {
	"type": "ROSTER_RULE",
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["troops"]
		},
		"type": "OBJECTIVE_SECURED"
	}
}),
("ere_we_go!", "orks", {
	"type": "CHARGE_REROLL"
}),
("dakka_dakka_dakka", "orks", {
	"type": "AND",
	"params": [
		{
			"type": "AUTOHIT__SHOOT",
			"params": [6]
		},
		{
			"type": "EXPLODING_HIT__SHOOT",
			"params": [6]
		}
	]
}),
("mob_rule", "orks", {});
