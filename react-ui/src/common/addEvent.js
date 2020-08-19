/**
 * FILENAME: dashboard.js
 *
 * DESCRIPTION: This is the component rendered at the top of the visible tree, just below App.
 * Contains hooks for the sidebar, header bar / menu, heads up status, and main content.
 *
 * OWNER: RWD
 */

// React + Redux
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Grid, Form, Header, Label, Input, Icon, Loading, Menu, Sidebar, Step } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Pane from "./pane";
import { Panes, eventTypeOptions, eventTestSubtypeOptions, eventTypeIconMap, eventSocDistOptions, locationOptions } from './constants';
import { FormBody } from './formCommon';

// Custom
// import './dashboard.css';
// TODO for profile form, ask "how many people do you come in contact with inside at work? Outside? What percentage are wearing masks?"

export const AddEventPane = ({ curConfidence, config, key, sendMsg, fetchAt }) => {
	const [type, setType] = useState('');
	const [date, setDate] = useState(new Date());
	const [location, setLocation] = useState(undefined);
	const [comment, setComment] = useState('');

	// Tests
	const [testType, setTestType] = useState("");
	const [testResult, setTestResult] = useState(undefined);

	// Contact
	const [name, setName] = useState('');
	const [contacts, setContacts] = useState([]);
	const [outside, setOutside] = useState(undefined);
	const [othersAttended, setOthersAttended] = useState(-1);

	// Gathering
	const [gatheringSize, setGatheringSize] = useState("");
	const [maskPerc, setMaskPerc] = useState(-1);
	const [socDist, setSocDist] = useState(undefined);

	// Symptom
	const [confidence, setConfidence] = useState(curConfidence);

	// TODO change styling here to stack labels to the upper left of entry components

	let formIsValid = type !== '' && location !== '';
	let ret = [];
	switch(type) {
		case "test":
			ret = [
				(
					<Grid.Column width={8}>
						<Dropdown button name='testType' className='icon' labeled icon='check' options={eventTestSubtypeOptions} text='Event' onChange={(event, { value }) => setTestType(value)} />
					</Grid.Column>
				),
				testType === 'result' ? (
					<Grid.Column width={8}>
						<Button.Group>
							<Label> Result </Label>
							<Button icon='thumbs up outline' negative onClick={() => setTestResult(false)} />
							<Button icon='thumbs down outline' positive onClick={() => setTestResult(true)} />
						</Button.Group>
					</Grid.Column>
				) : (
					<Grid.Column></Grid.Column> // Space width={8}r
				),
			];

			formIsValid = formIsValid && testType !== "" && (testType !== 'result' || testResult !== undefined);
			break;
		case "contact":
			ret = [
				(
					<Grid.Column width={8}>
						<Input label='Name' onChange={(event, { value }) => setName(value)}/>
					</Grid.Column>
				),
				(
					//TODO: change coloring on these so they start more greyed out, and gain color on selection
					<Grid.Column width={8}>
						<Button.Group>
							<Label> Outside? </Label>
							<Button icon='thumbs down outline' negative onClick={() => setOutside(false)} />
							<Button icon='thumbs up outline' positive onClick={() => setOutside(true)} />
						</Button.Group>
					</Grid.Column>
				),
				(
					<Grid.Column width={16}>
						<Dropdown multiple search label='Contacts' onChange={(event, { value }) => setContacts(value)}/>
					</Grid.Column>
				),
				(
					<Grid.Column width={8}>
						<Input label='# of others' onChange={(event, { value }) => setOthersAttended(value)}/>
					</Grid.Column>
				),
				(
					<Grid.Column width={8}>
						<Input label='Percentage of Mask Wearers' onChange={(event, { value }) => setMaskPerc(value)}/>
					</Grid.Column>
				),
				(
					<Grid.Column width={8}>
						<Dropdown label='Was 6ft distance maintained?' options={eventSocDistOptions} onChange={(event, { value }) => setSocDist(value)}/>
					</Grid.Column>
				),
			];
			formIsValid = formIsValid && name !== '' && outside !== undefined && othersAttended !== -1 && maskPerc !== -1 && socDist !== undefined;
			break;
		case "gathering":
			ret = [
				(
					<Grid.Column width={8}>
						<Input label='Gathering Size' onChange={(event, { value }) => setGatheringSize(value)}/>
					</Grid.Column>
				),
				(
					<Grid.Column width={8}>
						<Button.Group>
							<Label> Outside? </Label>
							<Button icon='thumbs down outline' negative onClick={() => setOutside(false)} />
							<Button icon='thumbs up outline' positive onClick={() => setOutside(true)} />
						</Button.Group>
					</Grid.Column>
				),
				(
					<Grid.Column width={8}>
						<Input label='Percentage of Mask Wearers' onChange={(event, { value }) => setGatheringSize(value)}/>
					</Grid.Column>
				),
				(
					<Grid.Column width={8}>
						<Input label='Was 6ft distance maintained?' onChange={(event, { value }) => setGatheringSize(value)}/>
					</Grid.Column>
				),
			];

			formIsValid = formIsValid && name !== '' && gatheringSize !== '' && maskPerc !== -1 && socDist !== undefined;
			break;
		case "symptom":
			ret = [
				(
					<Grid.Column width={8}>
						TODO - symptom form.
					</Grid.Column>
				)
			];

			formIsValid = formIsValid && confidence !== '';
			break;
	}


	const submitForm = () => {
		if (formIsValid) {
			// Add common fields
			let msg = {
				type: type,
				location: location
			}

			// Add form-specific fields
			switch (type) {
				case 'test':
					msg.testType = testType;
					msg.testResult = testResult;
					break;
				case 'contact':
					msg.outside = outside;
					msg.contacts = contacts;
					msg.othersAttended = othersAttended;
					msg.maskPerc = maskPerc;
					msg.socDist = socDist;
					break;
				case 'gathering':
					msg.gatheringSize = gatheringSize;
					msg.outside = outside;
					msg.maskPerc = maskPerc;
					msg.socDist = socDist;
					break;
				case 'symptom':
					msg.confidence = confidence;
					break;
			}

			console.log("SENDING MESSAGE ", msg);
			fetchAt('/api');
			sendMsg('/api', 'POST', msg);
		} else {
			console.warn("Attempted to submit a form that wasn't valid - this shouldn't be possible. Inspect caller.");
		}
	}

	return (
		<Pane key={key} className="myt-add-event" header name={Panes.AddEvent} config={config}>
			<Grid doubling columns={2}>
				<Form>
					<Grid.Row>
						<Step.Group>
							<Step>
								<Icon name='calendar'/>
								<Step.Content>
									<Step.Title>
										<SemanticDatepicker onChange={(event, { value }) => setDate(value)} />
									</Step.Title>
									<Step.Description>
										<Dropdown button search labeled options={locationOptions} onChange={(e, { value }) => setType(value)} />
									</Step.Description>
								</Step.Content>
							</Step>

							<Step>
								<Icon name={eventTypeIconMap[type] || 'ellipsis horizontal'}/>
								<Step.Content>
									<Step.Title>
										<Dropdown button search labeled options={eventTypeOptions} text={type ? undefined : 'Event Type'} onChange={(e, { value }) => setType(value)} />
									</Step.Title>
								</Step.Content>
							</Step>
							<Button className='step' icon='check' onClick={submitForm} > Finish </Button> 
						</Step.Group>
					</Grid.Row>

					{ret}

					<Grid.Column> 
					</Grid.Column>
					<Grid.Column> 
					</Grid.Column>
					<Grid.Column> 
					</Grid.Column>
				</Form>
			</Grid>
		</Pane>
	);
};

export const mapStateToProps = (state, props) => {
	return {
		curConfidence: state.profileReducer.data.symptomConfidence
	}
}

export default connect(mapStateToProps, {})(AddEventPane);
