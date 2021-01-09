INSERT INTO war_desc_profile (faction, name, meaning) VALUES
("orks", "dis_is_ours!_zog_off!", {
	-- If your army is battle-forged, all Troops units in Ork Detachments gain this ability.  Such a unit that is within range of an objective Markers (as specified in the mission) controls the objective marker even if there are more enemy models within range of that objective marker.  If an enemy unit within range of the same objective marker has a similar ability, then the objective marker is controlled by the player who has the most models within range of it as normal.
	"type": "ROSTER_RULE",
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["troops"]
		},
		"type": "OBJECTIVE_SECURED"
	}
}),
("orks", "kombi_rokkit", {}),
	-- When using both profiles, -1 to hit roll.
("orks", "kombi_skorcha", {}),
	-- When using both profiles, -1 to hit roll.
("orks", "waaagh!_energy", {}),
	-- Add 1 to any Psychic test rolls made for this model for every 10 friendly ORK models excluding gretchin within 10 of it when the roll is made, to a maximum of +3.  However, if result of the test is 12+, this model immediately suffers Perils of the Warp.
("orks", "warphead_(1_cp)", {
	-- Use this Stratagem before the battle begins.  Select a WEIRDBOY model knows 1 additional psychic power from the Power of the Waaagh! discipline and can attempt to manifest 1 additional psychic power in each of your Psychic phases.
	"type": "ADD_PSYKER_CASTS",
	"params": 1
}),
("orks", "kustom_force_field_(big_mek)", {
	-- If this model is equipped with a kustom force field, friendly ORK units have a 5+ invulnerable save against attacks made with ranged weapons while they are wholly within 9 of it.  While a model equipped with a kustom force field is embarked, the vehicle transporting it has a 5+ invulnerable save against attacks made with ranged weapons instead.  
	"type": "AURA",
	"warning": "If embarked, this applies to just the transport instead all units in an aura.",
	"params": {
		"cond": {
			"type": "HAS_FACTION",
			"params": ["ork"] 
		},
		"type": "SET_STAT__SHOOT", 
		"params": { "field": "invuln", "val": 5 }
	}
}),
("orks", "kustom_force_field_(vehicle)", {
	-- If this model is equipped with a kustom force field, friendly ORK units that are wholly within 9 have a 5+ invulnerable save against ranged weapons.
	"type": "AURA",
	"params": {
		"cond": {
			"type": "HAS_FACTION",
			"params": ["ork"] 
		},
		"type": "SET_STAT__SHOOT", 
		"params": { "field": "invuln", "val": 5 }
	}
}),
("orks", "grot_oiler", {
	-- Once per battle, a Grot Oiler can assist its master in making repairs. If it does so, the model being repaired regains 1 additional lost wound.  When rolling to wound this unit, use the Big Mek’s Toughness while it is on the battlefield. The death of a Grot Oiler is ignored for the purposes of Morale tests. The Grot Oiler is considered to have the CHARACTER keyword for the purposes of shooting attacks.
	"type": "ACTION",
	"subType": "BATTLE"
}),
("orks", "terrifying_killer", {
	-- Subtract 1 from the Leadership characteristic of enemy units while they are within 6 of Boss Snikrot
	"type": "AURA",
	"radius": 6,
	"target": "ENEMY",
	"params": {
		"type": "ADD_STAT",
		"params": {
			"field": "leadership",
			"val": -1
		}
	}
}),
("orks", "sneakiest_git", {
	-- Each time a ranged attack is allocated to the bearer while it is receiving the benefits of cover, add an additional 2 to any armour saving throw made against that attack.
	"type": "ADD_SAVE",
	"subType": "SHOOT",
	"cond": { "type": "IN_COVER" }
	"params": -2
}),
("orks", "red_skull_kommandos", {
	-- You can re-roll hit rolls of 1 in the Fight phase for friendly units of Blood Axe Kommandos within 6 of Boss Snikrot 
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_NAME",
			"params": "Blood Axe Kommandos"
		},
		"type": "HIT_REROLL",
		"subType": "FIGHT",
		"params": [1]
	}
}),
("orks", "kunnin_infiltrator", {
	-- During deployment, you can set up Boss Snikrot in hiding instead of placing him on the battlefield.  At the end of any of your Movement phases, Snikrot can stalk from his hiding place - Set him up anywhere on the battlefield that is more than 9 away from any enemy models.
	"type": "DEEPSTRIKE"
}),
("orks", "grot_orderly", {
	-- Once per game, when the Painboy is attempting to heal a model using Doks Tools, you may re-roll the dice, either when determining if the surgery is successful, or when calculating the number of wounds regained.  When rolling to wound this unit, always use the Painboys Toughness (while it is on the battlefield). The death of a Grot Orderly is ignored for the purposes of morale. The Grot Orderly is considered to have the CHARACTER keyword for the purposes of shooting attacks.
	"type": "ACTION",
	"subType": "BATTLE"
}),
("orks", "sawbonez", {
	-- At the end of your Movement phase, this model can attempt surgery on a single friendly <CLAN> INFANTRY or BIKER model within 1 of it. If it does so, roll a D6 to determine if the surgery is successful. On a 1 the surgery fails and the model you were attempting to heal loses a wound. On a 2+ the surgery succeeds and that model regains D3 lost wounds. A model can only be the target of a surgery attempt once per turn.
	"type": "ACTION",
	"subType": "MOVEMENT"
}),
("orks", "great_waagh!", {
	-- Friendly ORK INFANTRY  and MONSTER units within 6 of this model can be chosen to charge with even if they Advanced this turn. In addition, add 1 to the Attacks characteristic of models in friendly ORK INFANTRY units whilst their unit is within 6 of this model, if their unit made a charge move this turn.
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
							"type": "HAS_FACTION",
							"params": ["ork"]
						},
						{
							"type": "HAS_CATEGORY",
							"params": ["infantry", "monster"]
						}
					]
				},
				"type": "ADVANCE_AND_CHARGE",
			}
		},
		{
			"type": "AURA",
			"radius": 6,
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
				"type": "ADD_STAT",
				"params": { "field": "attacks", "val": 1 }
			}
		}
	}
}),
("orks", "the_boss_is_watchin", {
	-- When a friendly ORK unit within 6 of this model fails a Morale test, this model can restore order in a brutal display of violence. If it does, that unit suffers D3 mortal wounds and that Morale test is treated as having been passed.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_FACTION",
			"params": ["ork"] 
		},
		"type": "MORALE_EXECUTION",
		"params": "D3M"
	}
}),
("orks", "prophet_of_gork_and_mork", {
	-- This model has a 4+ invulnerable save. In addition, this model can only lose a maximum of 4 wounds in each phase.
	"type": "AND",
	"params": [
		{
			"type": "SET_STAT", 
			"params": { "field": "invuln", "val": 4 }
		},
		{
			"type": "MAX_DMG_PER_ROUND",
			"params": 4
		}
	]
}),
("orks", "goffs_is_da_best", {
	-- Re-roll hit rolls of 1 for attacks made with melee weapons by models in friendly GOFF ORK units whilst their unit is within 6 of this model.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["goff_ork"]
		},
		"type": "HIT_REROLL__FIGHT",
		"params": [1]
	}
}),
("orks", "grand_warboss", {
	-- This model can be included in an ORK Detachment without preventing other units from that Detachment from gaining a Clan Kultur or Subkultur. Note, however, that this model does not benefit from any Clan Kultur unless the Clan Kultur selected for that Detachment is the Goffs Clan Kultur.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "ammo_runt", {}),
	-- Each time this unit shoots, when making to hit rolls, you can re-roll one dice for each ammo runt accompanying it.  When rolling to wound this unit, always use the Units Toughness (While it is on the battlefield).  The death of a Ammo Runt is ignored for the purposes of morale.  If the unit has CHARACTER, then the Ammo Runt is considered to have the CHARACTER keyword for the purposes of shooting attacks.
("orks", "goldtoof_armour", {
	-- Kaptin Badrukk has a 5+ invulnerable save.
	"type": "SET_STAT",
	"params": { "field": "invuln", "val": 5}
}),
("orks", "flashiest_gitz", {
	-- You can re-roll hit rolls of 1 in the Shooting phase for friendly units of Flash Gitz within 6 of Kaptin Badrukk.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_NAME",
			"params": "Flash Gitz" 
		},
		"type": "HIT_REROLL",
		"subType": "SHOOT",
		"params": [1] 
	}
}),
("orks", "cybork_body", {
	-- Each time this model loses a wound, roll a D6; on a roll of 5+, that wound is not lost.  You cannot make a Doks Tools roll for this model if you do so.
	"type": "FNP",
	"params": 5
}),
("orks", "full_throttle", {
	-- When Boss Zagstruk Advances you can add 6 to the move rather than D6, roll a D6 after.   On a roll of 1, he suffers a Mortal Wound. 
	"type": "SET_ADVANCE_DISTANCE",
	"params": 6,
	"warning": "Roll a D6 after advancing, and apply 1MW on a 1."
}),
("orks", "drill_boss", {
	-- Friendly units of GOFF STORMBOYZ within 6 of Boss Zagstruk automatically pass Morale tests.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_CATEGORY",
			"params": ["goff_stormboyz"] 
		},
		"type": "MORALE_PASS"
	}
}),
("orks", "stormboyz_strike", {
	-- During deployment, you can set up this unit flying high in the skies instead of placing it on the battlefield.  At the end of any of your Movement phases this unit can plummet onto the battlefield - set them up anywhere on the battlefield, more than 9 away from any enemy models.
	"type": "DEEPSTRIKE"
}),
("orks", "one_scalpel_short_of_a_medpak", {
	-- At the start of your Charge phase, if Mad Dok Grotsnik is not within 3 of another friendly Ork Infantry unit, not within Engagement Range of any enemy units, and is within 12 of an enemy unit, he will automatically attempt to charge the nearest enemy unit. He can do so even if he Advanced or Fell Back in the same turn.
	"type": "AND",
	"params": [
		{ "type": "ADVANCE_AND_CHARGE" },
		{ "type": "FALL_AND_CHARGE" }
	],
	"warning": "Unit may be forced to charge if able."
}),
("orks", "doks_tools", {
	-- Roll a D6 each time an ORK INFANTRY or ORK BIKER unit loses a wound whilst within 3 of Mad Dok Grotsnik. On a 6, that unit does not lose that wound. This is not cumulative with other Doks Tools.
	"type": "AURA",
	"radius": 3,
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
		"params": 6
	}
}),
("orks", "sawbones", {
	-- At the end of your Movement phase, Mad Dok Grotsnik can attempt surgery on a single friendly ORK INFANTRY or BIKER model within 1 of him. If he does so, roll a D6 to determine if the surgery is successful. On a 1 the surgery fails, and the model you were attempting to heal loses a wound. On a 2+ the surgery succeeds, and that model regains D3 lost wounds. A model can only be the target of a surgery attempt once per turn.
	"type": "ACTION",
	"params": 3 
}),
("orks", "green_tide", {
	-- If this unit includes 20 or more models, add 1 to the Attacks characteristic of each model in the unit.
	"cond": {
		"type": "HAS_MODEL_QUANTITY",
		"params": 20 
	},
	"type": "ADD_STAT",
	"params": { "field": "attacks", "val": 1 }
}),
("orks", "ard_boyz_(2_cp)", {
	-- The Save characteristic of models in this unit is changed to 5+.  This unit can only use the Mob Up Stratagem to merge with other units of Ard Boyz.
	"type": "SET_STAT",
	"params": { "field": "save", "val": 5 }
}),
("orks", "skarboyz_(1_cp)", {
	-- Gains the Skarboyz keyword, and the Strength characteristic of models in this unit is changed to 5.  This unit can only use the Mob Up Stratagem to merge with other units of Skarboyz.
	"type": "SET_STAT",
	"params": { "field": "strength", "val": 5 }
}),
("orks", "surprisingly_dangerous_in_large_numbers", {
	-- Add 1 to the hit rolls for models in this unit while this unit includes 20 or more models.
	"cond": {
		"type": "HAS_MODEL_QUANTITY",
		"params": 20
	},
	"type": "HIT",
	"params": 1
}),
("orks", "runtherd_(restriction)", {
	-- If your army is Battle-forged you must include at least 1 unit comprised entirely of Gretchin infantry for each Runtherd in this detachment.  Runtherds to not take up a battlefield role.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "squig_hound", {
	-- If a unit comprised entirely of GRETCHIN Infantry fails a Morale test and is within 3 of any friendly Runtherds with a squig hound, ignore the result.  D3 models from the unit are slain instead.
	"type": "AURA",
	"radius": 3,
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "HAS_CATEGORY",
					"params": ["gretchin"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry"]
				}
			],
		},
		"type": "MORALE_EXECUTION",
		"params": "D3M" 
	}
}),
("orks", "grot_lash", {
	-- Re-roll hit rolls of 1 in the fight phase for units comprised entirely of GRETCHIN INFANTRY while within 3 of a friendly Runtherd with a Grot Lash.
	"type": "AURA",
	"radius": 3,
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "HAS_CATEGORY",
					"params": ["gretchin"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry"]
				}
			],
		},
		"type": "HIT_REROLL",
		"subType": "FIGHT",
		"params": [1]
	}
}),
("orks", "waaagh!_banner", {
	-- (Clan); units within 6 of any friendly Waaagh! banner add 1 to their hit rolls in the Fight phase.
	"type": "AURA",
	"radius": 6,
	"params": {
		"type": "HIT",
		"subType": "FIGHT",
		"params": 1
	}
}),
("orks", "pyromaniaks", {}),
	-- If this unit destroys an enemy unit in the Shooting phase, it automatically passes Morale tests until the start of your next turn.
