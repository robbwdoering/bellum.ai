INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("elucidian_starstriders", "monomolecular_cane_rapier",	-4,	"1",	"0",	"User",	"Melee",	"1",{}),
("elucidian_starstriders", "heirloom_pistol",	-2,	"2",	"12",	"4",	"Pistol",	"1",{}),
("elucidian_starstriders", "dartmask",	-1,	"1",	"9",	"1",	"Pistol",	"1",{
	-- This weapon always wounds on the roll of a 2+, unless the target is a VEHICLE or TITANIC unit.
	"type": "",
	"params":
}),
("elucidian_starstriders", "death_cult_power_blade",	-2,	"1",	"0",	"User",	"Melee",	"1",{}),
("elucidian_starstriders", "voltaic_pistol",	0,	"1",	"12",	"5",	"Pistol",	"1",{
	-- Each unmodified ht roll of 6 for an attack with this weapon scores 3 hits.
	"type": "",
	"params":
}),
("elucidian_starstriders", "scalpel_claw",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("elucidian_starstriders", "artificer_shotgun",	0,	"2",	"12",	"4",	"Assault",	"2",{
	-- If the target is within half range, add 1 to this weapons Strength characteristic.
	"type": "",
	"params":
}),
("elucidian_starstriders", "rotor_cannon",	-1,	"2",	"24",	"4",	"Heavy",	"4",{}),
("elucidian_starstriders", "concussion_grenade",	0,	"1",	"6",	"3",	"Grenade",	"D3",{
	-- Each time an attack is made with this weapon that targets a unit within 1 of any Obstacles or Area Terrain features, add 1 to the Strength and Damage characteristics of that attack.
	"type": "",
	"params":
}),
