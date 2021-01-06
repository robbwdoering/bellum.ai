INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("chaos_knights", "castigator_bolt_cannon",	-2,	"2",	"36",	"6",	"Heavy",	"16",{}),
("chaos_knights", "cerastus_shock_lance_(melee)___standard",	-4,	"6",	"0",	"+6",	"Melee",	"1",{}),
("chaos_knights", "cerastus_shock_lance_(shooting)",	-1,	"D3",	" 18",	"6",	"Heavy",	"6",{}),
("chaos_knights", "cerastus_shock_lance_(melee)___charged",	-4,	"8",	"0",	"x2",	"Melee",	"1",{}),
("chaos_knights", "war_dog_autocannon",	-1,	"3",	"60",	"7",	"Heavy",	"2D3",{}),
("chaos_knights", "thermal_spear",	-4,	"D6",	"30",	"8",	"Assault",	"D3",{
	-- When resolving an attack with this weapon against a target that is within half range, roll two D6 when inflicting damage with it and discard one of the results. Blast.
	"type": "",
	"params":
}),
("chaos_knights", "reaper_chain_cleaver___strike",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("chaos_knights", "reaper_chain_cleaver___sweep",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Make 2 hit rolls for each attack made with this weapon, instead of 1.
	"type": "",
	"params":
}),
("chaos_knights", "avenger_gatling_cannon",	-2,	"2",	"36",	"6",	"Heavy",	"12",{}),
("chaos_knights", "rapid_fire_battle_cannon",	-2,	"D3",	"72",	"8",	"Heavy",	"2D6",{
	-- Blast.
	"type": "",
	"params":
}),
("chaos_knights", "thermal_cannon",	-4,	"D6",	"36",	"9",	"Heavy",	"D6",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result. Blast.
	"type": "",
	"params":
}),
("chaos_knights", "twin_meltagun",	-4,	"D6",	"12",	"8",	"Assault",	"2",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("chaos_knights", "serpentstrike",	-4,	"D6",	"12",	"9",	"Assault",	"4",{
	-- ‘Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("chaos_knights", "plasma_decimator___standard",	-3,	"1",	"48",	"7",	"Heavy",	"2D6",{
	-- Blast.
	"type": "",
	"params":
}),
("chaos_knights", "plasma_decimator___supercharge",	-3,	"2",	"48",	"8",	"Heavy",	"2D6",{
	-- Blast. Each time an unmodified hit roll of 1 is made for an attack with this weapon, the bearer suffers 1 mortal wound after shooting with this weapon.
	"type": "",
	"params":
}),
("chaos_knights", "volcano_lance",	-5,	"3D3",	"80",	"14",	"Heavy",	"D6",{
	-- You can re-roll failed wound rolls when targeting TITANIC units with this weapon.
	"type": "",
	"params":
}),
("chaos_knights", "annihilatum",	-2,	"3",	"18",	"7",	"Assault",	"3D6",{
	-- When resolving an attack made with this weapon, do not make a hit roll; it automatically scores a hit.
	"type": "",
	"params":
}),
("chaos_knights", "thundercoil_harpoon",	-6,	"10",	"12",	"16",	"Heavy",	"1",{
	-- You can re-roll failed hit rolls when targeting VEHICLE or MONSTER units with this weapon. In addition, if this weapon inflicts any damage, the target unit suffers an additional D3 mortal wounds.
	"type": "",
	"params":
}),
("chaos_knights", "conflagration_cannon",	-2,	"2",	"18",	"7",	"Heavy",	"3D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("chaos_knights", "twin_siegebreaker_cannon",	-1,	"D3",	"48",	"7",	"Heavy",	"2D3",{}),
("chaos_knights", "shieldbreaker_missile",	-4,	"D6",	"48",	"10",	"Heavy",	"1",{
	-- Each shieldbreaker missile can only be fired once per battle, and a model can only fire one each turn. Invulnerable saving throws cannot be made against wounds caused by this weapon.
	"type": "",
	"params":
}),
("chaos_knights", "laser_destructor",	-4,	"D6",	"60",	"14",	"Heavy",	"D3",{
	-- When resolving an attack made by this weapon, a wound roll of 6+ inflicts D3 mortal wounds on the target in addition to any other damage. Blast.
	"type": "",
	"params":
}),
("chaos_knights", "the_diamonas",	-4,	"D6",	"60",	"16",	"Heavy",	"3",{
	-- When resolving an attack made by this weapon, a wound roll of 6+ inflicts D3 mortal wounds on the target in addition to any other damage.
	"type": "",
	"params":
}),
("chaos_knights", "karacnos_mortar_battery",	-1,	"1",	"60",	"5",	"Heavy",	"3D3",{
	-- Blast. Each time an attack is made with this weapon, a wound roll of 2+ is always successful, unless the target is a VEHICLE or TITANIC unit.
	"type": "",
	"params":
}),
("chaos_knights", "twin_conversion_beam_cannon",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("chaos_knights", "twin_conversion_beam_cannon___1._short_range",	-1,	"2",	"0-24",	"12",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("chaos_knights", "twin_conversion_beam_cannon___2._mid_range",	-2,	"4",	"24-48",	"14",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("chaos_knights", "twin_conversion_beam_cannon___3._long_range",	-3,	"6",	"48-72",	"16",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("chaos_knights", "asterius_volkite_culverin",	0,	"2",	"45",	"6",	"Heavy",	"4",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("chaos_knights", "moirax_conversion_beam_cannon",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("chaos_knights", "moirax_conversion_beam_cannon___1._short_range",	0,	"2",	"0-18",	"6",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("chaos_knights", "moirax_conversion_beam_cannon___2._mid_range",	-1,	"3",	"18-42",	"8",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("chaos_knights", "moirax_conversion_beam_cannon___3._long_range",	-2,	"4",	"42-72",	"10",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("chaos_knights", "graviton_pulsar",	-3,	"2",	"24",	"6",	"Heavy",	"D6",{
	-- Blast. Each time an attack made with this weapon is allocated to a model with a Save characteristic of 3+ or better, that attack has a Damage characteristic of 3.
	"type": "",
	"params":
}),
("chaos_knights", "lightning_lock",	-2,	"1",	"36",	"6",	"Heavy",	"6",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("chaos_knights", "siege_claw",	-3,	"D6",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack made with this weapon, subtract 1 from the hit roll. Each time an attack is made with this weapon, if that attack targets a VEHICLE or TITANIC unit, add 2 to the Damage characteristic.
	"type": "",
	"params":
}),
("chaos_knights", "rad_cleanser",	0,	"3",	"9",	"2",	"Assault",	"D6",{
	-- Each time an attack is made with this weapon, it automatically hits the target. Each time an attack is made with this weapon, a wound roll of 2+ is always successful, unless the target is a VEHICLE or TITANIC unit.
	"type": "",
	"params":
}),
("chaos_knights", "volkite_veuglaire",	-1,	"2",	"36",	"6",	"Heavy",	"5",{
	-- Each time an unmodified wound roll of 6 is made for an attack with this weapon, that attack inflicts one mortal wound on the target in addition to the normal damage.
	"type": "",
	"params":
}),
("chaos_knights", "hekaton_siege_claw___crush",	-4,	"6",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, subtract 1 from that attacks hit roll. Each time an attack is made with this weapon profile, if that attack targets a VEHICLE or MONSTER unit, add 2 to the Damage characteristic of that attack.
	"type": "",
	"params":
}),
("chaos_knights", "hekaton_siege_claw___smash",	-2,	"3",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("chaos_knights", "hekaton_siege_claw",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("chaos_knights", "tempest_warblade",	-3,	"3",	"0",	"+6",	"Melee",	"1",{
	-- Make 2 hit rolls for each attack made with this weapon, instead of 1.
	"type": "",
	"params":
}),
("chaos_knights", "reaper_chainfist___saw",	-4,	"6",	"0",	"x2",	"Melee",	"1",{}),
("chaos_knights", "reaper_chainfist___sweep",	-2,	"D3",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("chaos_knights", "volkite_chieorovile",	-3,	"D6",	"45",	"8",	"Heavy",	"5",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 2 mortal wounds on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("chaos_knights", "graviton_crusher",	-3,	"2",	"18",	"6",	"Heavy",	"D3",{
	-- When resolving an attack made with this weapon against a unit with a Save characteristic of 3+ or better, this weapon has a Damage characteristic of 3 instead of 2.
	"type": "",
	"params":
}),
("chaos_knights", "twin_rad_cleanser",	0,	"3",	"12",	"2",	"Assault",	"2D6",{
	-- When resolving an attack made with this weapon, do not make a hit roll: it automatically scores a hit. Attacks made with this weapon wound on a 2+ unless the target is a VEHICLE or TITANIC unit.
	"type": "",
	"params":
}),
("chaos_knights", "twin_magna_lascannon",	-3,	"6",	"72",	"12",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("chaos_knights", "ironstorm_missile_pod",	-1,	"2",	"72",	"5",	"Heavy",	"D6",{
	-- This weapon can target units that are not visible to the bearer. Blast.
	"type": "",
	"params":
}),
("chaos_knights", "helios_defence_missiles",	-2,	"3",	"60",	"8",	"Heavy",	"2",{
	-- Each time an attack is made with this weapon against an AIRCRAFT, add 1 to that attacks hit roll.
	"type": "",
	"params":
}),
("chaos_knights", "lightning_cannon",	-2,	"3",	"48",	"7",	"Heavy",	"8",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("chaos_knights", "phased_plasma_fusil",	-3,	"2",	"24",	"7",	"Rapid Fire",	"2",{}),
("chaos_knights", "atrapos_lascutter_(shooting)_",	-4,	"6",	"9",	"12",	"Heavy",	"1",{
	-- Each time an attack is made with this weapon against a VEHICLE or MONSTER unit, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("chaos_knights", "atrapos_lascutter_(melee)___crush",	-4,	"6",	"0",	"12",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile against a VEHICLE or MONSTER unit, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("chaos_knights", "atrapos_lascutter_(melee)___sweep",	-2,	"3",	"0",	"6",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("chaos_knights", "graviton_singularity_cannon___contained",	-3,	"3",	"36",	"8",	"Heavy",	"4",{}),
("chaos_knights", "graviton_singularity_cannon",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("chaos_knights", "graviton_singularity_cannon___singularity",	-4,	"3",	"36",	"14",	"Heavy",	"D6+4",{
	-- Each time you select this profile to shoot with roll one D6; on a 1-3, the bearer suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("chaos_knights", "shock_blast",	-1,	"D3",	"18",	"6",	"Heavy",	"6",{}),
("chaos_knights", "acheron_flame_cannon",	-2,	"3",	"18",	"7",	"Heavy",	"2D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("chaos_knights", "stormspear_rocket_pod",	-2,	"D6",	"48",	"8",	"Heavy",	"3",{}),
("chaos_knights", "twin_icarus_autocannon",	-1,	"2",	"48",	"7",	"Heavy",	"4",{
	-- Add 1 to hit rolls made for this weapon against targets that can Fly. Subtract 1 from hit rolls made against other targets.
	"type": "",
	"params":
}),
("chaos_knights", "titanic_feet",	-2,	"D3",	"0",	"User",	"Melee",	"1",{
	-- Make 3 hit rolls for each attack made with this weapon, instead of 1.
	"type": "",
	"params":
}),
("chaos_knights", "reaper_chainsword",	-3,	"6",	"0",	"+6",	"Melee",	"1",{}),
("chaos_knights", "the_teeth_that_hunger",	-4,	"6",	"0",	"+8",	"Melee",	"1",{
	-- When the bearer fights, it makes 1 additional attack with this weapon. At the end of a battle round in which no enemy model was destroyed as a result of attacks made with this weapon, roll one D6; on a 1, the bearer suffers 1 mortal wound.
	"type": "",
	"params":
}),
("chaos_knights", "thunderstrike_gauntlet",	-4,	"6",	"0",	"x2",	"Melee",	"1",{
	-- Subtract 1 from hit rolls for attacks made with this weapon. If you slay a VEHICLE or MONSTER with a thunderstrike gauntlet, select an enemy unit within 9 and roll a D6: on a 4+ that unit suffers D3 mortal wounds as the dead body or debris is thrown at it.
	"type": "",
	"params":
}),
("chaos_knights", "the_gauntlet_of_ascension",	-4,	"6",	"0",	"x2",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, you can re-roll the hit roll and re-roll the wound roll. When a CHARACTER model is destroyed as a result of an attack made with this weapon, add 1 to the bearers Strength and 1 to their Attacks characteristic.
	"type": "",
	"params":
}),