("orks", "kunnin_infiltrators", {
	-- During Deployment, you may set up a unit of Kommandos in hiding instead of placing them on the battlefield.  At the end of any of your Movement phases, they can stalk from their hiding place - set them up anywhere on the battlefield that is more than 9 away from any enemy models.
	"type": "DEEPSTRIKE"
}),
("orks", "sneaky_gits", {
	-- Each time a ranged attack is allocated to a model in this unit while it is receiving the benefits of cover, add an additional 1 to any armour saving throw made against that attack.
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
("orks", "turbo_boost", {
	-- Turbo-boost:  When this model Advances, add 6 to its Move characteristic for that Movement phase instead of rolling a dice.
	"type": "SET_ADVANCE_DISTANCE",
	"params": 6
}),
("orks", "bigbomm", {
	-- Once per battle for each bigbomm this model is eqipped with it can drop a bomm. If it does, in your Movement phase, after this model has made a Normal Move or Advanced, you can select one enemy unit this model moved across as part of that move. If you do, roll one D6 for each model in that enemy unit (up to a maximum of five D6). That enemy unit suffers 1 mortal wound for each result of 5+.
	"type": "ACTION",
	"params": "BATTLE"
}),
("orks", "all_da_dakka", {
	-- Add 1 to hit rolls for this models attacks in the Shooting phase if all of those attacks target the same unit that phase.
	"type": "HIT",
	"subType": "SHOOT",
	"warning": "All your attacks must target the same unit this phase to use this."
	"params": 1
}),
("orks", "explosive_demise", {
	-- If this model is reduced to 0 wounds, roll a d6 before removing it from the battlefield, on a 4+ it crashes and explodes, and each unit within 6 suffers 3 mortal wounds.
	"type": "EXPLODES",
	"radius": 6,
	"params": {
		"threshold": 4,
		"dmg": "3M",
	} 
}),
("orks", "grot_gunner", {
	-- When a Burna-bommer attacks with its twin big shoota, add 1 to its hit rolls.
	"cond": {
		"type": "USING_WEAPON",
		"params": ["twin_big_shoota"]
	},
	"type": "HIT",
	"subType": "SHOOT",
	"params": 1
}),
("orks", "burna_bomb", {
	-- A Burna-bommer can drop one burna bomb as it flies over enemy units in its Movement phase.  After the Burna-bommer has moved, pick one enemy unit that it flew over and roll a D6 for each model in the unit (up to a max of 10).   Add 1 to the dice rolls if the enemy unit is INFANTRY.  For each roll of a 5+, the unit being bombed suffers a mortal wound.  Each burna bomb can only be used once per battle.
	"type": "ACTION",
	"params": 2,
	"subType": "BATTLE"
}),
("orks", "boom_bomb", {
	-- A Blitza-bommer can drop one boom bomb as it flies over enemy units in its Movement phase.  After the Blitza-bommer has moved, pick one enemy unit that it flew over and roll a D6 for each model in the unit (up to a max of 12).  Roll 3 dice instead for each VEHICLE or MONSTER in the unit.  For each roll of a 4+, the unit being bombed suffers a mortal wound.  Each boom bomb can only be used once per battle.
	"type": "ACTION",
	"params": 2,
	"subType": "BATTLE"
}),
("orks", "mekbrain_enhanced_weapon_sights", {
	-- This model can choose a single enemy unit each Shooting phase - add 1 to all hit rolls for attacks made against that unit with this models smasha gun.
	"type": "ACTION",
	"params": 4
}),
("orks", "outriders", {
	-- During deployment, you can set up a unit of Wartrakks on the armys flanks instead of on the battlefield. At the end of any of your Movement phases, the Wartrakks can race in to encircle the foe - set them up so that each model is touching a battlefield edge and is more than 9 away from any enemy models.
	"type": "DEEPSTRIKE"
}),
("orks", "grot_krew", {
	-- A unit of Artillery and its accompanying Grot Gunners must be deployed with each model within 3 of at least one other model from their unit.  From that point on, each Artillery model and 2 or 5 model group of Grot Gunners act as a single unit.
	"type": "SPLIT_UP"
}),
("orks", "take_cover", {}),
	-- Grot Gunners can only be targeted in the shooting phase if they are the closest enemy unit.
("orks", "big_gunz", {
	-- The first time this unit is set up on the battlefield, all of its Big Gunz must be placed within 6 of at least one other Big Gun, and with each grot krew within 1 of their Big Gun. From that point onwards, each Big Gun operates independently and is treated as a separate unit for all rules purposes.
	"type": "SPLIT_UP"
}),
("orks", "mek_gunz", {
	-- The 1st time this unit is set up on the battlefield, each Mek Gun must be placed within 6 of at least one other Mek Gun, with each grot Krew within 1 of their Mek Gun.  From that point onwards, each Mek Gun operates independently and is treated as a separate unit for all rules purposes.
	"type": "SPLIT_UP"
}),
("orks", "ard_case", {
	-- If this model is equipped with an ard case, its Toughness characteristic is increased by 1 and it loses the Open-topped ability.
	"type": "ADD_STAT",
	"params": { "field": "toughness", "val": 1 }
}),
("orks", "dread_mob", {
	-- The first time this unit is set up on the battlefield, all of its models must be placed within 6 of at least one other model from the unit.  From that point onwards, each operated independently and is treated as a separate unit for all rules purposes.
	"type": "SPLIT_UP"
}),
("orks", "scrag_em", {
	-- Add 1 to their Attacks characteristic if this unit contains 3 or more models
	"cond": {
		"type": "HAS_MODEL_QUANTITY",
		"params": 3
	},
	"type": "ADD_STAT",
	"params": { "field": "attacks", "val": 1 }
}),
("orks", "big_n_stompy", {
	-- This model is eligible to declare a charge in a turn in which it Fell Back .
	"type": "FALL_AND_CHARGE"
}),
("orks", "gun_crazy_showoffs", {}),
	-- After this unit has shot in the Shooting phase, roll a D6, On a 6, all models in the unit must immediately shoot again, but can only target the nearest enemy unit.
("orks", "gitfinda_squig", {
	-- +1 to hit rolls for Shooting Attacks made by the Kaptain.
	"type": "HIT",
	"subType": "SHOOT",
	"params": 1
}),
("orks", "bigger_n_stompier", {
	-- This model is eligible to declare a charge in a turn in which it Fell Back. Each time this model makes a Normal Move, Advances or Falls Back, it can be moved across other models (excluding Monster and Vehicle models) as if they were not there, and when it does it can be moved within Engagement Range of such models, but cannot finish its move within Engagement Range of any of them.
	"type": "AND",
	"params": [
		{
			"type": "FALL_AND_CHARGE"
		},
		{
			"type": "FREE_MOVEMENT"
		}
	]
}),
("orks", "effigy:_ork", {
	-- Units within 6 of a friendly Stompa can re-roll failed Morale tests.
	"type": "AURA",
	"radius": 6,
	"params": {
		"type": "MORALE_REROLL"
	}
}),
("orks", "stompa_rigger_crew", {
	-- This models grot riggers can attempt repairs at the end of your Movement phase.  If they do so, roll a D6; on a 2+ this model regains D3 lost wounds.  A model can only be repaired once each turn.
	"type": "ACTION",
	"params": 2
}),
("orks", "psycho_dakka_blast!", {
	-- In your Shooting phase, after firing this models supa-gatler for the first time that phase, you can attempt to fire it a second time by rolling a D6; on a 1 the weapons ammo has been expended, and it cannot be used for the rest of the battle. On a 2+ you can fire the supa-gatler a second time that phase, and after resolving those attacks, you can then attempt to fire the weapon a third time by rolling a D6; on a 4 or less the weapons ammo has been expended, and it cannot be used for the rest of the battle.  On a 5+ you can fire the supa-gatler a third time that phase.
	"type": "ACTION",
	"params": 4
}),
("orks", "tank_hunters", {
	-- You can re-roll hit rolls for attacks made by this unit that target VEHICLES
	"cond": {
		"type": "HAS_CATEGORY",
		"target": "ENEMY",
		"params": ["vehicle"]
	}
	"type": "HIT_REROLL"
}),
("orks", "bomb_squig", {}),
	-- The Death of a Bomb Squig is ignored for the purposes of morale
("orks", "da_beast", {
	-- When this model Advances, do not make an Advance roll. Instead, until the end of the phase, add 6 to the Move characteristic of this model.
	"type": "SET_ADVANCE_DISTANCE",
	"params": 6
}),
("orks", "mekaniak_boss", {
	-- At the end of your Movement phase, Mek Boss Buzzgob can repair one friendly GOFF VEHICLE within 3 of it. That VEHICLE model regains up to 3 lost wounds. Each model can only be repaired once per turn.
	"type": "ACTION",
	"params": 2
}),
("orks", "buzzgobs_dredheadz", {
	-- In your Command phase, you can select one friendly GOFF DEFF DREADS, GOFF MEGA DREAD, GOFF MEKA DREAD, GOFF KILLA KANS, GOFF GORKANAUT or GOFF MORKANAUT unit that is within 6 of Mek Boss Buzzgob. Until the start of your next Command phase, each time a model in that unit makes an attack, add 1 to that attacks hit roll.
	"type": "ACTION",
	"params": 1
}),
("orks", "nitnuckle_and_lunk", {
	-- Twice per battle, when Mek BOss Buzzgob uses the Mekaniak Boss ability to repair a model, the Grot Oilers can assist in the repairs. If they do, the model being repaired regains 1 additional lost wound.  Each time a roll is made to wound this unit, if Mek Boss Buzzgob is on the battlefield, use that models Toughness characteristic. Each time a Grot Oiler in this unit is destroyed, it is ignored for the purposes of Morale and Combat Attrition tests. ""
	"type": "ACTION",
	"warning": "You can only use this twice per battle."
	"params": 2
}),
("orks", "howdah", {
	-- In your Shooting phase, units embarked on this model can be selected to shoot. Measure the range and draw line of sight from any point on this model. When shooting with units embarked on this model, they do not count as being within Engagement Range of enemy units, and if this model made a Normal Move or Fell Back, they count as having Remained Stationary. Any other restrictions or modifiers that apply to this model also apply to models embarked upon it; for example, if this model Advanced, models embarked upon it also count as having Advanced.
	"type": "OPEN_TOPPED"
}),
("orks", "stampede", {
	-- Each time this model finishes a charge move, select one enemy unit within Engagement Range of it and roll one D6; on a 2+, that unit suffers D3 mortal wounds.
	"type": "CHARGE_DMG",
	"params": { "dmg": "D3M", "threshold": 2}
}),
("orks", "enraged_demise", {
	-- When this transport is destroyed, roll one D6 before any embarked models disembark and before removing it from play. On a 6 it becomes enraged, and each unit within 6 suffers D3 mortal wounds.
	"type": "EXPLODES",
	"radius": 6,
	"params": {
		"threshold": 6,
		"dmg": "D3M",
	} 
}),
("orks", "fixin_jobs", {
	-- At the end of your Movement phase, this model can repair one friendly <CLAN> VEHICLE model within 1 (it cannot repair itself). If it does, that model regains up to D3 lost wounds. A model can only be repaired once each turn.
	"type": "ACTION",
	"params": 2
}),
("orks", "rippa_klaws", {
	-- If the bearer is equipped with 2 dread rippa klaws, each time it fights, it can make 1 additional attack with 1 dread rippa klaw.
	"type": "ADD_STAT",
	"warning": "Only applies if unit has 2 dread rippa klaws.",
	"params": { "field": "attacks", "val": 1}
}),
("orks", "spiked_ram", {
	-- Each time this model finishes a charge move, select one enemy unit within Engagement Range of it and roll one D6; on a 4+, that unit suffers D3 mortal wounds.
	"type": "CHARGE_DMG",
	"params": { "dmg": "D3M", "threshold": 4}
}),
("orks", "kannonwagon_grot_gunners", {
	-- Each time this model makes an attack with a super-kannon, add 1 to that attacks hit roll.
	"type": "HIT",
	"subType": "SHOOT",
	"warning": "Only applies to super-kannon shots.",
	"params": 1
}),
("orks", "kill_tank_grot_riggers", {
	-- At the end of each of your movement phases, this model regains up to D3 lost wounds. This model can only be repaired once per turn.
	"type": "ACTION",
	"params": 2
}),
("orks", "ram", {
	-- Each time this model finishes a charge move, select one enemy unit within Engagement Range of it and roll one D6; on a 2+, that units suffers D3 mortal wounds.
	"type": "CHARGE_DMG",
	"params": { "dmg": "D3M", "threshold": 2}
}),
("orks", "chop_and_krush", {
	-- If this model is equipped with any two melee weapons, add 1 to its Attacks characteristic.
	"type": "ADD_STAT",
	"warning": "Only applies if the model is equipped with two melee weapons.",
	"params": { "field": "attacks", "val": 1}
}),
("orks", "gargantuan", {
	-- This model is eligible to charge in a turn in which it Fell Back. Each time this model makes a Normal Move, Advances or Falls Back, it can move across models (excluding VEHICLE or MONSTER models) as if they were not there.
	"type": "AND",
	"params": [
		{
			"type": "FALL_AND_CHARGE"
		},
		{
			"type": "FREE_MOVEMENT"
		}
	]
}),
("orks", "fuel_mixa_grot", {
	-- Once per battle when this model advances, you may add 6 to the Move instead of D6
	"type": "ACTION",
	"subType": "BATTLE",
	"params": 2
}),
("orks", "grot_gunner_and_targeting_squig", {
	-- Each time this model makes an attack with its kustom shokk rifle, this model has a BS characteristic of 3+ for that attack.
	"type": "SET_STAT",
	"warning": "Only applies to attacks with the Kustom Shokk Rifle.",
	"params": { "field": "ballistics", "val": 3}
}),
("orks", "shokk_tunnel", {}),
	-- If you roll a 4+ when advancing with this model, remove it from the battlefield, and set it up more than 9 away from enemy units.  After doing so, roll a D6 on a 6, the model suffers 1 mortal wound.
("orks", "riding_shotgun", {
	-- When this model shoots, it can throw a Grenade and shoot with its Pistol(s) in addition to any other weapons.
	"type": "CAN_GRENADE_PISTOL"
}),
("orks", "squig_mine", {
	-- Once per battle, in the Movement phase, this model can deploy a squig mine.  At any point during this models move, place the quig mine within 1 of it and more than 3 from any enemy models.  The squig mine is represented by the squig mine model, but does not count as a model for any rules purposes.  From the start of the next phase, that squig mine is detonated if any unit (friend or foe) moves within 3 of it.  Resolve the detonation after the unit that detonated it has ended its move.  When a squig mine is detonated, roll a D6: on a 2-3 it inflicts 1 mortal wound on the unit that detonated it; on a 4-5 it inflicts D3 mortal wounds on the unit that detonated it; and on a 6 it inflicts 3 mortal wounds on the unit that detonated it.  The squig mine is then removed from the battlefield.
	"type": "ACTION",
	"subType": "BATTLE",
	"params": 2
}),
("orks", "billowing_fumes", {
	-- -1 to hit rolls made with ranged weapons to target this model.
	"type": "BE_HIT",
	"subType": "SHOOT",
	"params": -1
}),
("orks", "bonebreaker_ram", {
	-- Add D6 to the Attacks characteristic of this model in the Fight phase until the end of that phase if it made a charge move this turn.
	"cond": {
		"type": "HAS_STATUS",
		"params": ["CHARGED"]
	},
	"type": "ADD_STAT",
	"params": { "field": "attacks", "val": "D6"}
}),
("orks", "periscope", {
	-- If this model remains stationary or moves under half speed in its Movement phase (i.e. it moves a distance in inches less than half of its current Move characteristic) it can shoot twice in the following Shooting phase with its kannon, killkannon or zzap gun (The weapon must target the same unit both times).
	"cond": {
		"type": "HAS_STATUS",
		"params": ["STATIONARY"]
	},
	"params": "MULT_SHOTS",
	"warning": "Restrictions apply.",
}),
("orks", "ork_structure", {}),
	-- After this model is set up, it becomes an Obstacle terrain feature with the following terrain traits: Defence Line, Light Cover, Heavy Cover, Defensible, Unstable Position, Difficult Ground (see the Warhammer 40,000 Core Book).
("orks", "meks_grabbin_claw", {
	-- At the start of the Fight phase, before any units have been chosen to fight, one ORK INFANTRY unit from your army that is within 1 of this model can operate the Mekboy Workshops grabbin klaw. if it does so, select an enemy unit within 1 of this model and roll a D6; on a 4+ that enemy unit suffers D3 mortal wounds.
	"type": "ACTION",
	"params": 6
}),
("orks", "kustom_job", {
	-- At the end of your movement phase one ORK VEHICLE unit from your army that is within 1 of this model can receive a Kustom Job.  If it does so, until the end of your turn, that unit cannot shoot or charge, and the attacks characteristic of models in that unit are reduced to 1, but you can choose and resolve one of the following effects.    More Speed - Until the end of your next Movement phase increase the move characteristic of models in the unit by 6 In addition, roll a D6 to see if the unit receives something extra speshul; on a 6 Add 1 to the units charge moves for the rest of the battle.    More Rivvets - That unit regains D3 wounds.  If there is a MEK or BIG MEK from your army within 1 of this model that has not used its mekaniak ability to repair a vehicle yet this turn it can oversee the kustom job; if it does so, the unit regains 3 lost wounds instead of D3, and the model that oversaw the Kustom Job cannot use its big mekaniak or mekaniak this turn.  In addition, roll a D6 to see if the unit receives something extra speshul; on a 6 add 1 to the Toughness characteristic for models in that unit for the rest of the battle.   More Dakka - Choose one weapon (excluding a bubblechukka) that a model in that unit is equipped with.  The next time any models in the unit fire that weapon, the weapon makes the maximum number of attacks (e.g. a weapon with the Heavy 2D6 type will fire 12 shots). In addition, roll a D6 to see if the unit receives something extra speshul; on a 6 add 1 to the chosen weapons Damage characteristic for the rest of the battle.    A unit can only receive a kustom job once per turn.
	"type": "ACTION",
	"params": 2
}),
("orks", "blood_axes", {
	-- A unit with this kultur gains the benefit of cover, even while they are not entirely on or in a terrain feature, if the enemy model making the attack is at least 18 away.  In addition, units with this kultur can shoot or charge (but not both) even if they Fell Back in the same turn – if such a unit is embarked, it can only do so if the Transport that Fell Back also has this kultur.
	"type": "OR",
	"warning": "See text.",
	"params": [
	 	{ "type": "FALL_AND_CHARGE" },
	 	{ "type": "FALL_AND_SHOOT" }
	]
}),
("orks", "deathskulls", {
	-- Models with this Kultur have a 6+ invulnerable save. In addition, you can re-roll a single hit roll, a single wound roll, and a single damage roll for each unit with this kultur each time it shoots or fights.  In addition, INFANTRY units with this kultur gain the Dis is Ours! Zogg Off! ability, even if they do not have the Troops battlefield role.
	"type": "AND",
	"warning": "See text.",
	"params": [
	 	{
	 		"type": "SET_STAT",
	 		"params": { "field": "invuln", "val": 6 }
	 	}	
	]
}),
("orks", "evil_sunz", {
	-- Add 1 to the Move characteristic of models with this kultur (adding 2 instead if that model is a SPEED FREEK), and add 1 to Advance and charge rolls made for them.  In addition, models with this kultur do not suffer the penalty to their hit rolls for Advancing and firing Assault weapons.
	"type": "AND",
	"warning": "See Kultur",
	"params": [
	 	{
	 		"type": "ADD_STAT",
	 		"params": { "field": "move", "val": 1}
	 	},
	 	{
	 		"cond": {
	 			"type": "HAS_CATEGORY",
	 			"params": ["speed_freek"]	
	 		}
	 		"type": "ADD_STAT",
	 		"params": { "field": "move", "val": 1 }
	 	},
	 	{
	 		"type": "ADD_ADVANCE",
	 		"params": 1
	 	},
	 	{
	 		"type": "ADD_CHARGE",
	 		"params": 1
	 	},
	 	{
	 		"type": "ADVANCE_SHOOT",
	 		"subType": "ASSAULT"
	 	}
	]
}),
("orks", "bad_moons", {
	-- Re-roll hit rolls of 1 for attacks made by models with this kultur in the Shooting phase.
	"type": "HIT_REROLL",
	"subType": "SHOOT",
	"params": [1]
}),
("orks", "freebooterz", {}),
	-- Add 1 to hit rolls for attacks made by models with this kultur if any other friendly unit with this kultur within 24 has destroyed an enemy unit this phase.
("orks", "goffs", {
	-- Each time you roll an unmodified hit roll of 6 for an attack with a melee weapon made by a model with this kultur, immediately make an additional hit roll against the same target using the same weapon.  These additional hit rolls cannot themselves generate any further hit rolls.
	"type": "EXPLODING_HIT",
	"subType": "FIGHT",
	"params": [6]
}),
("orks", "snakebites", {
	-- Roll a dice each time a model with this Kultur loses a wound.  On a 6, the wound is not lost.  If a model has a similar ability (e.g. the Supa-Cybork Shiny Gubbinz or Ramshackle ability) you can choose which ability to use when a model loses a wound, but you cannot use both.
	"type": "FNP",
	"params": 6
}),
("orks", "no_clan", {
	-- You can take units from multiple Clans and Mobs, but you lose access to particular Clan Kultures and Subkulturs
	"type": "BATTLEFORGED_MOD"
}),
("orks", "boomboyz", {}),
	-- Blow It UP!  Improve the Strength and Armour Penetration characteristics of rokkit and stikkbomb weapons (these are weapons that have the name ‘rokkit’ or ‘stikkbomb’ in their profile e.g. rokkit launcha, stikkbomb chukka), as well as tankbusta bombs, wing missiles, kannons, killkannons, deffkannons, da boomer and lobbas equipped on models in a unit with this Subkultur by 1 (e.g. AP -2 becomes AP -3). Note that for combiweapons, this bonus only applies to attacks made with the rokkit launcha profile. 
("orks", "feral_orks", {}),
	-- Wildboyz: WARBOSS, WEIRDBOY, NOBZ and BOYZ only (excluding BIKER and MEGA ARMOUR). Models in a unit with this Subkultur can pile in up to 6. When making an Advance roll for a unit with this Subkultur, roll two additional dice and discard two of the results.
("orks", "flyboyz", {
	-- Crucial Velocity: FLY models only. When resolving an attack made with a ranged weapon against a unit with this Subkultur by a model that is more than 1 away, that unit is treated as having the benefit of cover to its saving throw. When resolving an attack made with a melee weapon against a unit with this Subkultur in a turn in which it was more than 1 away from any enemy units at the start of the preceding Charge phase, subtract 1 from the hit roll
	"cond": {
		"type": "AND",
		"params": [
	 		"cond": {
	 			"type": "HAS_CATEGORY",
	 			"params": ["fly"]	
	 		}
		],
	}
	"type": "AND",
	"params":[
	 	{
	 		"type": "ADD_STAT",
	 		"subType": "SHOOT",
			"warning": "Only applies if the model will start the charge phase outside of engagement range.",
	 		"params": { "field": "save", "val": -1}
	 	},	
	 	{
	 		"type": "BE_HIT",
	 		"subType": "FIGHT",
			"warning": "Only applies if the model started the charge phase outside of engagement range.",
			"params": -1
	 	},	
	]
}),
("orks", "grot_mobs", {}),
	-- Cheeky Zoggers: GRETCHIN models only. Models in a unit with this Subkultur gain a 6+ invulnerable save. When resolving an attack by a VEHICLE model in a unit with this Subkultur, re-roll a hit roll of 1
("orks", "huntas", {
	-- Sneaky Devils: INFANTRY models only (excluding GRETCHIN). Whilst a model in a unit with this Subkultur is on or within a terrain feature, it gains a 5+ invulnerable save. When resolving an attack made with a melee weapon by a model in a unit with this Subkultur, while that model or any model in the target unit is on or within a terrain feature, improve the weapon’s Armour Penetration characteristic by 1 for that attack (e.g. AP -2 becomes AP -3).
	"cond": {
		"type": "HAS_CATEGORY",
		"params": ["infantry"]	
	},
	"type": "AND",
	"params": [
	 	{
	 		"cond": {
	 			"type": "HAS_COVER"
	 		}
	 		"type": "SET_STAT",
	 		"params": { "field": "invuln", "val": 5}
	 	},	
	 	{
	 		"cond": {
	 			"type": "HAS_COVER",
	 			"target": "ENEMY"
	 		}
	 		"type": "ADD_AP",
	 		"subType": "FIGHT",
	 		"params": -1
	 	},	
	]
}),
("orks", "pyromaniacs", {
	-- Arsonists: You can re-roll any and all of the dice when determining the number of shots made for burnas, skorchas, burna bottles, burna exhausts, killa jets and skorcha missiles equipped on models in a unit with this Subkultur.
	When resolving an attack made with the melee profile of a burna equipped on a model with this Subkultur, you can re-roll the wound roll. When resolving the burna bombs ability for a unit with this Subkultur, add 1 to each roll.
	"type": "AND",
	"warning": "See text for exact weapon name list. Also improves the Burna Bombs ability."
	"params": [
	 	{
	 		"cond": {
	 			"type": "WEAPON_NAME",
	 			"params": ["burna", "skorcha", "burna bottle", "burna exhaust", "killa jet", "skorcha missile"]
	 		}
	 		"type": "REROLL_NUM_SHOTS",
	 	},	
	 	{
	 		"cond": {
	 			"type": "WEAPON_NAME",
	 			"params": ["burna"]
	 		}
	 		"type": "WOUND_REROLL",
	 		"subType": "FIGHT"
	 	}
	]
}),
("orks", "tin_eads", {
	-- Krush n Krump!: KILLA KANS, DEFFDREADS, MEGA ARMOUR, MORKANAUTS, GORKANAUTS and STOMPAS only. When resolving an attack made with a melee weapon by a model in a unit with this Subkultur, add 1 to the hit roll. 
	"cond": {
		"type": "HAS_CATEGORY",
		"params": ["killa_kans", "deffdreads", "mega_armour", "morkanauts", "gorkanauts", "stompas"]	
	},
	"type": "HIT",
	"subType": "FIGHT",
	"params": 1
}),
("orks", "madboyz", {
	-- Frantic: INFANTRY and BIKER units only (excluding GRETCHIN). At the start of each battle round, roll one D3 and consult the table below to establish what effect applies to units with this Subkultur until the end of the battle round. This roll cannot be re-rolled. 1. Moroniks : When resolving an attack that targets a unit with this Subkultur, add 1 to the saving throw (invulnerable saving throws are unaffected). 2. Nuttaz : Units with this Subkultur automatically pass Morale tests. 3. Frenzies: Add 1 to the Strength characteristic of models in a unit with this Subkultur
	"type": "ACTION",
	"params": 0
}),
("orks", "gitstoppa_shells", {
	-- Model with a Kustom Shoota, Kombi Weapon with Skorcha or Kombi Weapon with Rokkit Launcha only. Add 1 to the strength and damage of that weapons Shoota or Kustom Shoota profile. Improve the AP of that weapon by 1.
	"type": "MODEL_SPECIFIC"
}),
("orks", "morgogs_finkin_cap", {
	-- BLOOD AXE model only. If the bearer is your Warlord, you can generate a second Warlord Trait for them. If the bearer is not your Warlord, generate a Warlord Trait for them (note that the bearer is only regarded as your Warlord for the purposes of that Warlord Trait). The same Warlord Trait cannot be generated for both the bearer and your Warlord.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "ard_as_nails", {
	-- Add 1 to your warlords Toughness characteristic.
	"type": "ADD_STAT",
	"params": { "field": "toughness", "val": 1 }
}),
("orks", "big_killa_boss", {
	-- Add 1 to the wound rolls for your warlord attacks if they are targeting vehicle or monster.
	"cond": {
		"type": "HAS_CATEGORY",
 		"target": "ENEMY",
		"params": ["vehicle", "monster"]
	}
	"type": "WOUND",
	"params": 1
}),
("orks", "brutal_but_kunnin", {
	-- You can re-roll failed hit rolls for your warlord in the fight phase. In addition increase the damage characteristic of your warlords melee weapons by 1  if he finished a charge move or performed heroic intervention this turn.
	"type": "AND",
	"params": [
	 	{
	 		"type": "HIT_REROLL",
	 		"subType": "FIGHT"
	 	},	
	 	{
	 		"cond": {
	 			"type": "HAS_STATUS",
	 			"params": ["CHARGED", "INTERVENED"]
	 		}
	 		"type": "DMG",
	 		"params": 1
	 	},	
	]
}),
("orks", "da_best_armour_teef_can_buy", {
	-- Your warlord gets 4+ invulnerable save.
	"type": "SET_STAT",
	"params": { "field": "invuln", "val": 4 }
}),
("orks", "follow_me_ladz!", {
	-- Your Warlord gains the Waaagh! and Breakin’ Heads abilities (pg 85). If your Warlord already has the Waaagh! and Breakin’ Heads abilities, the range of each ability is increased by 3. In addition, if your army is Battle-forged, you receive an additional +1 Command Point.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "kunnin_but_brutal", {
	-- At the start of the first battle round but before the first turn begins, you can remove your warlord and up to D3 friendly units from the battlefield and set them up again as described in the deployment section of the mission you are playing. If you pick a transport, the units embarked on it are also redeployed.
	"type": "ACTION",
	"subType": "SETUP"
}),
("orks", "might_is_right", {
	-- Add 1 to this Warlords Strength and Attacks characteristic.
	"type": "AND",
	"params": [
	 	{
	 		"type": "ADD_STAT",
	 		"params": { "field": "strength", "val": 1 }
	 	},	
	 	{
	 		"type": "ADD_STAT",
	 		"params": { "field": "attacks", "val": 1 }
	 	},	
	]
}),
("orks", "surly_as_a_squiggoth", {
	-- You can re-roll failed morale tests for friendly Snakebitez within 6 of your warlord. Friendly Snakebitez gretchin units within 12 of your warlord automatically pass morale tests.
	"type": "AND", 
	"params": [
		{
			"type": "AURA",
			"radius": 6,
			"params": {
				"cond": {"type": "SHARE_SUBFACTION"},
		 		"type": "MORALE_REROLL"
			}
		},
		{
			"type": "AURA",
			"radius": 12,
			"params": {
				"cond": {
					"type": "AND",
					"params": [
						{ "type": "SHARE_SUBFACTION" },
						{ "type": "HAS_CATEGORY", "params": ["gretchin"]}
					]
				},
		 		"type": "MORALE_PASS"
			}
		}
	]
}),
("orks", "grot_riggers_(battle_fortress)", {
	-- In your Command phase, this model regains up to 1 lost wound.
	"type": "ACTION",
	"params": 1
}),
("orks", "grot_riggers", {
	-- In your Command phase, this model regains up to 1 lost wound.
	"type": "ACTION",
	"params": 1
}),
("orks", "shoot_em_again!", {
	-- If this model remains stationary or moves under half speed in its Movement phase (i.e. it moves a distance in inches less than half of its current Move characteristic) it can shoot twice in the following Shooting phase with its killkannon or lobba (the weapon must target the same unit both times).
	"cond": {
		"type": "AND",
		"params": [
			{
				"type": "HAS_STATUS",
				"params": ["STATIONARY"]	
			},
			{
				"type": "USING_WEAPON",
				"params": ["killkannon", "lobba"]	
			}
		]
	}
	"type": "MULT_SHOTS",
	"warning": "All shots from one weapon must be at the same target."
	"params": 2
}),
("orks", "battle_fortress", {
	-- This model can Fall Back in the Movement phase and still shoot and/or charge in the same turn. In addition, this model ignores the penalty for moving and firing Heavy weapons, and can – except when firing Overwatch – still fire its weapons if enemy units are within 1 of it (but only its twin big shootas or twin skorchas can target units that are within 1 of it – other guns must target other units). Finally, this model only gains a bonus to its saving throws for being in cover if at least half of the model is obscured from the firer.
	"type": "AND",
	"warning": "See text."
	"params": [
	 	{"type": "FALL_AND_CHARGE"},
	 	{"type": "FALL_AND_SHOOT"},
	 	{"type": "MOVE_SHOOT_HEAVY"}
	]
}),
("orks", "da_revolushun!", {}),
	-- Friendly Gretchin units can use this model’s Leadership instead of their own whilst they are within 6 of this model. 
("orks", "red_gobbo", {
	-- This model can be included in an Ork Detachment without preventing other units in that Detachment from gaining a Clan Kultur. Note, however, that this model does not itself benefit from any Clan Kultur.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "has_yoo_been_a_good_little_grot_this_year?", {
	-- At the end of your Movement phase, you can select one other friendly Gretchin unit within 3 of this model. If you do, roll one D6; on a 1, that unit suffers 1 mortal wound. On a 2+, models in that unit count as being equipped  with stikkbombs until the end of the battle.
	"type": "ACTION",
	"params": 2
}),
("orks", "ghazghkull’s_waaagh!_banner", {
	-- When a model in a friendly GOFF ORK unit within 6 of this model would lose a wound, and this model is within 3 of a friendly GHAZGHKULL THRAKA unit, roll one D6; on a 6+ that wound is not lost.
	"cond": {
		"type": "IN_RANGE",
		"radius": 3
		"params": {
			"type": "HAS_CATEGORY",
			"params": "ghazghkull_thraka"
		}
	},
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "HAS_SUBFACTION",
			"params": ["goff"]
		},
		"type": "FNP", 
		"params": 6
	}
}),
("orks", "suspiciously_lucky", {
	-- This model has a 2+ invulnerable save.
	"type": "SET_STAT",
	"params": { "field": "invuln", "val": 2 }
}),
("orks", "accidental_figurehead", {
	-- Friendly GOFF GRETCHIN units can use this model’s Leadership instead of their own whilst they are within 12 of this model.
	"type": "AURA",
	"radius": 12,
	"params": {
		"cond": {
			"type": "",
			"params": [
				{
					"type": "HAS_SUBFACTION",
					"params": ["goff"]
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["gretchin"]
				}
			]
		},
		"type": "SHARE_STAT",
 		"params": ["leadership"]
	}
}),
("orks", "keep_up!", {
	-- At the start of your Movement phase, if this model is within 3 of a friendly GHAZGHKULL THRAKA unit, add 2 to this model’s Move characteristic until the end of that phase. 
	"cond": {
		"type": "IN_RANGE",
		"radius": 3,
		"params": {
			"type": "HAS_CATEGORY",
			"params": "ghazghkull_thraka"
		}
	},
	"type": "ADD_STAT",
	"params": { "field": "move", "val": 2 }
}),
("orks", "‘da_boss’_best_grot", {
	-- This model can be included in an Ork Detachment without preventing other units from that Detachment from gaining a Clan Kultur or Subkultur if that Detachment also includes Ghazghkull Thraka. Note, however, that this model does not benefit from any Clan Kultur.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "da_biggest_boss", {
	-- Use this Stratagem before the battle. Select one WARBOSS model in your army. Add 1 to that model’s Wounds and Attacks characteristics and it gains a 4+ invulnerable save. You can only use this Stratagem once per battle, and only if your army does not include GHAZGHKULL THRAKA.
	"type": "AND",
	"params": [
	 	{
	 		"type": "ADD_STAT",
	 		"params": {"field": "wounds", "val": 1}
	 	},	
	 	{
	 		"type": "ADD_STAT",
	 		"params": {"field": "attacks", "val": 1}
	 	},	
	 	{
	 		"type": "SET_STAT",
	 		"params": {"field": "invuln", "val": 4}
	 	},
	]
}),
("orks", "da_kleverest_boss", {
	-- Use this Stratagem before the battle. Select one BIG MEK model in your army. Add 1 to that model’s Wounds and Attacks characteristics and change its Weapon Skill to 2+. You can only use this Stratagem once per battle, and only if your army does not include MEK BOSS BUZZGOB.
	"type": "AND",
	"params": [
		{
			"type": "ADD_STAT",
			"params": {"field": "wounds", "val": 1}
		},
		{
			"type": "ADD_STAT",
			"params": {"field": "attacks", "val": 1}
		},
		{
			"type": "SET_STAT",
			"params": {"field": "weapons", "val": 2}
		}
	]
}),
("orks", "klever_spanner", {}),
	-- Use this Stratagem before the battle. Select one LOOTAS or BURNA BOYZ unit from your army that contains 9 or less models for 1CP, or one LOOTAS or BURNA BOYZ unit from your army that contains 10 or more models for 2CP. Whilst that unit contains one or more Spanners, you can roll one additional dice and discard one when determining the number of shots for burnas or deffguns equipped on models in that unit. Each unit can only be selected for this Stratagem once per battle.
("orks", "kustom_force_field_(bm_w/_kff)", {
	--  Friendly Ork units have a 5+ invulnerable save against ranged attacks whilst they are wholly within 9 of this model. While this model is embarked, the model transporting it has a 5+ invulnerable save against ranged attacks.’
	"type": "AURA",
	"warning": "If embarked, this applies to just the transport instead all units in an aura.",
	"radius": 9,
	"params": {
		"cond": {
			"type": "HAS_FACTION",
			"params": ["ork"] 
		},
		"type": "SET_STAT__SHOOT", 
		"params": { "field": "invuln", "val": 5 }
	}
}),
("orks", "too_tuff_for_deff", {
	-- This model has a 5+ invulnerable save. Each time this model would lose a wound, roll one D6: on a 5+, that wound is not lost.
	"type": "AND",
	"params": [
	 	{
	 		"type": "SET_STAT",
	 		"params": {"field": "invuln", "val": 5}
	 	},	
	 	{
	 		"type": "FNP",
	 		"params": 5
	 	},	
	]
}),
("orks", "breakin_heads", {
	-- If a GOFF unit fails a Morale test while it is within 3 of a friendly model with this ability, this model can restore order with a brutal display of violence. If they do so, the unit suffers D3 mortal wounds but the Morale test is then considered to have been passed.
	"type": "AURA",
	"radius": 3,
	"params": {
		"cond": {
			"type": "SHARE_SUBFACTION"
		},
		"type": "MORALE_EXECUTION",
		"params": "D3M"
	}
}),
("orks", "waaagh!", {
	-- Friendly GOFF INFANTRY units within 6 of this model at the start of the Charge phase can charge even if they Advanced this turn.
	"type": "AURA",
	"radius": 6,
	"params": {
		"cond": {
			"type": "AND",
			"params": [
				{
					"type": "SHARE_SUBFACTION"
				},
				{
					"type": "HAS_CATEGORY",
					"params": ["infantry"] 
				},
			]
		},
		"type": "ADVANCE_AND_CHARGE"
	}
}),
("orks", "foul_temper", {
	-- While this Warlord has fewer wounds remaining than its Wounds characteristic, add 3 to its Attacks characteristic.
	"type": "",
	"params":
}),
("orks", "musik", {
	-- At the start of each battle round, select one type of musik below for this model to perform until the end of that battle round. * Goffik Rokk: While a friendly GOFF INFANTRY unit is within 6 of this model, add 1 to the Strength characteristic of models in that unit. * Eavy Metal: While a friendly GOFF INFANTRY unit with the No Mukkin About kultur is within 6 of this model, the additional hit as a result of that ability is generated on an unmodified roll of a 5+ instead of a 6.
	"type": "",
	"params":
}),
("orks", "keepin_order", {
	-- Roll a D6 for each model that flees from a GOFF unit that is within 3 of any friendly GOFF units with this ability when the Morale test is taken. On a 6, that model does not flee.
	"type": "AURA",
	"radius": 3,
	"params": {
		"cond": {
			"type": "SHARE_SUBFACTION"
		}
		"type": "MORALE_FNP",
		"params": 6
	} 
}),
("orks", "grukks_meanest_ladz", {
	-- While this unit is within 6 of a friendly GRUKK FACE-RIPPA model, add 1 to the Attacks characteristics of each NOBZ model in this unit.
	"type": "MODEL_SPECIFIC"
}),
("orks", "mega_charge", {
	-- Each time a charge roll is made for this unit, roll one additional D6 and discard one.
	"type": "CHARGE_REROLL",
	"subType": "ONE_DIE"
}),
("orks", "gorks_one", {
	-- Add 1 to hit rolls and wound rolls for attacks made by your Warlord in the Fight phase.
	"type": "AND",
	"params": [
	 	{
	 		"type": "HIT",
	 		"subType": "FIGHT",
	 		"params": 1
	 	},	
	 	{
	 		"type": "WOUND",
	 		"subType": "FIGHT",
	 		"params": 1
	 	},	
	]
}),
("orks", "morks_one", {
	-- Add 1 to wound rolls for shooting attacks made by your Warlord. 
	"type": "WOUND",
	"subType": "SHOOT",
	"params": 1
}),
("orks", "dread_mek", {}),
	-- Model with the Big Mekaniak ability only. When your Warlord uses its Big Mekaniak ability to repair a DREAD WAAAGH! unit, add 1 to the number of wounds regained
("orks", "back_seat_driver", {}),
	-- While your Warlord is embarked within a BLITZ BRIGADE TRANSPORT, add 1 to that transport’s Move characteristic. In addition, while your Warlord is embarked within it, that transport gains the ’Ere We Go ability.
("orks", "goffs___da_lucky_stikk", {
	-- The bearer can re-roll any hit and wound rolls in the fight phase. In addition any friendly Goff characters within 6 of the bearer can add 1 to their hit rolls in the fight phase.
	"type": "AND",
	"params": [
	 	{
	 		"type": "HIT_REROLL",
	 		"subType": "FIGHT",
	 	},	
	 	{
	 		"type": "WOUND_REROLL",
	 		"subType": "FIGHT",
	 	},	
	 	{
			"type": "AURA",
			"radius": 6,
			"params": {
				"cond": {
					"type": "AND",
					"params": [
					 	{"type": "SHARE_SUBFACTION"},
					 	{
					 		"type": "HAS_CATEGORY",
					 		"params": ["character"]
					 	}
					]
				},
				"type": "HIT", 
		 		"subType": "FIGHT",
				"params": 1
			}
		}
	]
}),
("orks", "rezmekkas_redder_armour", {}),
	-- Add 1 to the Move characteristic of a TRANSPORT while the bearer is embarked within it. In addition, if the bearer is embarked, then at the start of your Movement phase roll a D6 for each enemy unit within 1 of the TRANSPORT the bearer is embarked upon. On a 4+ that unit suffers D3 mortal wounds.
("orks", "da_fixer_upperz", {
	-- DEATHSKULLS model only. The bearer gains the Big Mekaniak ability. If the bearer already has the Big Mekaniak ability, the target of the ability regains 3 lost wounds instead of D3 each time it is used.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "the_badskull_banner", {
	-- You can activate this once per battle at the start of your morale phase, if you do so then for the rest of this morale phase all friendly Freebootas units automatically pass morale tests.
	"type": "ACTION",
	"subType": "BATTLE",
	"params": 7 
}),
("orks", "super_cybork_body", {
	-- Each time the bearer loses a wound, roll a d6; on a roll of 5+ that wound is not lost. You cannot make a Dokks Tools roll for this model if you do so.
	"type": "FNP",
	"warning": "Restricts Dokk's Tools use if used."
	"params": 5 
}),
("orks", "scorched_gitbonez", {}),
	-- Psyker only. You can add 1 to psychic tests by the bearer manifesting powers from the Power of the WAAAAGH! discipline.
("orks", "skargrim’s__snazztrike", {
	-- DEFFKILLA WARTRIKE only. Add 1 to the bearer’s Toughness characteristic. In addition, the bearer gains a 5+ invulnerable save.
	"type": "AND",
	"params": [
	 	{
	 		"type": "ADD_STAT",
	 		"params": { "field": "toughness", "val": 1 }
	 	},	
	 	{
	 		"type": "SET_STAT",
	 		"params": { "field": "invuln", "val": 5 }
	 	},	
	]
}),
("orks", "da_blitzshouta", {
	-- At the start of your Shooting phase, if the bearer is embarked within a BLITZ BRIGADE BATTLEWAGON, pick an enemy unit that is visible to that BATTLEWAGON. Until the end of the phase, re-roll hit rolls of 1 for attacks made by friendly BLITZ BRIGADE units within 6 of that BATTLEWAGON that target the enemy unit you picked.
	"type": "ACTION",
	"params": 4
}),
("orks", "tezdreks_stompa_power_field", {
	-- The bearer has a 5+ invulnerable save.
	"type": "SET_STAT",
	"params": { "field": "invuln", "val": 5 }
}),
("orks", "stompa_mob", {
	-- Use this Stratagem when choosing your army. Pick an ORK Super-heavy Detachment from your army to be a Stompa Mob Specialist Detachment. STOMPA units in that Detachment gain the STOMPA MOB keyword. In addition, you can pick one model in that Stompa Mob Specialist Detachment to gain the CHARACTER keyword. However, the only Warlord Trait it can be given is either Gork’s One or Mork’s One (see right) and the only relic it can take is Tezdrek’s Stompa Power Field (see right).
	"type": "BATTLEFORGED_MOD"
}),
("orks", "kult_of_speed", {
	-- Use this Stratagem when choosing your army. Pick an ORK Detachment from your army to be a Kult of Speed Specialist Detachment. SPEED FREEKS in that Detachment gain the KULT OF SPEED keyword.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "dread_waaagh!", {
	-- Use this Stratagem when choosing your army. Pick an ORK Detachment from your army to be a Dread Waaagh! Specialist Detachment. BIG MEKS, GORKANAUTS, MORKANAUTS, DEFF DREADS and KILLA KANS in that Detachment gain the DREAD WAAAGH! keyword.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "blitz_brigade", {
	-- Use this Stratagem when choosing your army. Pick an ORK Detachment from your army to be a Blitz Brigade Specialist Detachment. WARBOSSES, BATTLEWAGONS, GUNWAGONS and BONEBREAKA units in that Detachment gain the BLITZ BRIGADE keyword.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "squig_hide_tyres", {
	-- SPEED FREEKS (excluding named characters and units that can FLY), BATTLEWAGON , GUNWAGON , BONEBREAKA or TRUKK unit only. Add 2 to the unit’s Move characteristic.
	"type": "ADD_STAT",
	"params": { "field": "move", "val": 2 }
}),
("orks", "souped_up_speshul", {
	-- BOOMDAKKA SNAZZWAGON unit only. Souped-up Speshul replaces the unit’s mek speshul.
	"type": "BATTLEFORGED_MOD"
}),
("orks", "gyroscopic_whirligig", {
	-- SHOKKJUMP DRAGSTA unit only. You can use this unit’s Shokk Tunnel ability when Advancing, even if you did not roll a 4+. In addition, this unit does not suffer any mortal wounds as a result of the Shokk Tunnel ability.
	"type": "",
	"params":
}),
("orks", "sizzly_rivets", {
	-- KUSTOM BOOSTA BLASTA unit only. When resolving an attack made with a rivet kannon by a model in this unit, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to any other damage. 
	"type": "",
	"params":
}),
("orks", "korkscrew", {
	-- MEGATRAKK SCRAPJET unit only. The first time this unit finishes a consolidation move in each Fight phase, it can immediately fight again.
	"type": "",
	"params":
}),
("orks", "nitro_powered_squigs", {
	-- RUKKATRUKK SQUIGBUGGY unit only. When resolving an attack made by this unit’s squig launcha or heavy squig launcha, add 1 to the wound roll.
	"type": "",
	"params":
}),
("orks", "gorks_roar", {
	-- DEFFKILLA WARTRIKE model only. Add 4 to the Range characteristic of this model’s killa jet and change the Type characteristic of its burna profile to Assault 6.
	"type": "",
	"params":
}),
("orks", "da_boomer", {
	-- BATTLEWAGON , BONEBREAKA or GUNWAGON model with killkannon only. Da Boomer replaces a killkannon and has the following profile:
	"type": "",
	"params":
}),
("orks", "zagzap", {
	-- BATTLEWAGON , BONEBREAKA or GUNWAGON model with zzap gun only. Zagzap replaces a zzap gun and has the following profile:
	"type": "",
	"params":
}),
("orks", "forktress", {
	-- BATTLEWAGON , BONEBREAKA or GUNWAGON model only. The model has a Save characteristic of 3+ and a 5+ invulnerable save.
	"type": "",
	"params":
}),
("orks", "pincha", {
	-- Model with grabbin’ klaw only. Pincha replaces the model’s grabbin’ klaw and has the following profile:
	"type": "",
	"params":
}),
("orks", "red_rolla", {
	-- BONEBREAKA model only. Replace the model’s Bonebreaka Ram ability with the following: ‘Red Rolla: When this model makes a charge move, add 6 to its Attacks characteristic until the end of the turn.
	"type": "",
	"params":
}),
("orks", "orkymatic_pistons", {
	-- KILLA KANS, DEFF DREADS, MORKANAUT or GORKANAUT unit only. Add 3 to the unit’s Move characteristic. You can re-roll Advance rolls made for the unit.
	"type": "",
	"params":
}),
("orks", "sparkly_bitz", {
	-- KILLA KANS, DEFF DREADS, MORKANAUT or GORKANAUT unit only. Improve the unit’s Ballistic Skill characteristic by 1 (e.g. a Ballistic Skill characteristic of 5+ becomes 4+).
	"type": "",
	"params":
}),
("orks", "dirty_gubbinz", {
	-- KILLA KANS or DEFF DREADS unit only. When resolving an attack made with a ranged weapon against this unit, subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("orks", "slug_gubbin", {
	-- GORKANAUT model only. Slug gubbin replaces the model’s deffstorm mega-shoota and has the following profile:
	"type": "",
	"params":
}),
("orks", "gog_klaw", {
	-- GORKANAUT or MORKANAUT model only. When rolling to determine the Damage characteristic of the crush profile of the bearer’s klaw of gork (or possibly mork), rolls of less than 4 count as 4.
	"type": "",
	"params":
}),
("orks", "blitza_gatler", {
	-- STOMPA only. The model’s supa-gatler has a Damage characteristic of 2. In addition, when rolling for the weapon’s Psycho-dakka-blasta ability, you can re-roll the D6 once per phase.
	"type": "",
	"params":
}),
("orks", "ere_we_go!", {
	-- You can re-roll charge rolls for this unit.  When doing so, you can re-roll all or any of the dice.
	"type": "CHARGE_REROLL"
}),
("orks", "mob_rule", {
	-- When using the Leadership characteristic of this unit, you can use either its own Leadership characteristic, or you can choose for the characteristic to be equal to either the number of models in the unit, or the number of models in another friendly unit within 6 that has this ability.
	"type": "",
	"params":
}),
("orks", "crash_and_burn", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield.  On a 6 it crashes and explodes, and each unit within 6 suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("orks", "dakka_dakka_dakka", {
	-- Each time you roll an unmodified hit roll of 6 for an attack with a ranged weapon by a model in this unit, that hit roll succeeds regardless of modifiers.
	"type": "AND",
	"params": [
		{
			"type": "AUTOHIT",
	 		"subType": "SHOOT",
			"params": [6]
		},
		{
			"type": "EXPLODING_HIT",
	 		"subType": "SHOOT",
			"params": [6]
		}
	]
}),
("orks", "speed_mob", {
	-- The first time this unit sets up on the battlefield, all of its models must be placed within 6 of at least one other  model from the unit.  From that point onwards each model operates independently and is treated as a separate unit for all rules purposes.
	"type": "",
	"params":
}),
("orks", "grots", {
	-- Units comprised entirely of GRETCHIN cannot benefit from any Clan Kultur.  In addition, Ork Stratagems can only be used on these units if the Stratagem explicitly states so (e.g. the Grot Shields Stratagem)
	"type": "",
	"params":
}),
("orks", "gunz_for_hire", {
	-- FLASHGITZ units (including Kaptin Badrukk) can be included in an ORK detachment without preventing other units in that Detachment from gaining a Clan Kulture.  Note, howerever, that the FLASHGITZ units do not themselves benefit from any Clan Kultur unless the Clan Kultur selected for the Detachment is the FREEBOOTERZ Clan Kultur.
	"type": "",
	"params":
}),
("orks", "biker_doks_tools", {
	-- When a <CLAN> INFANTRY or <CLAN> BIKER model would lose a wound within 3 of any friendly <CLAN> PAINBOYS, roll one D6; on a 6, that wound is not lost.
	"type": "",
	"params":
}),
("orks", "open_topped", {
	-- Models embarked on this model can attack in their Shooting phase. Measure the range and draw line of sight from any point on this model.  When they do so, any restrictions or modifiers that apply to this model also apply to its passengers. For example, the passengers cannot shoot if this model has Fallen Back in the same turn. While this transport is within Engagement Range of any enemy units, embarked units cannot shoot, except with any Pistols they are equipped with.
	"type": "OPEN_TOPPED"
}),
("orks", "supersonic", {
	-- Each time this model moves, first pivot it on the spot up to 90 degrees (this does not contribute to how far the model moves), and then move the model straight forwards, Note that it cannot pivot again after the initial pivot.  when the model Advances, increase its Move characteristic by 20 until the end of the phase - do not roll a dice.
	"type": "",
	"params":
}),
("orks", "artillery", {
	-- An Artillery model can only fire its ranged weapon if a friendly Grot Gunner unit is within 3.  A single Grot Gunner cannot operate multiple artillery models in a single turn.  If all of the Grot Gunners within 6 of a Big Gun are slain, it immediately shuts down and is removed from play.
	"type": "",
	"params":
}),
("orks", "mekaniak", {
	-- At the end of your Movement phase, this model can repair a single friendly <CLAN> VEHICLE within 1.  That model regains 1 wound lost earlier in the battle.  A vehicle can only be repaired once each turn.
	"type": "",
	"params":
}),
("orks", "big_mekaniak", {
	-- At the end of your Movement phase, this model can repair a single friendly (CLAN) Vehicle  model within 3. That model regains D3 lost wounds. A model can only be repaired once per turn.
	"type": "",
	"params":
}),
("orks", "big_bike_mekaniak", {
	-- At the end of your Movement phase, if it didnt move more than 6, this model can repair a single friendly (Clan); VEHICLE (other than models that can FLY) within 1.  That model regains D3 wounds lost earlier in the battle.  A vehicle can only be repaired once each turn.
	"type": "",
	"params":
}),
("orks", "waaagh!_(biker)", {
	-- Friendly Ork Infantry and Biker units within 6 of this model at the start of the Charge phase can charge even if they Advanced this turn.
	"type": "",
	"params":
}),
("orks", "throat_slittas", {
	-- Add 1 to wound rolls for attacks made with this units melee weapons when targeting enemy units wholly within or on a terrain feature.
	"type": "WOUND__FIGHT",
	"cond": {
		"type": "IN_COVER",
		"target": "ENEMY"
	},
	"warning": "Applies to units in any terrain feature, not just those that give cover.",
	"params": 1
}),
("orks", "explodes_(4+/d6/d3)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 4+ it explodes, and each unit within D6 suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("orks", "explodes_(4+/6/d6)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 4+ it explodes, and each unit within 6 suffers D6 mortal wounds.
	"type": "",
	"params":
}),
("orks", "speed_freek", {
	-- Your warlord and any Evil Sunz unit within 6 of him can charge even if they fell back this turn.
	"type": "",
	"params":
}),
("orks", "proper_killy", {
	-- Add 1 to your Warlord’s Attacks characteristic. In addition, improve the Armour Penetration characteristic of melee weapons this Warlord is equipped with by 1 during any turn in which they made a charge move, were charged, or performed a Heroic Intervention (e.g. AP -1 becomes AP -2).’
	"type": "",
	"params":
}),
("orks", "opportunist", {
	-- Each time you select a target for a weapon this Warlord is making an attack with, you can ignore the Look Out, Sir rule, if the target is within 18.
	"type": "",
	"params":
}),
("orks", "killa_reputation", {
	-- Re-roll 1s to hit in the fight phase for friendly Freebootas while they are within 6 of your warlord.
	"type": "",
	"params":
}),
("orks", "ive_got_a_plan,_ladz!", {
	-- If you use a Stratagem roll 1 die for each command point. If you roll a 6 the command point is immediately refunded.
	"type": "",
	"params":
}),
("orks", "big_red_button", {
	-- Once per battle, at the start of the Shooting phase, the driver of the Looted Vehicle can hit the inviting and mysterious red button mounted on his dashboard. When he does, roll a D3 on the table below to see what happens.
	"type": "",
	"params":
}),
("orks", "speedwaaagh!", {
	-- Friendly <CLAN> BIKER and VEHICLE units within 6 of this model at the start of the Charge phase can charge even if they Advanced this turn.
	"type": "",
	"params":
}),
("orks", "ramshackle", {
	-- Roll a D6 each time this model suffers damage from an attack that has a Damage characteristic of more than 1.  On a roll of 6, reduce the damage caused by the Attack to 1.
	"type": "DMG_MAX_ROLL",
	"params": {"max": 1, "threshold": 6}
}),
("orks", "small_bomms", {
	-- Twice per battle, in your Movement phase, after this model makes a Normal Move or Advances, you can select one enemy unit this model moved across as part of that move. If you do, roll one D6 for each model in that unit (to a maximum of 10 dice): for each 5+, that unit suffers 1 mortal wound.
	"type": "",
	"params":
}),
("orks", "scoutin_ahead", {
	-- During deployment, you can set up a unit of Deffkoptas behind enemy lines instead of placing it on the battlefield.  At the end of any of your Movement phases, the Deffkoptas can swoop around to ambush the foe - set them up anywhere on the battlefield that is more than 9 away from any enemy models and within 14 of a battlefield edge.
	"type": "",
	"params":
}),
