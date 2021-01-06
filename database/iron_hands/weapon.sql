INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("iron_hands", "harrowhand",	-2,	"2",	"0",	"+3",	"Melee",	"1",{}),
("iron_hands", "gorgons_wrath",	-2,	"2",	"36",	"5",	"Heavy",	"3",{}),
("iron_hands", "betrayers_bane___boltgun",	0,	"1",	"24",	"4",	"Rapid Fire",	"1",{}),
("iron_hands", "betrayers_bane___meltagun",	-4,	"D6",	"12",	"8",	"Assault",	"2",{
	-- Each time an attack made with this weapon’s meltagun profile targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("iron_hands", "the_mindforge",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{}),
