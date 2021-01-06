INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("blackstone_fortress", "negotiator_pistol",	-2,	"1",	"12",	"4",	"Pistol",	"2",{}),
("blackstone_fortress", "heirloom_pistol",	-2,	"2",	"12",	"4",	"Pistol",	"1",{
	-- This weapon wounds on a 4+, unless it is targeting a VEHICLE or TITANIC unit, in which case it wounds on a 6+.
	"type": "",
	"params":
}),
("blackstone_fortress", "monomolecular_rapier",	-4,	"1",	"0",	"User",	"Melee",	"1",{}),
("blackstone_fortress", "archeotech_grenade",	-1,	"D3",	"6",	"6",	"Grenade",	"D3",{
	-- You can only use this weapon once per battle. Blast.
	"type": "",
	"params":
}),
("blackstone_fortress", "force_orb_cane",	0,	"D3",	"0",	"User",	"Melee",	"1",{}),
("blackstone_fortress", "mk_i_assault_cannon",	-1,	"1",	"24",	"5",	"Heavy",	"4",{}),
("blackstone_fortress", "power_claw",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("blackstone_fortress", "drone_pulse",	0,	"1",	"18",	"3",	"Pistol",	"1",{}),
