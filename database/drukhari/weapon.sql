INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("drukhari", "monoscythe_missile",	0,	"2",	"48",	"6",	"Assault",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("drukhari", "shatterfield_missile",	-1,	"1",	"48",	"7",	"Assault",	"D6",{
	-- Blast. When you use this profile, you can re-roll failed wound rolls for this weapon.
	"type": "",
	"params":
}),
("drukhari", "necrotoxin_missile",	0,	"1",	"48",	"*",	"Assault",	"3D3",{
	-- Blast. Poisoned Weapon (pg 87). Each time an attack is made with this weapon against a unit without the Vehicle or Titanic keyword, it wounds the target on a wound roll of 2+, instead of 4+.
	"type": "",
	"params":
}),
("drukhari", "twin_splinter_rifle",	0,	"1",	"24",	"*",	"Rapid Fire",	"2",{
	-- Poisoned Weapon (pg 87)
	"type": "",
	"params":
}),
("drukhari", "archite_glaive",	-3,	"1",	"0",	"+2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll. 
	"type": "",
	"params":
}),
("drukhari", "dark_lance",	-4,	"D6",	"36",	"8",	"Heavy",	"1",{
	-- Change the weapons Type from Heavy to Assault if it is equipped on a VEHICLE.
	"type": "",
	"params":
}),
("drukhari", "disintegrator_cannon",	-3,	"2",	"36",	"5",	"Assault",	"3",{}),
("drukhari", "shock_prow",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- You can make a maximum of one close combat attack with a shock prow each turn (any remaining attacks must be made with a different melee weapon).  If the bearer charged this turn, successful attacks with this weapon have a Damage characteristic of D3 instead of 1. 
	"type": "",
	"params":
}),
("drukhari", "bladevanes",	-1,	"1",	"0",	"4",	"Melee",	"1",{}),
("drukhari", "splinter_cannon",	0,	"1",	"36",	"*",	"Rapid Fire",	"3",{
	-- Poisoned Weapon (pg 87)
	"type": "",
	"params":
}),
("drukhari", "shaimeshi_blade",	0,	"1",	"0",	"*",	"Melee",	"1",{
	-- Poisoned Weapon (pg 87). Each time an attack is made with this weapon against a unit without the Vehicle or Titanic keyword, it wounds the target on a wound roll of 2+, instead of 4+. Each time you roll a wound roll of 6+ for this weapon, other than against a VEHICLE, the target suffers a mortal wound in addition to any other damage.
	"type": "",
	"params":
}),
("drukhari", "eyeburst",	-2,	"1",	"9",	"4",	"Assault",	"4",{}),
("drukhari", "sslyth_battle_blade",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("drukhari", "razor_feathers",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("drukhari", "monstrous_cleaver",	-2,	"1",	"0",	"user",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon. 
	"type": "",
	"params":
}),
("drukhari", "beastmasters_scourge",	0,	"1",	"0",	"+1",	"Melee",	"1",{}),
("drukhari", "clawed_fists",	-1,	"2",	"0",	"User",	"Melee",	"1",{}),
("drukhari", "blast_pistol",	-4,	"D6",	"6",	"8",	"Pistol",	"1",{}),
("drukhari", "blaster",	-4,	"D6",	"18",	"8",	"Assault",	"1",{}),
("drukhari", "darklight_grenades",	-1,	"1",	"6",	"4",	"Grenade",	"D6",{}),
("drukhari", "hekatarii_blade",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon. 
	"type": "",
	"params":
}),
("drukhari", "single_blade",	-3,	"2",	"0",	"+1",	"Melee",	"1",{}),
("drukhari", "dual_blades",	-2,	"2",	"0",	"User",	"Melee",	"1",{
	-- When the bearer fights with dual blades, it can make 2 additional attacks with this weapon.
	"type": "",
	"params":
}),
("drukhari", "flesh_gauntlet",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time you roll a wound roll of 6+ for this weapon, other than against VEHICLES, the target suffers a mortal wound in addition to any other damage.
	"type": "",
	"params":
}),
("drukhari", "splinter_pods",	0,	"1",	"18",	"*",	"Assault",	"2",{
	-- This weapon wounds on a 4+, unless it is targeting a VEHICLE in which case it wounds on a 6+.
	"type": "",
	"params":
}),
("drukhari", "stunclaw",	0,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Each time you roll a wound roll of a 6+ for this weapon, the target suffers a mortal wound in addition to any other damage. 
	"type": "",
	"params":
}),
("drukhari", "klaive",	-3,	"1",	"0",	"+1",	"Melee",	"1",{}),
("drukhari", "mane_of_barbs_and_hooks",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 2 additional attacks with this weapon. 
	"type": "",
	"params":
}),
("drukhari", "penetrating_blade",	-4,	"1",	"0",	"User",	"Melee",	"1",{
	-- A model armed with two penetrating blades can make 1 additional attack with them each time it fights. 
	"type": "",
	"params":
}),
("drukhari", "impaler",	-1,	"2",	"0",	"User",	"Melee",	"1",{}),
("drukhari", "liquifier_gun",	-D3,	"1",	"8",	"3",	"Assault",	"D6",{
	-- Each time this weapon is fired, roll a D3 to determine its AP for those attacks. For example, if you rolled a 1 ,this weapon would have an AP of -1. This weapon automatically hits its target. 
	"type": "",
	"params":
}),
("drukhari", "mindphase_gauntlet",	0,	"2",	"0",	"User",	"Melee",	"1",{}),
("drukhari", "scissorhand",	-1,	"1",	"0",	"*",	"Melee",	"1",{
	-- Poisoned Weapon (p87). Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("drukhari", "shredder",	-1,	"1",	"12",	"6",	"Assault",	"D6",{
	-- Blast. When attacking a unit of INFANTRY, you can re-roll failed wound rolls for this weapon. 
	"type": "",
	"params":
}),
("drukhari", "stinger_pod",	0,	"1",	"24",	"5",	"Assault",	"2D6",{}),
("drukhari", "twin_liquifier_gun",	-D3,	"1",	"8",	"3",	"Assault",	"2D6",{
	-- Each time this weapon is fired, roll a D3 to determine its AP for those attacks. For example, if you rolled a 1 ,this weapon would have an AP of -1. This weapon automatically hits its target.
	"type": "",
	"params":
}),
("drukhari", "casket_of_flensing",	-2,	"1",	"12",	"3",	"Assault",	"2D6",{
	-- This weapon can only be fired once per battle. 
	"type": "",
	"params":
}),
("drukhari", "implosion_missile",	-3,	"1",	"48",	"6",	"Assault",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("drukhari", "void_lance",	-4,	"D6",	"36",	"9",	"Assault",	"1",{}),
("drukhari", "dark_scythe",	-4,	"D3",	"24",	"8",	"Assault",	"D3",{}),
("drukhari", "venom_blade",	0,	"1",	"0",	"*",	"Melee",	"1",{
	-- Poisoned Weapon (p87). Each time an attack is made with this weapon against a unit without the Vehicle or Titanic keyword, it wounds the target on a wound roll of 2+, instead of 4+.
	"type": "",
	"params":
}),
("drukhari", "electrocorrosive_whip",	-2,	"2",	"0",	"*",	"Melee",	"1",{
	-- Poisoned Weapon (p87)
	"type": "",
	"params":
}),
("drukhari", "hexrifle",	-1,	"1",	"36",	"4",	"Heavy",	"1",{
	-- Each time you select a target for this weapon, you can ignore the Look Out, Sir rule. Each time you roll a wound roll of 6+ for this weapon, the target suffers a mortal wound in addition to any other damage. 
	"type": "",
	"params":
}),
("drukhari", "stinger_pistol",	0,	"1",	"12",	"*",	"Pistol 1",	"",{
	-- Poisoned Weapon (p87). Each time an attack is made with this weapon against a unit without the Vehicle or Titanic keyword, it wounds the target on a wound roll of 2+, instead of 4+.
	"type": "",
	"params":
}),
("drukhari", "claws_and_talons",	0,	"1",	"0",	"User",	"Melee",	"1",{}),
("drukhari", "heat_lance",	-5,	"D6",	"18",	"6",	"Assault",	"1",{
	-- If the target is within half range of this weapon, roll 2 dice when inflicting damage with it and discard the lowest result.
	"type": "",
	"params":
}),
("drukhari", "haywire_blaster",	-1,	"1",	"24",	"4",	"Assault",	"D3",{
	-- If the target is a VEHICLE and you roll a wound roll of 4+ for this weapon, the target suffers a moral wound in addition to any other damage. If the wound roll is a 6+, inflict D3 mortal wounds instead of 1. 
	"type": "",
	"params":
}),
("drukhari", "shardcarbine",	0,	"1",	"18",	"*",	"Assault",	"3",{
	-- Poisoned Weapon (p87)
	"type": "",
	"params":
}),
("drukhari", "ossefactor",	-3,	"1",	"24",	"*",	"Assault",	"1",{
	-- Poisoned Weapon (p87). Each time an attack is made with this weapon against a unit without the Vehicle or Titanic keyword, it wounds the target on a wound roll of 2+, instead of 4+. If a model is slain by this weapon, the models unit immediately suffers a mortal wound on a D6 roll of 4+
	"type": "",
	"params":
}),
("drukhari", "storm_vortex_projector___blast",	-1,	"1",	"24",	"6",	"Heavy",	"2D6",{
	-- Blast.
	"type": "",
	"params":
}),
("drukhari", "storm_vortex_projector___beam",	-4,	"D3+3",	"36",	"8",	"Heavy",	"D6",{}),
("drukhari", "prow_blade",	-2,	"2",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon and no more than 1 attack can be made with this weapon.
	"type": "",
	"params":
}),
("drukhari", "pulse_disintegrator",	-3,	"2",	"36",	"8",	"Assault",	"6",{}),
("drukhari", "dire_scythe_blade",	-2,	"2",	"0",	"User",	"Melee",	"1",{}),
("drukhari", "spirit_vortex",	-2,	"1",	"18",	"3",	"Asssault",	"D6",{
	-- Blast. Any attacks with a wound roll of a 6+ for this weapon have a Damage characteristic of D3 instead of 1.
	"type": "",
	"params":
}),
("drukhari", "spirit_syphon",	-2,	"1",	"8",	"3",	"Assault",	"D6",{
	-- This weapon automatically hits its target. Any attacks with a wound roll of a 6+ for this weapon have a Damage characteristic of D3 instead of 1.
	"type": "",
	"params":
}),
("drukhari", "spirit_leech_tentacles",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Any attacks with a wound roll of a 6+ for this weapon have a Damage characteristic of D3 instead of 1.
	"type": "",
	"params":
}),
("drukhari", "ichor_injector",	-1,	"1",	"0",	"user",	"Melee",	"1",{
	-- The bearer can make a maximum of one attack with the ichor injector each turn. (Any remaining attacks must be made with a different melee weapon). You can re-roll wound rolls for this weapon. Each time you roll a wound roll of 6+ for this weapon, the target suffers D3 mortal wounds in addition to any other damage. 
	"type": "",
	"params":
}),
("drukhari", "macro_scalpel",	-2,	"2",	"0",	"+1",	"Melee",	"1",{
	-- If a model is equipped with two macro-scalpels, each time it fights it can make 1 additional attack with them.
	"type": "",
	"params":
}),
("drukhari", "chain_flails",	0,	"1",	"0",	"user",	"Melee",	"1",{
	-- Make 2 hit rolls for each attack with this weapon, instead of 1. You can re-roll failed wound rolls for this weapon.
	"type": "",
	"params":
}),
("drukhari", "talos_gauntlet",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll
	"type": "",
	"params":
}),
("drukhari", "soul_seeker",	-1,	"D3",	"18",	"*",	"Pistol",	"2",{
	-- Poisoned Weapon (pg 87). Each time an attack is made with this weapon against a unit without the Vehicle or Titanic keyword, it wounds the target on a wound roll of 2+, instead of 4+. Each time you select a target for this weapon, you can ignore the Look Out, Sir rule. Units attacked by this weapon do not gain any bonus to their saving throws for being in cover.
	"type": "",
	"params":
}),
("drukhari", "spirit_sting",	-4,	"1",	"12",	"*",	"Pistol",	"3",{
	-- Poisoned Weapon (pg 87). Each time an attack is made with this weapon against a unit without the Vehicle or Titanic keyword, it wounds the target on a wound roll of 2+, instead of 4+. Invulnerable saves cannot be taken against this weapon
	"type": "",
	"params":
}),
("drukhari", "the_blood_glaive",	-3,	"D3",	"0",	"+3",	"Melee",	"1",{}),
("drukhari", "the_parasites_kiss",	-2,	"2",	"12",	"*",	"Pistol",	"2",{
	-- Poisoned Weapon (p87). Each time an attack is made with this weapon against a unit without the Vehicle or Titanic keyword, it wounds the target on a wound roll of 2+, instead of 4+. Each time this weapon kills an enemy model, the bearer regains 1 lost wound.
	"type": "",
	"params":
}),
("drukhari", "the_triptych_whip",	-2,	"1",	"0",	"*",	"Melee",	"1",{
	-- Poisoned Weapon (pg 87). Each time the bearer fights, it can make 3 additional attacks with this weapon
	"type": "",
	"params":
}),
("drukhari", "the_djin_blade",	-3,	"D3",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 2 additional attacks with this weapon. Roll a D6 at the end of each Fight phase in which the bearer attacked using this weapon; on a 1 they suffer a mortal wound.
	"type": "",
	"params":
}),
("drukhari", "the_animus_vitae",	,	"",	"6",	"",	"Grenade",	"1",{
	-- You can only use this weapon once per battle. If it hits, the target suffers D3 mortal wounds. If any enemy models are slain by this weapon then, for the remainder of the turn, friendly units with the Power from Pain ability treat the current battle round as being 1 higher than it actually is when determining what bonuses they gain, so long as they remain within 6 of the bearer. This is cumulative with other, similar effects
	"type": "",
	"params":
}),
("drukhari", "the_flensing_blade",	-2,	"D3",	"0",	"*",	"Melee",	"1",{
	-- Poisoned Weapon (pg 87). Add 1 to wound rolls made for this weapon, unless it is targeting a VEHICLE. Increase this weapon’s Damage characteristic to 3 when attacking enemy CHARACTERS.
	"type": "",
	"params":
}),
("drukhari", "hydra_gauntlets",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon. You can re-roll failed wound rolls for this weapon. 
	"type": "",
	"params":
}),
("drukhari", "razorflails",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make D3 additional attacks with this weapon. You can re-roll failed hit rolls for this weapon.
	"type": "",
	"params":
}),
("drukhari", "shardnet_and_impaler",	-1,	"2",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon. If an INFANTRY unit is affected by the No Escape ability whilst it is within 3 of an enemy model armed with this weapon, the unit’s controlling player rolls a D3 instead of a D6 when making the roll-off
	"type": "",
	"params":
}),
("drukhari", "agoniser",	-2,	"1",	"0",	"*",	"Melee",	"1",{
	-- Poisoned Weapon (p87)
	"type": "",
	"params":
}),
("drukhari", "splinter_pistol",	0,	"1",	"12",	"*",	"Pistol",	"1",{
	-- Poisoned Weapon (pg 87)
	"type": "",
	"params":
}),
("drukhari", "hellglaive",	0,	"2",	"0",	"+1",	"Melee",	"1",{}),
("drukhari", "demiklaives___dual_blades",	-2,	"1",	"0",	"User",	"Melee",	"1",{
	-- A model attacking with dual blades can make 2 additional attacks with them each time it fights. 
	"type": "",
	"params":
}),
("drukhari", "demiklaives___single_blade",	-3,	"1",	"0",	"+1",	"Melee",	"1",{}),
("drukhari", "baleblast",	-1,	"1",	"18",	"4",	"Assault",	"2",{
	-- Each time you roll a wound roll of 6+ for this weapon, the target suffers a mortal wound in addition to any other damage. 
	"type": "",
	"params":
}),
("drukhari", "glimmersteel_blade",	-1,	"1",	"0",	"User",	"Melee",	"1",{}),
("drukhari", "splinter_rifle",	0,	"1",	"24",	"*",	"Rapid Fire",	"1",{
	-- Poisoned Weapon (pg 87)
	"type": "",
	"params":
}),
("drukhari", "haemonculus_tools",	0,	"1",	"0",	"*",	"Melee",	"1",{
	-- Poisoned Weapon (p87)
	"type": "",
	"params":
}),
("drukhari", "plasma_grenade",	-1,	"1",	"6",	"4",	"Grenade",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("drukhari", "phantasm_grenade_launcher",	0,	"1",	"18",	"1",	"Assault",	"D3",{
	-- Blast. If a unit is hit by one or more phantasm grenade launchers, subtract one from its Leadership until the end of the turn .
	"type": "",
	"params":
}),
