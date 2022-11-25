import {run_gpt} from './gpt.js';
import styles from './index.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Deal with user input: Feed user values to GPT-3 and pass to rendering function
// TODO: Clear all current main elements and replace with canvas
// TODO: Add loading screen
// TODO: Get all needed info from GPT-3
// TODO: Call createDesign() with all needed info
document.getElementById('search-button').onclick=async () => {
	console.log('Button clicked');
	console.log(await run_gpt(document.getElementById('search-bar').value));
};

// Render the appropriate models based on user input
// TODO: Allow color customization
// TODO: Load in all models
// TODO: Figure out how to find position information
function createDesign() {
	// Add scene and camera
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// Add renderer
	const renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector('canvas.webgl')
	});
	renderer.setSize( window.innerWidth/1.02, window.innerHeight/1.02);

	const loader = new GLTFLoader

	// Load in Blender model
	loader.load('room.gltf', function (gltf) {
		let model = gltf.scene;
		model.rotateX(Math.PI/4);
		model.rotateY(-Math.PI/4);
		model.name = 'room';
		scene.add(model);
	}, undefined, function (error) {
		console.error(error);
	} );

	// Add lighting and camera position
	const light = new THREE.AmbientLight( 0x606060 ); // soft white light
	scene.add( light );
	const directionalLightTop = new THREE.DirectionalLight(0xffffff, 0.3);
	scene.add(directionalLightTop);
	const spotLight = new THREE.SpotLight( 0xa0a0a0 );
	spotLight.position.set( 0, 0, 20 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;

	scene.add( spotLight );

	camera.position.z = 25;
	camera.position.y = 4;

	scene.background = new THREE.Color( 0x000000 );

	// Render to screen
	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		// Change color of room
		//console.log(scene.getObjectByName('room').children[2].material.color.setHex(0xffffff));
		//console.log(scene.getObjectByName('room').children[3].material.color.setHex(0xffffff))
	}
	animate();
}