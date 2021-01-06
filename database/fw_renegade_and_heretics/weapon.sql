INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("fw_renegade_and_heretics", "mortar",	0,	"1",	"48",	"4",	"Heavy",	"D6",{
	-- This weapon can target units that are not visible to the firer.
	"type": "",
	"params":
}),
("fw_renegade_and_heretics", "grenade_launcher_(frag)",	0,	"1",	"24",	"3",	"Assault",	"D6",{}),
("fw_renegade_and_heretics", "grenade_launcher_(krak)",	-1,	"D3",	"24",	"6",	"Assault",	"1",{}),
("fw_renegade_and_heretics", "bare_hands",	0,	"1",	"0",	"User",	"Melee",	"1",{}),
("fw_renegade_and_heretics", "brutal_assault_weapon",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("fw_renegade_and_heretics", "stub_guns",	0,	"1",	"6",	"3",	"Pistol",	"1",{}),
("fw_renegade_and_heretics", "stub_gun",	0,	"1",	"9",	"3",	"Pistol",	"2",{}),
("fw_renegade_and_heretics", "hideous_mutations",	-2,	"2",	"0",	"User",	"Melee",	"1",{}),
("fw_renegade_and_heretics", "brute_combat_weapon",	-2,	"1",	"0",	"User",	"Melee",	"1",{}),
("fw_renegade_and_heretics", "ripper_claw",	-2,	"2",	"0",	"+1",	"Melee",	"1",{}),
("fw_renegade_and_heretics", "mauler_goad",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 3 additional attacks with this weapon.
	"type": "",
	"params":
}),
("fw_renegade_and_heretics", "befouled_fangs_and_claws",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("fw_renegade_and_heretics", "ogryn_weapon",	-1,	"2",	"0",	"+1",	"Melee",	"1",{}),
("fw_renegade_and_heretics", "ogryn_power_drill",	-2,	"2",	"0",	"x2",	"Melee",	"1",{}),
("fw_renegade_and_heretics", "ogryn_plague_claws",	-1,	"2",	"0",	"+1",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, re-roll a wound roll of 1.
	"type": "",
	"params":
}),
("fw_renegade_and_heretics", "multi_laser",	0,	"1",	"36",	"6",	"Heavy",	"3",{}),
("fw_renegade_and_heretics", "hellstrike_missiles",	-2,	"D6",	"72",	"8",	"Heavy",	"1",{
	-- Roll two dice when inflicting damage with this weapon and discard the lowest result.
	"type": "",
	"params":
}),
("fw_renegade_and_heretics", "twin_heavy_stubber",	0,	"1",	"36",	"4",	"Heavy",	"6",{}),
("fw_renegade_and_heretics", "earthshaker_cannon",	-3,	"D3",	"240",	"9",	"Heavy",	"D6",{
	-- Roll two dice for the number of attacks when firing this weapon and discard the lowest result. This weapon can target units that are not visible to the bearer
	"type": "",
	"params":
}),
