INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("fw_heretic_astartes", "hellcrusher_claws___crush",	-4,	"6",	"0",	"x2",	"Melee",	"1",{}),
("fw_heretic_astartes", "hellcrusher_claws___sweep",	-2,	"2",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellcrusher_claws",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "scorpion_cannon",	-2,	"1",	"36",	"5",	"Heavy",	"15",{}),
("fw_heretic_astartes", "hellmaw_flame_cannon",	-2,	"1",	"12",	"8",	"Assault",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits its target.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "bile_maw",	-1,	"1",	"18",	"7",	"Assault",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target and re-roll a wound roll of 1.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "greater_plague_probe",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, re-roll a wound roll of 1.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "blightreaper_cannon",	-1,	"1",	"36",	"7",	"Heavy",	"4",{
	-- Each time an attack is made with this weapon, re-roll a wound roll of 1.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "impaler_harpoon",	-3,	"3",	"18",	"8",	"Assault",	"1",{
	-- Each time a model (excluding AIRCRAFT models) loses any wounds as a result of an attack made with this weapon but is not destroyed, it is impaled until the start of your next Shooting phase. While a model is impaled, its Move characteristic is halved and each time a charge roll is made for the bearer, if that models unit is the target of that charge, add 2 to that charge roll.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "decimator_claw",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("fw_heretic_astartes", "soulburner_petard",	0,	"1",	"24",	"1",	"Assault",	"2D3",{
	-- Each time the bearer shoots, if any unmodified hit rolls of 1 are made for attacks with this weapon, the bearer suffers 1 mortal wound after shooting with this weapon. Each time an attack is made with this weapon, an unmodified wound roll of 2+ inflicts 1 mortal wound on the target and the attack sequence ends.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "storm_laser",	-2,	"1",	"36",	"6",	"Assault",	"6",{}),
("fw_heretic_astartes", "decimator_conversion_beamer_1___short_range",	-1,	"2",	"0-24",	"6",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "decimator_conversion_beamer_2___medium_range",	-2,	"3",	"24-48",	"7",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "decimator_conversion_beamer_3___long_range",	-3,	"4",	"48-72",	"8",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "decimator_butcher_cannon",	-2,	"2",	"36",	"7",	"Heavy",	"4",{}),
("fw_heretic_astartes", "kytan_gatling_cannon",	-2,	"2",	"48",	"8",	"Heavy",	"8",{}),
("fw_heretic_astartes", "kytan_cleaver___smash",	-4,	"6",	"0",	"x2",	"Melee",	"1",{}),
("fw_heretic_astartes", "kytan_cleaver___slash",	-2,	"2",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "kytan_cleaver",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "conversion_beam_cannon_1___short_range",	-1,	"2",	"0-24",	"6",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "conversion_beam_cannon_3___long_range",	-3,	"4",	"48-72",	"8",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "conversion_beam_cannon_2___medium_range",	-2,	"3",	"24-48",	"7",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_cyclone_missile_launcher___frag_missile",	0,	"1",	"36",	"4",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_cyclone_missile_launcher",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_cyclone_missile_launcher___krak_missile",	-2,	"D6",	"36",	"8",	"Heavy",	"2",{}),
("fw_heretic_astartes", "hellforged_dreadnought_chainfist",	-4,	"2D3",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack made with this weapon is allocated to a VEHICLE model, that attack has a Damage characteristic of 6.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_dreadnought_combat_weapon",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("fw_heretic_astartes", "hellforged_heavy_plasma_cannon___standard",	-3,	"2",	"36",	"7",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_heavy_plasma_cannon___supercharge",	-3,	"3",	"36",	"8",	"Heavy",	"D3",{
	-- Blast. Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, the bearer suffers 1 mortal wound after shooting with this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_heavy_plasma_cannon",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_kheres_pattern_assault_cannon",	-1,	"1",	"24",	"7",	"Heavy",	"6",{}),
("fw_heretic_astartes", "twin_hellforged_autocannon",	-1,	"2",	"48",	"7",	"Heavy",	"4",{}),
("fw_heretic_astartes", "twin_volkite_culverin",	0,	"2",	"45",	"6",	"Heavy",	"8",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "graviton_blaster",	-3,	"1",	"18",	"5",	"Assault",	"2",{
	-- Each time an attack made with this weapon is allocated to a model with a Save characteristic of 3+ or better, that attack has a Damage characteristic of 2.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_plasma_blaster",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_plasma_blaster___standard",	-3,	"1",	"18",	"7",	"Assault",	"2",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_plasma_blaster___supercharge",	-3,	"2",	"18",	"8",	"Assault",	"2",{
	-- Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, the bearer suffers 1 mortal wound after shooting with this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "ectoplasma_blaster",	-3,	"2",	"18",	"8",	"Assault",	"2",{
	-- If any hit rolls made in a given phase results in a score of a 1, then the firing unit suffers 1 mortal wound. 
	"type": "",
	"params":
}),
("fw_heretic_astartes", "ectoplasma_cannon",	-3,	"D3",	"24",	"7",	"Heavy",	"D3",{}),
("fw_heretic_astartes", "infernal_hunger",	-3,	"1",	"0",	"User",	"Melee",	"1",{}),
("fw_heretic_astartes", "havoc_launcher",	0,	"1",	"48",	"5",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "twin_hellforged_multi_melta",	-4,	"D6",	"24",	"8",	"Heavy",	"4",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "infernus_cannon",	-1,	"1",	"18",	"6",	"Heavy",	"2D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits its target.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "magna_melta_cannon",	-4,	"D6",	"36",	"8",	"Heavy",	"2D3",{
	-- Blast. Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "plasma_destroyer___standard",	-4,	"1",	"36",	"7",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "plasma_destroyer___supercharge",	-4,	"2",	"36",	"8",	"Heavy",	"D3",{
	-- Blast. Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, the bearer suffers 1 mortal wound after shooting with this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "plasma_destroyer",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the following profiles to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "scorpius_multi_launcher",	-2,	"2",	"48",	"6",	"Heavy",	"3D3",{
	-- Blast. This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "herakles_pattern_autocannon",	-2,	"3",	"48",	"7",	"Heavy",	"6",{}),
("fw_heretic_astartes", "punisher_rotary_cannon",	-1,	"1",	"36",	"6",	"Heavy",	"18",{}),
("fw_heretic_astartes", "quad_lascannon",	-3,	"D6",	"48",	"9",	"Heavy",	"4",{}),
("fw_heretic_astartes", "laser_destroyer",	-4,	"D3+3",	"36",	"10",	"Heavy",	"3",{}),
("fw_heretic_astartes", "butcher_cannon_array",	-2,	"2",	"36",	"7",	"Heavy",	"8",{}),
("fw_heretic_astartes", "arachnus_heavy_lascannon_battery",	-3,	"D3+3",	"48",	"9",	"Heavy",	"2",{}),
("fw_heretic_astartes", "hellfire_plasma_carronade___supercharge",	-3,	"3",	"36",	"8",	"Heavy",	"6",{
	-- Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, the bearer suffers 1 mortal wound after shooting with this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellfire_plasma_carronade",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellfire_plasma_carronade___standard",	-3,	"2",	"36",	"7",	"Heavy",	"6",{}),
("fw_heretic_astartes", "volkite_falconet_battery",	-2,	"2",	"36",	"8",	"Heavy",	"6",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 2 mortal wounds on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "aiolos_missile_launcher",	-1,	"1",	"48",	"6",	"Heavy",	"3D3",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "boreas_air_defence_missiles",	-3,	"D6",	"48",	"9",	"Heavy",	"1",{
	-- Each time an attack is made with this weapon against an AIRCRAFT model, add 2 to that attacks hit roll. Each time an attack made with this weapon is allocated to an AIRCRAFT model, that attack has a Damage characteristic of D3+3.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "quad_heavy_bolter",	-1,	"2",	"36",	"5",	"Heavy",	"12",{}),
("fw_heretic_astartes", "leviathan_siege_claw",	-3,	"3",	"0",	"x2",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "leviathan_siege_drill",	-4,	"2D3",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack made with this weapon is allocated to a VEHICLE model, that attack has a Damage characteristic of 6.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "grav_flux_bombard",	-3,	"2",	"24",	"8",	"Heavy",	"2D3",{
	-- Blast. Each time an attack made with this weapon is allocated to a model with a Save characteristic of 3+ or better, that attack has a Damage characteristic of 3.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "cyclonic_melta_lance",	-4,	"D6",	"18",	"9",	"Heavy",	"D6",{
	-- Blast. Each time an attack made with this weapon targets a unit within half range, the attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "storm_cannon",	-1,	"2",	"36",	"7",	"Heavy",	"8",{}),
("fw_heretic_astartes", "twin_volkite_caliver",	0,	"2",	"30",	"5",	"Heavy",	"4",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "kharybdis_storm_launcher___frag_missile",	-1,	"1",	"36",	"4",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "kharybdis_storm_launcher",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the following profiles to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "kharybdis_storm_launcher___krak_missile",	-3,	"D6",	"36",	"8",	"Heavy",	"2",{}),
("fw_heretic_astartes", "melta_array",	-4,	"D6+2",	"0",	"8",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon and no more than one attack can be made with this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "cerberus_neutron_pulse_array",	-4,	"2D3",	"48",	"14",	"Heavy",	"4",{
	-- Each time an attack made with this weapon is allocated to a model, if the bearer Remained Stationary in your previous Movement phase, that attack has a Damage characteristic of 6.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "blade_struts",	-4,	"3",	"0",	"x2",	"Melee",	"1",{}),
("fw_heretic_astartes", "dreadhammer_siege_cannon",	-4,	"3",	"24",	"10",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "fellblade_accelerator_cannon___ae_shells",	-4,	"6",	"72",	"14",	"Heavy",	"2",{}),
("fw_heretic_astartes", "fellblade_accelerator_cannon___he_shells",	-3,	"2",	"72",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "fellblade_accelerator_cannon",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targerts, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "eternal_hunger",	-3,	"D3",	"0",	"User",	"Melee",	"1",{}),
("fw_heretic_astartes", "twin_falchion_volcano_cannon",	-5,	"6",	"120",	"14",	"Heavy",	"2D3",{
	-- Blast. Each time an attack is made with this weapon against a TITANIC unit, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "siege_melta_array",	-4,	"D6",	"24",	"8",	"Heavy",	"6",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "skyreaper_battery",	-2,	"2",	"48",	"7",	"Heavy",	"8",{
	-- Each time an attack is made with this weapon against an AIRCRAFT unit, add 1 to that attacks hit roll. Each time an attack is made with this weapon is allocated to an AIRCRAFT unit, that attack has a Damage characteristic of 4.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "vengeance_launcher",	-1,	"1",	"48",	"6",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_typhoon_missile_launcher",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to attack with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_typhoon_missile_launcher___frag_missile",	0,	"1",	"48",	"4",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellforged_typhoon_missile_launcher___krak_missile",	-2,	"D6",	"48",	"8",	"Heavy",	"2",{}),
("fw_heretic_astartes", "storm_eagle_multi_melta",	-4,	"D6",	"24",	"8",	"Heavy",	"4",{
	-- Each time an attack made with this wepaon targets a unit within half-range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "twin_hellstrike_launcher",	-3,	"3",	"72",	"8",	"Heavy",	"2",{
	-- Each time an attack is made with this weapon against an AIRCRAFT model, add 1 to that attacks hit roll. Each time an attack made with this weapon is allocated to an AIRCRAFT model, that attack has a Damage characteristic of D3+3.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "balefire_missiles",	-1,	"D3",	"36",	"6",	"Heavy",	"2D3",{
	-- Units targeted by this weapon do not gain any bonus to their saving throws for being in cover. Blast.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "twin_avenger_bolt_cannon",	-2,	"2",	"36",	"6",	"Heavy",	"10",{}),
("fw_heretic_astartes", "thunderhawk_heavy_cannon",	-2,	"D3+2",	"48",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("fw_heretic_astartes", "turbo_laser_destructor",	-5,	"6",	"96",	"16",	"Heavy",	"3",{}),
("fw_heretic_astartes", "dreadstrike_missiles",	-3,	"2D3",	"120",	"10",	"Heavy",	"4",{}),
("fw_heretic_astartes", "xiphon_missile_battery",	-2,	"3",	"60",	"7",	"Heavy",	"3",{
	-- Each time an attack is made with this weapon against an AIRCRAFT unit, add 1 to that attacks hit roll.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "blight_grenade",	0,	"1",	"6",	"3",	"Grenade",	"D6",{
	-- You can re-roll wound rolls of 1 for this weapon. Blast.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "rot_cannon",	-3,	"2",	"36",	"6",	"Heavy",	"D6",{
	-- Against INFANTRY targets, failed wound rolls for this weapon are re-rolled. Blast.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "rancid_vomit",	-2,	"1",	"7",	"5",	"Pistol",	"D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "iron_claw",	-3,	"D6",	"0",	"x2",	"Melee",	"1",{}),
("fw_heretic_astartes", "warpsword",	-3,	"3",	"0",	"User",	"Melee",	"1",{
	-- You can re-roll failed hit rolls for this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "helbrute_plasma_cannon",	-3,	"2",	"36",	"8",	"Heavy",	"D3",{
	-- For each hit roll of 1, the Hellbrute suffers a MW after all of this weapons shots have been resolved. Blast.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "laser_volley_cannon,_overcharge_fire",	-5,	"6",	"36",	"10",	"Heavy",	"2",{
	-- If any hit rolls made for this weapon result in one or more results of a 1, the firing vehicle suffers 3 mortal wounds.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "laser_volley_cannon,_volley_fire",	-3,	"3",	"36",	"9",	"Heavy",	"2",{}),
("fw_heretic_astartes", "helbrute_fist",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("fw_heretic_astartes", "hellforged_hunter_killer_missile",	-2,	"D6",	"48",	"10",	"Heavy",	"1",{
	-- The bearer can only shoot with each hellforged hunter-killer missile it is equipped with once per battle.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "sicaran_laser_cannon",	-3,	"D6",	"48",	"12",	"Heavy",	"3",{
	-- Each time an attack made with this weapon is allocated to a model, if the bearer Remained Stationary in its previus Movement phase, that attack has a Damage characteristic of 6.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "graviton_cannon",	-3,	"2",	"36",	"6",	"Heavy",	"D6",{
	-- Blast. When resolving an attack made with this weapon against a unit with a Save characteristic of 3+ or better, this weapon has a Damage characteristic of 3 instead of 2.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "quad_launcher",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "quad_launcher___shatter_shells",	-2,	"3",	"24",	"8",	"Heavy",	"4",{}),
("fw_heretic_astartes", "quad_launcher___thunderfire_shells",	0,	"1",	"60",	"4",	"Heavy",	"4D3",{
	-- Blast. This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "terrax_melta_cutter",	-4,	"D6",	"12",	"8",	"Heavy",	"5",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage charateristic of D6+2.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "termite_drill",	-4,	"D3+3",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack made with this weapon is allocated to a VEHICLE model, that attack has a Damage characterisitc of D3+6.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "twin_terrax_volkite_charger",	0,	"2",	"20",	"5",	"Heavy",	"4",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "crushing_tracks",	-2,	"D3",	"0",	"User",	"Melee",	"1",{}),
("fw_heretic_astartes", "hellstrike_missile_battery",	-3,	"3",	"72",	"8",	"Heavy",	"4",{
	-- Each time an attack is made with this weapon against an AIRCRAFT unit, add 1 to that attacks hit roll. Each time an attack is made with this weapon is allocated to an AIRCRAFT unit, that attack has a Damage characteristic of D3+3.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "laser_volley_cannon",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the profiles below to make attacks with.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "laser_volley_cannon___volley_fire",	-3,	"D3+3",	"36",	"9",	"Heavy",	"3",{}),
("fw_heretic_astartes", "laser_volley_cannon___overcharge_fire",	-4,	"6",	"36",	"10",	"Heavy",	"3",{
	-- Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, if the bearer did not Remain Stationary in your previous Movement phase, it suffers 1 mortal wound after shooting with this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "helbrute_hammer",	-4,	"D6",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "power_scourge",	-2,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 3 additional attacks with this weapon.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "hellflamer",	-1,	"2",	"12",	"5",	"Heavy",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits its target.
	"type": "",
	"params":
}),
("fw_heretic_astartes", "slaughter_blade",	-3,	"3",	"0",	"+2",	"Melee",	"1",{}),
