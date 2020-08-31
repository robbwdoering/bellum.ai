/**
 * FILENAME: threeMap.js 
 *
 * DESCRIPTION: Testing ground for three dimensional animation.
 */

// React + Redux
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Input, Icon, Loading, Menu, Sidebar } from 'semantic-ui-react';

import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { RenderPass } from 'three/examples/jsm/controls/RenderPass';
// import { GlitchPass } from 'three/examples/jsm/controls/GlitchPass';

import { useUpdate, useSpring, animated, config }  from 'react-spring';
import { a } from '@react-spring/three';
import { useDrag, useGesture } from "react-use-gesture";

import './map.css';
import * as shapeLib from './shapeLib';
import * as styleLib from './styleLib';
import { START_RAD, GRID_SIZE, D2R, Ang2Vec, projTypes, P2, P3 } from './constants';
import { SplashControls } from './mapPanes';


const Swarm = (props) => {
	const { count, mouse, position } = props;
	const mesh = useRef();
	const grp = useRef();
	// const { size, viewport } = useThree();
	// const aspect = size.width / viewport.width;

	const dummy = useMemo(() => new THREE.Object3D(), []);

	const setup = () => {
		let theta, phi, r, x, y, z, v;
		const temp = []

		for (let i = 0; i < count; i++) {
			// Calculate polars
			theta = 200 * Math.random() * Math.PI * 2;
			v = 200 * Math.random();
			phi = Math.acos((2 * v) - 1);
			r = Math.pow(200, 1/3);

			// Calculate cartesians
			x = r * Math.sin(phi) * Math.cos(theta);
			y = r * Math.sin(phi) * Math.sin(theta);
			z = r * Math.cos(phi); 

			// Update the dummy object
			dummy.position.set(x, y, z);
			dummy.scale.set(.01, .01, .01);
			dummy.updateMatrix()

			// Set this mesh matrix to clone the dummy object
			mesh.current.setMatrixAt(i, dummy.matrix);
		};
	};

	// Initalize the point values
	useEffect(setup, [count]);

	useFrame(() => {
		mesh.current.rotation.y -= 0.00025;
		mesh.current.rotation.x += 0.00025;
		// mesh.current.rotation.x += 0.005;
	});

	// Render `count` number of these cloned meshes
	return (
		<instancedMesh ref={mesh} args={[null, null, count]} position={position} >
			<dodecahedronBufferGeometry attach="geometry" args={[1, 0]} />
			<meshBasicMaterial attach="material" color="#fff" />
		</instancedMesh>
	);
}

const DotPlane = props => {
	const { rows, cols, position } = props;
	const dummy = useMemo(() => new THREE.Object3D(), []);
	const mesh = useRef();
	const grp = useRef();

	useEffect(() => {
		let theta, phi, r, x, y, z, v;
		const temp = []

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				// Update the dummy object
				dummy.position.set(row / 10, 0, col / 10);
				dummy.scale.set(.01, .01, .01);
				dummy.updateMatrix()
				console.log("rendering point @", {x, y, z});

				mesh.current.setMatrixAt((row * cols) + col, dummy.matrix);
			}
		}
	}, [rows, cols]);

	return (
		<instancedMesh ref={mesh} args={[null, null, rows * cols]} position={position}>
			<dodecahedronBufferGeometry attach="geometry" args={[1, 0]} />
			<meshStandardMaterial attach="material" color="#ccc" />
		</instancedMesh>
	)
};

function BoxTwo(props) {
  const [active, setActive] = useState(0)

  const { rot } = useSpring(() => ({
  	loop: true,
  	from: { rot : 0},
  	to: { rot : 180},
  }));


  // interpolate values from commong spring
  // const scale = spring.to([0, 1], [1, 3])
  // const otherScale = spring.to([0, 1], [1, 0.1])
  // const rotation = spring.to([0, 1], [0, Math.PI])
  // const color = spring.to([0, 1], ['#6246ea', '#e45858'])
  const scale = 1; 
  const otherScale = 1;

  return (
    <a.mesh rotation-y={rot} scale-y={otherScale} scale-x={scale} scale-z={scale}
		onClick={e => console.log('click')}
		onWheel={e => console.log('wheel spins')}
		onPointerUp={e => console.log('up')}
		onPointerDown={e => console.log('down')}
		onPointerOver={e => console.log('hover')}
		onPointerOut={e => console.log('unhover')}
		onPointerMove={e => console.log('move')}
		onUpdate={self => console.log('props have been updated')}
	>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshStandardMaterial roughness={0.5} attach="material" color='#999' />
    </a.mesh>
  )
}

