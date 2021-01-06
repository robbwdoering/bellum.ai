INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("grey_knights", "the_black_blade_of_antwyr",	0,	"1",	"0",	"User",	"Melee",	"1",{}),
("grey_knights", "dreadfist",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- If a model is equipped with two dreadfists, each time it fights it can make 1 additional attack with them.
	"type": "",
	"params":
}),
("grey_knights", "malleus_argyrum",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("grey_knights", "nemesis_daemon_greathammer",	-4,	"D6",	"0",	"x2",	"Melee",	"1",{
	-- When a model attacks with this weapon, you must subtract 1 from the hit roll. Damage rolls of less than 3 count as 3 for this weapon.
	"type": "",
	"params":
}),
("grey_knights", "nemesis_greatsword",	-3,	"D6",	"0",	"+4",	"Melee",	"1",{}),
("grey_knights", "the_titansword",	-4,	"3",	"0",	"+4",	"Melee",	"1",{}),
("grey_knights", "gatling_psilencer",	0,	"D3",	"24",	"4",	"Heavy",	"12",{}),
("grey_knights", "heavy_incinerator",	-1,	"2",	"12",	"6",	"Heavy",	"D6",{
	-- This weapon automatically hits its targets.
	"type": "",
	"params":
}),
("grey_knights", "heavy_psycannon",	-1,	"2",	"24",	"7",	"Heavy",	"6",{}),
("grey_knights", "psyk_out_grenade",	0,	"1",	"6",	"2",	"Grenade",	"D3",{
	-- Each time you roll a hit roll of 6+ for this weapon when targeting a (Psyker) or (Daemon), the target suffers a mortal wound instead of the normal damage. Blast.
	"type": "",
	"params":
}),
("grey_knights", "nemesis_doomglaive",	-3,	"D6",	"0",	"+3",	"Melee",	"1",{}),
("grey_knights", "hellstrike_battery",	-3,	"3",	"72",	"8",	"Heavy",	"4",{}),
("grey_knights", "turbo_laser_destructor",	-4,	"2D6",	"96",	"16",	"Heavy",	"D3",{
	-- Any wound roll of a 6 made with this attack automatically inflicts an additional D3 mortal wounds on the target.
	"type": "",
	"params":
}),
("grey_knights", "thunderhawk_heavy_cannon",	-2,	"D6",	"48",	"8",	"Heavy",	"2D6",{}),
("grey_knights", "razorback_twin_psycannon",	-1,	"1",	"24",	"7",	"Heavy",	"8",{}),
("grey_knights", "blade_of_the_forsworn",	-3,	"3",	"0",	"+1",	"Melee",	"1",{
	-- When resolving an attack made with this weapon against a DAEMON unit, and invulnerable saving throw cannot be made.
	"type": "",
	"params":
}),
("grey_knights", "nemesis_falchion",	-2,	"D3",	"0",	"User",	"Melee",	"1",{
	-- If a model is armed with two Nemesis falchions, each time it fights it can make 1 additional attack with them.
	"type": "",
	"params":
}),
("grey_knights", "nemesis_force_halberd",	-2,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("grey_knights", "nemesis_force_sword",	-3,	"D3",	"0",	"User",	"Melee",	"1",{}),
("grey_knights", "nemesis_warding_stave",	-1,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- A model armed with this weapon has a 5+ invulnerable save against attacks made in the Fight phase. If it already has an invulnerable save, add 1 to invulnerable saving throws you make for it in the Fight phase instead.
	"type": "",
	"params":
}),
("grey_knights", "nemesis_daemon_hammer",	-3,	"3",	"0",	"x2",	"Melee",	"1",{
	-- When a model attacks with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("grey_knights", "incinerator",	-1,	"1",	"8",	"6",	"Assault",	"D6",{
	-- This weapon automatically hits its targets.
	"type": "",
	"params":
}),
("grey_knights", "psilencer",	0,	"D3",	"24",	"4",	"Heavy",	"6",{}),
("grey_knights", "psycannon",	-1,	"1",	"24",	"7",	"Heavy",	"4",{}),
("grey_knights", "twin_lascannon",	-3,	"D6",	"48",	"9",	"Heavy",	"2",{}),
("grey_knights", "twin_heavy_bolter",	-1,	"1",	"36",	"5",	"Heavy",	"6",{}),
("grey_knights", "multi_melta",	-4,	"D6",	"24",	"8",	"Heavy",	"1",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage and discard the lowest result.
	"type": "",
	"params":
}),
("grey_knights", "hunter_killer_missile",	-2,	"D6",	"48",	"8",	"Heavy",	"1",{
	-- This weapon can only be fired once per battle.
	"type": "",
	"params":
}),
("grey_knights", "hurricane_bolter",	0,	"1",	"24",	"4",	"Rapid Fire",	"6",{}),
("grey_knights", "twin_assault_cannon",	-1,	"1",	"24",	"6",	"Heavy",	"12",{}),
("grey_knights", "flamestorm_cannon",	-2,	"2",	"12",	"6",	"Heavy",	"D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("grey_knights", "twin_psycannon",	-1,	"2",	"24",	"7",	"Heavy",	"6",{}),
("grey_knights", "fury_of_deimos",	-1,	"1",	"30",	"5",	"Rapid Fire",	"3",{}),
("grey_knights", "destroyer_of_crysyllx",	-3,	"4",	"0",	"x2",	"Melee",	"1",{
	-- When a model attacks with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("grey_knights", "soul_glaive",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{
	-- You can re-roll failed hit and wound rolls made for this weapon.
	"type": "",
	"params":
}),
