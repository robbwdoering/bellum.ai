const express = require('express');
const path = require('path');

const P3 = (x=0, y=0, z=0) => (
	{x, y, z}
);

const P2 = (x=0, y=0) => (
	{x, y}
);

const SQRT3 = Math.sqrt(3);

const Hex = ({r, z=0}) => {
	const half = r/2;
	const tmpCorner = (SQRT3 * half);
	return ([
		P3(0, r, z), 
		P3(-tmpCorner, half, z), 
		P3(-tmpCorner, -half, z), 
		P3(0, -r, z), 
		P3(tmpCorner, -half, z), 
		P3(tmpCorner, half, z)
	]);
};

const HexBox = ({r, z}) => {
	const half = r/2;
	const tmpCorner = (SQRT3 * half);
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

const Wall = ({p1, p2, z}) => [
	P3(p1.x, p1.y, p1.z),
	P3(p2.x, p2.y, p2.z),
	P3(p2.x, p2.y, p2.z + z),
	P3(p1.x, p1.y, p1.z + z)
];

const translateHexCenter = (q, r, rad) => {
	return P3((q + (r / 2)) * SQRT3 * rad, 3 * r / 2 * rad);
};

class MapGenerator {
	constructor(rad, size) {
		this.rad = rad;
		this.size = size;
		// TODO Serialize this on a high level, so it has to be manually regenned by a dev
		this.ocean = this.generateOcean();
	}

	generateOcean = () => {
		let ret = [];
		// let offest;
		const hex = Hex(this.rad, 0);
	    for (let q = -this.size.q; q <= this.size.q; q++) {
	    	for (let r = -this.size.r; r <= this.size.r; r++) {
				// offset = this.translateHexCenter(q, r, this.rad);
	    		ret.push({points: hex, color: "#00f", q, r });
	    	}
	    }

	    return ret;
	}
}

exports.MapGenerator = MapGenerator;
