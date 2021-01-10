INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("adeptus_custodes", "kheres_pattern_assault_cannon",	-1,	"1",	"24",	"7",	"Heavy",	"6",{}),
("adeptus_custodes", "watchers_axe_(shooting)",	-1,	"2",	"24",	"5",	"Rapid Fire",	"1",{}),
("adeptus_custodes", "watchers_axe_(melee)",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{}),
("adeptus_custodes", "misericordia",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- When the model fights, it may make 1 additional attack with this weapon unless using a storm shield
	"cond": {
		"type": "NOT",
		"params": {
			"type": "HAS_EQUIPMENT",
			"params": ["storm_shield"]
		}
	},
	"type": "ADD_STAT",
	"params": {"field": "attacks", "val": 1}
}),
("adeptus_custodes", "guardian_spear_(melee)",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("adeptus_custodes", "guardian_spear_(ranged)",	-1,	"2",	"24",	"4",	"Rapid Fire",	"1",{}),
("adeptus_custodes", "sentinel_blade_(melee)",	-3,	"D3",	"0",	"User",	"Melee",	"1",{}),
("adeptus_custodes", "sentinel_blade_(ranged)",	0,	"1",	"12",	"4",	"Pistol",	"2",{}),
("adeptus_custodes", "castellan_axe_(melee)",	-2,	"D3",	"0",	"+3",	"Melee",	"1",{}),
("adeptus_custodes", "castellan_axe_(ranged)",	-1,	"2",	"24",	"4",	"Rapid Fire",	"1",{}),
("adeptus_custodes", "ballistus_grenade_launcher",	-3,	"1",	"12",	"4",	"Assault",	"D3",{
	-- Blast
	"type": "BLAST"
}),
("adeptus_custodes", "salvo_launcher_(melta)",	-4,	"D6",	"24",	"8",	"Heavy",	"1",{
	-- You can re-roll failed wound rolls for this weapon if the target is a VEHICLE
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["vehicle"]	
	},
	"type": "WOUND_REROLL"
}),
("adeptus_custodes", "salvo_launcher_(flakkburst)",	-1,	"D3",	"24",	"7",	"Heavy",	"D3",{
	-- Add 1 to all hit rolls made for this weapon against targets that can FLY. Subtract 1 from the hit rolls made for this weapon against all other targets. Blast.
	"type": "AND",
	"params": [
		{
			"cond": {
				"type": "HAS_CATEGORY",
				"target": "ENEMY",
				"params": ["fly"]	
			},
			"type": "HIT",
			"params": 1
		},
		{
			"cond": {
				"type": "NOT",
				"params": {
					"type": "HAS_CATEGORY",
					"target": "ENEMY",
					"params": ["fly"]	
				}	
			},
			"type": "HIT",
			"params": -1
		},
		{ "type": "BLAST" }
	]
}),
("adeptus_custodes", "interceptor_lance",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{
	-- You can re-roll failed wound rolls for this weapon on a turn in which the bearer made a successful charge
	"cond": {
		"type": "HAS_STATUS",
		"params": ["CHARGED"]	
	},
	"type": "WOUND_REROLL"
}),
("adeptus_custodes", "fulminaris_aggressor_(shooting)",	-1,	"1",	"8",	"4",	"Assault",	"D6",{
	-- Attacks made with this weapons shooting profile automatically hit.
	"type": "AUTOHIT"
}),
("adeptus_custodes", "fulminaris_aggressor_(melee)",	-1,	"1",	"0",	"+2",	"Melee",	"1",{}),
("adeptus_custodes", "obliteratum",	-4,	"D3",	"12",	"10",	"Assault",	"1",{}),
("adeptus_custodes", "gatekeeper_(shooting)",	-1,	"2",	"24",	"4",	"Rapid Fire",	"3",{
	-- Overwatch attacks made with this weapon successfully hit on a 3+ rather than 6.
	"type": "SET_STAT",
	"subType": "OVERWATCH",
	"params": { "field": "ballistics", "val": 3 }
}),
("adeptus_custodes", "gatekeeper_(melee)",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("adeptus_custodes", "the_veiled_blade_(shooting)",	0,	"1",	"12",	"4",	"Pistol",	"2",{}),
("adeptus_custodes", "the_veiled_blade_(melee)",	-3,	"D3",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights whilst they are within 3 of an objective marker, they can make 2 additional attacks with this weapon.
	"cond": {
		"type": "IN_RANGE",
		"radius": 3,
		"subType": "OBJECTIVE"
	},
	"type": "ADD_STAT",
	"params": { "field": "attacks", "val": 2 }
}),
("adeptus_custodes", "the_emperors_light",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon unless it is also equipped with a storm shield. In addition, add 1 to any Morale tests taken by enemy units within 12 of the bearer.
	"type": "AND",
	"params": [
		{
			"cond": {
				"type": "NOT",
				"params": {
					"type": "HAS_EQUIPMENT",
					"params": ["storm_shield"]
				}
			},
			"type": "ADD_STAT",
			"params": {"field": "attacks", "val": 1}
		},
	 	{
			"type": "AURA",
			"radius": 12,
			"target": "ENEMY",
			"params": {
				"type": "MORALE", 
				"params": 1
			}
	 	},	
	]
}),
("adeptus_custodes", "achillus_dreadspear_(shooting)",	-2,	"3",	"24",	"8",	"Heavy",	"2",{}),
("adeptus_custodes", "achillus_dreadspear_(melee)",	-3,	"D3+3",	"0",	"x2",	"Melee",	"1",{}),
("adeptus_custodes", "twin_arachnus_las_blaze_(beam)",	-3,	"D6",	"36",	"9",	"Heavy",	"2",{}),
("adeptus_custodes", "twin_arachnus_las_blaze_(burst)",	-1,	"D3",	"24",	"5",	"Heavy",	"D6",{}),
("adeptus_custodes", "twin_iliastus_accelerator_cannon",	-3,	"2",	"60",	"7",	"Heavy",	"8",{}),
("adeptus_custodes", "twin_las_pulser",	-2,	"D3",	"24",	"8",	"Heavy",	"4",{}),
("adeptus_custodes", "lastrum_storm_bolter",	-1,	"1",	"24",	"5",	"Rapid Fire",	"2",{}),
("adeptus_custodes", "twin_lastrum_bolt_cannon",	-2,	"1",	"36",	"6",	"Heavy",	"6",{}),
("adeptus_custodes", "plasma_ejector",	-3,	"1",	"8",	"7",	"Heavy",	"D6",{
	-- This weapon automatically hits its target.
	"type": "AUTOHIT"
}),
("adeptus_custodes", "twin_plasma_projector",	-2,	"1",	"12",	"6",	"Heavy",	"2d3",{
	-- When resolving an attack made with this weapon, do not make a hit roll: it automatically scores a hit.
	"type": "AUTOHIT"
}),
("adeptus_custodes", "spiculus_bolt_launcher",	-1,	"1",	"24",	"5",	"Heavy",	"5",{}),
	-- Each time this weapon is selected to shoot with, if this model has not moved this turn, change this weapons type to Heavy 10.
