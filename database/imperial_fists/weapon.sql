INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("imperial_fists", "fist_of_dorn",	-3,	"3",	"0",	"+6",	"Melee",	"1",{}),
("imperial_fists", "dorns_arrow",	-1,	"2",	"24",	"4",	"Assault",	"4",{}),
("imperial_fists", "hand_of_defiance",	-3,	"3",	"0",	"X3",	"Melee",	"1",{
	-- When resolving an attack with this weapon, subtract 1 from the hit roll
	"type": "",
	"params":
}),
