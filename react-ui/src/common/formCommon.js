/**
 * FILENAME: dashboard.js
 *
 * DESCRIPTION: This is the component rendered at the top of the visible tree, just below App.
 * Contains hooks for the sidebar, header bar / menu, heads up status, and main content.
 *
 * OWNER: RWD
 */

// React + Redux
import React from 'react';
import { Button, Dropdown, Grid, Header, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

export const FormBody = ({ data }) => {
    return (
    	<div>
    		{data && data.length && data.filter(e => !e.hidden).map((e, i) => (
    			<Grid.Row key={"form-common-row-"+i} centered>
		    		<Grid.Column>
		    			{e.type === "input" && (
							<Input
								onChange={(event, { value }) => e.callback(value)}
								{...e}
								callback={undefined}
								children={undefined}
								type={e.componentType || undefined}
								length={undefined}
								componentType={undefined}
							/>
	    				)}

		    			{e.type === "dropdown" && (
							<Dropdown
								onChange={(event, { value }) => e.callback(value)}
								{...e}
								callback={undefined}
								type={e.componentType || undefined}
								length={undefined}
								componentType={undefined}
								children={undefined}
							/>
	    				)}

		    			{e.type === "date" && (
	    					<SemanticDatepicker onChange={(one, two) => {console.log('[datePicker onChange]', one, two)}} />
	    				)}
		    		</Grid.Column>
    			</Grid.Row>
    		))}
		</div>
	);
}
