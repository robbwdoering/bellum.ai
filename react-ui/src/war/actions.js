import { warActions } from './constants';

export const processWarAction = (type, payload)  => {
	console.log("processing action, returning : ", { type, payload } )
	return { type, payload };
}
