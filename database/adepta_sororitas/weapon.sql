INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("adepta_sororitas", "blessed_blade",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("adepta_sororitas", "exorcist_missile_launcher",	-3,	"D6",	"48",	"8",	"Heavy",	"3D3",{
	-- Blast
	"type": "",
	"params":
}),
("adepta_sororitas", "exorcist_conflagration_rockets",	-2,	"1",	"48",	"5",	"Heavy3D6",	"1",{
	-- Blast
	"type": "",
	"params":
}),
("adepta_sororitas", "penitent_eviscerator",	-3,	"2",	"0",	"x2",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("adepta_sororitas", "the_redeemer",	-1,	"1",	"24",	"4",	"Assault",	"2",{
	-- Any attacks with a wound roll of 6+ for this weapon have a Damage characteristic of 2 instead of 1.
	"type": "",
	"params":
}),
("adepta_sororitas", "neural_whips",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- When resolving an attack made with this weapon against a unit (other than a VEHICLE unit) in which no model has a Leadership characteristic higher than 7, add 1 to the wound roll.
	"type": "",
	"params":
}),
("adepta_sororitas", "arco_flails",	-1,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Make D3 hit rolls for each attack with this weapon instead of 1.
	"type": "",
	"params":
}),
("adepta_sororitas", "death_cult_power_blades",	-3,	"1",	"0",	"User",	"Melee",	"1",{}),
("adepta_sororitas", "immolation_flamer",	-1,	"1",	"12",	"5",	"Assault",	"2D6",{
	-- When resolving an attack made with this weapon, do not make a hit roll: it automatically scores a hit.
	"type": "",
	"params":
}),
("adepta_sororitas", "the_ardent_blade_(melee)",	-3,	"2",	"0",	"+4",	"Melee",	"1",{}),
("adepta_sororitas", "the_ardent_blade_(shooting)",	-1,	"1",	"8",	"5",	"Assault",	"D6",{
	-- When resolving an attack made with this weapon, do not make a hit roll: it automatically scores a hit.
	"type": "",
	"params":
}),
("adepta_sororitas", "dialogus_staff",	0,	"1",	"0",	"+1",	"Melee",	"1",{}),
("adepta_sororitas", "chirurgeons_tools",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("adepta_sororitas", "dozer_ram",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Against INFANTRY units make three hit rolls for each attack rather than one if the Sororitas Repressor has successfully completed a charge this turn
	"type": "",
	"params":
}),
("adepta_sororitas", "servo_stubber",	0,	"1",	"12",	"4",	"Pistol",	"3",{}),
("adepta_sororitas", "vindictor_(melee)",	-1,	"1",	"0",	"+1",	"Melee",	"1",{}),
("adepta_sororitas", "vindictor_(shooting)",	-1,	"1",	"8",	"5",	"Assault",	"D6",{
	-- This weapon automatically hits its target. If the target is a CHAOS unit, roll two D6 to determine the number of attacks made with this weapon and discard the lowest result.
	"type": "",
	"params":
}),
("adepta_sororitas", "the_martyrs_sword",	-3,	"2",	"0",	"+3",	"Melee",	"1",{
	-- When the bearer fights, no more than 4 attacks can be made with this weapon.
	"type": "",
	"params":
}),
("adepta_sororitas", "relic_weapons",	-1,	"1",	"0",	"+2",	"Melee",	"1",{}),
("adepta_sororitas", "the_mace_of_castigation",	-1,	"2",	"0",	"+2",	"Melee",	"1",{}),
("adepta_sororitas", "penitent_buzz_blades",	-3,	"2",	"0",	"+3",	"Melee",	"1",{
	-- If the bearer is equipped with two of this weapon, then when the bearer fights, it makes 1 additional attack using this profile.
	"type": "",
	"params":
}),
("adepta_sororitas", "penitent_flails",	-2,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Make three hit rolls for each attack made with this weapon instead of one. If the bearer is equipped with two of this weapon, then when the bearer fights it makes one additional attack using this profile.
	"type": "",
	"params":
}),
("adepta_sororitas", "mace_of_valaan",	-3,	"2",	"0",	"+2",	"Melee",	"1",{}),
("adepta_sororitas", "relic:_annunciation_of_the_creed",	-2,	"D3",	"24",	"5",	"Rapid Fire",	"1",{
	-- ORDER OF THE EBON CHALICE model equipped with a condemnor boltgun only. This relic replaces a condemnor boltgun and has the following profile
	"type": "",
	"params":
}),
("adepta_sororitas", "relic:_beneficence",	-2,	"2",	"0",	"+1",	"Melee",	"1",{
	-- When this bearer fights, it makes 3 additional attacks with this weapon
	"type": "",
	"params":
}),
("adepta_sororitas", "blade_of_admonition",	-3,	"3",	"0",	"+2",	"Melee",	"1",{}),
("adepta_sororitas", "relic:_martyrs_vengeance",	-4,	"D6",	"12",	"9",	"Pistol",	"1",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("adepta_sororitas", "relic:_wrath_of_the_emperor",	-2,	"2",	"18",	"5",	"Pistol",	"4",{}),
("adepta_sororitas", "hand_flamer",	0,	"1",	"12",	"3",	"Pistol",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
