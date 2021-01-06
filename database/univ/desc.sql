INSERT INTO war_desc_profile (faction, name, meaning) VALUES
("univ", "explodes_(6+/2d6/d6)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark.  On a 6 it explodes and each unit within 2D6 suffer D6 mortal wounds.
	"type": "EXPLODES",
	"radius": "2D6",
	"params": {
		"threshold": 6,
		"dmg": "D6M",
	} 
}),
("univ", "explodes_(6+/6/d3)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 6 it explodes, and each unit within 6 suffers D3 mortal wounds.
	"type": "EXPLODES",
	"radius": "D6",
	"params": {
		"threshold": 6,
		"dmg": "D3M",
	} 
}),
("univ", "explodes_(6+/6/d6)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 6 it explodes, and each unit within 6 suffers D6 mortal wounds.
	"type": "EXPLODES",
	"radius": "D6",
	"params": {
		"threshold": 6,
		"dmg": "D6M",
	} 
}),
("univ", "explodes_(6+/3/1)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 6 it explodes, and each unit within 3 suffers 1 mortal wound.
	"type": "EXPLODES",
	"radius": 3,
	"params": {
		"threshold": 6,
		"dmg": 1,
	} 
}),
("univ", "explodes_(6+/9/d6)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield. On a 6 it explodes, and each unit within 9 suffers D6 mortal wounds.
	"type": "EXPLODES",
	"radius": "9",
	"params": {
		"threshold": 6,
		"dmg": "D6",
	} 
}),
("univ", "explodes_(6+/2d6/2d6)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark.  On a 6 it explodes and each unit within 2D6 suffer 2D6 mortal wounds.
	"type": "EXPLODES",
	"radius": "2D6",
	"params": {
		"threshold": 6,
		"dmg": "2D6",
	} 
}),
("univ", "explodes_(6+/3/d3)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 6 it explodes, and each unit within 3 suffers D3 mortal wound.
	"type": "EXPLODES",
	"radius": 3,
	"params": {
		"threshold": 6,
		"dmg": "D3",
	} 
}),
("univ", "explodes_(4+/d6/d3)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 4+ it explodes, and each unit within D6 suffers D3 mortal wounds.
	"type": "EXPLODES",
	"radius": "D6",
	"params": {
		"threshold": 4,
		"dmg": "D3",
	} 
}),
("univ", "explodes_(4+/6/d6)", {
	-- If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield and before any embarked models disembark. On a 4+ it explodes, and each unit within 6 suffers D6 mortal wounds.
	"type": "EXPLODES",
	"radius": 6,
	"params": {
		"threshold": 4,
		"dmg": "D6",
	} 
}),
("univ", "explodes_(6/3d6/d6)", {
	-- When this model is destroyed, roll one D6 before any embarked models disembark and before removing it from play. On a 6 it explodes and each unit within 3D6 suffers D6 mortal wounds.
	"type": "EXPLODES",
	"radius": "3D6",
	"params": {
		"threshold": 6,
		"dmg": "D6",
	} 
}),
