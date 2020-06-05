import { TEST_ACTION } from './constants';

export const testAction = payload => {
	console.log('Receive TEST_ACTION dispatch');
	return {
		type: TEST_ACTION,
		payload
	};
};
