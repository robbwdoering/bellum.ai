INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("harlequins", "fusion_pistol",	-4,	"D6",	"6",	"8",	"Pistol",	"1",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("harlequins", "harlequins_blade",	0,	"1",	"0",	"User",	"Melee",	"1",{}),
("harlequins", "plasma_grenade",	-1,	"1",	"6",	"4",	"Grenade",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("harlequins", "shuriken_cannon",	0,	"1",	"24",	"6",	"Assault",	"3",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3.
	"type": "",
	"params":
}),
("harlequins", "shrieker_cannon_(shrieker)",	-1,	"1",	"24",	"6",	"Assault",	"1",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3. If an INFANTRY model is slain by an attack made with this weapon, then its unit suffers D3 mortal wounds. If any models in a unit are slain by this weapon, subtract 2 from that units Leadership characteristic until the end of the turn.
	"type": "",
	"params":
}),
("harlequins", "shrieker_cannon_(shuriken)",	0,	"1",	"24",	"6",	"Assault",	"3",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3.
	"type": "",
	"params":
}),
("harlequins", "prismatic_cannon_(dispersed)",	-2,	"1",	"24",	"4",	"Assault",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("harlequins", "prismatic_cannon_(lance)",	-4,	"D6",	"24",	"8",	"Assault",	"1",{}),
("harlequins", "prismatic_cannon_(focused)",	-3,	"D3",	"24",	"6",	"Assault",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("harlequins", "neuro_disruptor",	-3,	"D3",	"12",	"4",	"Pistol",	"1",{
	-- If the target is a VEHICLE, this weapon has a Damage of 1.
	"type": "",
	"params":
}),
("harlequins", "haywire_cannon",	-1,	"1",	"24",	"4",	"Assault",	"D6",{
	-- Blast. If the target is a VEHICLE and you roll a wound roll of 4+ for this weapon, the target suffers 1 mortal wound in addition to any other damage. If the wound roll is 6+, the target suffers D3 mortal wounds instead.
	"type": "",
	"params":
}),
("harlequins", "hallucinogen_grenade_launcher",	*,	"*",	"18",	"*",	"Assault",	"1",{
	-- If a unit is hit by this weapon, roll 2D6 - if the roll is equal to or greater than the target units Leadership, it suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("harlequins", "zephyrglaive",	-2,	"2",	"0",	"+1",	"Melee",	"1",{}),
("harlequins", "miststave",	-1,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("harlequins", "harlequins_kiss",	-1,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("harlequins", "harlequins_embrace",	-3,	"1",	"0",	"+1",	"Melee",	"1",{}),
("harlequins", "harlequins_caress",	-2,	"1",	"0",	"+2",	"Melee",	"1",{}),
("harlequins", "star_bolas",	-3,	"2",	"12",	"6",	"Grenade",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("harlequins", "the_storied_sword",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{
	-- Re-roll failed hit rolls for this weapon.
	"type": "",
	"params":
}),
("harlequins", "crescendo",	0,	"2",	"12",	"4",	"Pistol",	"D6",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3
	"type": "",
	"params":
}),
("harlequins", "the_mirrorstave_(shooting)",	-1,	"1",	"12",	"*",	"Assault",	"6",{
	-- The wound roll required for this weapon in the shooting phase is equal to the target units unmodified ballistic skill. For example, if the weapon targets a unit with ballistic skill of 3+, the weapon will wound on rolls of 3+. The wound roll required for this weapon in the Fight phase is equal to the target units unmodified weapon skill. If the unit contains models with different Ballistic Skill/Weapon Skill characteristics, use the best characteristic in the unit. If the targets characteristic is -, then the wound roll required is 6+
	"type": "",
	"params":
}),
("harlequins", "the_mirrorstave_(melee)",	-1,	"D3",	"0",	"*",	"Melee",	"1",{
	-- The wound roll required for this weapon in the shooting phase is equal to the target units unmodified ballistic skill. For example, if the weapon targets a unit with ballistic skill of 3+, the weapon will wound on rolls of 3+. The wound roll required for this weapon in the Fight phase is equal to the target units unmodified weapon skill. If the unit contains models with different Ballistic Skill/Weapon Skill characteristics, use the best characteristic in the unit. If the targets Ballistic Skill/Weapon Skill characteristic is -, then the wound roll required is 6+.
	"type": "",
	"params":
}),
("harlequins", "curtainfall_(shrieker)",	-3,	"1",	"30",	"7",	"Assault",	"1",{
	-- When attacking with this weapon, choose one of the profiles. Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -4. Each time an INFANTRY model is slain by an attack made with this weapons shrieker profile, its unit suffers D3 mortal wounds. If any models in a unit are slain by this weapon, subtract 2 from that units Leadership characteristic until the end of the turn; this modifier is not cumulative with that caused by a shrieker cannon.
	"type": "",
	"params":
}),
("harlequins", "curtainfall_(shuriken)",	-2,	"1",	"30",	"7",	"Assault",	"3",{
	-- When attacking with this weapon, choose one of the profiles. Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -4. If any models in a unit are slain by this weapon, subtract 2 from that units Leadership characteristic until the end of the turn; this modifier is not cumulative with that caused by a shrieker cannon.
	"type": "",
	"params":
}),
("harlequins", "cegorachs_rose",	-1,	"D3",	"0",	"+1",	"Melee",	"1",{
	-- Re-roll failed wound rolls for this weapon. When attacking Infantry, this weapon has a Damage of 3.
	"type": "",
	"params":
}),
("harlequins", "cegroachs_lament_(shuriken)",	-3,	"1",	"36",	"6",	"Assault",	"3",{}),
("harlequins", "cegroachs_lament_(wail)",	-3,	"3",	"36",	"6",	"Assault",	"1",{}),
("harlequins", "cegroachs_lament",	,	"",	"0",	"",	"",	"1",{
	-- Before selecting targets, select one of the following profiles to make attacks with. Each time a model is slain by an attack made with the Wail profile of this weapon, its unit suffers D3 mortal wounds, and until the end of the next turn, subtract 2 from the leadership characteristic of the unit.
	"type": "",
	"params":
}),
("harlequins", "the_twilight_fang",	-3,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time the bearer fights, it makes a number of additional attacks with this weapon equal to the current battle round number
	"type": "",
	"params":
}),