function Box(props) {
  const [active, setActive] = useState(0)

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  // interpolate values from commong spring
  const scale = spring.to([0, 1], [1, 3])
  const otherScale = spring.to([0, 1], [1, 0.1])
  const rotation = spring.to([0, 1], [0, Math.PI])
  const color = spring.to([0, 1], ['#6246ea', '#e45858'])

  return (
    <a.mesh rotation-y={rotation} scale-y={otherScale} scale-x={scale} scale-z={scale} onClick={() => setActive(Number(!active))}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
    </a.mesh>
  )
}

const Drg = (props) => {
	const [active, setActive] = useState(0)

	const { spring } = useSpring({
		spring: active,
		config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
	})

	const ref = useRef({isDragging: false, difX: 0, difY: 0});
	const myRef = useRef();
    const [pos, setPos] = useState()

    const down = (e) => {
    	console.log("pointer down", e);
    	ref.current.isDragging = true;
    };

    const up = (e) => {
    	console.log("pointer up", e);
    	ref.current.isDragging = false;
    };

    const move = (e) => {
    	if (ref.current && ref.current.isDragging) {
	    	myRef.current.position.x = e.point.x; 
	    	myRef.current.position.z = e.point.z; 
    	}
    };

    // TODO: 
    // TODO: Have board manage all dragging - it should know what to do
    // Maybe have a plane that contains everything as children?
    // DESIGN: Pick up unit "tokens" (like mancala) from slots in unit deck (scrollable table)
   	useFrame(() => {
   		myRef.current.rotation.y += 0.01;
   		if (ref.current.isDragging) {

   		}
   	});

    return (
        <mesh 
	        // position-x={ref.current.x}
	        // position-y={ref.current.y}
	        // position-z={ref.current.z}
	        ref={myRef}
	        onPointerDown={down}
	        onPointerMove={move}
	        onPointerUp={up}
        >
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="#0f0" />
        </mesh>
    );
};

const SphereTwo = props => {
	const { position } = props;
	const { scene, gl } = useThree();

	// The cubeRenderTarget is used to generate a texture for the reflective sphere. 
	// It must be updated on each frame in order to track camera movement and other changes
	const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter});
	const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
	cubeCamera.position.set(0, 1, 0);
	scene.add(cubeCamera);

	// Update the cubeCamera with current renderer and scene.
	useFrame(() => cubeCamera.update(gl, scene));

	return (
		<mesh visible position={position}>
			<sphereGeometry attach="geometry" args={[1, 32, 32]} />
			<meshStandardMaterial
				attach="material"
				envMap={cubeCamera.renderTarget.texture}
				color="white"
				roughness={0.1}
				metalness={1}
			/>
		</mesh>
	);
}

export const Sphere = props => {
	const { position } = props;

	// Gen render target
	const loader = new THREE.TextureLoader();
	let tmp = loader.load('/public/brushed.jpg');

	return (
        <mesh position={position}>
            <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
            <meshBasicMaterial envMap={tmp} />
        </mesh>
    );
};


export const Skybox = props => {
	const { position } = props;

	const { scene } = useThree();

	return (
		<group position={position}>
	        <mesh>
	            <sphereBufferGeometry attach="geometry" args={[400, 32, 15]} />
	            <meshBasicMaterial attach="material" side={THREE.BackSide} color='#1b262c'/>
	        </mesh>

	        <mesh position-y={-5} rotation-x={-Math.PI / 2}>
	            <planeBufferGeometry attach="geometry" args={[1000, 1000, 8, 8]} />
	            <meshStandardMaterial attach="material" color="#fdcb9e" side={THREE.DoubleSide}/>
	        </mesh>
        </group>
    );
};

// TODO - swarm flies up into upper left once you pick an option, appear to chill there as part of the UI, but are really a looping video. IFF we can figure out how to put objects to sleep temporarily

