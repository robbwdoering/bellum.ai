/**
 * FILENAME: ForceManager.js
 *
 * DESCRIPTION: Component that displays the splash / landing page for non-authenticated users.
 */

// React + Redux
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { Placeholder, Divider, Checkbox, Table, Button, Modal, Icon } from 'semantic-ui-react';

import { openContents } from './../app/actions';
import { apiOpts } from './../common/constants';
import './contents.css';

import { useApi } from "./../app/useApi";

export const ForceManager = props => {
	const { metalist, handleFetch } = props;
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedList, setSelectedList] = useState([]);

	const postData = useRef({});

	const metalistApi = useApi('/api/static/metalist', 'GET', apiOpts, handleFetch );
	const listApi = useApi('/api/static/list', 'POST', apiOpts, handleFetch, postData.current);

	const startDeleteForce = () => {
		setShowDeleteModal(true);

		// Set the data we'll use if we call the API
		postData.current = {
			toDelete: metalist.filter((e, i) => selectedList[i]).map(e => e.name)
		};
	};

	const deleteForce = () => {
		setShowDeleteModal(false);

		// Call the API 
		if (postData.current) {
			listApi.refresh();
		}
		setSelectedList(selectedList.map(() => false));
	};

	const selectForce = i => {
		let newArr = [...selectedList];
		newArr[i] = !newArr[i];
		setSelectedList(newArr);
	};

	// Set the selected list to mask the options (i.e. stay same length)
	useEffect(() => setSelectedList(metalist ? metalist.map(force => false) : []), [metalist]);

	// Request a new list on mount
	useEffect(() => { metalistApi.refresh(); }, []);

	return (
		<div>
			<Divider horizontal> <h2>Forces</h2> </Divider>
			<Button icon labelPosition="left" disabled={!selectedList.some(e => e)} className="table-control" onClick={() => {
				startDeleteForce();
			}}>
				<Icon name="trash" />
				Delete Selected
			</Button>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell> </Table.HeaderCell>
						<Table.HeaderCell> FORCE NAME</Table.HeaderCell>
						<Table.HeaderCell> POINTS </Table.HeaderCell>
						<Table.HeaderCell> FACTION </Table.HeaderCell>
						<Table.HeaderCell> SHOOT </Table.HeaderCell>
						<Table.HeaderCell> FIGHT </Table.HeaderCell>
						<Table.HeaderCell> CONTROL </Table.HeaderCell>
						<Table.HeaderCell> RESILIENCE </Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{metalist && metalist.map((e, i) => {
						console.log("Reading list ", e, i)
						return (
							<Table.Row key={i}>
								<Table.Cell> <Checkbox className="table-selector" onChange={() => selectForce(i)} /> </Table.Cell>
								<Table.Cell> {e.name} </Table.Cell>
								<Table.Cell> {e.points} </Table.Cell>
								<Table.Cell> {e.faction} </Table.Cell>
								<Table.Cell> {e.rating} </Table.Cell>
								<Table.Cell> {e.shoot} </Table.Cell>
								<Table.Cell> {e.fight} </Table.Cell>
								<Table.Cell> {e.control} </Table.Cell>
								<Table.Cell> {e.resil} </Table.Cell>
								<Table.Cell> 
								</Table.Cell>
							</Table.Row>
						);

					})}
					{!metalist && (
						<Placeholder>
							<Placeholder.Line />
							<Placeholder.Line />
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder>
					)}
				</Table.Body>
			</Table>
			{!metalist.length && (
				<div className="table-empty-message">
					To add your first force, use the "Add Force" option in the top right.
				</div>
			)}

			<Modal open={showDeleteModal}>
				<Modal.Header> Are you sure you want to delete this force? </Modal.Header>
				<Modal.Content> This action cannot be reversed. </Modal.Content>
				<Modal.Actions> 
					<Button onClick={() => setShowDeleteModal(false)}> Cancel </Button>
					<Button onClick={deleteForce}> Delete </Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
}

export const mapStateToProps = (state, props) => {
  return {
		metalist: state.warReducer.metalist,
		metalistHash: state.warReducer.metalistHash,
  };
};

export const ForceManagerContainer = connect(mapStateToProps, { openContents })(ForceManager);
