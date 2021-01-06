INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("orks", "kustom_shoota",	0,	"1",	"18",	"4",	"Assault",	"4",{}),
("orks", "big_choppa",	-1,	"2",	"0",	"+2",	"Melee",	"1",{}),
("orks", "power_klaw",	-3,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll
	"type": "",
	"params":
}),
("orks", "kustom_mega_slugga",	-3,	"D3",	"12",	"8",	"Pistol",	"1",{
	-- If you roll one or more hit rolls of 1, the bearer suffers a mortal wound after all of the weapons shots have been resolved
	"type": "",
	"params":
}),
("orks", "attack_squig",	-1,	"1",	"0",	"4",	"Melee",	"1",{
	-- Each time a model with an attack squig fights, it can make 2 additional attacks with this weapon.
	"type": "",
	"params":
}),
("orks", "dakkagun",	0,	"1",	"18",	"5",	"Assault",	"3",{}),
("orks", "weirdboy_staff",	-1,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("orks", "shokk_attack_gun",	-5,	"D6",	"60",	"2D6",	"Heavy",	"D6",{
	-- Each time this unit is chosen to shoot with, roll once to determine the Strength characteristic of this weapon. If the result is 11+ each successful hit inflicts D3 mortal wounds on the target in addition to any normal damage. Blast.
	"type": "",
	"params":
}),
("orks", "tellyport_blasta",	-2,	"1",	"12",	"8",	"Assault",	"3",{
	-- If a model suffers any unsaved wounds from this weapon and is not slain, roll a D6 at the end of the phase.  If the result is greater than that models Wounds characteristic, it is slain.
	"type": "",
	"params":
}),
("orks", "morks_teeth",	-1,	"2",	"0",	"User",	"Melee",	"1",{}),
("orks", "urty_syringe",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon. This weapon always wounds on a 4+ unless it is targeting a VEHICLE or TITANIC model, in which case it wounds on a 6+.
	"type": "",
	"params":
}),
("orks", "gorks_klaw",	-4,	"4",	"0",	"x2",	"Melee",	"1",{}),
("orks", "morks_roar",	-1,	"1",	"36",	"5",	"Assault",	"12",{}),
("orks", "da_rippa_(standard)",	-3,	"2",	"24",	"7",	"Heavy",	"3",{}),
("orks", "da_rippa_(supercharge)",	-3,	"3",	"24",	"8",	"Heavy",	"3",{
	-- If you roll one or more unmodified hit rolls of 1, the bearer suffers 1 mortal wound after all of this weaponss shots have been resolved.
	"type": "",
	"params":
}),
("orks", "da_vulchas_klaws",	-3,	"D3",	"0",	"+2",	"Melee",	"1",{
	-- Each time the Bearer fights only 3 attacks can be made with this weapon
	"type": "",
	"params":
}),
("orks", "blitz_missiles",	1,	"D3",	"18",	"6",	"Assault",	"1",{}),
("orks", "grabba_stikk",	0,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights it can make 1 additional attack with this weapon
	"type": "",
	"params":
}),
("orks", "grot_prod",	-1,	"1",	"0",	"+2",	"Melee",	"1",{}),
("orks", "waaagh!_banner",	0,	"2",	"0",	"+2",	"Melee",	"1",{}),
("orks", "burna_(shooting)",	0,	"1",	"8",	"4",	"Assault",	"D3",{
	-- Before a unit fires its burnas, roll once for the number of attacks and use this for all burnas fired by the unit in this phase.  When firing a burna, it automatically hits its target.
	"type": "",
	"params":
}),
("orks", "burna_(melee)",	-2,	"1",	"0",	"User",	"Melee",	"1",{}),
("orks", "killsaws_(pair)",	-4,	"2",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll.  If a model is equipped with 2 Killsaws, add 1 to its attack characteristic.
	"type": "",
	"params":
}),
("orks", "stickbomb_chucka",	0,	"1",	"12",	"3",	"Assault",	"D6",{
	-- This weapon can only be fired if a unit is embarked on the vehicle. Blast.
	"type": "",
	"params":
}),
("orks", "spinnin_blades",	0,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Make D3 hit rolls for each attack made with this weapon instead of 1
	"type": "",
	"params":
}),
("orks", "kopta_rokkits",	-2,	"3",	"24",	"8",	"Assault",	"2",{}),
("orks", "twin_big_shoota",	0,	"1",	"36",	"5",	"Assault",	"6",{}),
("orks", "supa_shoota",	-1,	"1",	"36",	"6",	"Assault",	"3",{}),
("orks", "skorcha_missiles",	-1,	"1",	"24",	"5",	"Assault",	"D6",{
	-- Units attacked by this weapon do not gain any bonus to their saving throws for being in cover. Blast.
	"type": "",
	"params":
}),
("orks", "wazbom_mega_kannon",	-3,	"D6",	"36",	"8",	"Heavy",	"D3",{
	-- If you roll one or more hit rolls of 1, the bearer suffers a mortal wound after all of this weapons shots have been resolved. Blast.
	"type": "",
	"params":
}),
("orks", "teleport_mega_blasta",	-2,	"D3",	"24",	"8",	"Assault",	"3",{
	-- If a model suffers any unsaved wounds from this weapon and is not slain, roll a D6 at the end of the phase.  if the result is greater than that models Wounds characteristic, it is slain.
	"type": "",
	"params":
}),
("orks", "stikkbomb_flinga",	0,	"1",	"12",	"3",	"Assault",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "rack_of_rokkits",	-2,	"3",	"24",	"8",	"Assault",	"2",{}),
("orks", "kannon_(frag)",	0,	"1",	"36",	"4",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "kannon_(shell)",	-2,	"D6",	"36",	"8",	"Heavy",	"1",{}),
("orks", "lobba",	0,	"1",	"48",	"5",	"Heavy",	"D6",{
	-- This Weapon can target units that are not visible to the bearer. Blast.
	"type": "",
	"params":
}),
("orks", "zzap_gun",	-3,	"3",	"36",	"2D6",	"Heavy",	"1",{
	-- Before firing this weapon, roll to determine the Strength of the shot.  if the result is 11+ do not make a wound roll - instead, if the attack hits it causes 3 mortal wounds.  The bearer then suffers a mortal wound.
	"type": "",
	"params":
}),
("orks", "bubblechukka",	-D6,	"D6",	"48",	"D6",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "traktor_kannon",	-2,	"D6",	"48",	"8",	"Heavy",	"1",{
	-- This Weapon automatically hits its target.  If the Target is a VEHICLE that can FLY, you roll 2D6 for damage and discard the lowest.  If a VEHICLE unit that FLYS is destroyed, it automatically crashes and burns.
	"type": "",
	"params":
}),
("orks", "smasha_gun",	-4,	"D6",	"48",	"*",	"Heavy",	"D3",{
	-- Instead of making a wound roll for this weapon, roll 2D6.  If the result is equal to or greater than the targets Toughness, the attack successfully wounds. Blast.
	"type": "",
	"params":
}),
("orks", "wrecking_ball",	-1,	"2",	"0",	"+2",	"Melee",	"1",{
	-- The bearer can only make 3 attacks with this weapon each time it fights
	"type": "",
	"params":
}),
("orks", "dread_klaw",	-3,	"3",	"0",	"x2",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with each dread klaw it is equipped with
	"type": "",
	"params":
}),
("orks", "kan_klaw",	-3,	"3",	"0",	"+3",	"Melee",	"1",{}),
("orks", "drilla",	-4,	"2",	"0",	"+1",	"Melee",	"1",{
	-- On a unmodified roll of a 6 to wound, you do 1 mortal wound in addition to any other damage.
	"type": "",
	"params":
}),
("orks", "buzzsaw",	-2,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Each time you fight, you can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("orks", "kustom_mega_kannon",	-3,	"D6",	"36",	"8",	"Heavy",	"D6",{
	-- If you roll one or more hit rolls of 1 for this weapon, the bearer suffers a mortal wound after all of this weapons shots have been resolved. Blast.
	"type": "",
	"params":
}),
("orks", "klaw_of_gork_(crush)",	-4,	"D6",	"0",	"x2",	"Melee",	"1",{}),
("orks", "klaw_of_gork_(smash)",	-2,	"2",	"0",	"User",	"Melee",	"1",{
	-- Make 3 hit rolls for each attack made with this weapon instead of 1.
	"type": "",
	"params":
}),
("orks", "deffstorm_mega_shoota",	-1,	"1",	"36",	"6",	"Heavy",	"18",{}),
("orks", "snazzgun",	-2,	"2",	"24",	"6",	"Heavy",	"3",{}),
("orks", "deffkannon",	-4,	"D6",	"72",	"10",	"Heavy",	"3D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "supa_gatler",	-2,	"1",	"48",	"7",	"Heavy",	"3D6",{
	-- See Psycho-Dakka-Blast!
	"type": "",
	"params":
}),
("orks", "supa_rokkit",	-3,	"D6",	"100",	"8",	"Heavy",	"D6",{
	-- Only one Supa-rokkit can be fired by the bearer a turn, and each can only be fired once per battle. Blast.
	"type": "",
	"params":
}),
("orks", "squig_bomb",	-2,	"D6",	"18",	"8",	"Assault",	"1",{
	-- The weapon cannot target units that can FLY.  Remove the bearer after making this attack.
	"type": "",
	"params":
}),
("orks", "tankhammer",	,	"",	"0",	"",	"Melee",	"1",{
	-- Make a single hit roll when attacking with this weapon.  If it hits, inflict D3 mortal wounds on the target, then remove the bearer.
	"type": "",
	"params":
}),
("orks", "pair_of_rokkit_pistols",	-2,	"D3",	"12",	"7",	"Pistol",	"2",{}),
("orks", "tankbusta_bomb",	-2,	"D6",	"6",	"8",	"Grenade",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "power_stabba",	-2,	"1",	"0",	"User",	"Melee",	"1",{}),
("orks", "da_pain_klaw",	-4,	"D3",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack is made with this weapon against an INFANTRY or MONSTER unit, an unmodified hit roll of 6 inflicts 1 mortal wound on the target in addition to the normal damage.
	"type": "",
	"params":
}),
("orks", "mek_arms",	0,	"2",	"0",	"x2",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 2 additional attacks with this weapon and no more than 2 attacks can be made with this weapon.
	"type": "",
	"params":
}),
("orks", "rippa_klaw",	-3,	"D6",	"0",	"x2",	"Melee",	"1",{}),
("orks", "killkannon",	-2,	"2",	"24",	"8",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "supa_skorcha",	-2,	"1",	"24",	"6",	"Heavy",	"4D3",{
	-- This weapon hits its target automatically
	"type": "",
	"params":
}),
("orks", "big_zzappa",	-4,	"4",	"36",	"2D6",	"Heavy",	"3",{
	-- Before firing this weapon, roll to determine the Strength of the shot.  If the result is 12, do not make a wound roll.  Instead, if the attack hits, each cause 3 mortal wounds.  Then the bearer suffers a mortal wound.
	"type": "",
	"params":
}),
("orks", "big_lobba",	-1,	"1",	"48",	"6",	"Heavy",	"2D6",{
	-- This weapon can target units that are not visible to the bearer.
	"type": "",
	"params":
}),
("orks", "flakka_gunz",	-1,	"1",	"48",	"6",	"Heavy",	"4",{
	-- Add 1 to all hit rolls made for this weapon against targets that can FLY.  Subtract 1 from the hit rolls made for this weapon against all other targets.
	"type": "",
	"params":
}),
("orks", "shunta",	-2,	"2",	"24",	"8",	"Heavy",	"1",{
	-- VEHICLES that suffer a wound from this weapon may not Advance in the following turn.
	"type": "",
	"params":
}),
("orks", "supa_kannon",	-2,	"3",	"60",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "giga_shoota",	-2,	"1",	"48",	"6",	"Heavy",	"30",{
	-- Each time an attack is made with this weapon against a target within half range, add 1 to that attacks hit roll.
	"type": "",
	"params":
}),
("orks", "bursta_kannon",	-3,	"3",	"36",	"10",	"Heavy",	"3D6",{
	-- Blast. Each time an attack is made with this weapon against a target within half range, add 1 to that attacks hit roll.
	"type": "",
	"params":
}),
("orks", "gaze_of_mork",	-4,	"6",	"18",	"12",	"Heavy",	"3",{}),
("orks", "belly_gun",	-2,	"2",	"36",	"8",	"Heavy",	"3D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "kustom_supa_rokkits",	-3,	"D6",	"100",	"8",	"Heavy",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "lifta_droppa",	,	"",	"48",	"",	"Heavy",	"D6",{
	-- Blast. This weapon hits automatically.  Each time an enemy unit is hit by this weapon, roll 2D6.  If the result equals or exceeds the targets Strength, it suffers a mortal wound.
	"type": "",
	"params":
}),
("orks", "huge_tusks",	-4,	"D3+3",	"0",	"User",	"Melee",	"1",{}),
("orks", "squiggoth_supa_kannon",	-2,	"3",	"60",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "supa_lobba",	-2,	"1",	"48",	"7",	"Heavy",	"3D6",{}),
("orks", "reinforced_ram",	-1,	"3",	"0",	"+1",	"Melee",	"1",{}),
("orks", "grot_sponson",	0,	"1",	"24",	"4",	"Assault",	"2",{
	-- Add 1 to hit rolls made for this weapon
	"type": "",
	"params":
}),
("orks", "gorin_horns",	-3,	"D6",	"0",	"User",	"Melee",	"1",{}),
("orks", "grot_guided_bomm",	-3,	"2",	"72",	"8",	"Heavy",	"2D6",{
	-- Blast. This weapon can target units that are not visible to the bearer. The bearer can only shoot with this weapon once per battle. Each time an attack is made with this weapon, the bearer has a Ballastic Skill characteristic of 2+ for that attack.
	"type": "",
	"params":
}),
("orks", "grot_guided_bomm_(fighta_bommer)",	-3,	"2",	"72",	"8",	"Heavy",	"2D6",{
	-- Blast. This weapon can target units that are not visible to the bearer. The bearer can only shoot with this weapon once per battle. Each time an attack is made with this weapon, the bearer has a Ballistic Skill characteristic of 2+ for that attack.
	"type": "",
	"params":
}),
("orks", "kustom_mega_zappa",	-3,	"D6",	"36",	"8",	"Heavy",	"3D3",{
	-- If you roll one or more hit rolls of 1 for this weapon, the bearer suffers a mortal wound after all of this weapons shots have been resolved. Blast.
	"type": "",
	"params":
}),
("orks", "killa_jet_(cutta)",	-4,	"D6",	"8",	"8",	"Assault",	"2",{
	-- If a target is within 1/2 range roll 2 dice when determining damage and discard the lowest.
	"type": "",
	"params":
}),
("orks", "killa_jet_(burna)",	-1,	"1",	"8",	"5",	"Assault",	"D6",{
	-- This weapon automatically hits its target
	"type": "",
	"params":
}),
("orks", "snagga_klaw_(melee)",	-2,	"D3",	"8",	"+2",	"Melee",	"1",{
	-- You can re-roll wound rolls for attacks made with this weapon.
	"type": "",
	"params":
}),
("orks", "snagga_klaw_(shooting)",	1,	"1",	"8",	"4",	"Assault",	"1",{
	-- You can re-roll wound rolls for attacks made with this weapon.
	"type": "",
	"params":
}),
("orks", "twin_boomstick",	0,	"1",	"12",	"5",	"Assault",	"2",{
	-- If you are within 1/2 range you can add 1 to hit rolls for this weapon.
	"type": "",
	"params":
}),
("orks", "kustom_shokk_rifle",	-3,	"D6",	"24",	"8",	"Assault",	"2",{
	-- If you roll one or more unmodified hit rolls of 1 for this weapon, the bearer suffers 1 mortal wound after all of this weapons attacks have been resolved.  Each time you make a wound roll of 6+ for this weapon, the target suffers 1 mortal wound in addition to any other damage.
	"type": "",
	"params":
}),
("orks", "saw_blades",	-1,	"1",	"0",	"+1",	"Melee",	"1",{}),
("orks", "heavy_squig_launcha___bile_squig",	0,	"1",	"36",	"*",	"Assault",	"2D6",{
	-- This weapon always wounds on a 4+ unless it is targeting a VEHICLE or TITANIC unit, in which case it wounds on a 6+. Blast.
	"type": "",
	"params":
}),
("orks", "heavy_squig_launcha___bitey_squig",	-3,	"2",	"36",	"5",	"Assault",	"2",{}),
("orks", "heavy_squig_launcha___boom_squig",	-1,	"D3",	"36",	"6",	"Assault",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "_squig_launcha___bile_squig",	0,	"1",	"36",	"*",	"Assault",	"D6",{
	-- This weapon always wounds on a 4+ unless it is targeting a VEHICLE or TITANIC unit, in which case it wounds on a 6+. Blast.
	"type": "",
	"params":
}),
("orks", "_squig_launcha___bitey_squig",	-3,	"2",	"36",	"5",	"Assault",	"1",{}),
("orks", "_squig_launcha___boom_squig",	-1,	"D3",	"36",	"6",	"Assault",	"D3",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "shotgun",	0,	"1",	"12",	"3",	"Assault",	"2",{
	-- Add 1 to this weapons strength if within 1/2 range.
	"type": "",
	"params":
}),
("orks", "stikk_squigs",	0,	"1",	"6",	"3",	"Grenade",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "mek_speshul",	-2,	"1",	"24",	"5",	"Assault",	"9",{}),
("orks", "burna_bottles",	0,	"1",	"6",	"4",	"Grenade",	"2d6",{
	-- Units do not receive the benefit of cover to their saving throws for attacks made with this weapon. Blast.
	"type": "",
	"params":
}),
("orks", "rivet_cannon",	-2,	"2",	"36",	"7",	"Assault",	"6",{}),
("orks", "burna_exhaust",	0,	"1",	"8",	"4",	"Assault",	"D3",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("orks", "rokkit_cannon",	-2,	"3",	"24",	"8",	"Assault",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "nose_drill",	-2,	"D3",	"0",	"+2",	"Melee",	"1",{}),
("orks", "grot_blaster",	0,	"1",	"12",	"3",	"Pistol",	"1",{}),
("orks", "dread_saw",	-2,	"2",	"0",	"+4",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with each dread saw it is equipped with
	"type": "",
	"params":
}),
("orks", "deff_rolla",	-2,	"2",	"0",	"+1",	"Melee",	"1",{
	-- Each time an attack is made with this weapon, the bearer has a WS characteristic of 2+ for that attack.
	"type": "",
	"params":
}),
("orks", "headwoppas_killchoppa",	-2,	"2",	"0",	"+2",	"Melee",	"1",{
	-- Model with Big Choppa only.  Wound rolls of 6+ made for this weapon inflict 2 mortal wounds instead of the normal damage.
	"type": "",
	"params":
}),
("orks", "da_dead_shiny_shoota",	-1,	"1",	"18",	"4",	"Assault",	"12",{
	-- Model with Kustom Shoota only.
	"type": "",
	"params":
}),
("orks", "da_killa_klaw",	-3,	"3",	"0",	"x2",	"Melee",	"1",{
	-- Model with Power Klaw only.  You can re-roll failed wound rolls for this weapon.
	"type": "",
	"params":
}),
("orks", "da_gobshot_blunderbuss",	-1,	"1",	"12",	"5",	"Heavy",	"2D6",{
	-- Model with Kustom Shoota, Kombi-weapon only.  This weapon automatically hits.
	"type": "",
	"params":
}),
("orks", "krusha_kannon___boom_shell",	-2,	"2",	"60",	"8",	"Heavy",	"2D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "krusha_kannon___tankhamma_shell",	-3,	"6",	"60",	"10",	"Heavy",	"1",{
	-- Each time an attack is made with this weapon against a VEHICLE unit, you can re-roll the hit roll.
	"type": "",
	"params":
}),
("orks", "krusha_kannon___scrap_kanister",	-1,	"1",	"18",	"5",	"Heavy",	"3D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("orks", "krusha_kannon___blast_burna",	-1,	"1",	"48",	"5",	"Heavy",	"3D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "stikkbomb_launcha",	0,	"1",	"12",	"3",	"Assault",	"2D6",{
	-- This weapon can be fired once per battle.
	"type": "",
	"params":
}),
("orks", "mega_gatler",	-2,	"1",	"48",	"7",	"Heavy",	"4D6",{}),
("orks", "twin_big_skorcha",	-1,	"1",	"8",	"5",	"Assault",	"2D6",{
	-- This weapon automatically hits its target
	"type": "",
	"params":
}),
("orks", "krushin_tracks",	-2,	"D3",	"0",	"User",	"Melee",	"1",{}),
("orks", "kustom_grot_blasta",	-1,	"2",	"12",	"5",	"Pistol",	"D3",{}),
("orks", "icon_of_da_revolushun",	-1,	"1",	"0",	"User",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, a wound roll of 6+ inflicts 1 mortal wound on the target in addition to any other damage.
	"type": "",
	"params":
}),
("orks", "kustom_klaw",	-3,	"3",	"0",	"x2",	"Melee",	"1",{}),
("orks", "makaris_stabba",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, a wound roll of 6+ inflicts D3 mortal wounds on the target and the attack sequence ends.
	"type": "",
	"params":
}),
("orks", "git_rippa",	-4,	"2",	"0",	"x2",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, you can re-roll the wound roll.
	"type": "",
	"params":
}),
("orks", "rokker_shoota",	-1,	"1",	"24",	"4",	"Assault",	"4",{}),
("orks", "rokker_choppa",	0,	"1",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("orks", "skraks_horned_helmet",	*,	"*",	"0",	"*",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon and only 1 attack can be made with this weapon. When resolving an attack with made with this weapon, if a hit is scored, the target suffers 1 mortal wound and the attack sequence ends.
	"type": "",
	"params":
}),
("orks", "boombits",	0,	"1",	"12",	"5",	"Assault",	"D6",{
	-- Each time an attack is made with this weapon, that attack automatically hits the target.
	"type": "",
	"params":
}),
("orks", "dread_killsaw",	-4,	"2",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it makes 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("orks", "dread_rippa_klaw",	-3,	"D3+3",	"0",	"x2",	"Melee",	"1",{}),
("orks", "mega_choppa_(smash)",	-5,	"6",	"0",	"x2",	"Melee",	"1",{}),
("orks", "mega_choppa_(slash)",	-2,	"D3",	"0",	"User",	"Melee",	"1",{
	-- Make 3 hit rolls for each attack made with this weapon, instead of 1.
	"type": "",
	"params":
}),
("orks", "stompa_klaw",	-5,	"9",	"0",	"x2",	"Melee",	"1",{
	-- Each time an attack made with this weapon, an unmodified wound roll of a 4+ inflicts D3 mortal wounds on the target in addition to any normal damage.
	"type": "",
	"params":
}),
("orks", "stompa_lifta_droppa",	-4,	"D3+3",	"48",	"*",	"Heavy",	"4D3",{
	-- Each time an attack made with this weapon successfully hits, roll 3D6. If the result is greater than the targets Toughness characteristic, that attack successfully wounds.
	"type": "",
	"params":
}),
("orks", "grabbin_klaw",	-3,	"D3",	"0",	"User",	"Melee",	"1",{
	-- The bearer can only make a single attack with this weapon each time it fights.
	"type": "",
	"params":
}),
("orks", "wing_missiles",	-2,	"3",	"24",	"8",	"Assault",	"1",{
	-- Add 1 to hit rolls for this weapon against VEHICLES, Subtract 1 from hit rolls made with this weapon against all other targets
	"type": "",
	"params":
}),
("orks", "snakebitez___brogs_buzzbomb",	-1,	"1",	"6",	"5",	"Grenade",	"3D6",{
	-- This weapon automatically hits. After you resolve the attack you can choose another enemy unit within 6 and attack it with the same weapon but only 2D6 shots. Blast.
	"type": "",
	"params":
}),
("orks", "da_souped_up_shokka",	-5,	"D6",	"60",	"2d6",	"Heavy",	"2D6",{
	-- Each time this unit is chosen to shoot with, roll once to determine the Strength characteristic of this weapon. If the result is 11+ each successful hit inflicts D3 mortal wounds on the target in addition to any normal damage. Blast.
	"type": "",
	"params":
}),
("orks", "souped_up_speshul",	-1,	"1",	"30",	"4",	"Assault",	"15",{}),
("orks", "da_boomer",	-2,	"2",	"36",	"8",	"Heavy",	"2D6",{}),
("orks", "zagzap",	-3,	"3",	"36",	"2D6",	"Heavy",	"1",{
	-- When resolving an attack made with this weapon, do not make a hit roll; it automatically scores a hit. Before firing this weapon, roll to determine the Strength of the shot. If the result is 9+, do not make a wound roll. Inflict 3 mortal wounds on the target and the attack sequence ends
	"type": "",
	"params":
}),
("orks", "pincha",	-3,	"D6",	"0",	"+1",	"Melee",	"1",{
	-- Each time the bearer fights, it can only make a single attack with this weapon. When resolving an attack made with this weapon, add 3 to the hit roll if the target is a VEHICLE or MONSTER. 
	"type": "",
	"params":
}),
("orks", "slug_gubbin",	-1,	"1",	"36",	"6",	"Heavy",	"24",{
	-- When resolving an attack made with this weapon, if the target was within 12 when the bearer was chosen to shoot with, add 1 to the hit rol
	"type": "",
	"params":
}),
("orks", "shoota",	0,	"1",	"18",	"4",	"Assault",	"2",{}),
("orks", "skorcha",	-1,	"1",	"8",	"5",	"Assault",	"D6",{
	-- This weapon automatically hits its target.
	"type": "",
	"params":
}),
("orks", "rokkit_launcha",	-2,	"3",	"24",	"8",	"Assault",	"1",{}),
("orks", "killsaw",	-4,	"2",	"0",	"x2",	"Melee",	"1",{
	-- When attacking with this weapon, you must subtract 1 from the hit roll.  If a model is equipped with 2 Killsaws, add 1 to its Attacks characteristic
	"type": "",
	"params":
}),
("orks", "stikkbomb",	0,	"1",	"6",	"3",	"Grenade",	"D6",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "slugga",	0,	"1",	"12",	"4",	"Pistol",	"1",{}),
("orks", "choppa",	0,	"1",	"0",	"user",	"Melee",	"1",{
	-- Each time the bearer fights, it can make 1 additional attack with this weapon.
	"type": "",
	"params":
}),
("orks", "grotzooka",	0,	"1",	"18",	"6",	"Heavy",	"2D3",{
	-- Blast
	"type": "",
	"params":
}),
("orks", "kustom_mega_blasta",	-3,	"D6",	"24",	"8",	"Assault",	"1",{
	-- If you roll one or more hit rolls of 1, the bearer suffers a mortal wound after all of the weapons shots have been resolved
	"type": "",
	"params":
}),
("orks", "big_shoota",	0,	"1",	"36",	"5",	"Assault",	"3",{}),
("orks", "rattler_kannon",	-2,	"1",	"24",	"6",	"Heavy",	"D6",{}),
("orks", "deffgun",	-1,	"2",	"48",	"7",	"Heavy",	"D3",{
	-- Each time this unit is chosen to shoot with, roll one D3 to determine the Type characteristic of all deffguns that models in this unit are equipped with when resolving those attacks.
	"type": "",
	"params":
}),
