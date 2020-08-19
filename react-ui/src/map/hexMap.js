/**
 * FILENAME: dashboard.js
 *
 * DESCRIPTION: This is the component rendered at the top of the visible tree, just below App.
 * Contains hooks for the sidebar, header bar / menu, heads up status, and main content.
 */

// React + Redux
import React, { useState, Component, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Canvas, Circle, Raw, Shape, Line, CanvasComponent } from '@bucky24/react-canvas';
import { Button, Grid, Header, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import './map.css';
import * as shapeLib from './shapeLib';
import * as styleLib from './styleLib';
import { START_RAD, GRID_SIZE, D2R, Ang2Vec, projTypes, P2, P3 } from './constants';

export const HexMap = ( { ocean, data, gridSize, hexRad, oceanHash, dataHash  }) => {

	const [x0, setXOrigin] = useState(window.innerWidth ? window.innerWidth / 2 : 0);
	const [y0, setYOrigin] = useState(window.innerHeight ? window.innerHeight / 2 : 0);
	const ref = useRef();

	// let xAxis, yAxis, zAxis, depth, origin, projectedIsoHex, projectionHash, memoizedShapePoints, shapesHash, animeHash;


	const project = (p, ret = P3()) => {
		ret.x = Math.floor(p.x * this.xAxis.x + p.y * this.yAxis.x + p.z * this.zAxis.x + this.origin.x);
		ret.y = Math.floor(p.x * this.xAxis.y + p.y * this.yAxis.y + p.z * this.zAxis.y + this.origin.y);
		ret.z = Math.floor(p.x * this.depth.x + p.y * this.depth.y + p.z * this.depth.z); 
		return ret;
	};

	const deproject = p => {
		let ret = {};
		ret.x = Math.floor((p.x / this.xAxis.x) + (p.y / this.yAxis.x) + (p.z / this.zAxis.x) + this.origin.x);
		ret.y = Math.floor((p.x / this.xAxis.y) + (p.y / this.yAxis.y) + (p.z / this.zAxis.y) + this.origin.y);
		ret.z = Math.floor((p.x / this.depth.x) + (p.y / this.depth.y) + (p.z / this.depth.z)); 
		return ret;
	};

	const setProjection = name => {
		// Clear the memoized points so that they all have to be recalculated
		this.memoizedShapePoints = {};
		this.projectionHash++;

		// Set the values to the struct's default values
		if(projTypes[name]) {
			Object.keys(projTypes[name]).forEach(key => {
				this[key]=projTypes[name][key];
			});

			// If there's no depth, add one
			if(!projTypes[name].depth) {
				this.depth = P3(
					this.xAxis.y,
					this.yAxis.y,
					-this.zAxis.y
				);
			}
		}
	};

	/**
	 * Build a points array for the given hex at the given coordinates (/ offset).
	 */
	const translateHexCenter = (q, r, rad) => {
		return P3((q + (r / 2)) * Math.sqrt(3) * rad, 3 * r / 2 * rad);
	};

	const getShapePoints = shape => {
		let shapeFactory;
		let points = this.memoizedShapePoints[shape.key];
		console.log("pushing " + shape.name + " tile")

		// Build new points
		if (!points) {
			// Find the factory function
			shapeFactory = shapeLib[shape.name];
			if (!shapeFactory) {
				console.error("Attempted to build a shape that doesn't have a library entry: ", shape.name);
				return [];
			}

			// Use the factory function to build the array of points
			points = shapeFactory({...shape}).map(p => this.project(p));
			this.memoizedShapePoints[shape.key] = points;
		}
		// Else use stored points

		return points;
	};

	calcHexCenters = (size, hexRad) => {
		let ret = [];
		for (let q=0; q < size.q; q++) {
			ret.push([]);
			for (let r=0; r < size.r; r++) {
				ret[q].push(this.project(this.translateHexCenter(q, r, hexRad)));
			}
		}
		return ret;
	};

	renderOcean = (gridSize, hexRad) => ( 
		this.props.ocean && this.props.ocean.map((hex, i) => (
			<Shape
				key={`o.h.${i}`}
				x={this.state.x0 + this.hexCenters[hex.q][hex.r].x}
				y={this.state.y0 + this.hexCenters[hex.q][hex.r].y}
				points={hex.map(p => this.project(p))}
				color={styleLib.oceanHex.color}
				fill={styleLib.oceanHex.fill}
			/>
		))
	);

	renderShapes = (gridSize, hexRad) => {
		const { data } = this.props;
		const { x0, y0 } = this.state;
		let ret = [];
		let points;

	    Object.keys(data).some(q => {
	    	if (q > gridSize.q) return true; 
	    	Object.keys(data[q]).some(r => {
		    	if (r > gridSize.r) return true;

	    		// Render all the components stored for this tile
	    		if (data[q] && data[q][r] && data[q][r].length) {
	    			data[q][r].forEach((shape, i) =>  {
	    				points = this.getShapePoints(shape);

	    				// Create and record the Shape component
		    			if (points && points.length) {
		    				ret.push((
								<Shape
									key={`d.s.${q}.${r}.${i}`}
									x={x0 + this.hexCenters[q][r].x}
									y={y0 + this.hexCenters[q][r].y}
									points={points.map(p => this.project(p))}
									color={shape.color ? shape.color : "#ccc"}
									fill={shape.fill}
								/>
	    					));
		    			}
		    		});
		    	}
		    	return false;
		    })
		    return false;
	   });
	};

	// ---------
	// LIFECYCLE
	// ---------

	useEffect(() => {
	    ref.current.xAxis = P2(1 , 0.5);
	    ref.current.yAxis = P2(-1 , 0.5);
	    ref.current.zAxis = P2(0 , -1);
		ref.current.depth = P3(0.5,0.5,1);
		ref.current.origin = P2(0, 0);
		ref.current.setProjection('Custom');

		ref.current.projectedIsoHex = shapeLib.Hex({r: START_RAD}).map(p => project(p));
		ref.current.projectionHash = 0;

		ref.current.memoizedShapePoints = {};
		ref.current.globalHash = 0;
		ref.current.shapesHash = 0;
		ref.current.animeHash = 0;
	}, []);

	// TODO create list of competing apps, with aggregates for communal / government solutions
	// TODO reach goal - add a feature to "Repoort a Problem", which saves off a SS, all the console logs, and send to server
	// TODO - add lighting and textures! Only for light mode. https://www.html5canvastutorials.com/advanced/html5-canvas-lighting-color-and-texture-effects/
	// const { data, gridSize, hexRad, ocean, oceanHash, dataHash } = this.props;
	this.canvasWidth = window.innerWidth;
	this.canvasHeight = window.innerHeight;
    let points;

	// Calculate Memo-ized values 
	this.hexCenters = useMemo(this.calcHexCenters, [gridSize, hexRad, this.projectionHash]);

	// Create Memo-ized components
	const oceanShapes = useMemo(this.renderOcean, [gridSize, hexRad, this.oceanHash, this.projectionHash]);
	const mainShapes  = useMemo(this.renderShapes, [gridSize, hexRad, this.shapesHash, this.projectionHash]);

	// Infer Memo-ized rerender flags based on the hash values 
	const globalRefresh = useMemo(() => true, [this.globalHash]);
	const oceanRefresh  = useMemo(() => true, [oceanHash]);
	const dataRefresh = useMemo(() => true, [dataHash]);
	const animeRefresh 	= useMemo(() => true, [this.animeRefresh]);

    return (
    	<div className="myt-hexmap">
    		<Menu>
				<Menu.Item>
					<Button onClick={() => this.setXOrigin(this.state.x0 - 50)}>
						x-	
					</Button>
					<Button onClick={() => this.setXOrigin(this.state.x0 + 50)}>
						x+	
					</Button>
				</Menu.Item>
				<Menu.Item>
					<Button onClick={() => this.setYOrigin(this.state.y0 - 50)}>
						y-	
					</Button>
					<Button onClick={() => this.setYOrigin(this.state.y0 + 50)}>
						y+	
					</Button>
				</Menu.Item>
			</Menu>

    		<Canvas width={this.canvasWidth} height={this.canvasHeight}>
    			{/* Background Layer */}
	    		{globalRefresh && <Raw drawFn={context => context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)} />}

    			{/* Ocean Layer */}
    			{oceanRefresh && oceanShapes}

    			{/* Shapes Layer */}
				{dataRefresh && mainShapes}
    		</Canvas>
		</div>
	);
}

export const mapStateToProps = (state, props) => {
	return {
		gridSize: state.mapReducer.gridSize,
		hexRad: state.mapReducer.hexRad,
		oceans: state.mapReducer.oceans,
	    data: state.mapReducer.data,
	    oceanHash: state.mapReducer.oceanHash,
	    dataHash: state.mapReducer.dataHash
	};
};

export default connect(mapStateToProps, { })(HexMap);
