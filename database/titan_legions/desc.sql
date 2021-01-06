INSERT INTO war_desc_profile (faction, name, meaning) VALUES
("titan_legions", "flank_speed", {
	-- Each time this model Advances, do not make an Advance roll. Instead, until the end of the phase, add 12 to Move characteristic of this model.
	"type": "",
	"params":
}),
("titan_legions", "war_engine", {
	-- This model is eligible to declare a charge in a turn in which it Fell Back. Each time this model makes a Normal Move, Advances or Falls Back, it can be moved across other models (excluding TITANIC models) as if they were not there, and when it does it can be moved within Engagement Range of such models, but cannot finish its move within Engagement Range of any of them.
	"type": "",
	"params":
}),
("titan_legions", "battle_titan", {
	-- This model is eligible to declare a charge in a turn in which it Fell Back. Each time this model makes a Normal Move, Advances or Falls Back, it can be moved across other models (excluding MONSTER and VEHICLE models) as if they were not there, and when it does it can be moved within Engagement Range of such models, but cannot finish its move within Engagement Range of any of them.
	"type": "",
	"params":
}),
("titan_legions", "void_shields", {
	-- Each void shield has 3 shield points. While this model has any void shields, it has a 5+ invulnerable save against ranged attacks.  Each time a saving throw is failed for this model against a ranged attack, if it has any void shields, it does not suffer any damage. Instead, for each point of damage inflicted, one of its void shields loses 1 shield point. Once a void shield has lost a shield point, it must continue to lose shield points due to any further damage inflicted until it collapses. Each time an attack causes a void shield to be reduced to 0 shield points, that void shield collapses: this model loses that void shield and any excess damage inflicted by that attack is lost. Void shields can never be used to prevent mortal wounds (each mortal wound inflicted on a model with void shields causes that model to lose one wound as normal).  At the start of your Command phase, if this model has a void shield that has fewer than 3 shield points remaining, that void shield is restored to 3 shield points.
	"type": "",
	"params":
}),
