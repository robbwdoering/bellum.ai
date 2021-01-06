INSERT INTO war_desc_profile (faction, name, meaning) VALUES
("titanicus_traitoris", "void_shields", {
	-- This model has 4 void shields. Each void shield has 3 shield points. While this model has any void shields, it has a 5+ invulnerable save against ranged attacks.  Each time a saving throw is failed for this model against a ranged attack, if it has any void shields, it does not suffer any damage. Instead, for each point of damage inflicted, one of its void shields loses 1 shield point. Once a void shield has lost a shield point, it must continue to lose shield points due to any firther damage inflicted until it collapses. Each time an attack causes a void shield to be reducedc to 0 shield points, that void shield collapses: this model loses that void shield and any excess damage inflicted by that attack is lost. Void shields can never be used to prevent mortal wounds (each mortal wound inflicted on a model with void shields causes that model to lose one wound as normal).  At the start of your Command phase, if this model has a void shield that has fewer than 3 shield points remaining, that void shield is restored to 3 shield points.
	"type": "",
	"params":
}),
("titanicus_traitoris", "flank_speed", {
	-- Each time this model Advances, do not make an Advance roll. Instead, until the end of the Movement phase, add 12 to the Move characteristic of this model.
	"type": "",
	"params":
}),
("titanicus_traitoris", "war_engine", {
	-- This model is eligible to declare a charge in a turn in which it Fell Back. Each time this model makes a Normal Move, Advances or Falls Back, it can be moved across other models (excluding TITANIC models) as if they were not there, and when it does so it can be moved within Engagement Range of such models, but cannot finish its move within Engagement Range of any of them.
	"type": "",
	"params":
}),
("titanicus_traitoris", "reactor_meltdown", {
	-- When this model is destroyed, roll one D6 before removing the model from the battlefield. On a 6+ it explodes, and each unit within 4D6 suffers 3D6 mortal wounds.
	"type": "",
	"params":
}),
("titanicus_traitoris", "battle_titan", {
	-- This model is eligible to declare a charge in a turn in which it Fell Back. Each time this model makes a Normal Move, Advances or Falls Back, it can be moved across other models (excluding MONSTER and VEHICLE models) as if they were not there, and when it does so it can be moved within Engagement Range of such models, but cannot finish its move within Engagement Range of any of them.
	"type": "",
	"params":
}),
("titanicus_traitoris", "titan_void_shields", {
	-- Titans are protected by specialised void shield generators, near-impenetrable barriers of force projected out at a distance from their hulls in layers and designed to deflect and absorb the impact of high-energy attacks and missiles against them. In game terms, Titan void shields are represented by a unique kind of saving throw which the controlling player can opt to use instead of their normal save or invulnerable save against any form of attack except from weapons with the Melee type. like invulnerable saves, Titan void shield saves are unaffected by the AP of an attack, but unlike invulnerable saves they may also be used to negate mortal wounds. In this case, roll one dice for each mortal wound that has been inflicted on the Titan, with the mortal wound being ignored if the save roll is passed. Titan void shields must be continuously re-energised and renewed in combat operations and so as the Titan is damaged, the defensive potential of its void shields is reduced. 
	"type": "",
	"params":
}),