("adeptus_custodes", "arachnus_storm_cannon_(beam)",	-4,	"3",	"36",	"8",	"Heavy",	"2",{
	-- When resolving an attack made with this weapon against a Vehicle unit, you can re-roll the wound roll.
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["vehicle"]	
	},
	"type": "WOUND_REROLL"
}),
("adeptus_custodes", "arachnus_storm_cannon_(burst)",	-2,	"1",	"24",	"7",	"Heavy",	"6",{}),
("adeptus_custodes", "iliastus_accelerator_culverin",	-3,	"2",	"48",	"7",	"Heavy",	"4",{}),
("adeptus_custodes", "telemon_caestus",	-3,	"4",	"0",	"x2",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon.
	"type": "ADD_STAT",
	"params": {"field": "attacks", "val": 1}
}),
("adeptus_custodes", "galatus_warblade_(melee)",	-3,	"3",	"0",	"User",	"Melee",	"1",{
	-- When the bearer fights, it makes D3 additional attacks with this weapon
	"type": "ADD_STAT",
	"params": {"field": "attacks", "val": "D3"}
}),
("adeptus_custodes", "galatus_warblade_(shooting)",	-1,	"1",	"12",	"6",	"Heavy",	"2d6",{
	-- When resolving an attack made with this weapon, do not make a hit roll: it automatically scores a hit.
	"type": "AUTOHIT"
}),
("adeptus_custodes", "infernus_incinerator",	-1,	"1",	"12",	"6",	"Heavy",	"D6",{
	-- When resolving an attack made with this weapon, do not make a hit roll: it automatically scores a hit.
	"type": "AUTOHIT"
}),
("adeptus_custodes", "twin_adrathic_destructor",	-3,	"3",	"18",	"5",	"Assault",	"2",{}),
("adeptus_custodes", "infernus_firepike",	-1,	"1",	"15",	"6",	"Heavy",	"D6",{
	-- When resolving an attack made with this weapon, do not make a hit roll: it automatically scores a hit.
	"type": "AUTOHIT"
}),
("adeptus_custodes", "solerite_power_gauntlet",	-4,	"2",	"0",	"x2",	"Melee",	"1",{}),
("adeptus_custodes", "solerite_power_talon",	-2,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon. Each time an attack is made with this weapon, you can re-roll the wound roll.
	"type": "AND",
	"params": [
		{
			"type": "ADD_STAT",
	 		"params": { "field": "attacks", "val": 1 }
		},
		{
			"type": "WOUND_REROLL",
		},
	]
}),
("adeptus_custodes", "pyrithite_spear(melee)",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("adeptus_custodes", "pyrithite_spear(shooting)",	-4,	"D6",	"12",	"8",	"Assault",	"1",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a damage characteristic of D6+2.
	"cond": {
		"type": "IN_HALF_RANGE"
	},
	"type": "SET_DMG",
	"params": "2D6+2" 
}),
("adeptus_custodes", "adrasite_spear(melee)",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("adeptus_custodes", "adrasite_spear(shooting)",	-3,	"3",	"18",	"5",	"Assault",	"1",{}),
("adeptus_custodes", "lastrum_bolt_cannon",	-2,	"1",	"36",	"6",	"Heavy",	"3",{}),
("adeptus_custodes", "adrathic_devastator",	-3,	"3",	"18",	"6",	"Heavy",	"2",{}),
("adeptus_custodes", "venatari_lance_(melee)",	-3,	"2",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon.
	"type": "ADD_STAT",
	"params": { "field": "attacks", "val": 1 }
}),
("adeptus_custodes", "venatari_lance_(shooting)",	-2,	"2",	"12",	"6",	"Assault",	"2",{}),
("adeptus_custodes", "kinetic_destroyer",	-2,	"2",	"18",	"6",	"Pistol",	"2",{
	-- When resolving an attack made with this weapon, an unmodified hit roll of 6 scores 1 additional hit.
	"type": "EXPLODING_HIT",
	"params": [6] 
}),
("adeptus_custodes", "tarsus_buckler",	-2,	"1",	"0",	"+1",	"Melee",	"1",{}),
("adeptus_custodes", "twin_arachnus_blaze_cannon_(beam)",	-4,	"3",	"36",	"7",	"Heavy",	"2",{
	-- When resolving an attack made with this weapon against a VEHICLE unit, you can re-roll the wound roll.
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["vehicle"]	
	},
	"type": "WOUND_REROLL"
}),
("adeptus_custodes", "twin_arachnus_blaze_cannon_(burst)",	-2,	"1",	"24",	"5",	"Heavy",	"6",{}),
("adeptus_custodes", "twin_arachnus_heavy_blaze_cannon_(beam)",	-4,	"D3+3",	"48",	"9",	"Heavy",	"2",{
	-- When resolving an attack made with this weapon against a VEHICLE unit, you can re-roll the wound roll.
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["vehicle"]	
	},
	"type": "WOUND_REROLL"
}),
("adeptus_custodes", "twin_arachnus_heavy_blaze_cannon_(burst)",	-2,	"1",	"36",	"7",	"Heavy",	"8",{}),
("adeptus_custodes", "adrastus_bolt_caliver_(bolt_volley)",	-1,	"2",	"36",	"5",	"Assault",	"3",{}),
("adeptus_custodes", "adrastus_bolt_caliver(disintegration_beam)",	-3,	"3",	"15",	"5",	"Assault",	"1",{}),
("adeptus_custodes", "adrastus_bolt_caliver",	,	"",	"0",	"",	"",	"1",{
	-- When you choose this weapon to shoot with, select one or both of the profiles below. If you select both, subtract 1 from hit rolls for attacks made with this weapon.
	"type": "",
	"params":
}),
("adeptus_custodes", "arachnus_heavy_blaze_cannon_(beam)",	-4,	"D3+3",	"48",	"9",	"Heavy",	"1",{
	-- When resolving an attack made with this weapon against a VEHICLE unit, you can re-roll the wound roll.
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["vehicle"]	
	},
	"type": "WOUND_REROLL"
}),
("adeptus_custodes", "arachnus_heavy_blaze_cannon_(burst)",	-2,	"1",	"36",	"7",	"Heavy",	"4",{}),
("adeptus_custodes", "spiculus_heavy_bolt_launcher",	-1,	"2",	"48",	"7",	"Heavy",	"3",{}),
("adeptus_custodes", "arachnus_magna_blaze_cannon_(beam)",	-4,	"D3+6",	"72",	"14",	"Heavy",	"D3",{
	-- Blast
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["vehicle"]	
	},
	"type": "WOUND_REROLL"
}),
("adeptus_custodes", "arachnus_magna_blaze_cannon_(burst)",	-3,	"D3",	"48",	"9",	"Heavy",	"3",{}),
("adeptus_custodes", "psyk_out_grenades",	0,	"1",	"6",	"2",	"Grenade",	"D3",{}),
	-- When resolving an attack made with this weapon against a PSYKER or DAEMON unit, a hit roll of 6+ inflicts 1 mortal wound on the target and the attack sequence ends.
("adeptus_custodes", "somnus_blade",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("adeptus_custodes", "gnosis_(shooting)",	-1,	"2",	"24",	"4",	"Rapid Fire",	"1",{}),
("adeptus_custodes", "gnosis_(melee)",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("adeptus_custodes", "admonimortis_(melee)",	-3,	"3",	"0",	"+3",	"Melee",	"1",{}),
("adeptus_custodes", "admonimortis_(shooting)",	-1,	"2",	"24",	"4",	"Rapid Fire",	"1",{}),
("adeptus_custodes", "the_swiftsilver_talon_(shooting)",	-1,	"2",	"24",	"4",	"Assault",	"4",{}),
("adeptus_custodes", "the_swiftsilver_talon_(melee)",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{}),
