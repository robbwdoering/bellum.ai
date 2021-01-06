INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("officio_assassinorum", "neural_shredder",	*,	"*",	"9",	"*",	"Assault",	"1",{
	-- When resolving an attack with this weapon, if a hit is scored, do not make a wound roll: instead roll 3D6; if the result is equal to or greater than the target unit’s highest Leadership characteristic, it suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("officio_assassinorum", "phase_sword",	-3,	"2",	"0",	"User",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, an invulnerable saving throw cannot be made.
	"type": "",
	"params":
}),
("officio_assassinorum", "poison_blades",	-1,	"1",	"0",	"*",	"Melee",	"1",{
	-- When the bearer fights, it makes 1 additional attack with this weapon. Attacks made with this weapon wound on a 3+ unless the target is a VEHICLE unit.
	"type": "",
	"params":
}),
("officio_assassinorum", "animus_speculum",	-4,	"1",	"18",	"5",	"Assault",	"D3",{
	-- Whilst there are any enemy PSYKER units within 18 of the bearer, change this weapon’s Type characteristic to Assault D6.
	"type": "",
	"params":
}),
("officio_assassinorum", "psyk_out_grenades",	0,	"1",	"6",	"2",	"Grenade",	"D3",{
	-- When resolving an attack made with this weapon against a PSYKER or DAEMON unit, a hit roll of 6+ inflicts 1 mortal wound on the target and the attack sequence ends. Blast.
	"type": "",
	"params":
}),
("officio_assassinorum", "melta_bombs",	-4,	"D6",	"4",	"8",	"Grenade",	"1",{
	-- You can re-roll failed wound rolls for this weapon if the target is a VEHICLE
	"type": "",
	"params":
}),
("officio_assassinorum", "executioner_pistol",	-1,	"1",	"12",	"4",	"Pistol",	"4",{
	-- You can re-roll wound rolls for attacks made with this weapon that target INFANTRY units.
	"type": "",
	"params":
}),
("officio_assassinorum", "neuro_gauntlet",	-1,	"1",	"0",	"+1",	"Melee",	"1",{
	-- You can re-roll wound rolls for attacks made with this weapon.
	"type": "",
	"params":
}),
("officio_assassinorum", "blind_grenades",	*,	"*",	"12",	"*",	"Grenade",	"D6",{
	-- This weapon does not inflict any damage (do not make any wound rolls). Instead, if a unit is hit by any blind grenades, subtract 1 from all hit rolls for attacks made by that unit until the end of the turn. Blast.
	"type": "",
	"params":
}),
("officio_assassinorum", "exitus_rifle",	-3,	"D3",	"72",	"5",	"Heavy",	"1",{
	-- When resolving an attack made with this weapon, an invulnerable saving throw cannot be made. Attacks made with this weapon wound INFANTRY units on a 2+.
	"type": "",
	"params":
}),
("officio_assassinorum", "exitus_pistol",	-3,	"D3",	"12",	"4",	"Pistol",	"1",{
	-- When resolving an attack made with this weapon, an invulnerable saving throw cannot be made. Attacks made with this weapon wound INFANTRY units on a 2+.
	"type": "",
	"params":
}),
