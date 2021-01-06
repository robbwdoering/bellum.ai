INSERT INTO war_weapon_profile (faction, name, ap, damage, range, strength, weapontype, shots, meaning) VALUES
("fallen", "cyphers_bolt_pistol",	-1,	"1",	"16",	"4",	"Pistol",	"3",{}),
("fallen", "cyphers_plasma_pistol",	-3,	"2",	"12",	"8",	"Pistol",	"2",{}),
("fallen", "chainaxe",	-1,	"1",	"0",	"+1",	"Melee",	"1",{}),
("fallen", "caliban_steel_blade",	-3,	"D3",	"0",	"User",	"Melee",	"1",{
	-- Any attacks with a wound roll of 6+ made with this weapon have a Damage characteristic of D6 instead of D3.
	"type": "",
	"params":
}),
("fallen", "the_black_mace",	-2,	"2",	"0",	"+3",	"Melee",	"1",{
	-- Roll a D6 each time a model is slain by the Black Mace; on a 6, that models unit suffers an additional mortal wound at the end of the phase.
	"type": "",
	"params":
}),
("fallen", "the_murder_sword",	-4,	"1",	"0",	"+1",	"Melee",	"1",{
	-- At the start of the first battle round but before the first turn has begun, you must nominate one enemy CHARACTER to be the target of the bearer of the Murder Sword (this can be a character not yet set up on the battlefield). Remember to tell your opponent which character you have nominated. Each attack made with the Murder Sword that hits the selected character automatically inflicts a mortal wound upon that character instead of the normal damage.
	"type": "",
	"params":
}),
("fallen", "ulocca,_the_black_axe",	0,	"1",	"0",	"User",	"Melee",	"1",{
	-- When resolving an attack made with this weapon, an unmodified wound roll of 4+ inflicts 1 mortal wound on the target in addition to any other damage.
	"type": "",
	"params":
}),
("fallen", "havoc_launcher",	0,	"1",	"48",	"5",	"Heavy",	"D6",{}),
