INSERT INTO war_desc_profile (faction, name, meaning) VALUES
("adeptus_custodes", "talons_of_the_emperor", {
	-- If your army is Battle-forged, units with the SISTERS OF SILENCE Faction keyword can be  included in an ADEPTUS CUSTODES Detachment in your army, without preventing that Detachment from being an ADEPTUS CUSTODES Detachment. Note that this does not prevent ADEPTUS CUSTODES units in that Detachment from gaining any Detachment abilities (e.g. The Emperor’s Chosen and the Sworn Guardians abilities), however SISTERS OF SILENCE units  cannot themselves gain any Detachment abilities. Similarly, those SISTERS OF SILENCE units are ignored for any rules that state all units from that Detachment must have at least one Faction keyword in common (e.g. in a matched play game) and when determining your army’s Faction.
	"type": "BATTLEFORGED_MOD"
}),
("adeptus_custodes", "unyielding_ancient", {
	-- Roll a D6 each time this model loses a wound; on a 6 the damage is ignored and the wound is not lost.
	"type": "FNP",
	"params": 6
}),
("adeptus_custodes", "explodes", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark.  On a 6 it explodes, and each unit within 6 suffers D3 mortal wounds.
	"type": "EXPLODES", 
	"radius": 6,
	"params": {
		"threshold": 6,
		"dmg": "D3M",
	} 
}),
("adeptus_custodes", "atomantic_shielding", {
	-- This model has a 5+ invulnerable save.
	"type": "SET_STAT",
	"params": { "field": "invuln", "val": 5 }
}),
("adeptus_custodes", "moment_shackle", {
	-- Once per battle, if Trajann Valoris is on the battlefield, you can do one of the following:  - Regain D3 wounds lost by Trajann Valoris during this phase (you cannot do this during an attack or if Trajann Valoris is slain) - At the end of the Fight phase, pile in and attack with Trajann Valoris an additional time - The next Stratagem you use this phase costs 0 Command Points.
	"type": "ACTION",
	"subType": "BATTLE"

}),
("adeptus_custodes", "auramite_halo", {
	-- Trajann Valoris has a 3+ invulnerable save.
	"type": "SET_STAT", 
	"params": { "field": "invuln", "val": 3 }
}),
("adeptus_custodes", "legendary_commander", {
	-- You can re-roll hit rolls and wound rolls of 1 made for friendly ADEPTUS CUSTODES units within 6 of Trajann Valoris.
	"type": "AURA", 
	"radius": 6,	
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["adeptus_custodes"]
		},
		"type": "AND",
		"params": [{
				"type": "HIT_REROLL", 
				"params": [1]
			},
			{
				"type": "WOUND_REROLL", 
				"params": [1]
			},
		]
	}
}),
("adeptus_custodes", "inspirational_fighter", {
	-- You can re-roll hit rolls of 1 made for friendly ADEPTUS CUSTODES units within 6 of this model.
	"type": "AURA", 
	"radius": 6,	
	"params": {
		"type": "HIT_REROLL", 
		"params": [1]
	}
}),
("adeptus_custodes", "binding_oaths", {
	-- Roll a D6 each time a model in this unit loses a wound; on a 6 the damage is ignored and the wound is not lost
	"type": "FNP",
	"params": 6
}),
("adeptus_custodes", "slayers_of_tyrants", {
	-- When models in this unit pile in and consolidate, they can move up to 3 towards the nearest enemy CHARACTER even if it is not the nearest enemy model, so long as they finish this move within 1 of an enemy unit.
	"type": "ACTION",
	"params": [4, 5]
}),
("adeptus_custodes", "vexilla_imperius", {
	-- ADEPTUS CUSTODES models (other than VEHICLES) add 1 to their Attacks characteristic whilst their unit is within 6 of any friendly VEXILUS PRAETORS with this vexilla.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "AND",
			"params": [
			 	{
			 		"type": "HAS_CATEGORY",
			 		"params": ["adeptus_custodes"]
			 	},	
			 	{
			 		"type": "NOT",
			 		"params": {
				 		"type": "HAS_CATEGORY",
				 		"params": ["vehicle"]
			 		}
			 	},	
			]
		},
		"type": "ADD_STAT", 
 		"params": { "field": "attacks", "val": 1 }
	}
}),
("adeptus_custodes", "vexilla_magnifica", {
	-- Your opponent must subtract 1 from hit rolls in the Shooting phase for attacks that target ADEPTUS CUSTODES units within 6 of any friendly VEXILUS PRAETORS with this vexilla.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
	 		"type": "HAS_CATEGORY",
	 		"params": ["adeptus_custodes"]
		},
		"type": "BE_HIT", 
		"subType": "SHOOT",
 		"params": -1 
	}
}),
("adeptus_custodes", "raiment_of_sorrows", {
	-- Roll a D6 each time a friendly ADEPTUS CUSTODES INFANTRY or BIKER model is destroyed within 6 of the bearer, before removing the model as a casualty. On a 4+ that model musters one last surge of strength before succumbing to its wounds; it can either shoot with one of its weapons as if it were the Shooting phase, or make a single attack as if it were the Fight phase. You cannot use the Even in Death… Stratagem on a model that does so.
	"type": "LAST_STAND"
}),
("adeptus_custodes", "eagles_eye", {
	-- Improve this models invulnerable save by 1 (to a maximum of 3+)
	"cond": {
		"type": "has_stat",
		"params": { "field": "invuln", "val": 4}
	}
	"type": "ADD_STAT",
	"params": { "field": "invuln", "val": -1}
}),
("adeptus_custodes", "praetorian_plate", {
	-- TERMINATOR model only. When you set the bearer up, choose a friendly IMPERIUM CHARACTER. At the end of your opponents Charge phase, if there is an enemy model within 1 of that character, you can remove the bearer from the battlefield (if they are on the battlefield) and, even if they were not on the battlefield, set them up within 3 of that character and within 1 of an enemy model. The bearer is not considered to have charged.
	"type": "ACTION",
	"subType": "ENEMY",
	"params": 5
}),
("adeptus_custodes", "wrath_angelis", {
	-- Model with a Vexilla Magnifica only. The Wrath Angelis replaces that model’s vexilla: it loses the Custodes Vexilla ability. Instead, friendly IMPERIUM INFANTRY and BIKER units within 6 of the bearer in the Morale phase automatically pass Morale tests, and once per battle in your Movement phase, if the bearer does not move, you can roll a D6 for each unit (friend or foe) within 6. Subtract 1 from the result if the unit being rolled for is a CHARACTER, or 2 from the result if the unit being rolled for is ADEPTUS CUSTODES. On a 4+ the unit being rolled for suffers D3 mortal wounds.
	"type": "AND",
	"params": [
		{
			"type": "AURA",
			"radius": 6,
			"params": {
				"cond": {
					"type": "AND",
					"params": [
						{
							"type": "HAS_CATEGORY",
							"params": ["imperium"]
						},
						{
							"type": "HAS_CATEGORY",
							"params": ["infantry", "biker"]
						}
					]
				},
				"type": "PASS_MORALE", 
				"params":
			}
		},
	 	{
	 		"type": "ACTION",
	 		"subType": "BATTLE",
	 		"params": 2
	 	},	
	]
}),
("adeptus_custodes", "castellans_mark", {
	-- If the bearer is on the battlefield, at the beginning of the game but before the first turn you can remove them and up to one friendly ADEPTUS CUSTODES unit within 6 of them from the battlefield and set them up again following the mission rules. You must set them up on the battlefield.
	"type": "ACTION",
	"subType": "SETUP"
}),
("adeptus_custodes", "auric_shackles", {
	-- Your opponent must subtract 1 from the Attacks characteristic of enemy CHARACTERS whilst they are within 6 of the bearer (to a minimum of 1).
	"type": "AURA",
	"target": "ENEMY",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["character"]
		},
 		"type": "ADD_STAT",
 		"warning": "Minimum attacks value is 1."
 		"params": { "field": "attacks", "val": -1 }
	}
}),
("adeptus_custodes", "auric_aquilas", {
	-- BIKER model only. This model has a 3+ invulnerable save. In addition, you can re-roll failed charge rolls made for this model.
	"type": "AND",
	"params": [
	 	{
	 		"type": "SET_STAT",
	 		"params": { "field": "invuln", "val": 3 }
	 	},	
	 	{"type": "CHARGE_REROLL"}
	]
}),
("adeptus_custodes", "fulminaris_aggressor", {
	-- Model with a Vexilla Defensor only. The Fulminaris Aggressor replaces that models vexilla: it loses the Custodes Vexilla ability. Instead, friendly IMPERIUM INFANTRY and BIKER units within 6 of the bearer in the Morale phase automatically pass Morale tests, and the Fulminaris Aggressor has the following weapon profile:
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "HAS_CATEGORY",
					"params": ["imperium"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry", "biker"]
				}
			]
		},
		"type": "PASS_MORALE"
	}
}),
("adeptus_custodes", "faith_absolute", {
	-- Model with a Vexilla Magnifica only. The Faith Absolute replaces that model’s vexilla: it loses the Custodes Vexilla ability. Instead, friendly IMPERIUM INFANTRY and BIKER units within 6 of the bearer in the Morale phase automatically pass Morale tests, and the bearer can attempt to deny one psychic power in each enemy Psychic phase as if they were a PSYKER.
	"type": "AURA",
	"radius": 6,
	"warning": "Also allows the bearer to deny the witch.",
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "HAS_CATEGORY",
					"params": ["imperium"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry", "biker"]
				}
			]
		},
		"type": "PASS_MORALE"
	}
}),
("adeptus_custodes", "champion_of_the_imperium", {
	-- Friendly ADEPTUS CUSTODES INFANTRY, BIKER, and DREADNOUGHT units that are within 12 of your Warlord at the start of your opponents Charge phase can make Heroic Interventions this phase in the same manner as CHARACTERS.
	"type": "AURA",
	"radius": 12,
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
					"params": ["infantry", "biker", "dreadnought"]
				}
			]
		},
		"type": "CAN_INTERVENE"
	}
}),
("adeptus_custodes", "emperors_companion", {
	-- You can re-roll the dice for the damage inflicted by your Warlord’s attacks.
	"type": "DMG_REROLL"
}),
("adeptus_custodes", "radiant_mantle", {
	-- Your opponent must subtract 1 from hit rolls that target your Warlord.
	"type": "BE_HIT",
	"params": -1
}),
("adeptus_custodes", "peerless_warrior", {
	-- Each time you make a hit roll of 6+ for your Warlord in the Fight phase, they can immediately make an extra attack against the same unit using the same weapon. These extra attacks cannot themselves generate any further attacks.
	"type": "EXPLODING_HIT",
	"subType": "FIGHT",
	"params": [6]
}),
("adeptus_custodes", "superior_creation", {
	-- Each time your Warlord loses a wound, roll a D6; on a 5+ your Warlord does not lose that wound.
	"type": "FNP",
	"params": 5
}),
("adeptus_custodes", "impregnable_mind", {}),
	-- Your Warlord can attempt to Deny the Witch once in each of your opponents Psychic phases as if they were a PSYKER. When they do so, add 1 to the result of the Deny the Witch test.
