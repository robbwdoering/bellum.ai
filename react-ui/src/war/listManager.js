/**
 * FILENAME: listManager.js
 *
 * DESCRIPTION: A widget to allow the entry of new list, and editing of existing ones.
 *
 * OWNER: RWD
 */

// React + Redux
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Grid, Form, Header, Label, Table, TextArea, Input, Icon, Loading, Menu, Sidebar, Step } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Pane from "./../common/pane";
// import { Panes, eventTypeOptions, eventTestSubtypeOptions, eventTypeIconMap, eventSocDistOptions, locationOptions } from './constants';
import { FormBody } from './../common/formCommon';

import { processWarAction } from "./actions";
import { warActions } from "./constants";

import "./war.css";

// Custom
// import './dashboard.css';
// TODO for profile form, ask "how many people do you come in contact with inside at work? Outside? What percentage are wearing masks?"

export const ListManager = props => {
	const {
		// Parent
		config,
		key,
		sendMsg,
		fetchAt,

		// Redux
		metalist,

		// Dispatched actions
		processWarAction
	} = props;

	const [listStr, setListStr] = useState("");

	const addList = e => {
		if (listStr && listStr.length) {
			processWarAction(warActions.AddList, listStr);
		} else {
			console.error("Cannot add to list - no string to process");
		}
	}

	return (
		<Form className="list-manager">
			<Grid>
				<Grid.Row>
					<Grid.Column>
						Meta List 
					</Grid.Column>
					<Grid.Column>
						<TextArea onChange={(e, { value }) => setListStr(value)} placeholder="C/P List here..."/>
					</Grid.Column>

					<Grid.Column>
						<Button disabled={listStr.length == 0} onClick={addList}> Add List </Button>
					</Grid.Column>
				</Grid.Row>

				<Table>
					<Table.Header>
						<Table.HeaderCell> List Name </Table.HeaderCell>
						<Table.HeaderCell> Pts </Table.HeaderCell>
						<Table.HeaderCell> Army </Table.HeaderCell>
						<Table.HeaderCell>  </Table.HeaderCell>
					</Table.Header>

					<Table.Body>
						{metalist && metalist.map((e, i) => (
							<Table.Row key={i}>
								<Table.Cell> {e.name} </Table.Cell>
								<Table.Cell> {e.points} </Table.Cell>
								<Table.Cell> {e.army} </Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Grid>
		</Form>
	);
};

export const mapStateToProps = (state, props) => {
	return {
		metalist: state.warReducer.metalist
		// curConfidence: state.profileReducer.data.symptomConfidence
	}
}

export default connect(mapStateToProps, { processWarAction })(ListManager);

/*
<html>
    <head>
        <meta name="viewport" content="width=670"> 
    </head>
	<style> ... </style>
    <body class="battlescribe">
        <div class="battlescribe">
            <h1>500pt2 (Warhammer 40,000 9th Edition) [27 PL, 2CP, 485pts]</h1>
            <ul>
            <li class="force">
                <h2>Patrol Detachment 0CP (Aeldari - Craftworlds) [27 PL, 2CP, 485pts]</h2>
                <ul>
                    <li class="category">
                        <h3>Configuration [3CP]</h3>
                        <ul>
                            <li class="rootselection">
                                <h4>Battle Size [3CP]</h4>
                                <p>
                                    <span class="bold">Selections:</span> 1. Combat Patrol (0-50 Total PL / 0-500 Points)  [3CP]
                                </p>
                                <p class="category-names">
                                    <span class="bold">Categories:</span> <span class="caps">Configuration</span>
                                </p>

                            </li>
                            <li class="rootselection">
                                <h4>Craftworld Attribute</h4>
                                <p>
                                    <span class="bold">Selections:</span> Biel-Tan: Swordwind
                                </p>
                                <p class="category-names">
                                    <span class="bold">Categories:</span> <span class="caps">Faction: &lt;Craftworld&gt;, Faction: Asuryani, Configuration</span>
                                </p>
                                <p class="profile-names">
                                    <span class="bold">Abilities:</span> <span class="italic">Biel-Tan: Swordwind</span>
                                </p>
                                    <br>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Abilities</th>
                                            <th>Description</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Biel-Tan: Swordwind</td>
                                            <td>Add 1 to the leadership characteristicof ASPECT WARRIORS with this attribute. In addition, you can re-roll hit rolls of 1 for shuriken weapons used by units with this attribute. A shuriken weapon is any weapon profile whose name includes the word "shuriken" (e.g. shuriken pistol, Avenger shuriken catapult etc.) Kurnous' Bow, the Blazing Star of Vaul, and Scorpion's Claw are also shuriken weapons.</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>

                            </li>
                            <li class="rootselection">
                                <h4>Detachment CP</h4>
                                <p class="category-names">
                                    <span class="bold">Categories:</span> <span class="caps">Configuration</span>
                                </p>

                            </li>
                        </ul>
                    </li>
                    <li class="category">
                        <h3>HQ [7 PL, 135pts]</h3>
                        <ul>
                            <li class="rootselection">
                                <h4>Farseer Skyrunner [7 PL, 135pts]</h4>
                                <p>
                                    <span class="bold">Selections:</span> 0. Smite, 2. Doom, 3. Fortune, 4: Fate's Messenger, Ghosthelm, Psyker (Farseer), Ride the Wind, Rune Armour, Runes of the Farseer, Shuriken Pistol, Twin Shuriken Catapult, Witchblade
                                </p>
                                <p class="category-names">
                                    <span class="bold">Categories:</span> <span class="caps">Faction: Aeldari, Character, Biker, Farseer Skyrunner, Fly, HQ, Psyker, Faction: Warhost</span>
                                </p>
                                <p class="profile-names">
                                    <span class="bold">Abilities:</span> <span class="italic">4: Fate's Messenger, Ancient Doom, Battle Focus, Ghosthelm, Ride the Wind, Rune Armour, Runes of the Farseer</span>, <span class="bold">Psychic Power:</span> <span class="italic">Doom, Fortune, Smite</span>, <span class="bold">Psyker:</span> <span class="italic">Psyker (Farseer)</span>, <span class="bold">Unit:</span> <span class="italic">Farseer Skyrunner</span>, <span class="bold">Weapon:</span> <span class="italic">Shuriken pistol, Twin Shuriken Catapult, Witchblade</span>
                                </p>
                                <ul>
                                    <li>
                                        <h4>Craftworlds Warlord</h4>
                                        <p>
                                            <span class="bold">Selections:</span> Warlord
                                        </p>
                                        <p class="category-names">
                                            <span class="bold">Categories:</span> <span class="caps">Warlord</span>
                                        </p>

                                    </li>
                                    <li>
                                        <h4>The Spirit Stone of Anath'lan</h4>
                                        <p>
                                            <span class="bold">Selections:</span> Remnant of Glory
                                        </p>
                                        <p class="profile-names">
                                            <span class="bold">Abilities:</span> <span class="italic">The Spirit Stone of Anath'lan</span>
                                        </p>

                                    </li>
                                </ul>
                                    <br>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Abilities</th>
                                            <th>Description</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">4: Fate's Messenger</td>
                                            <td>Add 1 to the Wounds characteristic of your Warlord. In addition, roll a dice each time your Warlord loses a wound. On a roll of 6, your Warlord does not lose the wound.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Ancient Doom</td>
                                            <td>You can re-roll failed hit rolls in the Fight phase for this unit in a turn in which it charges or is charged by a SLAANESH unit. However, you must add 1 to Morale tests for this unit if it is within 3" of any SLAANESH units.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Battle Focus</td>
                                            <td>If this unit moves or Advances in its Movement phase, weapons (excluding Heavy weapons) are used as if the unit had remained stationary.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Ghosthelm</td>
                                            <td>Roll a D6 whenever this model suffers a mortal wound, adding 3 to the roll if the mortal wound was inflicted as a result of the psyker suffering Perils of the Warp. On a roll of 5+, that wound is ignored.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Ride the Wind</td>
                                            <td>When this model Advances, add 6" to its Move characteristic for that Movement phase instead of rolling a dice.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Rune Armour</td>
                                            <td>This model has a 4+ invulnerable save.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Runes of the Farseer</td>
                                            <td>Once in each Psychic phase, you can re-roll any number of dice used for this model's attempt to manifest or deny a psychic power.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">The Spirit Stone of Anath'lan</td>
                                            <td>BIEL-TAN PSYKER models only. You can re-roll any failed Psychic tests for the bearer. However, should this result in a second failure, then this model is overwhelmed by waves of grief and cannot attempt to manifest any more psychic powers this phase.</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Psychic Power</th>
                                            <th>Warp Charge</th><th>Range</th><th>Details</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Doom</td>
                                            <td>7</td><td>24"</td><td>If manifested, choose an enemy unit within 24" of the psyker. You can re-roll failed wound rolls for attacks made by Asuryani units from your army against that unit until the start of your next Psychic phase.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Fortune</td>
                                            <td>7</td><td>24"</td><td>If manifested, choose a friendly ASURYANI unit within 24" of the psyker. Until your next Psychic phase, whenever that unit suffers a wound, roll a D6. On a 5+ that wound is ignored. If a unit already has an ability with a similar effect (e.g. Ulthwe's Foresight of the Damned attribute, or the Avatar of Khaine's Molten Body ability) then the effect of Fortune replaces that of the ability until your next Psychic phase.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Smite</td>
                                            <td>5</td><td>18"</td><td>Smite has a warp charge value of 5. If manifested, the closest visible enemy unit within 18" of the psyker suffers D3 mortal wounds (pg 181). If the result of the Psychic test was more than 10 the target suffers D6 mortal wounds instead.</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Psyker</th>
                                            <th>Cast</th><th>Deny</th><th>Powers Known</th><th>Other</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Psyker (Farseer)</td>
                                            <td>2</td><td>2</td><td>2 powers from Runes of Fate and one from Runes of Fortune</td><td></td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Unit</th>
                                            <th>M</th><th>WS</th><th>BS</th><th>S</th><th>T</th><th>W</th><th>A</th><th>Ld</th><th>Save</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Farseer Skyrunner</td>
                                            <td>16"</td><td>2+</td><td>2+</td><td>3</td><td>4</td><td>6</td><td>2</td><td>9</td><td>4+</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Weapon</th>
                                            <th>Range</th><th>Type</th><th>S</th><th>AP</th><th>D</th><th>Abilities</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Shuriken pistol</td>
                                            <td>12"</td><td>Pistol 1</td><td>4</td><td>0</td><td>1</td><td>Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Twin Shuriken Catapult</td>
                                            <td>12"</td><td>Assault 4</td><td>4</td><td>0</td><td>1</td><td>Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Witchblade</td>
                                            <td>Melee</td><td>Melee</td><td>User</td><td>0</td><td>D3</td><td>This weapon always wounds on a roll of 2+</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>

                            </li>
                        </ul>
                    </li>
                    <li class="category">
                        <h3>Troops [3 PL, 65pts]</h3>
                        <ul>
                            <li class="rootselection">
                                <h4>Dire Avengers [3 PL, 65pts]</h4>
                                <p>
                                    <span class="bold">Selections:</span> Defence Tactics
                                </p>
                                <p class="category-names">
                                    <span class="bold">Categories:</span> <span class="caps">Faction: Aeldari, Faction: Aspect Warrior, Dire Avengers, Infantry, Troops</span>
                                </p>
                                <p class="profile-names">
                                    <span class="bold">Abilities:</span> <span class="italic">Ancient Doom, Battle Focus, Defence Tactics</span>
                                </p>
                                <ul>
                                    <li>
                                        <h4>5x Dire Avenger [65pts]</h4>
                                        <p>
                                            <span class="bold">Selections:</span> 5x Avenger Shuriken Catapult, 5x Plasma Grenades
                                        </p>
                                        <p class="profile-names">
                                            <span class="bold">Unit:</span> <span class="italic">Dire Avenger</span>, <span class="bold">Weapon:</span> <span class="italic">Avenger Shuriken Catapult, Plasma Grenade</span>
                                        </p>

                                    </li>
                                </ul>
                                    <br>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Abilities</th>
                                            <th>Description</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Ancient Doom</td>
                                            <td>You can re-roll failed hit rolls in the Fight phase for this unit in a turn in which it charges or is charged by a SLAANESH unit. However, you must add 1 to Morale tests for this unit if it is within 3" of any SLAANESH units.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Battle Focus</td>
                                            <td>If this unit moves or Advances in its Movement phase, weapons (excluding Heavy weapons) are used as if the unit had remained stationary.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Defence Tactics</td>
                                            <td>When this unit fires Overwatch, it hits successfully on a roll of 5 or 6, instead of only 6.</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Unit</th>
                                            <th>M</th><th>WS</th><th>BS</th><th>S</th><th>T</th><th>W</th><th>A</th><th>Ld</th><th>Save</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Dire Avenger</td>
                                            <td>7"</td><td>3+</td><td>3+</td><td>3</td><td>3</td><td>1</td><td>1</td><td>8</td><td>4+</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Weapon</th>
                                            <th>Range</th><th>Type</th><th>S</th><th>AP</th><th>D</th><th>Abilities</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Avenger Shuriken Catapult</td>
                                            <td>18"</td><td>Assault 2</td><td>4</td><td>0</td><td>1</td><td>Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Plasma Grenade</td>
                                            <td>6"</td><td>Grenade D6</td><td>4</td><td>-1</td><td>1</td><td>Blast</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>

                            </li>
                        </ul>
                    </li>
                    <li class="category">
                        <h3>Fast Attack [5 PL, -1CP, 105pts]</h3>
                        <ul>
                            <li class="rootselection">
                                <h4>Shining Spears [5 PL, -1CP, 105pts]</h4>
                                <p>
                                    <span class="bold">Selections:</span> Aerobatic Grace, Ride the Wind
                                </p>
                                <p class="category-names">
                                    <span class="bold">Categories:</span> <span class="caps">Faction: &lt;Craftworld&gt;, Faction: Aeldari, Faction: Aspect Warrior, Faction: Asuryani, Biker, Fast Attack, Fly, Shining Spears</span>
                                </p>
                                <p class="profile-names">
                                    <span class="bold">Abilities:</span> <span class="italic">Aerobatic Grace, Ancient Doom, Battle Focus, Ride the Wind</span>
                                </p>
                                <ul>
                                    <li>
                                        <h4>2x Shining Spear [70pts]</h4>
                                        <p>
                                            <span class="bold">Selections:</span> 2x Laser Lance, 2x Twin Shuriken Catapult
                                        </p>
                                        <p class="profile-names">
                                            <span class="bold">Unit:</span> <span class="italic">Shining Spear</span>, <span class="bold">Weapon:</span> <span class="italic">Laser Lance (melee), Laser Lance (shooting), Twin Shuriken Catapult</span>
                                        </p>

                                    </li>
                                    <li>
                                        <h4>Shining Spear Exarch [-1CP, 35pts]</h4>
                                        <p>
                                            <span class="bold">Selections:</span> Laser Lance, Twin Shuriken Catapult
                                        </p>
                                        <p class="profile-names">
                                            <span class="bold">Unit:</span> <span class="italic">Shining Spear Exarch</span>, <span class="bold">Weapon:</span> <span class="italic">Laser Lance (melee), Laser Lance (shooting), Twin Shuriken Catapult</span>
                                        </p>
                                        <ul>
                                            <li>
                                                <h4>Exarch Power [-1CP]</h4>
                                                <p>
                                                    <span class="bold">Selections:</span> Exemplar of the Spear Shrine [-1CP], Expert Hunter, Skilled Rider
                                                </p>
                                                <p class="profile-names">
                                                    <span class="bold">Abilities:</span> <span class="italic">Expert Hunter, Skilled Rider</span>
                                                </p>

                                            </li>
                                        </ul>

                                    </li>
                                </ul>
                                    <br>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Abilities</th>
                                            <th>Description</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Aerobatic Grace</td>
                                            <td>Models in this unit have a 4+ invulnerable save against ranged weapons.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Ancient Doom</td>
                                            <td>You can re-roll failed hit rolls in the Fight phase for this unit in a turn in which it charges or is charged by a SLAANESH unit. However, you must add 1 to Morale tests for this unit if it is within 3" of any SLAANESH units.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Battle Focus</td>
                                            <td>If this unit moves or Advances in its Movement phase, weapons (excluding Heavy weapons) are used as if the unit had remained stationary.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Expert Hunter</td>
                                            <td>You can re-roll wound rolls for a Shining Spear Exarch when attacking a MONSTER or VEHICLE.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Ride the Wind</td>
                                            <td>When this model Advances, add 6" to its Move characteristic for that Movement phase instead of rolling a dice.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Skilled Rider</td>
                                            <td>This unit&#8217;s Shining Spear Exarch has a 3+ invulnerable save against attacks made with ranged weapons.</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Unit</th>
                                            <th>M</th><th>WS</th><th>BS</th><th>S</th><th>T</th><th>W</th><th>A</th><th>Ld</th><th>Save</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Shining Spear</td>
                                            <td>16"</td><td>3+</td><td>3+</td><td>3</td><td>4</td><td>2</td><td>2</td><td>8</td><td>3+</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Shining Spear Exarch</td>
                                            <td>16"</td><td>3+</td><td>3+</td><td>3</td><td>4</td><td>3</td><td>3</td><td>8</td><td>3+</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Weapon</th>
                                            <th>Range</th><th>Type</th><th>S</th><th>AP</th><th>D</th><th>Abilities</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Laser Lance (melee)</td>
                                            <td>Melee</td><td>Melee</td><td>User</td><td>-4</td><td>2</td><td>If the bearer charged this turn, attacks with this weapon are made at Strength 6.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Laser Lance (shooting)</td>
                                            <td>6"</td><td>Assault 1</td><td>6</td><td>-4</td><td>2</td><td>-</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Twin Shuriken Catapult</td>
                                            <td>12"</td><td>Assault 4</td><td>4</td><td>0</td><td>1</td><td>Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>

                            </li>
                        </ul>
                    </li>
                    <li class="category">
                        <h3>Heavy Support [12 PL, 180pts]</h3>
                        <ul>
                            <li class="rootselection">
                                <h4>War Walkers [12 PL, 180pts]</h4>
                                <p class="category-names">
                                    <span class="bold">Categories:</span> <span class="caps">Faction: &lt;Craftworld&gt;, Faction: Aeldari, Faction: Asuryani, Heavy Support, Vehicle, War Walker, Faction: Warhost</span>
                                </p>
                                <ul>
                                    <li>
                                        <h4>War Walker [4 PL, 60pts]</h4>
                                        <p>
                                            <span class="bold">Selections:</span> Explodes, Power Field, Scout Vehicle, Shuriken Cannon [10pts], Shuriken Cannon [10pts]
                                        </p>
                                        <p class="profile-names">
                                            <span class="bold">Abilities:</span> <span class="italic">Ancient Doom, Battle Focus, Explodes (War Walker), Power Field, Scout Vehicle</span>, <span class="bold">Unit:</span> <span class="italic">War Walker</span>, <span class="bold">Weapon:</span> <span class="italic">Shuriken Cannon</span>
                                        </p>

                                    </li>
                                    <li>
                                        <h4>War Walker [4 PL, 60pts]</h4>
                                        <p>
                                            <span class="bold">Selections:</span> Explodes, Power Field, Scout Vehicle, Shuriken Cannon [10pts], Shuriken Cannon [10pts]
                                        </p>
                                        <p class="profile-names">
                                            <span class="bold">Abilities:</span> <span class="italic">Ancient Doom, Battle Focus, Explodes (War Walker), Power Field, Scout Vehicle</span>, <span class="bold">Unit:</span> <span class="italic">War Walker</span>, <span class="bold">Weapon:</span> <span class="italic">Shuriken Cannon</span>
                                        </p>

                                    </li>
                                    <li>
                                        <h4>War Walker [4 PL, 60pts]</h4>
                                        <p>
                                            <span class="bold">Selections:</span> Explodes, Power Field, Scout Vehicle, Shuriken Cannon [10pts], Shuriken Cannon [10pts]
                                        </p>
                                        <p class="profile-names">
                                            <span class="bold">Abilities:</span> <span class="italic">Ancient Doom, Battle Focus, Explodes (War Walker), Power Field, Scout Vehicle</span>, <span class="bold">Unit:</span> <span class="italic">War Walker</span>, <span class="bold">Weapon:</span> <span class="italic">Shuriken Cannon</span>
                                        </p>

                                    </li>
                                </ul>
                                    <br>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Abilities</th>
                                            <th>Description</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Ancient Doom</td>
                                            <td>You can re-roll failed hit rolls in the Fight phase for this unit in a turn in which it charges or is charged by a SLAANESH unit. However, you must add 1 to Morale tests for this unit if it is within 3" of any SLAANESH units.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Battle Focus</td>
                                            <td>If this unit moves or Advances in its Movement phase, weapons (excluding Heavy weapons) are used as if the unit had remained stationary.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Explodes (War Walker)</td>
                                            <td>If this model is reduced to 0 wounds, roll a D6 before removing it from the battlefield. On a 6 it explodes, and each unit within 3" suffers a mortal wound.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Power Field</td>
                                            <td>Models in this unit have a 5+ invulnerable save.</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Scout Vehicle</td>
                                            <td>During deployment, you can set up this unit on the enemy's flanks instead of placing it on the battlefield. At the end of any of your Movement phases the unit can join battle - set it up so that all models in the unit are within 3" of a battlefield edge of your choice and more than 9" away from any enemy models.</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Unit</th>
                                            <th>M</th><th>WS</th><th>BS</th><th>S</th><th>T</th><th>W</th><th>A</th><th>Ld</th><th>Save</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">War Walker</td>
                                            <td>10"</td><td>3+</td><td>3+</td><td>5</td><td>6</td><td>6</td><td>2</td><td>8</td><td>4+</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellspacing="-1">
                                        <tr>
                                            <th>Weapon</th>
                                            <th>Range</th><th>Type</th><th>S</th><th>AP</th><th>D</th><th>Abilities</th>
                                            <th>Ref</th>
                                        </tr>
                                        <tr>
                                            <td class="profile-name">Shuriken Cannon</td>
                                            <td>24"</td><td>Assault 3</td><td>6</td><td>0</td><td>1</td><td>Each time you make a wound roll of 6+ for this weapon, that hit is resolved with an AP of -3 instead of 0.</td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>

                            </li>
                        </ul>
                    </li>

                </ul>
            </li>

            </ul>



            <br>
            <p>Created with <a href="https://www.battlescribe.net">BattleScribe</a></p>
        </div>
    </body>
</html>
*/