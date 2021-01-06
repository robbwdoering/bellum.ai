INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("dark_angels", "sword_of_secrets",	-4,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to the normal damage.
	"type": "",
	"params":
}),
("dark_angels", "master_crafted_boltgun",	-1,	"2",	"24",	"4",	"Rapid fire",	"1",{}),
("dark_angels", "master_crafted_plasma_gun",	-4,	"2",	"24",	"8",	"Rapid fire",	"1",{}),
("dark_angels", "sword_of_silence",	-4,	"3",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon against a unit that is not a Vehicle, an unmodified wound roll of 2+ is always successful.
	"type": "",
	"params":
}),
("dark_angels", "raven_sword",	-4,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, if the bearer made a charge move this turn, that attack has a Strength characteristic of x2.
	"type": "",
	"params":
}),
("dark_angels", "blades_of_reason",	0,	"2D3",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon and no more than 1 attack can be made with this weapon.
	"type": "",
	"params":
}),
("dark_angels", "traitors_bane",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack made with this weapon is allocated to a Fallen or Heretic Astartes unit, that attack has a Damage characteristic of 3.
	"type": "",
	"params":
}),
("dark_angels", "the_deliverer",	-1,	"2",	"12",	"4",	"Pistol",	"1",{}),
("dark_angels", "halberd_of_caliban",	-4,	"2",	"0",	"+3",	"Melee",	"1",{
	-- Each time the bearer fights, if it is within Engagement Range of an enemy unit that contains 10 or more models, it can make 3 additional attacks with this weapon that must target a unit that contains 10 or more models.
	"type": "",
	"params":
}),
("dark_angels", "mace_of_absolution",	-2,	"3",	"0",	"x2",	"Melee",	"1",{}),
("dark_angels", "flail_of_the_unforgiven",	-3,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Excess damage from this weapon is not lost; instead keep allocating damage to another model in the target unit until either all the damage has been allocated or the target unit is destroyed.
	"type": "",
	"params":
}),
("dark_angels", "corvus_hammer",	-1,	"2",	"0",	"+1",	"Melee",	"1",{}),
("dark_angels", "plasma_talon_(standard)",	-3,	"1",	"18",	"7",	"Assault",	"2",{}),
("dark_angels", "plasma_talon_(overcharge)",	-3,	"2",	"18",	"8",	"Assault",	"2",{
	-- On a hit roll of 1, the bearer is slain after all shots from this weapon have been resolved.
	"type": "",
	"params":
}),
("dark_angels", "frag_shell",	0,	"1",	"30",	"3",	"Assault",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("dark_angels", "krak_shell",	-1,	"D3",	"30",	"6",	"Assault",	"1",{}),
("dark_angels", "blacksword_missile_launcher",	-3 ,	"2",	"36",	"7",	"Heavy",	"1",{
	-- Each time an attack made with this weapon is allocated to an Aircraftmodel, that attack has a Damage characteristic of 4
	"type": "",
	"params":
}),
("dark_angels", "avenger_mega_bolter",	-1,	"2",	"36",	"5",	"Heavy",	"10",{}),
("dark_angels", "rift_cannon",	*,	"*",	"18",	"12",	"Heavy",	"D3",{
	-- Blast. Each time an attack made with this weapon successfully wounds, do not make a saving throw: the target suffers 3 mortal wounds and the attack sequence ends. 
	"type": "",
	"params":
}),
("dark_angels", "plasma_storm_battery_(standard)",	-3,	"2",	"36",	"8",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("dark_angels", "plasma_storm_battery_(overcharge)",	-3,	"3",	"36",	"9",	"Heavy",	"2D3",{
	-- Blast. Each time an unmodified hit roll of 1 is made for an attack with this weapon profile, the bearer suffers 1 mortal wound after shooting with this weapon
	"type": "",
	"params":
}),
("dark_angels", "monster_slayer_of_caliban",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- Add 1 to wound rolls targeting an enemy MONSTER or enemy VEHICLE
	"type": "",
	"params":
}),
("dark_angels", "mace_of_redemption",	-3,	"D3",	"0",	"+3",	"Melee",	"1",{
	-- Re-roll all failed wound rolls made for this weapon against HERETIC ASTARTESunits
	"type": "",
	"params":
}),
("dark_angels", "plasma_blaster_(standard)",	-3,	"1",	"18",	"7",	"Assault",	"2",{
	-- When attacking with this weapon, you can shoot either the boltgun, the plasma blaster, or both. If you fire both, subtract 1 from all hit rolls made for this weapon. In either case, each time you fire the plasma blaster, choose either the standard or supercharge profile; if you roll any hit rolls of 1 when firing a supercharged plasma blaster, the bearer is slain after all the weapon’s shots have been resolved
	"type": "",
	"params":
}),
("dark_angels", "plasma_blaster_(supercharge)",	-3,	"2",	"18",	"8",	"Assault",	"2",{
	-- When attacking with this weapon, you can shoot either the boltgun, the plasma blaster, or both. If you fire both, subtract 1 from all hit rolls made for this weapon. In either case, each time you fire the plasma blaster, choose either the standard or supercharge profile; if you roll any hit rolls of 1 when firing a supercharged plasma blaster, the bearer is slain after all the weapon’s shots have been resolved
	"type": "",
	"params":
}),
("dark_angels", "foe_smiter",	-1,	"2",	"24",	"4",	"Rapid Fire",	"2",{}),
("dark_angels", "blade_of_burden",	-4,	"2",	"0",	"+2",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, an unmodified wound roll of 6 inflicts 2 mortal wounds on the target and the attack sequence ends.
	"type": "",
	"params":
}),
("dark_angels", "twin_storm_bolter",	0,	"1",	"24",	"4",	"Rapid fire",	"4",{}),
("dark_angels", "heavenfall_blade",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- Each time the bearer fights, it can make one additional attack with this weapon.
	"type": "",
	"params":
}),
("dark_angels", "master_crafted_plasma_cannon",	-4,	"2",	"36",	"8",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("dark_angels", "emnitys_edge",	-4,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack made with this weapon is allocated to a Psyker model, that attack has a Damage characteristic of 4. 
	"type": "",
	"params":
}),
("dark_angels", "master_crsfted_storm_bolter",	-1,	"2",	"24",	"4",	"Rapud Fire",	"2",{}),
("dark_angels", "blade_of_caliban",	-3,	"D3",	"0",	"+3",	"Melee",	"1",{}),