("adeptus_custodes", "hover_tank", {}),
	-- Instead of measuring distances to and from this model’s base, measure to and from the model’s hull or base (whichever is closer).
("adeptus_custodes", "flare_shielding", {
	-- This model has a 5+ invulnerable save.
	"type": "SET_STAT", 
	"params": { "field": "invuln", "val": 5 }
}),
("adeptus_custodes", "reinforced_atomantic_barriers", {
	-- This model has a 4+ invulnerable save.
	"type": "SET_STAT", 
	"params": { "field": "invuln", "val": 4 }
}),
("adeptus_custodes", "galatus_shield", {
	--  This model has a 4+ invulnerable save. When resolving an attack made with a melee weapon against this model, subtract 1 from the hit roll.
	"type": "AND",
	"params": [
		{
			"type": "SET_STAT", 
			"params": { "field": "invuln", "val": 4 }
		},
	 	{
	 		"type": "BE_HIT",
	 		"subType": "FIGHT",
	 		"params": -1
	 	},	
	]
}),
("adeptus_custodes", "from_golden_light", {
	-- During deployment, you can set up this unit in a Godstrike-pattern teleportarium array instead of setting it up on the battlefield. If you do, at the end of one of your Movement phases you can set up this unit anywhere on the battlefield that is more than 9 away from any enemy models.
	"type": "DEEPSTRIKE"
}),
("adeptus_custodes", "airborne_hunters", {
	-- During deployment, you can set up this unit high in the skies instead of setting it up on the battlefield. If you do, at the end of one of your Movement phases you can set up this unit anywhere on the battlefield that is more than 9 away from any enemy models.
	"type": "DEEPSTRIKE"
}),
("adeptus_custodes", "tarsus_buckler", {
	-- The bearer has a save characteristic of 2+.
	"type": "SET_STAT",
	"params": { "field": "save", "val": 2 }
}),
("adeptus_custodes", "airborne", {
	-- You cannot charge with this model, and this model can only be chosen as a target of a charge if the unit making the charge can FLY. You can only fight with this model if it is within 1 of any enemy units that can FLY, and this model can only make close combat attacks against units that can FLY. Enemy units can only make close combat attacks against this model if they can FLY.
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
					"target": "ENEMY",
					"params": [ "fly" ]
				}
			} 
		}
	]
}),
("adeptus_custodes", "supersonic", {
	-- When this model moves, first pivot it on the spot up to 90° (this does not contribute to how far the model moves), then move the model straight forwards. It cannot pivot again after the initial pivot. When this model Advances, add 20 to its Move characteristic until the end of the Movement phase instead of making an Advance roll.
	"type": "AIRCRAFT"
}),
("adeptus_custodes", "eclipse_shield", {
	-- This model has a 5+ invulnerable save.
	"type": "SET_STAT", 
	"params": { "field": "invuln", "val": 5 }
}),
("adeptus_custodes", "hover_jet", {
	-- Before this model moves in your Movement phase, you can declare it will hover. Its Move characteristic becomes 20 until the end of the phase, and it loses the Airborne, Hard to Hit and Supersonic abilities until the beginning of your next Movement phase. 
	"type": "",
	"params":
}),
("adeptus_custodes", "hard_to_hit", {
	-- When resolving an attack made with a ranged weapon against this model, subtract 1 from the hit roll
	"type": "BE_HIT", 
	"subType": "SHOOT",
	"params": -1 
}),
("adeptus_custodes", "infernus_firebomb", {
	-- Once per turn after the bearer has moved you can select on point on the battle field the bearer has moved across. Roll a D6 for each unit in within 6 of that point (subtract 1 if that model is a non VEHICLE or non MONSTER CHARACTER), on a 4+ that model suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("adeptus_custodes", "ten_thousand_heroes", {
	-- Use this Stratagem before the battle, after nominating your Warlord. Select one ADEPTUS CUSTODES CHARACTER model from your army that is not your Warlord and determine one Warlord Trait for it; it is regarded as your Warlord for the purposes of that Warlord Trait. Each Warlord Trait in your army must be unique (if randomly generated, re-roll duplicate results). You can only use this Stratagem once per battle.
	"type": "",
	"params":
}),
("adeptus_custodes", "eternal_penitent", {
	-- Use this Stratagem before the battle. Select one ADEPTUS CUSTODES DREADNOUGHT unit from your army. Increase that unit’s Attacks characteristic by 1. You can re-roll charge rolls made for that unit. Each ADEPTUS CUSTODES DREADNOUGHT unit from your army can only be selected for this Stratagem once.
	"type": "",
	"params":
}),
("adeptus_custodes", "witch_hunter", {
	-- When resolving an attack made with a melee weapon by this model against a Psyker unit, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("adeptus_custodes", "psychic_abomination", {
	-- This model cannot be targeted or affected by psychic powers. In addition, when a Psychic or Deny the Witch test is taken for an enemy model, subtract 1 from the total for each unit from your army with this ability that is within 18 of that enemy model (to a maximum of -4).
	"type": "AND", 
	"warning": "This should only create a total modifier of -4, at maximum."
	"params": [
		{
			"type": "CANNOT_BE_PSYCHIC"
		},
		{
			"type": "AURA",
			"radius": 18,	
			"target": "ENEMY",
			"params": {
				"cond": {
					"type": "HAS_CATEGORY",
					"params": ["psyker"]
				},
				"type": "AND", 
				"params": [
					{
						"type": "ADD_PSYCHIC", 
						"params": -1 
					},
					{
						"type": "ADD_DENY_THE_WITCH", 
						"params": -1 
					},
				]
			}
		}
	]
}),
("adeptus_custodes", "aegis_of_the_emperor", {
	-- This model has a 5+ invulnerable save. In addition, when this model would lose a wound as a result of a mortal wound in the Psychic phase, roll one D6; on a 6+ that wound is not lost.
	"type": "AND", 
	"params": [
		{
			"type": "SET_STAT", 
			"params": { "field": "invuln", "val": 5 }
		},
		{
			"type": "FNP__PSYCHIC", 
			"params": 6 
		}
	]
}),
("adeptus_custodes", "golden_laurels", {
	-- Once per battle, when resolving an attack made with Gnosis by this model, you can re-roll either the hit roll, the wound roll, or the damage roll.
	"type": "ACTION",
	"params": 6 
}),
("adeptus_custodes", "grim_responsibility___1_cp", {
	-- Use this Stratagem in any phase when a SHADOWKEEPERS unit from your army is chosen as the target of an attack. Until the end of that phase, when resolving an attack against that unit, subtract 1 from the Strength characteristic of that attack.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "shield_of_honour___1_cp", {
	-- Use this Stratagem in any phase when an IMPERIUM CHARACTER unit from your army is chosen as the target of an attack made by a model in an enemy unit. Select one friendly AQUILAN SHIELD INFANTRY or AQUILAN SHIELD DREADNOUGHT unit within 3 of that IMPERIUM CHARACTER unit. Until the end of that phase, when resolving an attack made by a model in that enemy unit, measure range to that IMPERIUM CHARACTER unit, but resolve attacks made by models in that enemy models unit against the unit you selected. If the unit you selected is destroyed, any remaining attacks are lost.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "golden_light_of_the_noirades___1_cp/2_cp", {
	-- Use this Stratagem at the start of your Charge phase. Select one DREAD HOST unit from your army that teleported into battle this turn for 1CP, or up to three such units for 2CP. Until the end of that phase, when a charge roll is made for those units, roll one additional D6 and discard one of the dice.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "the_eagles_strike___0_cp", {
	-- Use this Stratagem in any phase when an enemy CHARACTER unit is destroyed as a result of an attack made by a SOLAR WATCH model from your army. The next time your opponent wishes to use a Stratagem, they must spend one extra CP to use that Stratagem. This Stratagem can be used once per battle round.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "the_emperors_hand___1_cp", {
	-- Use this Stratagem in any phase when an EMISSARIES IMPERATUS unit from your army is chosen to shoot or fight with. Until the end of that phase, when resolving an attack made by a model in that unit, ignore any negative hit roll, wound roll and Armour Penetration characteristic modifiers and any benefit to the saving throw as a result of cover.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "ancient_artifice___1_cp", {
	-- Use this Stratagem in any phase, when an ADEPTUS CUSTODES DREADNOUGHT unit from your army is chosen as the target for an attack. Until the end of that phase, when resolving an attack made against that unit, halve the damage inflicted (rounding up).
	"type": "STRATAGEM"
}),
("adeptus_custodes", "vengeance_of_the_machine_spirit___2_cp", {
	-- Use this Stratagem in any phase, when an ADEPTUS CUSTODES VEHICLE model from your army with the Power of the Machine Spirit ability is destroyed. That model can either automatically explode (do not roll a D6), shoot with one of its ranged weapons as if it were your Shooting phase, or make one attack with one of  its melee weapons as if it were the Fight phase (use the top row of that model’s damage table when shooting with that ranged weapon or resolving that attack with a melee weapon).
	"type": "STRATAGEM"
("adeptus_custodes", "arcane_genetic_alchemy___2_cp", {
	-- Use this Stratagem in any phase, when an ADEPTUS CUSTODES unit from your army that is not a VEHICLE is chosen as a target for an attack. Until the end of that phase, when resolving an attack made against that unit, an unmodified wound roll of 1-3 always fails, irrespective of any abilities that the weapon or the model making that attack has.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "slayers_of_nightmares___2_cp", {
	-- Use this Stratagem in the Fight phase, when an ADEPTUS CUSTODES unit from your army is chosen to fight with. Until the end of that phase, when resolving an attack made with a melee weapon by a model in that unit against a unit with a higher Toughness characteristic than its own, you can add 1 to the wound roll 
	"type": "STRATAGEM"
}),
("adeptus_custodes", "fortress_of_willpower___1_cp", {
	-- Use this Stratagem in your opponent’s Psychic phase, when an ADEPTUS CUSTODES unit from your army is selected as the target of a Psychic power that was successfully manifested this turn. Roll one D6, adding 1 to the result if that unit is a CUSTODIAN WARDENS unit; on a 4+ that psychic power has no effect.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "blood_games_veterans___1/2_cp", {
	-- Use this Stratagem in your Shooting phase. Select one ADEPTUS CUSTODES unit from your army that contains five or less models for 1CP or six or more models for 2CP. Until the end of that phase, when resolving an attack made with a ranged weapon by a model in that unit, an unmodified hit roll of 6 automatically scores a hit and successfully wounds the target (do not make a wound roll).
	"type": "STRATAGEM"
}),
("adeptus_custodes", "auramite_and_adamantium____1_cp", {
	-- Use this Stratagem in any phase, when an ADEPTUS CUSTODES TERMINATOR unit from your army is selected as the target of an attack. Until the end of that phase, when resolving an attack against that unit, an Armour Penetration characteristic of -1 or -2 is resolved as 0 for that attack.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "indomitable_engines___1_cp", {
	-- Use this Stratagem in any phase, when an ADEPTUS CUSTODES VEHICLE model from your army would lose a wound as a result of a mortal wound. Roll one D6; on a 5+ that wound is not lost. In addition, until the end of that phase, when this model would lose a wound as a result of a mortal wound, roll one D6; on a 5+ that  Wound is not lost.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "archeotech_munitions___1_cp", {
	-- Use this Stratagem in your Shooting phase, when an ADEPTUS CUSTODES unit from your army is chosen to shoot with. Until the end of that phase, when resolving an attack made with a ranged weapon with a Damage characteristic of D6 by a model in that unit, roll one additional D6 and discard one of the dice.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "superior_fire_patterns___1_cp", {
	-- Use this Stratagem in your Shooting phase, when an ADEPTUS CUSTODES INFANTRY unit from your army that did not Advance in your previous Movement phase is chosen to shoot with. Until the end of that phase, models in that unit make double the number of attacks with Rapid Fire and Pistol weapons.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "the_emperors_auspice___2_cp", {
	-- Use this Stratagem in any phase, when an ADEPTUS CUSTODES unit from your army is chosen as the target of an attack. Until the end of that phase, when resolving an attack against that  unit, your opponent cannot re-roll any dice for that attack.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "fraternity_of_heroes___1_cp", {
	-- Use this Stratagem at the end of your opponent’s Charge phase. Select one ADEPTUS CUSTODES unit from your army more than 1 away from any enemy models. That unit can immediately perform a Heroic Intervention as if it were a CHARACTER, but must finish that move within 1 of one or more enemy units.
	"type": "STRATAGEM"
}),
("adeptus_custodes", "lockwarden", {
	-- When resolving an attack made by a CHARACTER model against this Warlord, subtract 1 from the hit roll. When resolving an attack made by this Warlord against an enemy CHARACTER unit, subtract 1 from the saving throw (including invulnerable saves).
	"type": "AND",
	"params": [
	 	{
	 		"cond": {
	 			"type": "HAS_CATEGORY",
	 			"target": "ENEMY",
	 			"params": ["character"]
	 		},
	 		"type": "BE_HIT",
	 		"params": -1
	 	},	
	 	{
	 		"cond": {
	 			"type": "HAS_CATEGORY",
	 			"target": "ENEMY",
	 			"params": ["character"]
	 		},
	 		"type": "ADD_SAVE",
	 		"params": -1
	 	},	
	]
}),
("adeptus_custodes", "revered_companion", {
	-- When resolving an attack made against this Warlord, halve any damage inflicted (rounding up).
	"type": "DMG_TAKEN_MULT",
	"params": 0.5
}),
("adeptus_custodes", "all_seeing_annihilator", {
	-- When resolving an attack made with a melee weapon by a model in a friendly DREAD HOST unit within 6 of this Warlord, an unmodified hit roll of 6 scores 1 additional hit.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["dread_host"]
		},
		"type": "EXPLODING_HIT", 
		"subType": "FIGHT",
		"params": [6]
	}
}),
("adeptus_custodes", "sally_forth", {
	-- At the start of your Movement phase, add 1 to the Move characteristic of all friendly SOLAR WATCH units within 6 of this Warlord until the end of that phase. Whilst their unit is within 6 of this Warlord, models in friendly SOLAR WATCH units that have Advanced can shoot with Rapid Fire weapons in the following Shooting phase, but must subtract 1 from hit rolls for those attacks.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {"type": "SHARE_SUBFACTION"},
		"type": "AND", 
		"params": [
		 	{
		 		"type": "ADD_STAT",
		 		"params":
		 		"params": { "field": "move", "val": 1 }
		 	},	
		 	{
		 		"type": "ADVANCE_AND_SHOOT",
		 		"subType": "RAPID_FIRE"
		 	},	
		]
	}
}),
("adeptus_custodes", "voice_of_the_emperor", {
	-- Whilst they are within 9 of this Warlord, friendly IMPERIUM units can use this Warlord’s Leadership characteristic. Add 3 to the range of this Warlord’s aura abilities (this has already been added to this trait’s aura ability).
	"type": "AURA",
	"warning": "Also increases the radius of all other auras by 3.",
	"radius": 9,
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["imperium"]
		},
		"type": "SHARE_STAT",
 		"params": ["leadership"]
	}
}),
("adeptus_custodes", "stasis_oubliette", {
	-- At the start of the Fight phase, select one enemy CHARACTER unit within 3 of a model with this Relic. Until the end of that phase, halve the Attacks characteristic of models in that unit (rounding up) and when resolving an attack made by a friendly SHADOWKEEPERS model against that CHARACTER unit, re-roll a wound roll of 1.
	"type": "ACTION",
	"params": 6
}),
("adeptus_custodes", "praesidius", {
	-- When resolving an attack against a model with this Relic, subtract 1 from the wound roll.
	"type": "BE_WOUNDED",
	"params": -1
}),
("adeptus_custodes", "the_swiftsilver_talon", {
	-- A model with this Relic can shoot and charge in a turn in which it Advanced or Fell Back.
	"type": "AND",
	"params": [
		{"type": "ADVANCE_AND_SHOOT"},
		{"type": "ADVANCE_AND_CHARGE"},
		{"type": "FALL_AND_SHOOT"},
		{"type": "FALL_AND_CHARGE"}
	]
}),
("adeptus_custodes", "vexilla_dominatus", {
	-- Whilst they are within 6 of a model with this Relic, you can re-roll failed Morale tests for friendly IMPERIUM INFANTRY and IMPERIUM BIKER units. Whilst their unit is within 6 of a model with this Relic, friendly EMISSARIES IMPERATUS models count as 3 models for the purposes of determining who controls an objective marker.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["infantry", "biker"]
		},
		"type": "MORALE_REROLL", 
		"warning": "Has special effects for Emissaries Imperatus."
	}
}),
("adeptus_custodes", "slayer_of_the_unclean", {}),
	-- When resolving an attack made by this model, on an unmodified wound roll of 6, double the Damage characteristic of the weapon for that attack (e.g. D3 becomes 2D3).
("adeptus_custodes", "swift_as_the_eagle", {
	-- Add 1 to Advance and charge rolls made for this model. Add 1 to the Move characteristic of this model.
	"type": "AND",
	"params": [
	 	{
	 		"type": "ADD_STAT",
	 		"params": { "field": "move", "val": 1 }
	 	},	
	 	{
	 		"type": "ADD_CHARGE",
	 		"params": 1 
	 	},	
	 	{
	 		"type": "ADD_ADVANCE",
	 		"params": 1 
	 	},	
	]
}),
("adeptus_custodes", "strategic_mastermind", {
	-- Whilst this model is on the battlefield, you can roll one D6 for each Command Point you spend to use a Stratagem; on a 5+ that Command Point is refunded. You can only have 1 Command Point refunded per battle round by this ability.
	"type": "CP_REFUND"
}),
("adeptus_custodes", "bane_of_abominations", {
	-- When resolving an attack made by this model against an enemy MONSTER unit or VEHICLE unit, you can re-roll the wound roll.
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["monster", "vehicle"]
	},
	"type": "WOUND_REROLL"
}),
("adeptus_custodes", "indomitable_constitution", {
	-- Add 2 to the Wounds characteristic of this model.
	"type": "MODEL_SPECIFIC",
}),
("adeptus_custodes", "master_of_melee", {
	-- Whilst this model is within 1 of any enemy units that contain six or more models, increase its Attacks characteristic by 2.
	"cond": {
		"type": "IN_RANGE",
		"target": "ENEMY",
		"radius": 1,
		"params": {
			"type": "HAS_MODEL_QUANTITY",
			"params": 6
		}
	},
	"type": "ADD_STAT",
	"params": { "field": "attacks", "val": 2 }
}),
("adeptus_custodes", "unstoppable_destroyer", {
	-- When this model piles in, it can move up to D3+3 and can end the move closer to any enemy model within that distance of this model. When this model consolidates, it can move up to D3+3 and does not have to end the move closer to the nearest enemy model.
	"type": "ACTION",
	"params": [5, 6]
}),
("adeptus_custodes", "defiant_to_the_last", {}),
	-- For each wound this model has lost, increase its Attacks characteristic by 1 (to a maximum of 3 additional attacks).
("adeptus_custodes", "inspirational_exemplar", {
	-- Add 3 to the range of this model’s aura abilities.
	"type": "ADD_AURA_RADIUS",
	"params": 3
}),
("adeptus_custodes", "the_emperors_chosen", {
	-- If your army is Battle-forged, all ADEPTUS CUSTODES INFANTRY and ADEPTUS CUSTODES BIKER units in ADEPTUS CUSTODES Detachments gain this ability. This units invulnerable save is improved by 1 (to a maximum of 3+)
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
		"type": "ADD_STAT", 
		"params": { "field": "invuln", "val": -1 }
	}
}),
("adeptus_custodes", "sworn_guardians", {
	-- If your army is Battle-forged, all ADEPTUS CUSTODES INFANTRY and ADEPTUS CUSTODES BIKER units in ADEPTUS CUSTODES Detachments gain this ability. A unit with this ability that is within range of an objective marker (as specified in the mission) controls the objective marker even if there are more enemy models within range of the same objective marker. If an enemy unit within range of the same objective marker has a similar ability, then the objective marker is controlled by the player who has the most models within range of it as normal.
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
}),
("adeptus_custodes", "implacable_vanguard", {
	-- When this model Advances, add 6 to its Move characteristic for that Movement phase instead of rolling a dice.
	"type": "SET_ADVANCE_DISTANCE",
	"params": 6
}),
("adeptus_custodes", "custodes_vexilla", {
	-- You can re-roll failed morale tests for friendly IMPERIUM INFANTRY and BIKER units within 6 of this model. In addition, when you add this model to your army, choose one of the following vexillas for this model to carry:
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "HAS_CATEGORY",
					"params": ["imperium"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry", "biker"]
				}
			]
		},
		"type": "MORALE_REROLL"
	}
}),
("adeptus_custodes", "vexilla_defensor", {
	-- IMPERIUM INFANTRY units have a 5+ invulnerable save against ranged weapons whilst they are wholly within 9 of any friendly VEXILUS PRAETORS with this vexilla.
	"type": "AURA",
	"radius": 9,
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "HAS_CATEGORY",
					"params": ["imperium"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry"]
				}
			]
		},
		"type": "SET_STAT", 
 		"subType": "SHOOT",
 		"params": { "field": "invuln", "val": 5 }
	}
}),
("adeptus_custodes", "guardian_eternal", {
	-- Each time an attack is allocated to this model, subtract 1 from the damage characteristic of that attack (to a mininum of 1).
	"type": "TAKE_DMG",
	"params": -1
}),
