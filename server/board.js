const express = require('express');
const path = require('path');

class Board {
	constructor(size, lhs, rhs, objectives = []) {
		this.size = size;
		this.entities = [];
		entities = entities.concat(lhs.units.map((unit, i) => {
			unit.boardId = i;
			return Object.assign({}, unit, { loc: new Point(size.x - (i*2), size.y - 2)});
		});

		// Store this variable to ease searches of one army's units
		this.armyDivider = entities.length;

		entities = entities.concat(rhs.units.map((unit, i) => {
			unit.boardId = armyDivider + i;
			return Object.assign({}, unit, { loc: new Point(i*2, 2)});
		}));

		this.objectives = objectives;

		// TODO
		this.terrain = [];
	}

	getEnemies = (originId) => {
		return originId >= armyDivider ? this.entities.slice(0, armyDivider) : this.entities.slice(armyDivider);
	};

	distance = (originId, target, isRhs) => {
		let p1 = entities[originId];

		if (typeof target === "number" && entities[target]) {
			return p1.distance(entities[target].loc);
		} else if (target === "ENEMY") {
			return this.getEnemies(originId).reduce((shortest, unit) => {
				tmp = p1.distance(unit.loc);
				return tmp < shortest ? tmp : shortest;
			}, 100);
		} else if (target === "OBJECTIVE") {
			return objectives.reduce((shortest, obj) => {
				tmp = p1.distance(obj.loc);
				return tmp < shortest ? tmp : shortest;
			}, 100);
		}
	};

	// TODO: add optional originType, parameter to support radiuses and distances that originate on objects or I guess arbitrary points
	allInRadius = (originId, tmp) => {
		if (typeof target === "number" && entities[target]) {
			return p1.distance(entities[target].loc);
		} else if (target === "ENEMY") {
			return this.getEnemies(originId).reduce((acc, unit) => {
				tmp = p1.distance(unit.loc);
				if (tmp < radius) acc.push(unit);

				return acc;
			}, []);
		} else if (target === "OBJECTIVE") {
			return objectives.reduce((acc, obj) => {
				tmp = p1.distance(obj.loc);
				if (tmp < radius) acc.push(obj);

				return acc;
			}, []);
		}
	};
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	distance = target => Math.sqrt(Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2));

}

exports.Board = Board;
