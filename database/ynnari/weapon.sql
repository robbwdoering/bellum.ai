INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("ynnari", "kha_vir,_the_sword_of_sorrows.",	-2,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("ynnari", "vilith_zhar,_the_sword_of_souls",	-4,	"D6",	"0",	"User",	"Melee",	"1",{
	-- You can re-roll failed wound rolls for this weapon.
	"type": "",
	"params":
}),
("ynnari", "asu_var,_the_sword_of_silent_screams",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- Enemy units that suffer any unsaved wounds from this weapon subtract 1 from their Leadership until the end of the turn.
	"type": "",
	"params":
}),
("ynnari", "huskblade",	-2,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("ynnari", "star_glaive",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("ynnari", "shuriken_pistol",	0,	"1",	"12",	"4",	"Pistol",	"1",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("ynnari", "hungering_blade",	-3,	"2",	"0",	"+3",	"Melee",	"1",{
	-- Each unmodified wound roll of 6 made for an attack with this weapon inflicts 1 mortal wound in addition to the normal damage.
	"type": "",
	"params":
}),
("ynnari", "song_of_ynnead",	-1,	"1",	"18",	"5",	"Pistol",	"3",{
	-- Each time you make a wound roll of 6+ for this weapon, that attack is resolved with an AP of -3. Each time an attack made with this weapon slays an enemy model the target unit subtracts 1 from its Leadership characteristic until the end of the turn.
	"type": "",
	"params":
}),
