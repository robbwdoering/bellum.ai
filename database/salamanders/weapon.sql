INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("salamanders", "drakkis",	-1,	"1",	"12",	"4",	"Assault",	"D6",{
	-- This weapon hits automatically
	"type": "",
	"params":
}),
("salamanders", "malleus_noctum",	-3,	"4",	"0",	"x2",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, subtract 1 from the hit roll
	"type": "",
	"params":
}),
("salamanders", "gauntlet_of_the_forge",	-1,	"1",	"12",	"5",	"Assault",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("salamanders", "spear_of_vulkan",	-2,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("salamanders", "drake_smiter",	-4,	"3",	"0",	"x2",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, subtract 1 from the hit roll, and on an unmodified wound roll of 6 add 3 to the Damage characteristic of this weapon for that attack.
	"type": "",
	"params":
}),
("salamanders", "wrath_of_prometheus",	-3,	"2",	"30",	"5",	"Rapid Fire",	"1",{}),
("salamanders", "nocturnes_vengeance___boltgun",	-1,	"2",	"24",	"4",	"Rapid Fire",	"1",{}),
("salamanders", "nocturnes_vengeance___flamer",	-1,	"2",	"12",	"4",	"Assault",	"D6",{
	-- When resolving an attack made using the master-crafted flamer profile of this weapon, do not make a hit roll: it automatically scores a hit.
	"type": "",
	"params":
}),
