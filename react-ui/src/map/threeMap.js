/**
 * FILENAME: threeMap.js 
 *
 * DESCRIPTION: Testing ground for three dimensional animation.
 */

// React + Redux
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Header, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { Canvas, useFrame, useThree, useLoader, extend } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { useUpdate, useSpring, useSprings, animated, config }  from 'react-spring';
import { a, useTransition, Transition } from '@react-spring/three';
import { useDrag, useGesture } from "react-use-gesture";

import './map.css';
import * as shapeLib from './shapeLib';
import * as styleLib from './styleLib';
import { testUnits, ballGridPos, inch, decommInch, commInch } from './constants';
import { ctrlHover } from './actions';
import { updateUnit } from './../war/actions';
import { SplashControls } from './mapPanes';

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const Unit = (props) => {
	const { cfg, onPointerDown, unit, ctrlHover, initPos } = props;
	const numModels = useMemo(() => unit.models ? unit.models.reduce((acc, m) => acc + (m.quantity || 1), 0) : 0, [unit]);
	const dummy = useMemo(() => new THREE.Object3D(), []);
	const mesh = useRef();

	const hover = (e) => {
		ctrlHover({
			type: "ADD",
			name: "UNIT-HOVER",
			component: (
				<Card key={e.pageX} className="unit-popup" style={{left: e.pageX, top: e.pageY}} > 
					<Card.Header> {unit.name} </Card.Header>
					<Card.Content> {numModels} models </Card.Content>
				</Card> 
			)
		});
	};

	const leave = (e) => {
		ctrlHover({type: "DEL", name: "UNIT-HOVER"});
	}

	const setup = () => {
		if (mesh.current) {
			const temp = []
			dummy.scale.set(.01, .01, .01);

			for (let i = 0; i < numModels; i++) {
				const [x, y] = ballGridPos[i];

				// Update the dummy object
				dummy.position.set(initPos[0] + x*inch, initPos[1], initPos[2] + y * inch);
				dummy.scale.set(1, 0.25, 1);
				dummy.updateMatrix();

				// Set this mesh matrix to clone the dummy object
				mesh.current.setMatrixAt(i, dummy.matrix);
			};
		}
	};

	return (
	    <a.mesh
	    	position={initPos}
	    	scale={[3 * inch, inch / 2, 3 * inch]}
	    	{...cfg}
	    	onPointerDown={onPointerDown}
	    	onPointerEnter={hover}
	    	onPointerLeave={leave}
		>
	        <sphereBufferGeometry attach="geometry" args={[0.2, 0.2, 0.2]} />
	        <meshStandardMaterial roughness={0.5} attach="material" color='#ef626c' />
	    </a.mesh>
    );
}

