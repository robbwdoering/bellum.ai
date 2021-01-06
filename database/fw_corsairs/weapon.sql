INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("fw_corsairs", "bladevanes",	-1,	"1",	"0",	"4",	"Melee",	"1",{}),
("fw_corsairs", "bright_lance",	-4,	"D6",	"36",	"8",	"Heavy",	"1",{}),
("fw_corsairs", "pulse_laser",	-3,	"3",	"48",	"8",	"Heavy",	"2",{}),
("fw_corsairs", "starcannon",	-3,	"D3",	"36",	"6",	"Heavy",	"2",{}),
("fw_corsairs", "twin_splinter_rifle",	0,	"1",	"24",	"*",	"Rapid Fire",	"2",{
	-- Poisoned Weapon (pg 87)
	"type": "",
	"params":
}),
("fw_corsairs", "shuriken_cannon",	0,	"1",	"24",	"6",	"Assault",	"3",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("fw_corsairs", "(aml)_starshot_missile",	-2,	"D6",	"48",	"8",	"Heavy",	"1",{}),
("fw_corsairs", "(aml)_sunburst_missile",	-1,	"1",	"48",	"4",	"Heavy",	"D6",{}),
("fw_corsairs", "fusion_gun",	-4,	"D6",	"12",	"8",	"Assault",	"1",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("fw_corsairs", "lasblaster",	0,	"1",	"24",	"3",	"Assault",	"4",{}),
("fw_corsairs", "scatter_laser",	0,	"1",	"36",	"6",	"Heavy",	"4",{}),
("fw_corsairs", "shuriken_catapult",	0,	"1",	"12",	"4",	"Assault",	"2",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("fw_corsairs", "sunburst_grenade",	-1,	"1",	"6",	"4",	"Grenade",	"D6",{}),
("fw_corsairs", "twin_shuriken_catapult",	0,	"1",	"12",	"4",	"Assault",	"4",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("fw_corsairs", "shardcarbine",	0,	"1",	"18",	"*",	"Assault",	"3",{
	-- This weapon wounds on a 4+, unless it is targeting a VEHICLE, in which case it wounds on a 6+.
	"type": "",
	"params":
}),
("fw_corsairs", "splinter_cannon",	0,	"1",	"36",	"*",	"Rapid Fire",	"3",{
	-- This weapon wounds on a 4+, unless it is targeting a VEHICLE in which case it wounds on a 6+.
	"type": "",
	"params":
}),
("fw_corsairs", "dark_lance",	-4,	"D6",	"36",	"8",	"Heavy",	"1",{
	-- Change the weapons Type from Heavy to Assault if it is equipped on a VEHICLE.
	"type": "",
	"params":
}),
("fw_corsairs", "shredder",	-1,	"1",	"12",	"6",	"Assault",	"D6",{
	-- When attacking a unit of INFANTRY, you can re-roll failed wound rolls for this weapon. 
	"type": "",
	"params":
}),
("fw_corsairs", "spar_glaive",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- A model attacking with this weapon in the Fight phase gains a single bonus attack that must be resolved with this profile.
	"type": "",
	"params":
}),
("fw_corsairs", "brace_of_pistols",	0,	"1",	"8",	"*",	"Pistol",	"D6",{
	-- When firing this weapon, roll once to determine how many shots all models in the unit will fire in a given phase; this weapon always wounds on a 4+, unless targeting a model with the VEHICLE keyword, in which case it wounds on a 6+. Each time you make a Wound roll of 6, that wound is resolved with an AP of -1.
	"type": "",
	"params":
}),
("fw_corsairs", "void_sabre",	-3,	"1",	"0",	"User",	"Melee",	"1",{}),
("fw_corsairs", "blaster",	-4,	"D6",	"18",	"8",	"Assault",	"1",{}),
("fw_corsairs", "dissonance_pistol",	-2,	"1",	"12",	"5",	"Pistol",	"1",{
	-- Each time you make a hit roll of 6+ for this weapon, that hit is resolved with a Strength of 6 and an AP of -3 instead of Strength 5 and AP -2.
	"type": "",
	"params":
}),
("fw_corsairs", "dissonance_cannon",	-2,	"1",	"24",	"5",	"Heavy",	"2",{
	-- Each time you make a hit roll of 6+ for this weapon, that hit is resolved with a Strength of 6 and an AP of -3 instead of Strength 5 and AP -2.
	"type": "",
	"params":
}),
