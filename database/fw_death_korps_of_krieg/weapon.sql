INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("fw_death_korps_of_krieg", "hot_shot_laspistol",	-2,	"1",	"6",	"3",	"Pistol",	"1",{}),
("fw_death_korps_of_krieg", "engineer_shotgun",	0,	"1",	"12",	"4",	"Assault",	"3",{}),
("fw_death_korps_of_krieg", "savage_claws",	-1,	"1",	"0",	"4",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 2 additional attacks with this weapon and no more than 2 attacks can be made with this weapon.
	"type": "",
	"params":
}),
("fw_death_korps_of_krieg", "death_rider_hunting_lance",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time a melee attack is made with this weapon, if the bearers unit made a charge move this turn, that attack has a Strength characteristic of +2, an Armour Penetration characteristic of -3 and a Damage characteristic of 2.
	"type": "",
	"params":
}),
("fw_death_korps_of_krieg", "krieg_combat_shotgun_(solid_shot)",	0,	"1",	"12",	"4",	"Assault",	"2",{}),
("fw_death_korps_of_krieg", "krieg_combat_shotgun_(carcass_shot)",	0,	"2",	"12",	"*",	"Assault",	"2",{
	-- This weapon wounds on a 2+ unless it is targeting a VEHICLE, in which case it wounds on a 6+. One a hit roll of 1, the bearer is slain after all this weapons shots have been resolved.
	"type": "",
	"params":
}),
("fw_death_korps_of_krieg", "mole_launcher",	-1,	"1",	"24",	"5",	"Heavy",	"D6",{
	-- Blast. This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("fw_death_korps_of_krieg", "gas_bombs",	-2,	"1",	"6",	"2",	"Grenade",	"D6",{
	-- Blast. Each time an attack is made with this weapon, a wound roll of 2+ is always successful, unless the target is a VEHICLE or TITANIC unit.
	"type": "",
	"params":
}),
("fw_death_korps_of_krieg", "melta_bomb",	-4,	"D6",	"4",	"8",	"Grenade",	"1",{}),
("fw_death_korps_of_krieg", "lasgun_array",	0,	"1",	"24",	"3",	"Rapid Fire",	"3",{
	-- This weapon can only be fired if a unit is embarked upon the vehicle equipped with it.
	"type": "",
	"params":
}),
("fw_death_korps_of_krieg", "medical_scalpels",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon against a unit (excluding VEHICLE or TITANIC units), an unmodified wound roll of a 2+ is always successful.
	"type": "",
	"params":
}),
("fw_death_korps_of_krieg", "demolition_charge",	-3,	"D3",	"6",	"8",	"Grenade",	"D6",{
	-- Each demolition charge can only be used once per battle.
	"type": "",
	"params":
}),
("fw_death_korps_of_krieg", "twin_heavy_stubber",	0,	"1",	"36",	"4",	"Heavy",	"6",{}),
