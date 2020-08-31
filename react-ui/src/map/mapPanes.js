/**
 * FILENAME: mapPanes.js 
 *
 * DESCRIPTION: Stuff to shown overlayed upon the the threejs canvas. Referred to as "Panes", or something else ASAP, since the 
 * main overlay is also called panes.
 */

// React + Redux
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { useUpdate, useSpring, animated, config }  from 'react-spring';

import './map.css';

// TODO: Let people monetize their guides?

export const SplashControlsComponent = props => {
	const { stage, setStage } = props;

	let ret;
	switch(stage) {
		case 'WELCOME':
			ret = (
				<div className="splashctrl-container-mid">
					<Grid>
						<Grid.Row columns={1}>
							<Grid.Column>
								<Button size='huge' onClick={() => handleClick('SIGNUP')}> SIGNUP </Button>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={3}>
							<Grid.Column>
								<Button size='large' onClick={() => handleClick('INFO')}> What is this? </Button>
							</Grid.Column>

							<Grid.Column>
								<Button size='large' onClick={() => handleClick('DEMO')}> See a Demo </Button>
							</Grid.Column>

							<Grid.Column>
								<Button size='large' onClick={() => handleClick('DEMO')}> See a Tutorial </Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			);
			break;
		case 'INFO':
			ret = (
				<div className="info-container-mid">
					<h2> Overview </h2>
					<p>
						This website thinks it can play Warhammer 40k, the most popular miniature wargame in the world set in the dystopian far future.
						To play, players assemble armies from a huge list of possible factions and units, then face off across a table (online or in person).
						The main gameplay loop of 40k revolves around rolling dice - whenever your units fire a shot, swing a sword, or do most anything else,
						you roll some dice to determine whether the action takes place successfully. This program seeks to understand those dice rolls, and give insights to the player.

						From here, most people not familiar with the game think this seems trivial for a computer, while most veterans are probably doubtful any modern AI could possibly understand what's going on.
						Happily for the latter, this program does not yet promise to play on its own. Rather, it provides a set of tools to help humans learn and play better.
					</p>

					<h2> For Playing Faster </h2>
					<p>
						The biggest unsaid truth in the 40k community seems to be that games can take a very, very long time, especially for newer players, or when playing with a new army. This program can help.
						Open this site before a game, copy / paste both player's lists in, record both players deployments (a rough representation is fine), and from there you'll be guided through every phase.
						You won't get any statistical insights, so you don't get an advantage, but you're reminded of every rule, bonus, and statblock in your army, only when it's needed.
						Never forget a +1 again, and verify your opponent *ahem* remembered their rules correctly.
					</p>

					<h2> For Learning Tactics </h2>
					<p>
						For those of you who perked up when you read "statistical insights" above, yes, this tries its best to calculate the best course of action.
						Some people might call this "Mathhammer", referring to the existing practice of graphing out how effective different units are against each other, but that doesn't really capture what this does.
						Because it knows the current game state, it can give much more accurate and actionable advice. Here's some of the questions I aim to answer:

						* Who should you target with this unit to deal the most damage? To destroy the most points? To most damage the opponent's ability to strike back? 
						* If you charge this enemy unit, how much damage will you deal? How much will they deal back?
						* If you use a strategem, like CP Reroll, how much of an effect is it expected to have in terms of damage dealt / prevented?
						* If you move your unit here, which enemy units could reach it next turn? How much damage could the enemy deal if they focus their fire on it?
						* And more...

						Of course, it goes without saying that this feature should only be used when both players know about it.
						This tool doesn't give you anything that the best players don't already calculate in their heads, but that's why they deserve to be called the best.
					</p>

					<h2> For Battle Reports </h2>
					<p>
						If you played a game of 40k that you want to look back on after the fact, this gives you much more options for sharing and analysis.
						All it takes is a few minutes to plug in what happened over the course of the game if you filmed it, or no time at all if you used this tool during the game.
						Go back to any phase and see how well each player rolled, graphs of remaining army value, projected victory chances, and more. 

						If you're in a sharing mood, you can add comments tied to phases, gameplay events, or board locations, and then share a link with a few clicks.
					</p>

					<h2> For List Analysis </h2>
					<p>
						Finally, some tools are provided for list analysis. This requires MUCH more assumptions to be made to give answers, so it's more for fun than anything else.
						See how your list stacks up against the lists of tournament winners or your friends, which unit is better against whatever's been giving you trouble, or what your biggest weaknesses are.
						Note that this does not, and never could, replace something like the AMAZING BattleScribe application (no affiliation). Rather than building new lists, this analyzes existing ones.
					</p>
				</div>
			);
			break;
		default:
			ret = <div />;
	};

	return ret;
};

const mapStateToProps = (state, props) => {
	return {
	};
}

export const SplashControls = connect(mapStateToProps, {})(SplashControlsComponent);