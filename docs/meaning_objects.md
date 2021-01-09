# Meaning Objects 
This document seeks to lay out the various components that go into translating WH40k rules from a human-readable format (plain english as it appears in the codexes) into a computer-readable format ([JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)). This resulting JSON object tells the computer when to apply the rule, and what effect it will have when applied.

This is not automatable (someone please prove me wrong...), so a human must look at each rule and translate it into a corresponding object. The hope is that this document will allow anyone familiar with Warhammer 40k to modify these JSON objects, without the need for any programming knowledge. For context, these objects are stored for each faction in [special .sql files](https://github.com/robbwdoering/bellum.ai/tree/master/database), and then made available to the actual running web application via a relational database.

It is important to note before proceeding that by the very nature of the application, some rules are impossible to meaningfully represent in this format, and many more are not represented because it would be possible but challenging. Instead of covering 100% of WH40k's many rules, this engine seeks to capture the 90% that have the most frequent effect on the game, and leave it to the user to apply the remaining 10% themselves. Users are warned throughout the game which relevant rules are not covered.

When translating a rule, one must think of the rule as being split into two parts: the "IF" part (when to apply), and the "THEN" part (what it does). In this system, the "IF" parts of a rule are called "conditionals", the "THEN" parts are called the "effects", and the overall object is a called a "meaning object".

## Conditionals
A conditional is an object that tells the engine to run a specific function with specific inputs, which always returns "true" (this rule applies) or "false" (this rule does not apply). When exactly the conditional is called depends on the type of the effect; for example, conditionals for Roster Rules are only checked at the start of the game, but rules on shooting are often evaluated at the start of every shooting phase.

All conditional JSON objects are descendants of the overall effect's JSON object, and restricted to the "cond" field of the meaning object. That said, they can also be chained [recursively](https://en.wikipedia.org/wiki/Recursion) using the conditional types "AND", "OR", "NOT", and "XOR". This is so that one effect can have a complex set of multiple conditionals, like "if this unit is an ork AND an infantry AND can NOT fly".

This is the basic layout of a conditional: 
```js
cond: {
	// A string that identifies the function to run to see if this conditional is true.
	// See the "Conditional Types" section for a list of currently implemented types.
	type: string, 

	// Contains input to the condtional, like an numeric threshold or a list of relevant strings
	// Content entirely depends on type - could be an array, object, number, string, or even optional
	params: varies,

	// Optional field that describes which unit to run this conditional against.
	// Almost all conditionals will use "SELF" (implied by leaving this field undefined) or "ENEMY".
	target: string
}
```

## Effects
The effect of a rule is the "meat-and-potatoes," so to speak; unlike conditionals, which are restricted to their own section of a meaning object called "cond", we say "effect" to describe all the other fields of the meaning object.

Like conditionals, effects can be nested, although this system is much simpler and only supports a max of two nested levels (rather than infinite). This can be done using the special "AND" effect, which captures rules like "add one to hit rolls AND reroll wound rolls", or the "OR" effect to capture rules like Defensible Terrain. 

> :warning: The "OR" effect is not currently supported in the code, and will instead be treated as an "AND" as a shortcut. New rules should still use the "OR" type where appropriate so that they'll work when "OR" support is added.

This is the basic layout of a meaning object, where "type" is the only field required in all cases:
```js
{
	// Discussed above. Optional - if ommited, it means that this rule always applies
	cond: object

	// A string that identifies the effect. Unlike conditionals, these vary too much to describe very accurately beyond that. 
	// These run the gamut from simple rules such as "add one to hit rolls", to complex context-dependent rules, like vehicles that explode upon death.
	// See the "Effect Types" section for a list of currently implemented types.
	type: string, 

	// Contains input to whatever code interacts with this effect.
	// Content entirely depends on type - could be an array, object, number, string, or even optional
	params: varies,

	// Optional field that describes which unit to run this effect against.
	// Almost all effects will use "SELF" (implied by leaving this field undefined) or "ENEMY".
	target: string,

	// Some rules are only partially implemented, leaving out some odd edge cases or rarely-used behavior.
	// This optional field is a plain english description of what the user should keep in mind before applying this rule in the actual game.
	warning: string,

	// A number of inches, used for "AURA" effects to identify the radius of the aura.
	radius: number
}
```

## Conditional Types
| Type               | Description                                                                                                   | Parameter Format            | Subtypes            |
|--------------------|---------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|
| AND                | Evaluates each sub-conditional, returning true if they all do                                                 | Array of cond. objects      |                     |
| OR                 | Evaluates each sub-conditional, returning true if one does                                                    | Array of cond. objects      |                     |
| XOR                | Evaluates each sub-conditional, returning true if ONLY one does                                               | Array of cond. objects      |                     |
| NOT                | Evaluates the sub-conditional, returning true if it returns false                                             | Cond. object                |                     |
| IN_RANGE | Evaluates the sub-conditional for every unit within range, returning true if any do | | |
| SHARE_SUBFACTION   | If the two units share a subfaction, like Ork <CLAN> or Marine <CHAPTER>                                      | N/A                         |                     |
| HAS_CATEGORY       | If the unit has one of the listed categories                                                                  | Array of category names     |                     |
| HAS_FACTION        | If the unit is part of one of the listed factions                                                             | Array of faction names      |                     |
| HAS_STATUS         | If the unit currently has one of the listed STATUS flags from earlier in the turn, like CHARGED or FELL_BACK. | Array of status IDs         |                     |
| HAS_STAT           | If this characteristic field is more than the given threshold value                                           | {field, val}                |                     |
| IN_DETACHMENT_TYPE | If the unit was deployed in a detachment of one of the listed types                                           | Array of detachment types   |                     |
| HAS_MODEL_QUANTITY | If the unit currently has at least this many models left alive                                                | number of models            |                     |
| IN_COVER           | If the unit is currently within this type of cover. If you don't specify a subtype, it matches all types      | N/A                         | HEAVY, LIGHT, DENSE |
| IS_PHASE           | If the current phase MATCHES the parameter, where Command is 1 and Morale is 7                                | Number representing a phase |                     |
| IS_ROUND           | If the current round is AT LEAST the parameter, where rounds run from 1 to 5                                  | Number representing a round |                     |


## Effect Types
| Type               | Description                                                                                                     | Parameter Format                       | Subtypes     |
|--------------------|-----------------------------------------------------------------------------------------------------------------|----------------------------------------|--------------|
| AND                | A wrapper rule that applies each sub-rule                                                                       | Array of meaning objects               |              |
| OR                 | A wrapper rule that allows the player to choose one effect. Not yet fully supported                             | Array of meaning objects               |              |
| AURA               | Applies the sub-rule to this unit and all others within the radius                                              | Meaning object                         |              |
| SET_STAT           | Sets a statistic (AKA characteristic field) for a unit                                                          | {field, val}                           | SHOOT, FIGHT |
| ADD_STAT           | Adds a number to a unit's statistic (AKA characteristic field).                                                 | {field, val}                           | SHOOT, FIGHT |
| HIT                | Adds a number to every hit roll this unit makes                                                                 | Number                                 | SHOOT, FIGHT |
| BE_HIT             | Adds a number to every roll made to hit this unit                                                               | Number                                 | SHOOT, FIGHT |
| HIT_REROLL         | Every time the unit makes a roll to hit, it can reroll the listed values                                        | Array of numbers                       | SHOOT, FIGHT |
| BE_HIT_REROLL      | Every time an enemy makes a roll to hit this unit, it can reroll the listed values                              | Array of numbers                       | SHOOT, FIGHT |
| WOUND              | Adds a number to every wound roll this unit makes                                                               | Number                                 | SHOOT, FIGHT |
| BE_WOUNDED         | Adds a number to every roll made to wound this unit                                                             | Number                                 | SHOOT, FIGHT |
| WOUND_REROLL       | Every time the unit makes a roll to wound, it can reroll the listed values                                      | Array of numbers                       | SHOOT, FIGHT |
| BE_WOUNDED_REROLL  | Every time an enemy makes a roll to wound this unit, it can reroll the listed values                            | Array of numbers                       | SHOOT, FIGHT |
| SET_SAVE           | Sets every save roll this unit makes                                                                			   | Number                                 | SHOOT, FIGHT |
| ADD_SAVE           | Adds a number to every save roll this unit makes                                                                | Number                                 | SHOOT, FIGHT |
| SAVE_REROLL        | Every time the unit makes a roll to save, it can reroll the listed values                                       | Array of numbers                       | SHOOT, FIGHT |
| SET_AP             | Set number to every armor save roll made to resist attacks from this unit                 					   | Number                                 | SHOOT, FIGHT |
| ADD_AP             | Add to number to add to every armor save roll made to resist attacks from this unit                 		       | Number                                 | SHOOT, FIGHT |
| AUTOHIT            | If a hit roll matches one of the given numbers, it always hits regardless of modifiers                          | Array of numbers - null implies all    | SHOOT, FIGHT |
| EXPLODING_HIT      | If a hit roll matches one of the given numbers, the unit can make an extra attack                               | Array of numbers                       | SHOOT, FIGHT |
| FNP                | Every time this unit suffers a wound, it rolls a D6. If it meets the given threshold, the wound is ignored      | Number                                 | SHOOT, FIGHT |
| DMG            	 | Adds a number to every instance of damage dealt by this unit 												   | Number                                 | SHOOT, FIGHT |
| DMG_MAX            | Each attack against this unit can only deal a maximum of this much damage                                       | Number                                 | SHOOT, FIGHT |
| DMG_MAX_ROLL       | For every successful attack, roll a D6. If it meets the given threshold, the damage is reduced to the given max | {max, threshold}                       | SHOOT, FIGHT |
| PASS_MORALE | Automatically pass all morale tests | | |
| MORALE_REROLL | This unit can re-roll failed Morale tests | | |
| MORALE_FNP         | Every time a model from this unit flees, it rolls a D6. If it meets the given threshold, it stays               | Number                                 |              |
| MORALE_EXECUTION   | Every time this unit fails a morale test, it can choose to suffer the listed damage instead of fleeing          | String that describes damage           |              |
| DEEPSTRIKE         | Unit can choose to deploy after the first round at least the given number of inches away from any enemies       | Number of inches - null implies 9 		|              |
| ADVANCE_AND_CHARGE | Allows the unit to charge even if it advanced this turn                                                         |                                        | ONE_DIE      |
| FALL_AND_CHARGE | Allows the unit to charge even if it fell back this turn | | |
| FALL_AND_SHOOT | Allows the unit to shoot even if it fell back this turn | | |
| SET_ADVANCE_DISTANCE | Sets the number of inches the model will move if it advances |                                        | |
| ADVANCE_SHOOT | This unit can advance and fire without penalty. Subtypes offer restriction options. |  | ASSAULT |
| MOVE_SHOOT_HEAVY | This unit can move and fire heavy weapons without penalty. |  |  |
| ADD_ADVANCE | Add a number to any advance roll made by this unit. | Number | |
| ADD_CHARGE | Add a number to any charge roll made by this unit. | Number | |
| CHARGE_REROLL     | This unit can reroll one or both charge dice                                                                    |                                        | ONE_DIE             |
| ADVANCE_REROLL     | This unit can reroll the die it uses to advance                                                                    |                                        |              |
| CHARGE_DMG | Upon a successful charge, inflict damage on units in engagement range if a rolled D6 meets a threshold. | { dmg, threshold } | |
| MAX_DMG_PER_ROUND  | This unit can only take up to this many wounds per round                                                        | Number                                 | 			   |
| ADD_PSYKER_CASTS   | Add this number to the number of psychic abilities this unit can use per round                                  | Number                                 |              |
| OBJECTIVE_SECURED  | This unit takes precedence over units without this rule when determining objective holders                      |                                        |              |
| TRANSPORT          | This unit can transport the given number of models. Usually some specific restrictions apply                    | Number                                 |              |
| OPEN_TOPPED        | Units embarked in this transport can still fire (restricitons apply)                                            |                                        |              |
| CANNOT_BE_PSYCHIC  | This unit cannot be targeted by psychic powers                                                                  |                                        |              |
| ADD_PSYCHIC        | Add a number to every psychic roll this unit makes                                                              | Number                                 |              |
| ADD_DENY_THE_WITCH | Add a number to every deny the witch roll this unit makes                                                       | Number                                 |              |
| BATLLEFORGED_MOD | This rule regards how one can legally construct an battleforged force - it is ignored in game 					   |  										|              |
| ACTION | Represents some sort of action the unit can take. Not really covered yet in app, just vague timing warnings. 	|  										| BATTLE, SETUP |
| SPLIT_UP | This rule allows the unit to split up after deployment. Not supported. |  										| |
| FREE_MOVEMENT | This unit can move over enemy units without penalty, though cannot end their turn within engagement range as usual | | |
| CAN_GRENADE_PISTOL | This unit can fire grenades and pistols while firing other weapons | | |
| MULT_SHOTS | Mutliply the number of shots form this unit by a constant value | | |
| REROLL_SHOTS | Reroll any or all of the dice when rolling to determine number of shots | | |
| SHARE_STAT | AURA ONLY: Sets some stats of units within the aura to the value held by the aura holder| | |


## Examples
We begin with a very simple example of a rule, pulled from the Ork Codex:

  :scroll: **'Ere We Go!:** You can re-roll charge rolls for this unit.  When doing so, you can re-roll all or any of the dice.

This rule is represented as the following object:
```js
{
	type: "CHARGE_REROLL"
}
```

As you can see, this rule describes something that lots of different factions have, so we simply name the effect type and that's all we need. The engine knows how to see this type and A) remind the user about this rule during the charge phase, and B) take this advantage into account when giving projections of how far the unit might charge.

Now lets try something trickier:

  :scroll: **Green Tide:** If this unit includes 20 or more models, add 1 to the Attacks characteristic of each model in the unit.

This rule adds two new wrinkles:
1. There's an "if" clause - this rule only applies sometimes.
2. The rule has some details that are inherently specific to this rule, namely a number and the name of a particular characteristic.
To capture these, we use the following object:
```js
{
	cond: {
		type: "HAS_MODEL_QUANTITY",
		params: 20 
	},
	type: "ADD_STAT",
	params: {
		field: "attacks",
		val: 1
	}
}
```

The cond object tackles our first wrinkle, by telling the engine to only apply the rule when the unit has X number of models left, where X is given in the parameter. The second is handled by the parameter field of the effect, giving the number and the name of the relevant characteristic.

If you've got a hang of that, let's jump to an example that shows how effects can be nested, this time pulled from the Adeptus Custodes codex:

  :scroll: **Legendary Commander:** You can re-roll hit rolls and wound rolls of 1 made for friendly ADEPTUS CUSTODES units within 6" of Trajann Valoris.

This rule doesn't have very many words, but describes an "aura", which makes it more complex. Auras don't apply directly to the units that have them, but rather are descriptions of rules to apply to certain units NEAR the unit that has this rule. If you remember this idea, that this rule is just a wrapper for the "real" rule, the following might make more sense:
```js
{
	type: "AURA", 
	radius: 6,	
	params: {
		cond: {
			type: "HAS_CATEGORY",
			params: ["adeptus_custodes"]
		},
		type: "AND",
		params: [
			{
				type: "HIT_REROLL", 
				params: [1]
			},
			{
				type: "WOUND_REROLL", 
				params: [1]
			}
		]
	}
}
```

Here, the parameter field of the object is actually its own complete meaning object! The engine will look at this nested object and apply it all units that are within 6" and that pass the conditional (are part of a certain unit category). From there, the last complexity is that this nested effect is actually two effects that are nested further: reroll 1s to hit, and reroll 1s to wound.

Finally, we'll briefly present an example of a multi-part rule with nested conditionals:

  :scroll: **Great Waagh!:** Friendly ORK INFANTRY and MONSTER units within 6" of this model can be chosen to charge with even if they Advanced this turn. In addition, add 1 to the Attacks characteristic of models in friendly ORK INFANTRY units whilst their unit is within 6" of this model, if their unit made a charge move this turn.

And the corresponding object:
```js
{
	type: "AND",
	params: [
		{
			type: "AURA",
			radius: 6,
			params: {
				cond: {
					type: "AND",
					params: [
						{
							type: "HAS_FACTION",
							params: ["ork"]
						},
						{
							type: "HAS_CATEGORY",
							params: ["infantry", "monster"]
						}
					]
				},
				type: "ADVANCE_AND_CHARGE"
			}
		},
		{
			type: "AURA",
			radius: 6,
			params: {
				cond: {
					type: "AND",
					params: [
						{
							type: "HAS_FACTION",
							params: ["ork"]
						},
						{
							type: "HAS_CATEGORY",
							params: ["infantry"]
						},
						{
							type: "HAS_STATUS",
							params: ["CHARGED"]
						}
					]
				},
				type: "ADD_STAT",
				params: { field: "attacks", val: 1 }
			}
		}
	]
}
```

This example showcases the use of multiple conditionals linked together - all of the listed conditionals within each "AND" must be satisfied on each unit within the radius for the rule to take effect for that unit. The rest simply uses everything we've discussed so far together, so I'll remit the detailed explanation. If you're curious to see more examples, I encourage you to look into [the actual .sql files](https://github.com/robbwdoering/bellum.ai/tree/master/database) that have been built so far, and compare the objects against what's printed in your codex. If you find a mistake, please let me know, or if you're feeling generous, you can [open a pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) to fix it yourself!