const Board = props => {
	const {
		x,
		y,
		position,
		separation,
		speed,
		rotation,
		totalScale,
		amplitude,
		forces,
		matchState,
		ctrlHover,
		isActive,
		boardSize,
		forceHash,
		updateUnit,
		boardState,
		boardHash
	} = props;
	const numParticles = x * y;

	const ref = useRef({isDragging: false, activeIndex: -1});
	const mesh = useRef();
	const lineRef = useRef();
	const positions = useRef(null);
	const count = useRef(0);

	const dummy = useMemo(() => new THREE.Object3D(), []);

	// Function that will filter out unwanted spring changes
	const springUnits = (units, i = -1, override) => index => {
		if (i !== -1 && i === index) {
			return override;
		}

		return {};
	};

	// Click handlers
    const down = (e, i, playerIdx) => {
    	ref.current.isDragging = true;
    	ref.current.activeIndex =  i;
    	ref.current.playerIdx = playerIdx;
    	if (playerIdx === 0) {
			setPrimarySprings(springUnits(primaryUnits, i, { position: [e.point.x, 0.5, e.point.z]}));
    	} else {
			setSecondarySprings(springUnits(secondaryUnits, i, { position: [e.point.x, 0.5, e.point.z]}));
    	}
    };
    const up = (e) => {
    	if (ref.current && ref.current.isDragging) {
    		if (ref.current.playerIdx === 0) {
				setPrimarySprings(springUnits(primaryUnits, ref.current.activeIndex, { position: [e.point.x, 0.25, e.point.z] }));
	    	} else {
				setSecondarySprings(springUnits(secondaryUnits, ref.current.activeIndex, { position: [e.point.x, 0.25, e.point.z]}));
	    	}
			ref.current.isDragging = false;
			updateUnit(ref.current.playerIdx, ref.current.activeIndex, {
				pos: commInch([e.point.x, e.point.y, e.point.z], position)	
			});
    	}
    };
    const move = (e) => {
    	if (ref.current && ref.current.isDragging) {
    		if (ref.current.playerIdx === 0) {
				setPrimarySprings(springUnits(primaryUnits, ref.current.activeIndex, { position: [e.point.x, 0.5, e.point.z] }));
    		} else {
				setSecondarySprings(springUnits(primaryUnits, ref.current.activeIndex, { position: [e.point.x, 0.5, e.point.z] }));
    		}
    	}
    };

	// Function that sets the x and z for every particle
	const setup = () => {
		const temp = []
		let _x, _y, _z;
		let idx = 0;

		positions.current = new Float32Array(numParticles * 3);

		for (let xIdx = 0; xIdx < x; xIdx++) {
			for (let yIdx = 0; yIdx < y; yIdx++) {
				// Calculate cartesians
				_x = xIdx * separation; // x
				_y = 0; // y
				_z = yIdx * separation; // z

				// Update the dummy object
				dummy.position.set(_x, _y, _z);
				dummy.scale.set(totalScale, totalScale, totalScale);
				dummy.updateMatrix()
				mesh.current.setMatrixAt(idx, dummy.matrix);

				// Set this mesh matrix to clone the dummy object
				positions.current.set([_x, _y, _z], idx);
				idx += 3;
			}
		};
	};

	// Get the initial position for a unit
	const unitInitPos = (playerIdx, unitIdx) => {
		if (boardState.units[playerIdx].length > unitIdx) {
			let pos = boardState.units[playerIdx][unitIdx].pos;
			return decommInch(pos, position);
		}
		return [-4+(unitIdx*.25), 0.3, playerIdx ? -1 :-6];
	};

	const primaryUnits = useMemo(() => (forces[0] && forces[0].units || []), [forceHash]);
	const secondaryUnits = useMemo(() => (forces[1] && forces[1].units || []), [forceHash]);

	// This is the spring that manages the position of every unit
	// INPUT: All units, and a change to make. OUTPUT: array of fns that each return the updates for every index
	const [primaryUnitSprings, setPrimarySprings] = useSprings((primaryUnits.length), springUnits(primaryUnits));
	const [secondaryUnitSprings, setSecondarySprings] = useSprings((secondaryUnits.length), springUnits(secondaryUnits));

	// Initalize the point values
	useEffect(setup, [numParticles]);

	// This hook is what moves the board particles up and down in waves
	useFrame(() => {
		if (!mesh.current) {
			return;
		}
		let posIdx = 0;
		let scale;
		let _x, _y, _z;

		for (let xIdx = 0; xIdx < x; xIdx++) {
			for (let yIdx = 0; yIdx < y; yIdx++) {
				_x = positions.current[posIdx];
				_y = (Math.sin(xIdx + count.current) * 0.3) + Math.sin(yIdx + count.current);
				_y *= amplitude;
				_z = positions.current[posIdx + 2];
				scale = (Math.sin( ( xIdx + count.current ) * 0.5 ) + 1) + ( Math.sin( ( yIdx + count.current ) * 0.5 ) + 1 );
				scale = (scale * totalScale) + 0.05;

				// Set this mesh matrix to clone the dummy object
				dummy.position.set(_x, _y, _z);
				dummy.scale.set(scale, scale, scale);
				dummy.updateMatrix()
				mesh.current.setMatrixAt((xIdx*y) + yIdx, dummy.matrix);
				posIdx += 3;
			}
		}

		count.current = count.current + speed;
		mesh.current.instanceMatrix.needsUpdate = true;
	});

	const planeArgs = useMemo(() => {
		switch(boardSize) {
			case 1:
				return [44 * inch, 60 * inch];
			case 2:
				return [44 * inch, 90 * inch];
			default: 
			case 0:
				return [44 * inch, 30 * inch];
		}
	}, [boardSize]);

	return (
		<group>
			{/* Catches mouse events  and serves as a flat surface */}
	        <mesh position={[0, 0, -16 * inch]} rotation={[Math.PI /2, 0, 0]} onPointerMove={move} onPointerUp={up}>
	            <planeBufferGeometry attach="geometry" args={planeArgs} />
	            <meshStandardMaterial attach="material" transparent opacity={0} color="#3ad0ef" side={THREE.DoubleSide}/>
	        </mesh>

			{/* The "Visible" board, which actually serves no programatic "purpose" */}
			<instancedMesh ref={mesh} args={[null, null, numParticles]} position={position} rotation={rotation}>
				<sphereBufferGeometry attach="geometry" args={[1, 8, 8]} />
				<meshStandardMaterial attach="material" color="#3ad0ef" />
			</instancedMesh>

			{/* The unit objects, which should be draggable */}
	        {primaryUnitSprings.map((spring, i) => (
	        	<Unit key={"prim-unit-"+i} initPos={unitInitPos(0, i)} cfg={spring} unit={primaryUnits[i]} onPointerDown={event => down(event, i, 0)} ctrlHover={ctrlHover} />
        	))}

	        {secondaryUnitSprings.map((spring, i) => (
	        	<Unit key={"sex-unit-"+i} initPos={unitInitPos(1, i)} cfg={spring} unit={secondaryUnits[i]} onPointerDown={event => down(event, i, 1)} ctrlHover={ctrlHover} />
        	))}
		</group>
	);
}

