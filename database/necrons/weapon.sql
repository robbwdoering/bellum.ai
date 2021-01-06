INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("necrons", "warscythe",	-4,	"2",	"0",	"+2",	"Melee",	"1",{}),
("necrons", "hyperphase_sword",	-3,	"1",	"0",	"+1",	"Melee",	"1",{}),
("necrons", "gauss_flayer_array",	-1,	"1",	"24",	"4",	"Rapid Fire",	"5",{}),
("necrons", "death_ray",	-3,	"D3+3",	"24",	"9",	"Heavy",	"1",{}),
("necrons", "doomsday_cannon_(low_power)",	-2,	"D3",	"36",	"8",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("necrons", "doomsday_cannon_(high_power)",	-5,	"D6",	"72",	"10",	"Heavy",	"D6",{
	-- Blast. The bearer can only make attacks with this profile if it Remained Stationary during its previous Movement phase.
	"type": "",
	"params":
}),
("necrons", "eldritch_lance_(shooting)",	-4,	"D6",	"36",	"8",	"Assault",	"D3",{}),
("necrons", "eldritch_lance_(melee)",	-4,	"2",	"0",	"User",	"Melee",	"1",{}),
("necrons", "gauntlet_of_fire",	-1,	"1",	"12",	"5",	"Assault",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("necrons", "gauss_blaster",	-2,	"1",	"30",	"5",	"Rapid Fire",	"1",{}),
("necrons", "gauss_flayer",	-1,	"1",	"24",	"4",	"Rapid Fire",	"1",{}),
("necrons", "gauss_flux_arc",	-2,	"1",	"30",	"5",	"Rapid Fire",	"3",{}),
("necrons", "heat_ray_(dispersed)",	-1,	"1",	"12",	"5",	"Heavy",	"2D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("necrons", "heat_ray_(focused)",	-4,	"D6",	"24",	"8",	"Heavy",	"2",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2.
	"type": "",
	"params":
}),
("necrons", "particle_beamer",	0,	"1",	"18",	"5",	"Assault",	"6",{}),
("necrons", "particle_shredder",	-1,	"2",	"24",	"6",	"Heavy",	"8",{}),
("necrons", "particle_whip",	-3,	"3",	"36",	"12",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("necrons", "rod_of_covenant_(melee)",	-3,	"2",	"0",	"User",	"Melee",	"1",{}),
("necrons", "rod_of_covenant_(shooting)",	-3,	"2",	"12",	"5",	"Assault",	"1",{}),
("necrons", "staff_of_light_(shooting)",	-2,	"1",	"18",	"5",	"Assault",	"3",{}),
("necrons", "staff_of_light_(melee)",	-2,	"1",	"0",	"User",	"Melee",	"1",{}),
("necrons", "staff_of_the_destroyer_(shooting)",	-3,	"2",	"18",	"6",	"Assault",	"3",{}),
("necrons", "staff_of_the_destroyer_(melee)",	-3,	"2",	"0",	"+1",	"Melee",	"1",{}),
("necrons", "synaptic_disintegrator",	-2,	"1",	"36",	"5",	"Heavy",	"1",{
	-- Each time you select a target for this weapon, you can ignore the Look Out, Sir rule. Each time an attack is made with this weapon, an unmodified wound roll of 6 inflicts 1 mortal wound on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("necrons", "tachyon_arrow",	-5,	"D6",	"120",	"12",	"Assault",	"1",{
	-- The bearer can only shoot with this weapon once per battle.
	"type": "",
	"params":
}),
("necrons", "tesla_cannon",	0,	"1",	"30",	"6",	"Heavy",	"3",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("necrons", "tesla_carbine",	0,	"1",	"24",	"5",	"Assault",	"2",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("necrons", "twin_heavy_gauss_cannon",	-3,	"D3",	"30",	"7",	"Heavy",	"6",{}),
("necrons", "twin_tesla_destructor",	0,	"1",	"36",	"7",	"Heavy",	"10",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("necrons", "automaton_claws",	-3,	"2",	"0",	"+2",	"Melee",	"1",{}),
("necrons", "crackling_tendrils",	-4,	"D6",	"0",	"User",	"Melee",	"1",{}),
("necrons", "empathic_obliterator",	-1,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, if a CHARACTER model is destroyed by that attack, each enemy unit within 6 of the bearer suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("necrons", "flayer_claws",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("necrons", "scythe_of_the_nightbringer_(reaping_sweep)",	-3,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 2 hit rolls instead of 1.
	"type": "",
	"params":
}),
("necrons", "scythe_of_the_nightbringer_(entropic_blow)",	-4,	"D6",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, invulnerable saving throws cannot be made against that attack.
	"type": "",
	"params":
}),
("necrons", "staff_of_tomorrow",	-3,	"D3",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, invulnerable saving throws cannot be taken against that attack.
	"type": "",
	"params":
}),
("necrons", "vicious_claws",	-2,	"2",	"0",	"+2",	"Melee",	"1",{}),
("necrons", "whip_coils",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon profile, make 2 hit rolls instead of 1.
	"type": "",
	"params":
}),
("necrons", "cutting_beam",	-4,	"D6",	"12",	"8",	"Assault",	"1",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2
	"type": "",
	"params":
}),
("necrons", "focused_death_ray",	-4,	"D3+3",	"36",	"12",	"Heavy",	"1",{}),
("necrons", "exile_cannon",	-4,	"3",	"18",	"10",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("necrons", "gauss_annihilator_(focused_beam)",	-4,	"D3+6",	"120",	"16",	"Heavy",	"2D3",{
	-- Blast. Each time an attack is made with this weapon against an AIRCRAFT unit, add 2 to the attacks hit roll.
	"type": "",
	"params":
}),
("necrons", "gauss_annihilator_(flux_arc)",	-2,	"2",	"30",	"6",	"Rapid Fire",	"6",{}),
("necrons", "gauss_exterminator",	-3,	"D6",	"48",	"8",	"Heavy",	"2",{
	-- Each time an attack is made with this weapon against an AIRCRAFT unit, add 2 to that attacks hit roll.
	"type": "",
	"params":
}),
("necrons", "heat_cannon",	-4,	"D6",	"36",	"8",	"Heavy",	"D6",{
	-- Each time an attack made with this weapon targets a unit within half range, that attack has a Damage characteristic of D6+2
	"type": "",
	"params":
}),
("necrons", "tesla_arc",	,	"1",	"3",	"4",	"Assault",	"3D6",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("necrons", "tesseract_singularity_chamber_(particle_hurricane)",	-3,	"1",	"12",	"4",	"Assault",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target, and a wound roll of 2+ is always successful, unless the target is a VEHICLE, then a wound roll of 6 is always successful.
	"type": "",
	"params":
}),
("necrons", "tesseract_singularity_chamber_(solar_fire)",	-3,	"D6",	"36",	"8",	"Heavy",	"D6",{}),
("necrons", "tesseract_singularity_chamber_(seismic_lash)",	-3,	"3",	"24",	"5",	"Assault",	"D6",{}),
("necrons", "gauss_slicer",	-1,	"1",	"24",	"5",	"Rapid Fire",	"2",{}),
("necrons", "aeonstave_(shooting)",	-2,	"1",	"18",	"5",	"Assault",	"D3",{
	-- Blast. Each time an attack is made with this weapon, invulnerable saving throws cannot be taken against this attack.
	"type": "",
	"params":
}),
("necrons", "aeonstave_(melee)",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, invulnerable saving throws cannot be taken against this attack.
	"type": "",
	"params":
}),
("necrons", "obsidax",	-3,	"3",	"0",	"+1",	"Melee",	"1",{}),
("necrons", "gauntlet_of_the_conflagrator",	,	"",	"12",	"",	"Pistol",	"1",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target. Instead of making a wound roll, roll one D6 for each model in the target unit; that unit suffers 1 mortal wound for each result of 6 and the attack sequence ends.
	"type": "",
	"params":
}),
("necrons", "solar_staff_(ranged)",	-2,	"1",	"24",	"5",	"Assault",	"6",{
	-- Each time an attack is made with this weapon against an INFANTRY unit, if a hit is scored, then until the end of the turn that unit is blinded. Blinded units cannot fire Overwatch or Set to Defend. This Relic replaces a staff of light.
	"type": "",
	"params":
}),
("necrons", "solar_staff_(melee)",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon against an INFANTRY unit, if a hit is scored, then until the end of the turn that unit is blinded. Blinded units cannot fire Overwatch or Set to Defend. This Relic replaces a staff of light.
	"type": "",
	"params":
}),
("necrons", "voltaic_staff_(shooting)",	-2,	"2",	"18",	"6",	"Assault",	"4",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits. This Relic replaces a staff of light.
	"type": "",
	"params":
}),
("necrons", "voltaic_staff_(melee)",	-2,	"2",	"0",	"+1",	"Melee",	"1",{
	-- This Relic replaces a staff of light.
	"type": "",
	"params":
}),
("necrons", "blood_scythe",	-4,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 2 additional attacks with this weapon. This Relic replaces a warscythe or voidscythe.
	"type": "",
	"params":
}),
("necrons", "voidreaper",	-4,	"3",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, rules that ignore wounds cannot be used. This Relic replaces a warscythe or voidscythe.
	"type": "",
	"params":
}),
("necrons", "the_arrow_of_infinity",	-5,	"6",	"120",	"16",	"Assault",	"1",{
	-- The bearer can only shoot with this weapon once per battle.
	"type": "",
	"params":
}),
("necrons", "voidscythe",	-4,	"3",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, subtract 1 from that attacks hit roll.
	"type": "",
	"params":
}),
("necrons", "voidblade",	-3,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("necrons", "titanic_forelimbs_(reaping_sweep)",	-1,	"2",	"0",	"User",	"Melee",	"1",{
	-- Make 2 hit rolls for each attack made with this weapon.
	"type": "",
	"params":
}),
("necrons", "titanic_forelimbs_(impaling_strike)",	-3,	"5",	"0",	"x2",	"Melee",	"1",{}),
("necrons", "transdimensional_projector",	-2,	"1",	"24",	"6",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("necrons", "singularity_generator",	-3,	"D6",	"36",	"8",	"Heavy",	"3D3",{
	-- Blast
	"type": "",
	"params":
}),
("necrons", "synaptic_obliterator",	-4,	"6",	"72",	"16",	"Heavy",	"D3",{}),
("necrons", "impaling_legs",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 2 additional attacks with this weapon.
	"type": "",
	"params":
}),
("necrons", "hyperphase_glaive",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("necrons", "plasmic_lance_(melee)",	-3,	"2",	"0",	"User",	"Melee",	"1",{}),
("necrons", "plasmic_lance_(shooting)",	-3,	"2",	"18",	"7",	"Assault",	"D3",{}),
("necrons", "monomolecular_proboscis",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("necrons", "hyperphase_threshers",	-3,	"2",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("necrons", "gauss_reaper",	-2,	"1",	"12",	"5",	"Assault",	"2",{}),
("necrons", "annihilator_beam",	-4,	"6",	"36",	"12",	"Heavy",	"1",{}),
("necrons", "scouring_eye",	-2,	"1",	"12",	"5",	"Pistol",	"2",{}),
("necrons", "scythed_limbs",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("necrons", "relic_gauss_blaster",	-2,	"2",	"30",	"5",	"Rapid Fire",	"2",{}),
("necrons", "flensing_claw",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, make 2 hit rolls instead of 1.
	"type": "",
	"params":
}),
("necrons", "hyperphase_harvester",	-4,	"3",	"0",	"+2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, subtract 1 from that attacks hit roll.
	"type": "",
	"params":
}),
("necrons", "enmitic_annihilator",	-1,	"1",	"18",	"6",	"Assault",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("necrons", "feeder_mandibles",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 automatically wounds the target.
	"type": "",
	"params":
}),
("necrons", "conduit_of_stars",	-2,	"2",	"36",	"6",	"Rapid Fire",	"3",{
	-- This Relic replaces a relic gauss blaster.
	"type": "",
	"params":
}),
("necrons", "abyssal_lance_(melee)",	-3,	"1",	"0",	"User",	"Melee",	"1",{}),
("necrons", "abyssal_lance_(shooting)",	-3,	"1",	"18",	"4",	"Assault",	"3",{}),
("necrons", "atomiser_beam",	-2,	"1",	"12",	"6",	"Assault",	"3",{}),
("necrons", "doomsday_blaster_(high_power)",	-5,	"D6",	"48",	"10",	"Heavy",	"D6",{
	-- Blast. The bearer can only make attacks with this profile if it Remained Stationary during its previous Movement phase.
	"type": "",
	"params":
}),
("necrons", "doomsday_blaster_(low_power)",	-2,	"D3",	"24",	"8",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("necrons", "enmitic_exterminator",	-1,	"1",	"36",	"7",	"Heavy",	"3D3",{
	-- Blast
	"type": "",
	"params":
}),
("necrons", "enmitic_disintegrator_pistol",	-1,	"1",	"18",	"6",	"Pistol",	"1",{}),
("necrons", "entropic_lance_(shooting)",	-3,	"D3+3",	"18",	"8",	"Assault",	"1",{}),
("necrons", "entropic_lance_(melee)",	-3,	"3",	"0",	"User",	"Melee",	"1",{}),
("necrons", "gauss_destructor",	-4,	"3D3",	"36",	"10",	"Heavy",	"1",{}),
("necrons", "heavy_death_ray",	-4,	"D3+3",	"36",	"12",	"Heavy",	"3",{}),
("necrons", "sceptre_of_eternal_glory_(shooting)",	-3,	"2",	"24",	"8",	"Assault",	"3",{}),
("necrons", "sceptre_of_eternal_glory_(melee)",	-3,	"2",	"0",	"+4",	"Melee",	"1",{}),
("necrons", "spear_of_the_void_dragon_(melee)",	-4,	"D6",	"0",	"+3",	"Melee",	"1",{
	-- Each time an attack made with this weapon is allocated to a VEHICLE model, that attack has a Damage characteristic of D3+3.
	"type": "",
	"params":
}),
("necrons", "spear_of_the_void_dragon_(shooting)",	-4,	"D6",	"12",	"9",	"Heavy",	"1",{
	-- Each time an attack is made with this weapon, if a hit is scored, draw a straight line between the closest point of this models base (or hull) and that of the closest model in the target unit. Make one wound roll against the target unit, and each other unit this line passes over. Each time an attack made with this weapon is allocated to a VEHICLE model, that attack has a Damage characteristic of D3+3.
	"type": "",
	"params":
}),
("necrons", "staff_of_stars_(shooting)",	-2,	"1",	"24",	"6",	"Assault",	"9",{}),
("necrons", "staff_of_stars_(melee)",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 3 additional attacks with this weapon and no more than 3 attacks can be made with this weapon.
	"type": "",
	"params":
}),
("necrons", "transdimensional_abductor",	-3,	"3",	"12",	"4",	"Assault",	"D3",{}),
("necrons", "twin_gauss_blaster",	-2,	"1",	"30",	"5",	"Rapid Fire",	"2",{}),
("necrons", "twin_gauss_flayer",	-1,	"1",	"24",	"4",	"Rapid Fire",	"2",{}),
("necrons", "twin_tesla_carbine",	0,	"1",	"24",	"5",	"Assault",	"4",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("necrons", "canoptek_tail_blades",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it makes D6 additional attacks with this weapon.
	"type": "",
	"params":
}),
("necrons", "chronotendrils",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 3 additional attacks with this weapon.
	"type": "",
	"params":
}),
("necrons", "golden_fists",	-3,	"3",	"0",	"User",	"Melee",	"1",{}),
("necrons", "ophydian_claws",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 2 additional attacks with this weapon.
	"type": "",
	"params":
}),
("necrons", "portal_of_exile",	-3,	"3",	"0",	"User",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("necrons", "reanimators_claws",	-2,	"1",	"0",	"User	",	"Melee",	"1",{}),
("necrons", "scythe_of_dust",	-4,	"3",	"0",	"+3",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 4 additional attacks with this weapon and no more than 4 attacks can be made with this weapon.
	"type": "",
	"params":
}),
("necrons", "tesla_sphere",	0,	"1",	"24",	"7",	"Assault",	"4",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("necrons", "stalkers_forelimbs",	-2,	"3",	"0",	"User",	"Melee",	"1",{}),
("necrons", "tomb_stalker_claws",	-2,	"2",	"0",	"+1",	"Melee",	"1",{}),
("necrons", "tomb_sentinel_claws",	-2,	"2",	"0",	"+1",	"Melee",	"1",{}),
("necrons", "tesla_destructor",	0,	"1",	"36",	"7",	"Heavy",	"5",{
	-- Each time an attack is made with this weapon, an unmodified hit roll of 6 scores 2 additional hits.
	"type": "",
	"params":
}),
("necrons", "gauss_exterminator_(tomb_citadel)",	-3,	"2D3",	"48",	"9",	"Heavy",	"2",{}),
("necrons", "gauss_cannon",	-3,	"D3",	"24",	"6",	"Heavy",	"3",{}),
("necrons", "hyperphase_reap_blade",	-4,	"3",	"0",	"+2",	"Melee",	"1",{}),
("necrons", "particle_caster",	0,	"1",	"12",	"6",	"Pistol",	"2",{}),
("necrons", "transdimensional_beamer",	-3,	"3",	"12",	"4",	"Assault",	"1",{}),
