INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("servants_of_the_abyss", "hellfire_torch",	-1,	"2",	"8",	"5",	"Assault",	"D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("servants_of_the_abyss", "thunder_hammer",	-3,	"3",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("servants_of_the_abyss", "chaos_stave",	-1,	"D3",	"0",	"User",	"Melee",	"1",{}),
("servants_of_the_abyss", "electro_goads",	0,	"1",	"0",	"+2",	"Melee",	"1",{
	-- Each hit roll of 6 made with this weapon scores 3 hits.
	"type": "",
	"params":
}),
("servants_of_the_abyss", "brutal_assault_weapon",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("servants_of_the_abyss", "autopistol/laspistol",	0,	"1",	"12",	"3",	"Pistol",	"1",{}),
("servants_of_the_abyss", "chainsword/brutal_assault_weapon",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("servants_of_the_abyss", "scavenged_maul",	-1,	"2",	"0",	"+2",	"Melee",	"1",{}),
("servants_of_the_abyss", "mutant_claw",	-2,	"2",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, before the bearer makes any other attacks, it can make one (and only one) attack with this weapon. If the attack hits, you can re-roll hit rolls for attacks made by the bearer that target that unit until the end of the phase.
	"type": "",
	"params":
}),
("servants_of_the_abyss", "stubcarbine",	0,	"1",	"18",	"4",	"Pistol",	"3",{}),
("servants_of_the_abyss", "grenade_launcher___frag",	0,	"1",	"24",	"3",	"Assault",	"D6",{}),
("servants_of_the_abyss", "grenade_launcher___krak",	-1,	"D3",	"24",	"6",	"Assault",	"1",{}),
("servants_of_the_abyss", "grenade_launcher",	,	"",	"0",	"",	"",	"1",{
	-- When attacking with this weapon, choose one of the profiles below
	"type": "",
	"params":
}),
