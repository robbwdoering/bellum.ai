INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("craftworlds", "staff_of_ulthamar",	-2,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("craftworlds", "the_eye_of_wrath",	-2,	"1",	"3",	"6",	"Pistol",	"D6",{
	-- This weapon can only be fired once per battle.
	"type": "",
	"params":
}),
("craftworlds", "the_spear_of_twilight",	-2,	"D3",	"0",	"User",	"Melee",	"1",{
	-- This weapon always wounds on a roll of 2+
	"type": "",
	"params":
}),
("craftworlds", "voidbringer",	-3,	"3",	"48",	"4",	"Heavy",	"1",{
	-- Each time you select a target for this weapon, you can ignore the Look Out, Sir rule. This weapon wounds on a 2+, unless it is targeting a VEHICLE. Each time you roll a wound roll of 6+ for this weapon, it inflicts a mortal wound in addition to any other damage.
	"type": "",
	"params":
}),
("craftworlds", "the_sword_of_asur",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{
	-- Each time you make a wound roll of 6+ for this weapon, the target suffers D3 mortal wounds in addition to any other damage.
	"type": "",
	"params":
}),
("craftworlds", "blade_of_destruction",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("craftworlds", "silent_death",	-3,	"1",	"12",	"User",	"Assault",	"4",{}),
("craftworlds", "fire_axe",	-4,	"D3",	"0",	"User",	"Melee",	"1",{}),
("craftworlds", "the_shining_blade",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{
	-- If a unit suffers any unsaved wounds from this weapon, your opponent must subtract 1 from that units hit rolls until the end of the turn.
	"type": "",
	"params":
}),
("craftworlds", "the_maugetar_(shooting)___shrieker",	-1,	"1",	"36",	"6",	"Assault",	"1",{
	-- If an INFANTRY model is slain by an attack made with this weapon, its unit suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("craftworlds", "the_maugetar_(shooting)___shuriken",	-1,	"1",	"36",	"6",	"Assault",	"4",{}),
("craftworlds", "the_maugetar___scythe_blade",	-2,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("craftworlds", "the_maugetar_(shooting)",	,	"",	"0",	"",	"",	"1",{
	-- When attacking with this weapon, choose one of the profiles below. Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of -1.
	"type": "",
	"params":
}),
("craftworlds", "the_wailing_doom_(shooting)",	-4,	"D6",	"12",	"8",	"Assault",	"1",{
	-- Roll two dice when inflicting damage with this weapon and discard the lowest result.
	"type": "",
	"params":
}),
("craftworlds", "the_wailing_doom_(melee)",	-4,	"D6",	"0",	"+2",	"Melee",	"1",{
	-- Roll two dice when inflicting damage with this weapon and discard the lowest result.
	"type": "",
	"params":
}),
("craftworlds", "powerblades",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("craftworlds", "paragon_blade",	-4,	"1",	"0",	"User",	"Melee",	"1",{
	-- You can re-roll failed hit and wound rolls for this weapon.
	"type": "",
	"params":
}),
("craftworlds", "voidstorm_missile_launcher",	-3,	"2",	"48",	"8",	"Heavy",	"2D6",{}),
("craftworlds", "phantom_pulsar",	-4,	"5",	"120",	"14",	"Heavy",	"8",{}),
("craftworlds", "d_bombard",	-5,	"8",	"72",	"16",	"Heavy",	"2D3",{
	-- Blast. Each time an attack is made with this weapon, on an unmodified wound roll of 4+, the target suffers 3 mortal wounds in addition to any normal damage.
	"type": "",
	"params":
}),
("craftworlds", "wraith_glaive",	-5,	"12",	"0",	"x2",	"Melee",	"1",{}),
("craftworlds", "spear_of_starlight_(shooting)",	-4,	"3",	"24",	"8",	"Assault",	"3",{}),
("craftworlds", "spear_of_starlight_(melee)",	-3,	"2",	"0",	"+1",	"Melee",	"1",{}),
("craftworlds", "cloudburst_missile_launcher",	-2,	"2",	"36",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("craftworlds", "revenant_pulsar",	-4,	"4",	"60",	"12",	"Heavy",	"6",{}),
("craftworlds", "inferno_lance",	-4,	"D6",	"24",	"8",	"Heavy",	"D6",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("craftworlds", "deathshroud_cannon_(dispersed)",	0,	"1",	"12",	"7",	"Heavy",	"2D6",{
	-- Blast. Each time an attack is made with this weapon profile, that attack automatically hits the target and on an unmodified wound roll of 5+, that attack has an Armour Penetration characteristic of -4.
	"type": "",
	"params":
}),
("craftworlds", "deathshroud_cannon_(focused)",	-2,	"2",	"48",	"8",	"Heavy",	"D6",{
	-- Blast. Each time an attack is made with this weapon profile, on an unmodified wound roll of 5+, that attack has an Armour Penetration characteristic of -4.
	"type": "",
	"params":
}),
("craftworlds", "twin_vampire_pulsar",	-4,	"D6",	"60",	"12",	"Heavy",	"4D6",{
	-- Any Wound rolls of 6+ made with this weapon are resolved with a Damage characteristic of 2D6 rather than D6. Blast.
	"type": "",
	"params":
}),
("craftworlds", "phoenix_pulse_laser",	-3,	"3",	"48",	"9",	"Heavy",	"2",{}),
("craftworlds", "phoenix_missile_array",	-3,	"2",	"48",	"6",	"Heavy",	"D6",{}),
("craftworlds", "nightfire_missile_array",	-1,	"1",	"48",	"4",	"Heavy",	"2D6",{
	-- If a unit suffers any unsaved wounds from this weapon, your opponent must subtract 1 from their hit rolls until the end of the turn.
	"type": "",
	"params":
}),
("craftworlds", "d_impaler",	-5,	"6",	"36",	"16",	"Heavy",	"2D3",{
	-- Blast. Each time an attack is made with this weapon, on an unmodified wound roll of 4+, the target suffers D3 mortal wounds in addition to any normal damage.
	"type": "",
	"params":
}),
("craftworlds", "twin_scorpion_pulsar",	-4,	"3",	"60",	"12",	"Heavy",	"12",{}),
("craftworlds", "lynx_pulsar",	-3,	"3",	"48",	"9",	"Heavy",	"6",{}),
("craftworlds", "sonic_lance",	-3,	"1",	"18",	"4",	"Heavy",	"3D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target, and a wound roll of 2+ is always sucessful, unless the target is a VEHICLE or MONSTER, then a wound roll of 4+ is always sucessful.
	"type": "",
	"params":
}),
("craftworlds", "d_flail_(blast)",	-4,	"D3+3",	"24",	"12",	"Heavy",	"D3",{
	-- Blast. This weapon profile can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("craftworlds", "d_flail_(rift)",	-4,	"D6",	"12",	"12",	"Heavy",	"3",{
	-- Each time an attack is made with this weapon profile, that attack automatically hits the target.
	"type": "",
	"params":
}),
("craftworlds", "hornet_pulse_laser",	-2,	"2",	"36",	"7",	"Heavy",	"2",{}),
("craftworlds", "ghostspear",	-3,	"D3+3",	"0",	"+3",	"Melee",	"1",{}),
("craftworlds", "power_blade",	-2,	"1",	"0",	"User",	"Melee",	"1",{}),
("craftworlds", "psytronome_shaper",	0,	"D3",	"0",	"User",	"Melee",	"1",{}),
("craftworlds", "kurnous_bow",	0,	"2",	"12",	"4",	"Pistol",	"1",{
	-- Each time you make a wound roll of 4+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "shard_of_anaris",	-3,	"D3",	"0",	"User",	"Melee",	"1",{
	-- You can re-roll failed wound rolls for this weapon.
	"type": "",
	"params":
}),
("craftworlds", "firesabre",	-4,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Each time you make a wound roll of 6+ for this weapon, it inflicts a mortal wound on the target instead of the normal damage.
	"type": "",
	"params":
}),
("craftworlds", "the_burnished_blade_of_elliarna",	-3,	"2",	"0",	"User",	"Melee",	"1",{
	-- Add 1 to this weapons Strength and Damage characteristics for any attack made for it that targets an ORK unit.
	"type": "",
	"params":
}),
("craftworlds", "the_novalance_of_saim_hann_(shooting)",	-4,	"2",	"12",	"6",	"Assault",	"1",{}),
("craftworlds", "the_novalance_of_saim_hann_(melee)",	-4,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Attacks with this weapon in the Fight phase are made at Strength 8 if the bearer charged in the same turn. In addition, if the wound roll for an attack made with this weapon is 6+, add 2 to the damage inflicted by that attack.
	"type": "",
	"params":
}),
("craftworlds", "warp_spawn_bane",	0,	"2",	"0",	"User",	"Melee",	"1",{
	-- This weapon always wounds on a roll of 2+. In addition, ignore invulnerable saves for attacks made by this weapon that target enemy PSYKERS or DAEMONS.
	"type": "",
	"params":
}),
("craftworlds", "howling_skysword_of_galaleth",	0,	"3",	"0",	"User",	"Melee",	"1",{
	-- This weapon always wounds on a roll of 2+.
	"type": "",
	"params":
}),
("craftworlds", "shuriken_cannon",	0,	"1",	"24",	"6",	"Assault",	"3",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "shuriken_pistol",	0,	"1",	"12",	"4",	"Pistol",	"1",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "witchblade",	0,	"D3",	"0",	"User",	"Melee",	"1",{
	-- This weapon always wounds on a roll of 2+
	"type": "",
	"params":
}),
("craftworlds", "(aml)_starshot_missile",	-2,	"D6",	"48",	"8",	"Heavy",	"1",{}),
("craftworlds", "(aml)_sunburst_missile",	-1,	"1",	"48",	"4",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("craftworlds", "avenger_shuriken_catapult",	0,	"1",	"18",	"4",	"Assault",	"2",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "bright_lance",	-4,	"D6",	"36",	"8",	"Heavy",	"1",{}),
("craftworlds", "chainsabres_(melee)",	0,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("craftworlds", "chainsabres_(shooting)",	0,	"1",	"12",	"4",	"Pistol",	"2",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "d_cannon",	-4,	"D6",	"24",	"12",	"Heavy",	"D3",{
	-- This weapon can target units that are not visible to the firer. ; Blast
	"type": "",
	"params":
}),
("craftworlds", "d_scythe",	-4,	"1",	"8",	"10",	"Assault",	"D3",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("craftworlds", "death_spinner",	0,	"1",	"12",	"6",	"Assault",	"2",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -4 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "doomweaver",	0,	"2",	"48",	"7",	"Heavy",	"2D6",{
	-- Wound rolls of 6+ for this weapon are resolved at AP -4 instead of AP 0. This weapon can target units that are not visible to the bearer. ; Blast
	"type": "",
	"params":
}),
("craftworlds", "dragons_breath_flamer",	-1,	"1",	"12",	"5",	"Assault",	"D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("craftworlds", "firepike",	-4,	"D6",	"18",	"8",	"Assault",	"1",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("craftworlds", "fusion_gun",	-4,	"D6",	"12",	"8",	"Assault",	"1",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("craftworlds", "fusion_pistol",	-4,	"D6",	"6",	"8",	"Pistol",	"1",{
	-- If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("craftworlds", "hawks_talon",	0,	"1",	"24",	"5",	"Assault",	"4",{}),
("craftworlds", "heavy_d_scythe",	-4,	"2",	"16",	"12",	"Assault",	"D3",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("craftworlds", "heavy_wraithcannon",	-4,	"D6",	"36",	"16",	"Assault",	"2",{}),
("craftworlds", "lasblaster",	0,	"1",	"24",	"3",	"Assault",	"4",{}),
("craftworlds", "laser_lance_(shooting)",	-4,	"2",	"6",	"6",	"Assault",	"1",{}),
("craftworlds", "prism_cannon_(dispersed)",	-3,	"1",	"60",	"6",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("craftworlds", "prism_cannon_(focused)",	-4,	"D3",	"60",	"9",	"Heavy",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("craftworlds", "prism_cannon_(lance)",	-5,	"D6",	"60",	"12",	"Heavy",	"1",{}),
("craftworlds", "ranger_long_rifle",	0,	"1",	"36",	"4",	"Heavy",	"1",{
	-- This weapon may target a CHARACTER even if it is not the closest enemy unit. Each time you roll a wound roll of 6+ for this weapon, it inflicts a mortal wound in addition to any other damage.
	"type": "",
	"params":
}),
("craftworlds", "pulse_laser",	-3,	"3",	"48",	"8",	"Heavy",	"2",{}),
("craftworlds", "(reaper)_starshot_missile",	-2,	"3",	"48",	"8",	"Heavy",	"1",{}),
("craftworlds", "(reaper)_starswarm_missile",	-2,	"2",	"48",	"5",	"Heavy",	"2",{}),
("craftworlds", "scatter_laser",	0,	"1",	"36",	"6",	"Heavy",	"4",{}),
("craftworlds", "scorpions_claw_(shooting)",	0,	"1",	"12",	"4",	"Assault",	"2",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "shuriken_catapult",	0,	"1",	"12",	"4",	"Assault",	"2",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "shadow_weaver",	0,	"1",	"48",	"6",	"Heavy",	"D6",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -4 instead of 0. This weapon can target units that are not visible to the bearer. ; Blast
	"type": "",
	"params":
}),
("craftworlds", "singing_spear_(shooting)",	0,	"D3",	"12",	"9",	"Assault",	"1",{
	-- This weapon always wounds on a roll of 2+.
	"type": "",
	"params":
}),
("craftworlds", "spinneret_rifle",	-4,	"1",	"18",	"6",	"Rapid Fire",	"1",{}),
("craftworlds", "star_lance_(shooting)",	-4,	"2",	"6",	"8",	"Assault",	"1",{}),
("craftworlds", "starcannon",	-3,	"D3",	"36",	"6",	"Heavy",	"2",{}),
("craftworlds", "sunburst_grenade",	-1,	"1",	"6",	"4",	"Grenade",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("craftworlds", "suncannon",	-3,	"2",	"48",	"6",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("craftworlds", "sunrifle",	-2,	"1",	"24",	"3",	"Assault",	"4",{
	-- If a unit suffers any unsaved wounds from this weapon, your opponent must subtract 1 from their hit rolls until the end of the turn.
	"type": "",
	"params":
}),
("craftworlds", "tempest_launcher",	-2,	"1",	"36",	"4",	"Heavy",	"2D6",{
	-- This weapon can target units that are not visible to the bearer. ; Blast
	"type": "",
	"params":
}),
("craftworlds", "triskele_(shooting)",	-2,	"1",	"12",	"4",	"Assault",	"3",{}),
("craftworlds", "(taml)_sunburst_missile",	-1,	"1",	"48",	"4",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("craftworlds", "(taml)_starshot_missile",	-2,	"D6",	"48",	"8",	"Heavy",	"2",{}),
("craftworlds", "twin_bright_lance",	-4,	"D6",	"36",	"8",	"Heavy",	"2",{}),
("craftworlds", "twin_scatter_laser",	0,	"1",	"36",	"6",	"Heavy",	"8",{}),
("craftworlds", "twin_shuriken_cannon",	0,	"1",	"24",	"6",	"Assault",	"6",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "twin_shuriken_catapult",	0,	"1",	"12",	"4",	"Assault",	"4",{
	-- Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.
	"type": "",
	"params":
}),
("craftworlds", "twin_starcannon",	-3,	"D3",	"36",	"6",	"Heavy",	"4",{}),
("craftworlds", "vibro_cannon",	-1,	"2",	"48",	"7",	"Heavy",	"D3",{
	-- For each Vibro Cannon that has already been fired at the same target in this phase, improve the AP of this weapon by 1 (to a maximum of -3) and add 1 to the wound rolls for this weapon (to a maximum of +2). For example, if a firing model is the third to target the same unit with a vibro cannon, its AP is -3 and you add 2 to its wound rolls. If this weapon inflicts any damage on an enemy unit, that unit cannot Advance in its next Movement phase unless it can FLY.
	"type": "",
	"params":
}),
("craftworlds", "wraithcannon",	-4,	"D6",	"12",	"10",	"Assault",	"1",{}),
("craftworlds", "aeldari_blade",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- You can re-roll failed hit rolls for this weapon.
	"type": "",
	"params":
}),
("craftworlds", "biting_blade",	-1,	"2",	"0",	"+2",	"Melee",	"1",{}),
("craftworlds", "diresword",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time you make a wound roll of 6+ for this weapon, the target suffers a mortal wound in addition to any other damage.
	"type": "",
	"params":
}),
("craftworlds", "executioner",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{}),
("craftworlds", "ghostaxe",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll.
	"type": "",
	"params":
}),
("craftworlds", "scorpions_claw_(melee)",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{}),
("craftworlds", "ghostglaive",	-4,	"D6",	"0",	"+2",	"Melee",	"1",{}),
("craftworlds", "ghostswords",	-3,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("craftworlds", "power_glaive",	-2,	"1",	"0",	"+1",	"Melee",	"1",{}),
("craftworlds", "laser_lance_(melee)",	-4,	"2",	"0",	"User",	"Melee",	"1",{
	-- If the bearer charged this turn, attacks with this weapon are made at Strength 6.
	"type": "",
	"params":
}),
("craftworlds", "mirrorswords",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, you can re-roll the hit roll.
	"type": "",
	"params":
}),
("craftworlds", "scorpion_chainsword",	0,	"1",	"0",	"+1",	"Melee",	"1",{}),
("craftworlds", "singing_spear_(melee)",	0,	"D3",	"0",	"User",	"Melee",	"1",{
	-- This weapon always wounds on a roll of 2+.
	"type": "",
	"params":
}),
("craftworlds", "star_lance_(melee)",	-4,	"2",	"0",	"User",	"Melee",	"1",{
	-- If the bearer charged this turn, attacks with this weapon are made at Strength 8.
	"type": "",
	"params":
}),
("craftworlds", "titanic_feet",	-2,	"D3",	"0",	"User",	"Melee",	"1",{
	-- When you make an attack with this weapon, roll three dice instead of 1.
	"type": "",
	"params":
}),
("craftworlds", "titanic_ghostglaive",	-4,	"6",	"0",	"x2",	"Melee",	"1",{}),
("craftworlds", "titanic_wraithbone_fists",	-3,	"D6",	"0",	"User",	"Melee",	"1",{}),
("craftworlds", "triskele_(melee)",	-2,	"1",	"0",	"User",	"Melee",	"1",{}),
("craftworlds", "witch_staff",	0,	"2",	"0",	"User",	"Melee",	"1",{
	-- This weapon always wounds on the roll of 2+.
	"type": "",
	"params":
}),
("craftworlds", "wraithbone_fists",	-3,	"3",	"0",	"User",	"Melee",	"1",{}),
("craftworlds", "wraithguard_fists",	-1,	"D3",	"0",	"User",	"Melee",	"1",{}),
("craftworlds", "melta_bomb",	-4,	"D6",	"4",	"8",	"Grenade",	"1",{
	-- You can re-roll failed wound rolls for this weapon when targeting a VEHICLE.
	"type": "",
	"params":
}),
("craftworlds", "titanic_stride",	-3,	"3",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, make 3 hit rolls instead of 1.
	"type": "",
	"params":
}),
("craftworlds", "twin_pulse_lasers",	-3,	"3",	"48",	"8",	"Heavy",	"4",{}),
("craftworlds", "prism_rifle_(dispersed)",	-1,	"1",	"18",	"5",	"Assault",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("craftworlds", "prism_rifle_(focused)",	-3,	"3",	"24",	"6",	"Assault",	"1",{}),
("craftworlds", "plasma_grenade",	-1,	"1",	"6",	"4",	"Grenade",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