const Plinth = props => {
	const { position } = props;
	return (
		<group position={position} >
	        <mesh position={[0, 0.25 , 0]} scale={[2, 0.5, 2]}>
	            <boxBufferGeometry attach="geometry" />
	            <meshStandardMaterial attach="material" color='#555'/>
	        </mesh>
	        <mesh position={[0, 0.75, 0]} scale={[1, 0.5, 1]}>
	            <boxBufferGeometry attach="geometry" />
	            <meshStandardMaterial attach="material" color='#555'/>
	        </mesh>
	        <mesh position={[0, 2.25, 0]} scale={[0.5, 4.5, 0.5]}>
	            <boxBufferGeometry attach="geometry" />
	            <meshStandardMaterial attach="material" color='#555'/>
	        </mesh>
	        <mesh position={[0, 4.5, 0]} scale={[1, 0.2, 1]}>
	            <boxBufferGeometry attach="geometry" />
	            <meshStandardMaterial attach="material" color='#555'/>
	        </mesh>
        </group>
    );
};

const Board = props => {
	const { position, gl } = props;

	const { scene } = useThree();

	return (
		<group>
	        <mesh position-y={-2} rotation-x={-Math.PI / 2}>
	            <planeBufferGeometry attach="geometry" args={[400, 1.5, 8, 8]} />
	            <meshBasicMaterial attach="material" color="#fdcb9e" side={THREE.DoubleSide}/>
	        </mesh>
	        <mesh position-y={-2} rotation-x={-Math.PI / 2}>
	            <planeBufferGeometry attach="geometry" args={[400, 1.5, 8, 8]} />
	            <meshBasicMaterial attach="material" color="#fdcb9e" side={THREE.DoubleSide}/>
	        </mesh>
        </group>
    );
}

export const ThreeMap = props => {
	// const buff = useMemo(() => (<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />), []);
	// const mat = useMemo(() => (<meshBasicMaterial attach="material" color="#05b" transparent={true} opacity={0.50}/>), []);
			// <ambientLight />
			// <pointLight position={[10, 10, 10]} />
			// <spotLight position={[0, -2, 0]} color="#0f0" distance={0} />
			// <mesh scale={[3, 0.1, 4.38]} position={[0,-1,1]}>
			// 	{buff} {mat}
			// </mesh>
			// <Plinth position={[0, 0, 2]} />

	const [isActive, setActive] = useState(false);
	const [isHoriz, setHoriz] = useState(true);

	const seamlessStyle = useMemo(() => {
		if (isHoriz) {
			return {
				width: "100%",
				height: "50%",
				position: 'absolute',
				bottom: '0px'
			};
		} else {
			return {
				width: "50%",
				height: "100%",
				position: 'absolute',
				right: '0px'
			};
		}
	}, [isHoriz]);

	return (
		<React.Fragment>
			<div className='seamless-container' style={seamlessStyle} active={isActive}>
				<SplashControls />
			</div>
			<Canvas camera={{fov: 100, position: [0, .5, -2], target: [0, 5.5, 0]}} >
				<spotLight position={[-10, 20, 10]} color='#fff' distance={0} penumbra={0.75} castShadow/>
				{/* <Swarm count={1000000} position={[0, 0, 0]}/> */}
				{/*<DotPlane rows={40} cols={80} position={[0, -0.9, 1]}/>*/}

				{/* <Drg /> */}
				<Plinth position={[0, -5, 2]} />
				<SphereTwo position={[0, 1, 2]} />
				<Skybox position={[0, 0.5 -2]}/>
		        <fog attach="fog" args={["#1b262c", 1, 200]} />
			</Canvas>
		</React.Fragment>
	);
	        // <fog attach="fog" args={["#00b7c2", 1, 200]} />
}
			// <BoxTwo />

export const mapStateToProps = (state, props) => {
	return {
		// gridSize: state.mapReducer.gridSize,
		// hexRad: state.mapReducer.hexRad,
		// oceans: state.mapReducer.oceans,
	 //    data: state.mapReducer.data,
	 //    oceanHash: state.mapReducer.oceanHash,
	 //    dataHash: state.mapReducer.dataHash
	};
};

export default connect(mapStateToProps, {})(ThreeMap);
