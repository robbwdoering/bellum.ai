INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("astra_militarum", "payback",	-2,	"2",	"36",	"5",	"Assault",	"3",{}),
("astra_militarum", "bionic_arm_with_devils_claw",	-1,	"2",	"0",	"User",	"Melee",	"1",{}),
("astra_militarum", "taurox_battle_cannon",	-1,	"D3",	"48",	"7",	"Heavy",	"D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum", "taurox_gatling_cannon",	0,	"1",	"24",	"4",	"Heavy",	"20",{}),
("astra_militarum", "taurox_missile_launcher_(frag)",	0,	"1",	"48",	"4",	"Heavy",	"2D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum", "taurox_missile_launcher_(krak)",	-2,	"D6",	"48",	"8",	"Heavy",	"2",{}),
("astra_militarum", "grenade_launcher_(frag)",	0,	"1",	"24",	"3",	"Assault",	"D6",{
	-- Blast.
	"type": "",
	"params":
}),
("astra_militarum", "grenade_launcher_(krak)",	-1,	"D3",	"24",	"6",	"Assault",	"1",{}),
("astra_militarum", "ripper_pistol",	0,	"1",	"12",	"5",	"Pistol",	"3",{
	-- This weapon wounds INFANTRY units on a roll of 2+.
	"type": "",
	"params":
}),
("astra_militarum", "envenomed_blade",	0,	"1",	"0",	"+1",	"Melee",	"1",{
	-- This weapon wounds INFANTRY units on a roll of 2+.
	"type": "",
	"params":
}),
("astra_militarum", "hunting_lance",	-2,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("astra_militarum", "stomping_feet",	0,	"1",	"0",	"+2",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 3 additional attacks with this weapon and no more than 3 attacks can be made with this weapon.
	"type": "",
	"params":
}),
