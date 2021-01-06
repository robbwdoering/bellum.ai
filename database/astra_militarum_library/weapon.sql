INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("astra_militarum_library", "artillery_barrage",	-2,	"D3",	"100",	"8",	"Heavy",	"D6",{
	-- Blast. This weapon can only be fired once per battle, and cannot be used if the bearer moves. This weapon can target units that are not visible to the bearer (when doing so, subtract 1 from the hit rolls). You may only use one artillery barrage per turn, regardless of how many Masters of Ordnance you have in your army.
	"type": "",
	"params":
}),
("astra_militarum_library", "vanquisher_battle_cannon",	-3,	"D6",	"72",	"8",	"Heavy",	"1",{
	-- Roll two dice when inflicting damage with this weapon and discard the lowest result.
	"type": "",
	"params":
}),
("astra_militarum_library", "exterminator_autocannon",	-1,	"2",	"48",	"7",	"Heavy",	"4",{}),
("astra_militarum_library", "executioner_plasma_cannon___standard",	-3,	"1",	"36",	"7",	"Heavy",	"D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "executioner_plasma_cannon___supercharge",	-3,	"2",	"36",	"8",	"Heavy",	"D6",{
	-- Blast. Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, the bearer suffers 1 mortal wound after all of this weapons shots have been resolved.
	"type": "",
	"params":
}),
("astra_militarum_library", "eradicator_nova_cannon",	-2,	"D3",	"36",	"6",	"Heavy",	"D6",{
	-- Blast. Units attacked by this weapon do not gain any bonus to their saving throws for being in cover.
	"type": "",
	"params":
}),
("astra_militarum_library", "stormsword_siege_cannon",	-4,	"D6",	"36",	"10",	"Heavy",	"2D6",{
	-- Blast. Units attacked by this weapon do not gain any bonus to their saving throws for being in cover. Re-roll damage rolls of 1 for this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "adamantium_tracks",	-2,	"D3",	"0",	"User",	"Melee",	"1",{}),
("astra_militarum_library", "volcano_cannon",	-5,	"2D6",	"120",	"16",	"Heavy",	"3D3",{
	-- Blast. You can re-roll failed wound rolls when targeting TITANIC units with this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "hydra_quad_autocannon",	-1,	"2",	"72",	"7",	"Heavy",	"8",{
	-- Add 1 to all hit rolls made for this weapon against targets that can FLY.  Subtract 1 from the hit rolls made for this weapon against all other targets.
	"type": "",
	"params":
}),
("astra_militarum_library", "inferno_cannon",	-1,	"1",	"16",	"6",	"Heavy",	"2D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("astra_militarum_library", "artemia_inferno_cannon",	-1,	"2",	"16",	"6",	"Heavy",	"2D3",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("astra_militarum_library", "chem_cannon",	-3,	"1",	"8",	"*",	"Heavy",	"D6",{
	-- This weapon automatically hits its target. In addition, it wounds on a 2+, unless it is targeting a VEHICLE, in which case it wounds on a 6+.
	"type": "",
	"params":
}),
("astra_militarum_library", "melta_cannon",	-4,	"D6",	"24",	"8",	"Assault",	"D3",{
	-- Blast.  Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("astra_militarum_library", "earthshaker_cannon",	-3,	"D3",	"240",	"9",	"Heavy",	"D6",{
	-- Blast. Roll two dice for the number of attacks when firing this weapon and discard the lowest result.  This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("astra_militarum_library", "baneblade_cannon",	-3,	"3",	"72",	"9",	"Heavy",	"3D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "avenger_bolt_cannon",	-2,	"2",	"36",	"6",	"Heavy",	"10",{}),
("astra_militarum_library", "cyclops_demolition_charge",	-2,	"D3",	"6",	"9",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("astra_militarum_library", "long_barrelled_autocannon",	-1,	"D3",	"72",	"7",	"Heavy",	"2",{}),
("astra_militarum_library", "tarantula_twin_heavy_bolter",	-1,	"2",	"36",	"5",	"Heavy",	"6",{}),
("astra_militarum_library", "tarantula_twin_lascannon",	-3,	"D6",	"48",	"9",	"Heavy",	"2",{}),
("astra_militarum_library", "tauros_grenade_launcher___krak",	-1,	"D3",	"36",	"6",	"Assault",	"2",{}),
("astra_militarum_library", "tauros_grenade_launcher___frag",	0,	"1",	"36",	"3",	"Assault",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("astra_militarum_library", "twin_multi_laser",	0,	"1",	"36",	"6",	"Heavy",	"6",{}),
("astra_militarum_library", "thunderbolt_hellstrike_rack",	-2,	"D6+2",	"72",	"8",	"Heavy",	"2",{}),
("astra_militarum_library", "thunderbolt_nose_autocannons",	-1,	"2",	"48",	"7",	"Heavy",	"8",{}),
("astra_militarum_library", "thunderbolt_twin_lascannon",	-3,	"D6",	"48",	"9",	"Heavy",	"2",{}),
("astra_militarum_library", "vendetta_hellstrike_rack",	-2,	"D6+2",	"72",	"8",	"Heavy",	"2",{}),
("astra_militarum_library", "vulture_hellstrike_rack",	-2,	"D6+2",	"72",	"8",	"Heavy",	"2",{}),
("astra_militarum_library", "vulture_gatling_cannon",	0,	"1",	"24",	"5",	"Heavy",	"20",{}),
("astra_militarum_library", "medusa_siege_cannon",	-3,	"D6",	"36",	"10",	"Heavy",	"D6",{
	-- Blast. This weapon can target units not visible to the bearer.
	"type": "",
	"params":
}),
("astra_militarum_library", "colossus_siege_mortar",	-2,	"D3",	"240",	"6",	"Heavy",	"3D3",{
	-- Blast. This weapon can target units that are not visible to the bearer. Each time an attack is made with this weapon, the target does not receive the benefits of cover against that attack.
	"type": "",
	"params":
}),
("astra_militarum_library", "melta_cutter_drill",	-4,	"3",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon against a BUILDING, that attack automatically hits the target. Each time an attack made with this weapon targets a VEHICLE unit, that attack has a Damage characteristic of 6.
	"type": "",
	"params":
}),
("astra_militarum_library", "heavy_mortar",	-1,	"2",	"48",	"6",	"Heavy",	"D6",{
	-- Blast. This weapon can target units not visible to the bearer.
	"type": "",
	"params":
}),
("astra_militarum_library", "heavy_quad_launcher",	0,	"1",	"48",	"5",	"Heavy",	"4D6",{
	-- Blast. This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("astra_militarum_library", "laser_destroyer",	-4,	"D3+3",	"36",	"10",	"Heavy",	"3",{}),
("astra_militarum_library", "stormblade_plasma_blastgun_–_supercharge",	-4,	"4",	"72",	"10",	"Heavy",	"2D6",{
	-- Blast. Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, the bearer suffers 3 mortal wounds after shooting with this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "stormblade_plasma_blastgun_–_standard",	-4,	"3",	"72",	"9",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("astra_militarum_library", "stormblade_twin_heavy_bolter",	-1,	"2",	"36",	"5",	"Heavy",	"6",{}),
("astra_militarum_library", "gorgon_mortars",	-1,	"1",	"48",	"5",	"Heavy",	"2D6",{
	-- Blast. Each time an attack is made with this weapon, the target does not receive the benefit of cover to its saving throw.
	"type": "",
	"params":
}),
("astra_militarum_library", "twin_heavy_stubber",	0,	"1",	"36",	"4",	"Heavy",	"6",{}),
("astra_militarum_library", "griffon_heavy_mortar",	-1,	"2",	"48",	"6",	"Heavy",	"D6",{
	-- Blast. This weapon can target units that are not visible to the bearer. Each time an attack is made with this weapon, the target does not receive the benefit of cover to its saving throw.
	"type": "",
	"params":
}),
("astra_militarum_library", "macharius_twin_battle_cannon",	-2,	"D6",	"72",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("astra_militarum_library", "omega_pattern_plasma_blastgun_maximal_bolts",	-3,	"3",	"60",	"9",	"Heavy",	"2D6",{
	-- Blast. Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, the bearer suffers 1 mortal wound after shooting this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "omega_pattern_plasma_blastgun_pulsed_bolts",	-3,	"2",	"60",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("astra_militarum_library", "macharius_twin_vanquisher_cannon",	-4,	"9",	"72",	"16",	"Heavy",	"2",{
	-- Each time an attack is made with this weapon against a VEHICLE or MONSTER unit, add 1 to that attacks hit roll.
	"type": "",
	"params":
}),
("astra_militarum_library", "macharius_vulcan_mega_bolter",	-2,	"2",	"60",	"6",	"Heavy",	"16",{}),
("astra_militarum_library", "malcador_twin_lascannon",	-3,	"D6",	"48",	"9",	"Heavy",	"2",{}),
("astra_militarum_library", "inferno_gun",	-2,	"2",	"18",	"7",	"Heavy",	"3D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("astra_militarum_library", "stygies_laser_destroyer",	-4,	"D3+3",	"72",	"12",	"Heavy",	"2",{}),
("astra_militarum_library", "the_emperors_benediction",	-1,	"2",	"12",	"4",	"Pistol",	"3",{
	-- This weapon can target a Character even if it is not the closest enemy unit, unless the bearer is within 1 of an enemy unit.
	"type": "",
	"params":
}),
("astra_militarum_library", "the_blade_of_conquest",	-4,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("astra_militarum_library", "hammer_of_sunderance",	-2,	"3",	"72",	"8",	"Heavy",	"D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "relic_(9th_iotan_gorgonnes):_blessed_bolt_pistol",	-2,	"2",	"12",	"5",	"Pistol",	"2",{
	--  Each time you select a target for this weapon, you can ignore the Look Out, Sir rule. When resolving an attack made with this weapon against a PSYKER unit, this weapon has a Damage characteristic of 3 for that attack.
	"type": "",
	"params":
}),
("astra_militarum_library", "relic_(43rd_iotan_dragons):_emperors_fury_standard",	-3,	"1",	"12",	"7",	"Pistol",	"3",{
	-- “If any hit rolls of 1 are made for attacks with this weapon’s supercharge profile, the bearer is destroyed after shooting with this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "relic_(43rd_iotan_dragons):_emperors_fury_supercharge",	-3,	"2",	"12",	"8",	"Pistol",	"3",{
	-- “If any hit rolls of 1 are made for attacks with this weapon’s supercharge profile, the bearer is destroyed after shooting with this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "relic_(32nd_thetoid_eagles):_fire_of_judgement",	*,	"*",	"12",	"3",	"Pistol",	"2",{
	-- “When resolving an attack made with this weapon, a successful hit roll inflicts 1 mortal wound on the target and the attack sequence ends.
	"type": "",
	"params":
}),
("astra_militarum_library", "relic_(54th_psian_jackals):_the_hounds_teeth",	-2,	"2",	"0",	"+1",	"Melee",	"1",{
	-- “When the bearer fights, it makes 3 additional attacks with this weapon. When resolving an attack made with this weapon against an AELDARIunit, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("astra_militarum_library", "claw_of_the_desert_tigers",	-3,	"2",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 2 additional attacks with this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "mamorth_tuskblade",	-3,	"2",	"0",	"+2",	"Melee",	"1",{}),
("astra_militarum_library", "pietrovs_mk_45_",	-1,	"2",	"12",	"4",	"Pistol",	"2",{
	-- Friendly VALHALLAN units within 6 of the bearer can never lose more than one model as the result of any single failed Morale test.
	"type": "",
	"params":
}),
("astra_militarum_library", "minotaur_twin_earthshaker_cannon",	-3,	"D3",	"240",	"9",	"Heavy",	"2D3+3",{
	-- Blast. This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("astra_militarum_library", "stormhammer_cannon",	-3,	"2D3",	"60",	"9",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("astra_militarum_library", "twin_battle_cannon",	-2,	"D3",	"72",	"8",	"Heavy",	"2D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "sentinel_chainsaw",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("astra_militarum_library", "telepathica_stave",	0,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("astra_militarum_library", "tremor_cannon",	-2,	"3",	"60",	"8",	"Heavy",	"3D6",{
	-- Blast. If a unit is hit by this weapon, in their following Movement phase they must halve their Move characteristic and cannot Advance.
	"type": "",
	"params":
}),
("astra_militarum_library", "quake_cannon",	-4,	"D6",	"140",	"14",	"Heavy",	"2D6",{
	-- Blast. When rolling for this weapons damage, treat any rolls of 1 or 2 as 3 instead.
	"type": "",
	"params":
}),
("astra_militarum_library", "bullgryn_maul",	-1,	"2",	"0",	"+2",	"Melee",	"1",{}),
("astra_militarum_library", "grenadier_gauntlet",	0,	"1",	"12",	"4",	"Assault",	"D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "frag_bombs",	0,	"1",	"6",	"4",	"Grenade",	"D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "volkite_caliver",	0,	"2",	"30",	"5",	"Heavy",	"2",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of a 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("astra_militarum_library", "carnodon_twin_autocannon",	-1,	"2",	"48",	"7",	"Heavy",	"4",{}),
("astra_militarum_library", "carnodon_twin_lascannon",	-3,	"D6",	"48",	"9",	"Heavy",	"2",{}),
("astra_militarum_library", "carnodon_twin_multi_laser",	0,	"1",	"36",	"6",	"Heavy",	"6",{}),
("astra_militarum_library", "volkite_culverin",	0,	"2",	"45",	"6",	"Heavy",	"4",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of a 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("astra_militarum_library", "lasgun_array",	0,	"1",	"24",	"3",	"Rapid Fire",	"3",{
	-- This weapon can only be fired if a unit is embarked upon the vehicle equipped with it.
	"type": "",
	"params":
}),
("astra_militarum_library", "deathstrike_missile",	*,	"*",	"200",	"*",	"Heavy",	"3D6",{
	-- Blast. This weapon can only be fired once per battle. This weapon can target units that are not visible to the bearer.  Each time you hit the target with this weapon it suffers a mortal wound. After resolving all damage on the unit, roll a D6 for every other unit within 6 of the target unit - on a 4+ that unit also suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("astra_militarum_library", "dominus_triple_bombard_stationary",	-3,	"D6",	"60",	"10",	"Heavy",	"3D6",{
	-- Blast. This weapon can target units that are not visible to the bearer. You can only select the stationary bombardment profile if the bearer Remained Stationary in your previous Movement phase.
	"type": "",
	"params":
}),
("astra_militarum_library", "dominus_triple_bombard_mobile",	-2,	"D3",	"36",	"10",	"Heavy",	"2D6",{
	-- Blast. This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("astra_militarum_library", "magma_cannon",	-5,	"D6",	"60",	"10",	"Heavy",	"2D6",{
	-- Blast. If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("astra_militarum_library", "bale_eye",	-2,	"1",	"6",	"3",	"Pistol",	"1",{}),
("astra_militarum_library", "power_klaw",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("astra_militarum_library", "hellhammer_cannon",	-4,	"3",	"36",	"10",	"Heavy",	"3D6",{
	-- Blast. Units attacked by this weapon do not gain any bonus to their saving throws for being in cover.
	"type": "",
	"params":
}),
("astra_militarum_library", "hunting_lance",	-2,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- A model may only attack with this weapon on a turn in which it has charged.
	"type": "",
	"params":
}),
("astra_militarum_library", "stygies_vanquisher_battle_cannon",	-3,	"D3+3",	"72",	"8",	"Heavy",	"1",{}),
("astra_militarum_library", "storm_eagle_rockets",	-2,	"D3",	"120",	"10",	"Heavy",	"2D6",{
	-- Blast. This weapon can target units that are not visible to the bearer.  A model can only fire a single storm eagle rocket per turn.  Each storm eagle rocket can only be fired once per battle.
	"type": "",
	"params":
}),
("astra_militarum_library", "marauder_twin_lascannon",	-3,	"D6",	"48",	"9",	"Heavy",	"2",{}),
("astra_militarum_library", "marauder_twin_heavy_bolter",	-1,	"2",	"36",	"5",	"Heavy",	"6",{}),
("astra_militarum_library", "hellstrike_missile_rack",	-2,	"D6+2",	"72",	"8",	"Heavy",	"2",{}),
("astra_militarum_library", "marauder_nose_autocannons",	-1,	"2",	"48",	"7",	"Heavy",	"12",{}),
("astra_militarum_library", "marauder_twin_assault_cannon",	-1,	"1",	"24",	"6",	"Heavy",	"12",{}),
("astra_militarum_library", "huge_knife",	-1,	"2",	"0",	"User",	"Melee",	"1",{}),
("astra_militarum_library", "thunderous_headbutt",	-2,	"D3",	"0",	"+3",	"Melee",	"1",{
	-- Nork can only make a single thunderous headbutt attack each time he fights.
	"type": "",
	"params":
}),
("astra_militarum_library", "omnissan_axe",	-2,	"2",	"0",	"+1",	"Melee",	"1",{}),
("astra_militarum_library", "praetor_launcher_foehammer",	-2,	"D6",	"12-120",	"9",	"Heavy",	"2D6",{
	-- Blast. This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("astra_militarum_library", "praetor_launcher_firestorm",	-2,	"2",	"12-120",	"6",	"Heavy",	"3D6",{
	-- Blast. This weapon can target units that are not visible to the bearer. Each time an attack is made with this weapon, the target does not receive the benefits of cover against that attack.
	"type": "",
	"params":
}),
("astra_militarum_library", "force_stave",	-1,	"D3",	"0",	"+3",	"Melee",	"1",{}),
("astra_militarum_library", "trampling_hooves",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- After a model on its mount makes its close combat attacks, you can attack with its mount.  Make 1 additional attack, using this weapon profile.
	"type": "",
	"params":
}),
("astra_militarum_library", "demolition_charge",	-3,	"D3",	"6",	"8",	"Grenade",	"D6",{
	-- This weapon can only be fired once per battle.
	"type": "",
	"params":
}),
("astra_militarum_library", "ripper_gun_(shooting)",	0,	"1",	"12",	"5",	"Assault",	"3",{}),
("astra_militarum_library", "ripper_gun_(melee)",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("astra_militarum_library", "grenade_launcher_(frag)",	0,	"1",	"24",	"3",	"Assault",	"D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "grenade_launcher_(krak)",	-1,	"D3",	"24",	"6",	"Assault",	"1",{}),
("astra_militarum_library", "stub_pistol",	0,	"1",	"9",	"4",	"Pistol",	"1",{}),
("astra_militarum_library", "powerlifter",	-2,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 2 additional attacks with this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "servo_arm",	-2,	"3",	"0",	"X2",	"Melee",	"1",{
	-- Each servo-arm can only be used to make one attack each time this model fights. When a model attacks with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("astra_militarum_library", "evanfall",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("astra_militarum_library", "penance",	-1,	"1",	"12",	"4",	"Pistol",	"1",{}),
("astra_militarum_library", "hull_mounted_vulcan_mega_bolter",	-2,	"2",	"60",	"6",	"Heavy",	"20",{}),
("astra_militarum_library", "valdor_neutron_laser",	-3,	"D6",	"48",	"12",	"Heavy",	"3",{
	-- Each time an attack made with this weapon is allocated to a model, if the bearer Remained Stationary in your previous Movement phase, that attack has a Damage characteristic of 6.
	"type": "",
	"params":
}),
("astra_militarum_library", "wyrdvane_stave",	0,	"1",	"0",	"+1",	"Melee",	"1",{}),
("astra_militarum_library", "wyvern_quad_stormshard_mortar",	0,	"1",	"48",	"4",	"Heavy",	"4D6",{
	-- Blast. This weapon can target units not visible to the bearer.  You can re-roll failed wound rolls for this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "lightning_hellstrike_rack",	-2,	"D6+2",	"72",	"8",	"Heavy",	"2",{}),
("astra_militarum_library", "vendetta_twin_lascannon",	-3,	"D6",	"72",	"9",	"Heavy",	"2",{}),
("astra_militarum_library", "breacher_charge",	-3,	"D3",	"6",	"8",	"Grenade",	"D6",{
	-- Blast. The bearer can only shoot with each breacher charge it is equipped with once per battle.
	"type": "",
	"params":
}),
("astra_militarum_library", "lascutter",	-3,	"D3",	"0",	"9",	"Melee",	"1",{
	-- Each time the bearer fights, it can make no more than 1 attack with this weapon.
	"type": "",
	"params":
}),
("astra_militarum_library", "mortar",	0,	"1",	"48",	"4",	"Heavy",	"D6",{
	-- Blast. This weapon can target units that are not visible to the firer.
	"type": "",
	"params":
}),
("astra_militarum_library", "hellstrike_missile",	-2,	"D6",	"72",	"8",	"Heavy",	"1",{
	-- Roll two dice when inflicting damage with this weapon and discard the lowest result.
	"type": "",
	"params":
}),
("astra_militarum_library", "hellfury_missiles",	0,	"1",	"72",	"4",	"Heavy",	"2D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "skystrike_missile",	-2,	"D3",	"60",	"7",	"Heavy",	"1",{
	-- Add 1 to all to hit rolls for this weapon against targets that can FLY. Subtract 1 from to hit rolls against all other targets.
	"type": "",
	"params":
}),
("astra_militarum_library", "multiple_rocket_pod",	-1,	"1",	"36",	"5",	"Assault",	"D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum_library", "hot_shot_volley_gun",	-2,	"1",	"24",	"4",	"Heavy",	"4",{}),
