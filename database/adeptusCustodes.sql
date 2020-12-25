INSERT INTO war_desc_profile (name, faction, meaning) VALUES
("aegis_of_the_emperor", "adeptusCustodes", {
	"type": "AND", 
	"params": [
		{
			"type": "INVULN", 
			"params": 5 
		},
		{
			"type": "FNP__PSYCHIC", 
			"params": 6 
		}
	]
})
("airborne", "adeptusCustodes", {
	"type": "AND", 
	"params": [
		{
			"type": "CANNOT_CHARGE", 
		},
		{
			"type": "CANNOT_BE_CHARGED", 
			"params": {
				"type": "NOT",
				"params": {
					"type": "HAS_CATEGORY",
					"target": "ATTACKER",
					"params": [ "fly" ]
				}
			} 
		},
		{
			"type": "CANNOT_BE_FOUGHT", 
			"params": {
				"type": "NOT",
				"params": {
					"type": "HAS_CATEGORY",
					"target": "ATTACKER",
					"params": [ "fly" ]
				}
			} 
		},
		{
			"type": "CANNOT_FIGHT", 
			"params": {
				"type": "NOT",
				"params": {
					"type": "HAS_CATEGORY",
					"target": "TARGET",
					"params": [ "fly" ]
				}
			} 
		}
	]
})
("auramite_halo", "adeptusCustodes", {
	"type": "INVULN", 
	"params": 3 
})
("eclipse_shield", "adeptusCustodes", {
	"type": "INVULN", 
	"params": 5 
})
("explodes", "adeptusCustodes", {
	"type": "EXPLODES", 
	"params": {
		"threshold": 6,
		"range": 6,
		"dmg": "D3M",
	} 
})
("flare_shielding", "adeptusCustodes", {
	"type": "INVULN", 
	"params": 5 
})
("from_golden_light", "adeptusCustodes", {
	"type": "DEEPSTRIKE"
})
("gravitic_backwash", "adeptusCustodes", {
	"type": "BE_CHARGED_ROLL", 
	"params": -2 
})
("hard_to_hit", "adeptusCustodes", {
	"type": "BE_HIT__SHOOT", 
	"params": -1 
})
("hover_jet", "adeptusCustodes", {})
("hover_tank", "adeptusCustodes", {})
("infernus_firebomb", "adeptusCustodes", {})
("inspirational_fighter", "adeptusCustodes", {
	"type": "AURA", 
	"params": {
		"range": 6,	
		"type": "HIT_REROLL", 
		"params": [1]
	}
})
("legendary_commander", "adeptusCustodes", {
	"type": "AURA", 
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["adeptus_custodes"]
		},
		"range": 6,	
		"type": "AND",
		"params": [
			{
				"type": "HIT_REROLL", 
				"params": [1]
			},
			{
				"type": "WOUND_REROLL", 
				"params": [1]
			},
		]
	}
})
("moment_shackle", "adeptusCustodes", {})
("power_of_the_machine_spirit", "adeptusCustodes", {
	"type": "HEAVY_FIRE_MOVE"
})
("prosecution_protocols", "adeptusCustodes", {
	"cond": {
		"type": "HAS_CATEGORY",
		"type": ["psyker"]
	}
	"type": "IGNORE_LOOK_OUT_SIR"
})
("storm_shield", "adeptusCustodes", {
	"type": "INVULN", 
	"params": 3 
})
("supersonic", "adeptusCustodes", {})
("sworn_guardians", "adeptusCustodes", {
	"type": "ROSTER_RULE", 
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "HAS_CATEGORY",
					"params": ["adeptus_custodes"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry", "biker"]
				},
				{
					"type": "IN_DETACHMENT_TYPE",
					"params": ["adeptus_custodes"] 
				}
			]
		"type": "OBJECTIVE_SECURED"
	}
})
("the_emperors_chosen", "adeptusCustodes", {
	"type": "ROSTER_RULE", 
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "HAS_CATEGORY",
					"params": ["adeptus_custodes"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry", "biker"]
				},
				{
					"type": "IN_DETACHMENT_TYPE",
					"params": ["adeptus_custodes"] 
				},
				{
					"type": "HAS_STAT",
					"params": { "field": "invuln", "val": 4}
				}
			]
		},
		"type": "ADD_INVULN",
		"params": 1 
	}
})
("null_maidens", "adeptusCustodes", {})
("psychic_abomination", "adeptusCustodes", {
	"type": "AND", 
	"warning": "This should only create a total modifier of -4, at maximum."
	"params": [
		{
			"type": "CANNOT_BE_PSYCHIC"
		},
		{
			"type": "AURA",
			"params": {

				"range": 18,	
				"type": "AND", 
				"params": [
					{
						"type": "ADD_PSYCHIC", 
						"target": "ENEMY",
						"params": -1 
					},
					{
						"type": "ADD_DENY_THE_WITCH", 
						"target": "ENEMY",
						"params": -1 
					}
				]
			}
		}
	]
})
("witch_hunters", "adeptusCustodes", {
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["psyker"]
	},
	"type": "WOUND_REROLL"
})