const CameraControls = () => {
	// Get a reference to the Three.js Camera, and the canvas html element.
	// We need these to setup the OrbitControls class.
	// https://threejs.org/docs/#examples/en/controls/OrbitControls

	const {
		camera,
		gl: { domElement }
	} = useThree();

	const controls = useRef();
	useFrame(({ gl }) => {
		gl.setClearColor(0x080405, 1);
		return controls.current.update();
	});

	return (
		<orbitControls
			ref={controls}
			args={[camera, domElement]}
			enableZoom={true}
			enableRotate={true}
			enableDolly={false}
			mouseButtons={{
				MIDDLE: THREE.MOUSE.ROTATE,
				RIGHT: THREE.MOUSE.PAN
			}}
			maxAzimuthAngle={Math.PI / 4}
			maxPolarAngle={Math.PI}
			minAzimuthAngle={-Math.PI / 4}
			minPolarAngle={0}
		/>
	);
};

/**
 * Main component.
 */
export const ThreeMap = props => {
	const {
		boardState,
		boardHash,
		forceHash,
		forces,
		matchState,
		curContent,
		ctrlHover,
		updateUnit
	} = props;

	const [isActive, setActive] = useState(false);
	const [isHoriz, setHoriz] = useState(true);
	const [stage, setStage] = useState(null);
	const canvas = useRef();

	// Build the object that describes the board object
	const genBoardConfig = () => {
		// If we aren't currently in a match, show pretty waves in the background
		const showWaves  = matchState.turn < 0;

		return showWaves ? {
			x: 128,
			y: 64,
			position: [-7, 8, -18],
			separation: 1,
			rotation: [Math.PI * 0.5, 0.25, Math.PI * 0.5],
			speed: 0.009,
			amplitude: 1,
			totalScale: 0.1
		} : {
			isActive: true, // Tell it to display units and other game-related stuff
			boardSize: matchState.mapSize,
			x: 90,
			y: 58,
			position: [-22 * inch, 0, -30 * inch],
			separation: inch / 2,
			rotation: [0, 0, 0],
			speed: 0.01,
			amplitude: 0.05,
			totalScale: 0.005,
		};
	};

	const boardConfig = useMemo(genBoardConfig, [matchState.turn < 0]);

	return (
		<React.Fragment>
			<Canvas ref={canvas} camera={{fov: 100, position: [0, 6, 0]}} >
				<spotLight position={[5, 10, 0]} color='#f1f1ff' distance={100} penumbra={0.75} decay={2} />
				<CameraControls />

				<Board
					{...boardConfig}
					boardState={boardState}
					forces={forces}
					matchState={matchState}
					ctrlHover={ctrlHover}
					forceHash={forceHash}
					updateUnit={updateUnit}
				/>
			</Canvas>
		</React.Fragment>
	);
};

export const mapStateToProps = (state, props) => {
	return {
	  	boardState: state.warReducer.boardState,
	  	boardHash: state.warReducer.boardHash,
	  	curContent: state.appReducer.curContent,
	  	matchState: state.warReducer.matchState,
		forces: state.warReducer.forces,
		forceHash: state.warReducer.forceHash
	};
};

export default connect(mapStateToProps, { ctrlHover, updateUnit })(ThreeMap);
