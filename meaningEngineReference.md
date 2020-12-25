# Meaning Engine Reference Document
This document seeks to lay out the various components that go into translating WH40k rules from a human-readable format (plain english as it appears in the codexes) into a computer-readable format ([JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)). This resulting JSON object tells the computer when to apply the rule, and what effect it will have when applied.

This is not automatable (someone please prove me wrong...), so a human must look at each rule and translate it into a corresponding object. The hope is that this document will allow anyone familiar with Warhammer 40k to modify these JSON objects, without the need for any programming knowledge. For context, these objects are stored for each faction in [special .sql files](https://github.com/robbwdoering/bellum.ai/tree/master/database), and then made available to the actual running web application via a relational database.

It is important to note before proceeding that by the very nature of the application, some rules are impossible to meaningfully represent in this format, and many more are not represented because it would be possible but challenging. Instead of covering 100% of WH40k's 1000+ rules, this engine seeks to capture the 90% that have the most frequent effect on the game, and leave it to the players to apply the remaining 10% themselves. Players are warned at the start of the game which rules are used by the two forces at play that are not yet covered.

When translating a rule, one must think of the rule as being split into two parts: the "IF" part (when to apply), and the "THEN" part (what it does). In this system, the "IF" parts of a rule are called "conditionals", and the "THEN" parts are called the "effects". 

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
			},
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
				type: "ADVANCE_AND_CHARGE",
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

This example simply uses everything we've discussed so far together, so I'll remit the detailed explanation. If you're curious to see more examples, I encourage you to look into [the actual .sql files](https://github.com/robbwdoering/bellum.ai/tree/master/database) that have been built so far, and compare the objects against what's printed in your codex. If you find a mistake, please let me know, or even better, you can [open a pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) to fix it yourself!


## Conditional Types
:warning: In progress...

| Type    | Description                                                                          | Parameter Format        | Required Fields |
|---------|--------------------------------------------------------------------------------------|-------------------------|-----------------|
| AND     | Evaluates each sub-conditional, returning true if they all do.   					 | Array of cond. objects  |                 |
| OR      | Evaluates each sub-conditional, returning true if one does.   	 					 | Array of cond. objects  |                 |
| XOR     | Evaluates each sub-conditional, returning true if ONLY one does.                     | Array of cond. objects  |                 |
| NOT     | Evaluates the sub-conditional, returning true if it returns false.                   | Cond. object            |                 |


## Effect Types
:warning: In progress...

| Type    | Description                                                                          | Parameter Format        | Required Fields |
|---------|--------------------------------------------------------------------------------------|-------------------------|-----------------|
| AND     | A wrapper rule that applies each sub-rule.                                           | Array of effect objects |                 |
| OR      | A wrapper rule that allows the player to choose one effect. Not yet fully supported. | Array of effect objects |                 |

