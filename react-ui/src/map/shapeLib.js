import { P3 } from "./constants";

export const Hex = ({r, z=0}) => {
	const half = r/2;
	const tmpCorner = (Math.sqrt(3) * half);
	return ([
		P3(0, r, z), 
		P3(-tmpCorner, half, z), 
		P3(-tmpCorner, -half, z), 
		P3(0, -r, z), 
		P3(tmpCorner, -half, z), 
		P3(tmpCorner, half, z)
	]);
};

export const HexBox = ({r, z}) => {
	const half = r/2;
	const tmpCorner = (Math.sqrt(3) * half);
	let ret = [];
	ret.push(Hex({r, z: 0}));
	ret.push(Hex({r, z}));

	ret.push(Wall({ p1: P3(0, -r), p2: P3(tmpCorner, -half), z }));
	ret.push(Wall({ p1: P3(tmpCorner, -half), p2: P3(tmpCorner, half), z }));
	ret.push(Wall({ p1: P3(tmpCorner, half), p2: P3(0, r), z }));

	return ([
		P3(0, r, z), 
		P3(-tmpCorner, half, z), 
		P3(-tmpCorner, -half, z), 
		P3(0, -r, z), 
		P3(tmpCorner, -half, z), 
		P3(tmpCorner, half, z)
	]);
};

export const Wall = ({p1, p2, z}) => [
	P3(p1.x, p1.y, p1.z),
	P3(p2.x, p2.y, p2.z),
	P3(p2.x, p2.y, p2.z + z),
	P3(p1.x, p1.y, p1.z + z)
]; 
