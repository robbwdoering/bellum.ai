INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("imperial_knights", "reaper_chainsword",	-3,	"6",	"0",	"+6",	"Melee",	"1",{}),
("imperial_knights", "thunderstrike_gauntlet",	-4,	"6",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll. If a VEHICLE or MONSTER is slain by this weapon, pick an enemy unit within 9 of the bearer and roll a D6. On a 4+ that unit suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("imperial_knights", "titanic_feet",	-2,	"D3",	"0",	"User",	"Melee",	"1",{
	-- Make 3 hit rolls for each attack made with this weapon, instead of 1.
	"type": "",
	"params":
}),
("imperial_knights", "avenger_gatling_cannon",	-2,	"2",	"36",	"6",	"Heavy",	"12",{}),
("imperial_knights", "ironstorm_missile_pod",	-1,	"2",	"72",	"5",	"Heavy",	"D6",{
	-- This weapon can target units that are not visible to the bearer. Blast.
	"type": "",
	"params":
}),
("imperial_knights", "rapid_fire_battle_cannon",	-2,	"D3",	"72",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "stormspear_rocket_pod",	-2,	"D6",	"48",	"8",	"Heavy",	"3",{}),
("imperial_knights", "thermal_cannon",	-4,	"D6",	"36",	"9",	"Heavy",	"D6",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result. Blast.
	"type": "",
	"params":
}),
("imperial_knights", "twin_icarus_autocannon",	-1,	"2",	"48",	"7",	"Heavy",	"4",{
	-- Add 1 to all hit rolls made for this weapon against targets that can FLY. Subtract 1 from the hit rolls made for this weapon against all other targets.
	"type": "",
	"params":
}),
("imperial_knights", "atrapos_lascutter_(melee___focus)",	-4,	"6",	"0",	"12",	"Melee",	"1",{
	-- Each time an attack is made with this weapon against a VEHICLE or MONSTER unit, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("imperial_knights", "atrapos_lascutter_(shooting)",	-4,	"6",	"9",	"12",	"Heavy",	"1",{
	-- Each time an attack is made with this weapon against a VEHICLE or MONSTER unit, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("imperial_knights", "atrapos_lascutter_(melee___sweep)",	-2,	"3",	"0",	"6",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("imperial_knights", "graviton_singularity_cannon_(singularity)",	-4,	"3",	"36",	"14",	"Heavy",	"D6+4",{
	-- Each time you select this profile to shoot with roll one D6; on a 1-3, the bearer suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("imperial_knights", "graviton_singularity_cannon_(contained)",	-3,	"3",	"36",	"8",	"Heavy",	"4",{}),
("imperial_knights", "cerastus_shock_lance_(melee___standard)",	-4,	"6",	"0",	"+6",	"Melee",	"1",{}),
("imperial_knights", "cerastus_shock_lance_(shooting)",	-1,	"D3",	"18",	"6",	"Heavy",	"6",{}),
("imperial_knights", "cerastus_shock_lance_(melee___charged)",	-4,	"8",	"0",	"x2",	"Melee",	"1",{
	-- You can only select the Charged profile if this model made a charge move this turn.
	"type": "",
	"params":
}),
("imperial_knights", "hekaton_siege_claw_(smash)",	-2,	"3",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("imperial_knights", "hekaton_siege_claw_(crush)",	-4,	"6",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, subtract 1 from that attacks hit roll. Each time an attack is made with this weapon, if that attack targets a VEHICLE or MONSTER unit, add 2 to the Damage characteristic.
	"type": "",
	"params":
}),
("imperial_knights", "reaper_chainfist_(sweep)",	-2,	"D3",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("imperial_knights", "reaper_chainfist_(saw)",	-4,	"6",	"0",	"x2",	"Melee",	"1",{}),
("imperial_knights", "tempest_warblade",	-3,	"3",	"0",	"+6",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 2 hit rolls instead of 1.
	"type": "",
	"params":
}),
("imperial_knights", "acheron_flame_cannon",	-2,	"3",	"18",	"7",	"Heavy",	"2D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("imperial_knights", "acastus_autocannon",	-1,	"2",	"48",	"7",	"Heavy",	"2",{}),
("imperial_knights", "castigator_bolt_cannon",	-2,	"2",	"36",	"6",	"Heavy",	"16",{}),
("imperial_knights", "graviton_crusher",	-3,	"2",	"18",	"6",	"Heavy",	"D3",{
	-- Each time an attack made with this weapon is allocated to a model with a Save characteristic of 3+ or better, that attack has a Damage characteristic of 3.
	"type": "",
	"params":
}),
("imperial_knights", "helios_defence_missiles",	-2,	"3",	"60",	"8",	"Heavy",	"2",{
	-- Each time an attack is made with this weapon against an AIRCRAFT unit, add 1 to that attacks hit roll.
	"type": "",
	"params":
}),
("imperial_knights", "acastus_lascannon",	-3,	"D6",	"48",	"9",	"Heavy",	"1",{}),
("imperial_knights", "lightning_cannon",	-2,	"3",	"48",	"7",	"Heavy",	"8",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.	
	"type": "",
	"params":
}),
("imperial_knights", "phased_plasma_fusil",	-3,	"2",	"24",	"7",	"Rapid Fire",	"2",{}),
("imperial_knights", "acheron_twin_heavy_bolter",	-1,	"2",	"36",	"5",	"Heavy",	"6",{}),
("imperial_knights", "twin_magna_lascannon",	-3,	"6",	"72",	"12",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "twin_rad_cleanser",	0,	"3",	"12",	"2",	"Assault",	"2D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target. Each time an attack is made with this weapon, a wound roll of 2+ is always successful, unless the target is a VEHICLE or TITANIC unit.
	"type": "",
	"params":
}),
("imperial_knights", "volkite_chieorovile",	-3,	"D6",	"45",	"8",	"Heavy",	"5",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 2 mortal wounds on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("imperial_knights", "reaper_chain_cleaver_(strike)",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("imperial_knights", "reaper_chain_cleaver_(sweep)",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Make 2 hit rolls for each attack made with this weapon, instead of 1.
	"type": "",
	"params":
}),
("imperial_knights", "thermal_spear",	-4,	"D6",	"30",	"8",	"Assault",	"D3",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result. Blast.
	"type": "",
	"params":
}),
("imperial_knights", "armiger_autocannon",	-1,	"3",	"60",	"7",	"Heavy",	"2D3",{}),
("imperial_knights", "multi_laser",	0,	"1",	"36",	"6",	"Heavy",	"3",{}),
("imperial_knights", "las_impulsor_(low_intensity)",	-2,	"D3",	"36",	"6",	"Heavy",	"2D6",{}),
("imperial_knights", "las_impulsor_(high_intensity)",	-4,	"D6",	"18",	"12",	"Heavy",	"D6",{}),
("imperial_knights", "plasma_decimator_(supercharge)",	-3,	"2",	"48",	"8",	"Heavy",	"2D6",{
	-- Blast. Each time an unmodified hit roll of 1 is made for an attack with this weapon, the bearer suffers 1 mortal wound after shooting with this weapon.
	"type": "",
	"params":
}),
("imperial_knights", "plasma_decimator_(standard)",	-3,	"1",	"48",	"7",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "twin_siegebreaker_cannon",	-1,	"D3",	"48",	"7",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "twin_meltagun",	-4,	"D6",	"12",	"8",	"Assault",	"2",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("imperial_knights", "shieldbreaker_missile",	-4,	"D6",	"48",	"10",	"Heavy",	"1",{
	-- Each shieldbreaker missile can only be fired once per battle, and a model can only fire one each turn.  Invulnerable saving throws cannot be made against wounds caused by this weapon.
	"type": "",
	"params":
}),
("imperial_knights", "volcano_lance",	-5,	"3D3",	"80",	"14",	"Heavy",	"D6",{
	-- You can re-roll failed wound rolls when targeting TITANIC units with this weapon. Blast.
	"type": "",
	"params":
}),
("imperial_knights", "thundercoil_harpoon",	-6,	"10",	"12",	"16",	"Heavy",	"1",{
	-- You can re-roll failed hit rolls when targeting VEHICLE or MONSTER units with this weapon.  In addition, if this weapon inflicts any damage, the target unit suffers an additional D3 mortal wounds.
	"type": "",
	"params":
}),
("imperial_knights", "conflagration_cannon",	-2,	"2",	"18",	"7",	"Heavy",	"3D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("imperial_knights", "cawls_wrath_(standard)",	-4,	"2",	"48",	"8",	"Heavy",	"2D6",{
	-- Blast. Replaces the bearers Plasma Decimator.
	"type": "",
	"params":
}),
("imperial_knights", "cawls_wrath_(supercharge)",	-4,	"3",	"48",	"9",	"Heavy",	"2D6",{
	-- Blast. When firing the supercharge profile, for each unmodified hit roll of 1, the bearer suffers 1 mortal wound after all of this weapon’s shots have been resolved. Replaces the bearers Plasma Decimator.
	"type": "",
	"params":
}),
("imperial_knights", "the_thunder_of_voltoris",	-2,	"D3",	"72",	"9",	"Heavy",	"2D6",{
	-- Replaces the bearers Rapid Fire Battle Cannon. When determining how many shots this weapon fires, roll 3D6 and discard the lowest result. Blast.
	"type": "",
	"params":
}),
("imperial_knights", "hondurs_bite",	-4,	"6",	"0",	"+6",	"Melee",	"1",{
	-- Replaces the bearers Reaper Chainsword. Each wound roll of 6 made for this weapon inflicts D3 mortal wounds on the target in addition to the normal damage.
	"type": "",
	"params":
}),
("imperial_knights", "fury_of_mars",	-4,	"D6",	"48",	"9",	"Heavy",	"D6",{
	-- Replaces the bearers Thermal Cannon. Roll two dice when inflicting damage with this weapon and discard the lowest result. Blast.
	"type": "",
	"params":
}),
("imperial_knights", "traitors_pyre",	-2,	"2",	"18",	"7",	"Heavy",	"3D6",{
	-- Replaces the bearers Conflagration Cannon. This weapon automatically hits its target. You can re-roll failed wound rolls for this weapon.
	"type": "",
	"params":
}),
("imperial_knights", "skyshield",	-2,	"2",	"60",	"7",	"Heavy",	"6",{
	-- Replaces the bearers Twin Icarus Autocannon. Add 1 to all hit rolls made for this weapon against targets that can FLY. Subtract 1 from the hit rolls for this weapon against all other targets.
	"type": "",
	"params":
}),
("imperial_knights", "judgement",	-3,	"D6",	"60",	"8",	"Heavy",	"3",{
	-- Replaces the bearers Stormspear Rocket Pod. You can re-roll failed hit rolls for this weapon.
	"type": "",
	"params":
}),
("imperial_knights", "endless_fury",	-2,	"2",	"36",	"6",	"Heavy",	"14",{
	-- Replaces the bearers Avenger Gatling Cannon. Each unmodified hit roll of 6 made with this weapon causes 2 hits instead of 1.
	"type": "",
	"params":
}),
("imperial_knights", "the_paragon_gauntlet",	-4,	"8",	"0",	"x2",	"Melee",	"1",{
	-- Replaces the bearers Thunderstrike Gauntlet. If a VEHICLE or MONSTER is slain by this weapon, pick an enemy unit within 9 of the bearer and roll a D6.  On a 4+ that unit suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("imperial_knights", "ravager",	-4,	"6",	"0",	"+8",	"Melee",	"1",{
	-- Replaces the bearers Reaper Chainsword. Re-roll hit rolls of 1 for this weapon.  If the bearer has the Cold Fury Household Tradition, you can instead re-roll all failed hit rolls for this weapon.
	"type": "",
	"params":
}),
("imperial_knights", "freedoms_hand",	-4,	"2D6",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll. Treat any damage roll less than 6 made with this weapon as 6 instead. If a VEHICLE or MONSTER is slain by this weapon, pick an enemy unit within 9 of the bearer and roll a D6. On a 4+ that unit suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("imperial_knights", "archeotech_pistol",	-2,	"2",	"15",	"5",	"Pistol",	"1",{}),
("imperial_knights", "volkite_culverin",	0,	"2",	"45",	"6",	"Heavy",	"4",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("imperial_knights", "volkite_veuglaire",	-1,	"2",	"36",	"6",	"Heavy",	"5",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("imperial_knights", "karacnos_mortar_battery",	-1,	"1",	"60",	"5",	"Heavy",	"3D3",{
	-- Blast. Each time an attack is made with this weapon, a wound roll of 2+ is always successful, unless the target is a VEHICLE or TITANIC unit.
	"type": "",
	"params":
}),
("imperial_knights", "twin_conversion_beam_cannon_(long_range)",	-3,	"6",	"48-72",	"16",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "twin_conversion_beam_cannon_(short_range)",	-1,	"2",	"0-24",	"12",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "twin_conversion_beam_cannon_(mid_range)",	-2,	"4",	"24-48",	"14",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "graviton_pulsar",	-3,	"2",	"24",	"6",	"Heavy",	"D6",{
	-- Blast. Each time an attack made with this weapon is allocated to a model with a Save characteristic of 3+ or better, that attack has a Damage characteristic of 3.
	"type": "",
	"params":
}),
("imperial_knights", "lightning_lock",	-2,	"1",	"36",	"6",	"Heavy",	"6",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("imperial_knights", "moirax_conversion_beam_cannon_(long_range)",	-2,	"4",	"42-72",	"10",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "moirax_conversion_beam_cannon_(mid_range)",	-1,	"3",	"18-42",	"8",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "moirax_conversion_beam_cannon_(short_range)",	0,	"2",	"0-18",	"6",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("imperial_knights", "rad_cleanser",	0,	"3",	"9",	"2",	"Assault",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target. Each time an attack is made with this weapon, a wound roll of 2+ is always successful, unless the target is a VEHICLE or TITANIC unit.
	"type": "",
	"params":
}),
("imperial_knights", "siege_claw",	-3,	"D6",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, subtract 1 from that attacks hit roll. Each time an attack is made with this weapon, if that attack targets a VEHICLE or TITANIC unit, add 2 to the Damage characteristic.
	"type": "",
	"params":
}),
