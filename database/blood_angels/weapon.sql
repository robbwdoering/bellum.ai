INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("blood_angels", "angelus_boltgun",	-1,	"1",	"18",	"4",	"Assault",	"2",{}),
("blood_angels", "encarmine_sword",	-3,	"2",	"0",	"+1",	"Melee",	"1",{}),
("blood_angels", "the_axe_mortalis",	-3,	"2",	"0",	"+3",	"Melee",	"1",{}),
("blood_angels", "furioso_force_halberd",	-3,	"D3+3",	"0",	"+2",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon and no more than 1 attack can be made with this weapon.
	"type": "",
	"params":
}),
("blood_angels", "vitarus",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{}),
("blood_angels", "encarmine_broadsword",	-4,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to the normal damage.
	"type": "",
	"params":
}),
("blood_angels", "the_executioners_axe",	-3,	"3",	"0",	"+2",	"Melee",	"1",{}),
("blood_angels", "heavens_teeth",	-2,	"1",	"0",	"+1",	"Melee",	"1",{}),
("blood_angels", "the_blood_crozius",	-2,	"2",	"0",	"+2",	"Melee",	"1",{}),
("blood_angels", "heavy_frag_cannon",	-1,	"2",	"18",	"7",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("blood_angels", "baal_flamestorm_cannon",	-2,	"2",	"18",	"6",	"Heavy",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("blood_angels", "blood_reaver",	-2,	"3",	"0",	"x2",	"Melee",	"1",{}),
("blood_angels", "encarmine_axe",	-2,	"2",	"0",	"+2",	"Melee",	"1",{}),
("blood_angels", "dead_mans_hand",	-3,	"1",	"0",	"User",	"Melee",	"1",{}),
("blood_angels", "severer",	-2,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, on an unmodified wound roll of 5+ the target suffers 1 mortal wound in addition to any normal damage.
	"type": "",
	"params":
}),
("blood_angels", "hand_flamer",	0,	"1",	"6",	"3",	"Pistol",	"D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("blood_angels", "inferno_pistol",	-4,	"D6",	"6",	"8",	"Pistol",	"1",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("blood_angels", "frag_cannon",	-1,	"1",	"8",	"6",	"Assault",	"2D6",{
	-- This weapon automatically hits its target. Blast.
	"type": "",
	"params":
}),
("blood_angels", "blood_talons",	-2,	"3",	"0",	"+4",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, you can re-roll the wound roll
	"type": "",
	"params":
}),
("blood_angels", "furioso_fist",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("blood_angels", "the_sanguine_sword",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{}),
("blood_angels", "absolvor_bolt_pistol",	-1,	"1",	"16",	"5",	"Pistol",	"1",{}),
("blood_angels", "reductor_pistol",	-3,	"2",	"3",	"4",	"Pistol",	"1",{}),
("blood_angels", "bolt_carbine",	0,	"1",	"24",	"4",	"Assault",	"2",{}),
("blood_angels", "heavy_bolt_pistol",	-1,	"1",	"12",	"4",	"Pistol",	"1",{}),
("blood_angels", "shock_grenade",	*,	"*",	"6",	"*",	"Grenade",	"D3",{
	-- This weapon does not inflict any damage. If an enemy INFANTRY unit is hit by any shock grenades, it is stunned until the end of the turn - it cannot fire Overwatch and your opponent must subtract 1 from any hit rolls made for the unit.
	"type": "",
	"params":
}),
("blood_angels", "auto_boltstorm_gauntlets_(shooting)",	0,	"1",	"18",	"4",	"Assault",	"6",{}),
("blood_angels", "flamestorm_gauntlets_(shooting)",	0,	"1",	"8",	"4",	"Assault",	"2D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("blood_angels", "fragstorm_grenade_launcher",	0,	"1",	"18",	"4",	"Assault",	"D6",{}),
("blood_angels", "auto_boltstorm_gauntlets_(melee)",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("blood_angels", "flamestorm_gauntlets_(melee)",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("blood_angels", "heavy_onslaught_gatling_cannon",	-1,	"1",	"30",	"5",	"Heavy",	"12",{}),
("blood_angels", "icarus_rocket_pod",	-1,	"2",	"24",	"7",	"Heavy",	"D3",{
	-- Add 1 to all hit rolls made for this weapon against targets that can FLY. Subtract 1 from the hit rolls made for this weapon against all other targets.
	"type": "",
	"params":
}),
("blood_angels", "macro_plasma_incinerator,_standard",	-4,	"1",	"36",	"8",	"Heavy",	"D6",{}),
("blood_angels", "macro_plasma_incinerator,_supercharge",	-4,	"2",	"36",	"9",	"Heavy",	"D6",{
	-- For each hit roll of 1, the bearer suffers 1 mortal wound after all of this weapons shots have been resolved.
	"type": "",
	"params":
}),
("blood_angels", "onslaught_gatling_cannon",	-1,	"1",	"24",	"5",	"Heavy",	"6",{}),
("blood_angels", "redemptor_fist",	-3,	"D6",	"0",	"x2",	"Melee",	"1",{}),
("blood_angels", "plasma_exterminator,_standard",	-3,	"1",	"18",	"7",	"Assault",	"D3",{}),
("blood_angels", "plasma_exterminator,_supercharge",	-3,	"2",	"18",	"8",	"Assault",	"D3",{
	-- On a hit roll of 1, the bearer is slain after all of this weapons shots have been resolved.
	"type": "",
	"params":
}),
("blood_angels", "assault_plasma_incinerator,_standard",	-4,	"1",	"24",	"6",	"Assault",	"2",{}),
("blood_angels", "assault_plasma_incinerator,_supercharge",	-4,	"2",	"24",	"7",	"Assault",	"2",{
	-- On a hit roll of 1, the bearer is slain after all of this weapons shots have been resolved.
	"type": "",
	"params":
}),
("blood_angels", "heavy_plasma_incinerator,_standard",	-4,	"1",	"36",	"8",	"Heavy",	"1",{}),
("blood_angels", "heavy_plasma_incinerator,_supercharge",	-4,	"2",	"36",	"9",	"Heavy",	"1",{
	-- On a hit roll of 1, the bearer is slain.
	"type": "",
	"params":
}),
("blood_angels", "auto_bolt_rifle",	0,	"1",	"24",	"4",	"Assault",	"3",{}),
("blood_angels", "stalker_bolt_rifle",	-2,	"2",	"36",	"4",	"Heavy",	"1",{}),
("blood_angels", "icarus_ironhail_heavy_stubber",	-1,	"1",	"36",	"4",	"Heavy",	"3",{
	-- Add 1to all hit rolls made for this weapon against targets that can FLY. Subtract 1 from the hit rolls made for this weapon against all other targets.
	"type": "",
	"params":
}),
("blood_angels", "ironhail_heavy_stubber",	-1,	"1",	"36",	"4",	"Heavy",	"3",{}),
("blood_angels", "krakstorm_grenade_launcher",	-1,	"D3",	"18",	"6",	"Assault",	"1",{}),
("blood_angels", "hammer_of_baal",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("blood_angels", "gallians_staff",	-2,	"D3",	"0",	"+3",	"Melee",	"1",{}),
("blood_angels", "archangels_shard",	-3,	"1",	"0",	"User",	"Melee",	"1",{
	-- If the target is a MONSTER, this weapon has a Damage characteristic of D3. If the target is a DAEMON MONSTER, this weapon has a Damage characteristic of D6 instead.
	"type": "",
	"params":
}),
