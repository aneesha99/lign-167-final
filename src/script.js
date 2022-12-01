import {run_gpt} from './gpt.js';
import styles from './index.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// Deal with user input: Feed user values to GPT-3 and pass to rendering function
// TODO: Add loading screen
// TODO: Get all needed info from GPT-3
// TODO: Call createDesign() with all needed info

document.getElementById('search-button').onclick=async () => {
	console.log('Button clicked');
	const gptResponses = await run_gpt(document.getElementById('search-bar').value);
	console.log(gptResponses);
	// Clear all current main elements and replace with canvas
	const homeElements = document.querySelectorAll('.homepage');
	homeElements.forEach(element => {
		element.remove();
	});
	let canv = document.createElement('canvas');
	canv.className = 'webgl';
	document.body.addEventListener('DOMNodeInserted', function () {
		console.log('Node inserted');
		createDesign(gptResponses);
	}, {once : true});
	document.body.appendChild(canv);
}

//let gptResponses = {};
//createDesign(gptResponses);

// Render the appropriate models based on user input
// TODO: Allow color customization
// TODO: Load in all models
// TODO: Figure out how to find position information
function createDesign(gptResponses) {
	// Add scene and camera
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// Add renderer
	const renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector('canvas.webgl')
	});
	renderer.setSize( window.innerWidth/1.02, window.innerHeight/1.02);

	const loader = new GLTFLoader

	// Load in Blender room model
	loader.load('room.gltf', function (gltf) {
		let model = gltf.scene;
		model.rotateX(Math.PI/4);
		model.rotateY(-Math.PI/4);
		model.name = 'room';
		scene.add(model);
	}, undefined, function (error) {
		console.error(error);
	} );

	// Load in wooden table model
	loader.load('table.gltf', function (gltf) {
		let model = gltf.scene;
		model.rotateX(Math.PI/4);
		model.rotateY(-Math.PI/1.35);
		model.rotateY(Math.PI/2);
		model.position.z = 0;
		model.position.y = 0;
		model.position.x = 0;
		model.name = 'table';
		scene.add(model);
	}, undefined, function (error) {
		console.error(error);
	} );

	// Load in chair model
	loader.load('chair.gltf', function (gltf) {
		let model = gltf.scene;
		model.rotateX(Math.PI/4);
		model.rotateY(-Math.PI/1.35);
		model.rotateY(Math.PI/2);
		model.position.z = 0;
		model.position.y = 0;
		model.position.x = 0;
		model.name = 'chair';
		scene.add(model);
	}, undefined, function (error) {
		console.error(error);
	} );

	// Load in shelf model
	loader.load('shelf.gltf', function (gltf) {
		let model = gltf.scene;
		model.rotateX(Math.PI/4);
		model.rotateY(-Math.PI/1.35);
		model.rotateY(Math.PI/2);
		model.position.z = 0;
		model.position.y = 0;
		model.position.x = 0;
		model.name = 'shelf';
		scene.add(model);
	}, undefined, function (error) {
		console.error(error);
	} );

	// Load in beanbag model
	loader.load('beanbag.gltf', function (gltf) {
		let model = gltf.scene;
		model.rotateX(Math.PI/4);
		model.rotateY(-Math.PI/1.35);
		model.rotateY(Math.PI/2);
		model.position.z = 0;
		model.position.y = 0;
		model.position.x = 0;
		model.name = 'beanbag';
		scene.add(model);
	}, undefined, function (error) {
		console.error(error);
	} );

	// Load in bookshelf model
	loader.load('bookshelf.gltf', function (gltf) {
		let model = gltf.scene;
		model.rotateX(Math.PI/4);
		model.rotateY(-Math.PI/1.35);
		model.rotateY(Math.PI/2);
		model.position.z = 0;
		model.position.y = 0;
		model.position.x = 0;
		model.name = 'bookshelf';
		scene.add(model);
	}, undefined, function (error) {
		console.error(error);
	} );


	loader.load('bed.gltf', function (gltf) {
		let model = gltf.scene;
		model.rotateX(Math.PI/4);
		model.rotateY(-Math.PI/1.35);
		model.rotateY(Math.PI/2);
		model.position.z = -0.5;
		model.position.y = 0;
		model.position.x = 1;
		model.name = 'bed';
		scene.add(model);
	}, undefined, function (error) {
		console.error(error);
	} );

	//let axesHelper = new THREE.AxesHelper( 5 );
	//scene.add( axesHelper );

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

	camera.position.z = 20;
	camera.position.y = -5;

	scene.background = new THREE.Color( 0x1f1f1f );

	// Allow user to zoom/rotate
	const controls = new OrbitControls( camera, renderer.domElement );


	// Render to screen
	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		// Change color of room
		//console.log(scene);
		scene.getObjectByName('room').children[0].material.color.setHex(gptResponses['wall-color']);
		scene.getObjectByName('room').children[1].material.color.setHex(gptResponses['wall-color']);
		scene.getObjectByName('table').children[0].material.color.setHex(gptResponses['table-color']);
		scene.getObjectByName('bed').children[0].material.color.setHex(gptResponses['bed-color']);
		scene.getObjectByName('chair').children[0].material.color.setHex(gptResponses['chair-color']);
		scene.getObjectByName('shelf').children[0].material.color.setHex(gptResponses['shelf-color']);
		scene.getObjectByName('beanbag').children[0].material.color.setHex(gptResponses['beanbag-color']);
		scene.getObjectByName('bookshelf').children[0].material.color.setHex(gptResponses['bookshelf-color']);
	}
	animate();
}