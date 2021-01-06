INSERT INTO war_desc_profile (faction, name, meaning) VALUES
("fw_corsairs", "ynnari", {
	-- Requires a Ynnari Character in Detachment. Detachment loses subfaction keywords and gains the REBORN keyword instead, and my not be the target of original subfaction stratagems.
	"type": "",
	"params":
}),
("fw_corsairs", "explodes", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 6 it explodes, and each unit within 6 suffers 1 mortal wound.
	"type": "",
	"params":
}),
("fw_corsairs", "open_topped", {
	-- Models embarked on this model can attack in their Shooting phase. Measure the range and draw line of sight from any point on this model. When they do so, any restrictions or modifiers that apply to this model also apply to its passengers; for example, the passengers cannot shoot if this model has Fallen Back in the same turn, cannot shoot (except with Pistols) if this model is within 1 of an enemy unit, and so on.
	"type": "",
	"params":
}),
("fw_corsairs", "flickerfield", {
	-- Your opponent must subtract 1 from all hit rolls that target this model in the Shooting phase. 
	"type": "",
	"params":
}),
("fw_corsairs", "night_shield", {
	-- This model has a 5+ invulnerable save against ranged weapons. 
	"type": "",
	"params":
}),
("fw_corsairs", "hover_tank", {
	-- Distance and ranges are always measured to and from this models hull, even though it has a base.
	"type": "",
	"params":
}),
("fw_corsairs", "explodes_(hover_tank)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield. On a 6 it explodes, and each unit within 6 suffers D3 mortal wounds.
	"type": "",
	"params":
}),
("fw_corsairs", "grisly_trophies", {
	-- Roll a D6 each time a model flees from a unit that is within 6 of any enemy models with grisly trophies. For each roll of 6, one additional model flees that unit (these cannot cause additional models to flee).
	"type": "",
	"params":
}),
("fw_corsairs", "chain_snares", {
	-- Re-roll hit rolls of 1 for a model with chain-snares whenever it attacks with its bladevanes
	"type": "",
	"params":
}),
("fw_corsairs", "crystal_targeting_matrix", {
	-- A model with a crystal targeting matrix does not suffer the penalty for firing a heavy weapon after moving when targeting the closest enemy unit.
	"type": "",
	"params":
}),
("fw_corsairs", "spirit_stones", {
	-- Roll a D6 each time a model with spirit stones suffers an unsaved wound or mortal wound: on a 6 the wound is ignored.
	"type": "",
	"params":
}),
("fw_corsairs", "vectored_engines", {
	-- If a model with vectored engines Advances, your opponent must subtract 1 from all hit rolls for ranged weapons that target it until your next Movement phase.
	"type": "",
	"params":
}),
("fw_corsairs", "star_engines", {
	-- When a model with star engines Advances, add 2D6 to that models Move characteristic for that Movement phase instead of D6.
	"type": "",
	"params":
}),
("fw_corsairs", "reckless_abandon", {
	-- If a unit with this ability inflicts one or more casualties on an enemy unit while firing Overwatch, it may make a 3 move in any direction that does not end within 3 of an enemy model once the Overwatch attack has been fully resolved and before the enemy unit has made its charge move.
	"type": "",
	"params":
}),
("fw_corsairs", "dancing_on_the_blades_edge", {
	-- When making Morale tests, a unit with this ability may roll an additional dice and discard the highest result, but if any models flee from the unit due to the result of the test, the number of models that flee is increased by +1.
	"type": "",
	"params":
}),
("fw_corsairs", "strength_from_death", {
	-- This ability is common to all YNNARI INFANTRY and YNNARI BIKER units and the Yncarne.  Each time a unit is completely destroyed within 7 of one or more units with this ability, except in the Morale phase, pick one of those units to make a Soulburst action. That unit can immediately do one of the following, even if it has already done so in this turn (if the unit was destroyed as the result of a unit’s action – e.g. making a shooting attack or fighting – the Soulburst action is resolved after the unit has completely resolved its current action, e.g. after it has completed all of its shooting attacks or after it has finished fighting, including making any consolidation moves):

-The unit can move as if it were your Movement phase.  It can Advance or Fall Back as part of this move.
-The unit can, if it is a PSYKER, immediately attempt to manifest a single psychic power as if it were the Psychic phase.
-The unit can shoot as if it were your Shooting phase, even if it Advanced or Fell Back this turn.
-The unit can charge as if it were the Charge phase, even if it Advanced or Fell Back this turn(enemy units can fire Overwatch as normal).  A unit cannot do this if it is within 1 of an enemy unit.
-The Unit can fight as if it were the Fight Phase.

Note that this means that a unit may be able to shoot or fight twice in the same turn.

A unit can only make a Soulburst action once per turn.
	"type": "",
	"params":
}),
