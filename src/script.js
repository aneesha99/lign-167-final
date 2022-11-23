import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
	/*
	gltf.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
			child.material.ambient.setHex(0xFF0000);
			child.material.color.setHex(0xFF0000);
		}
	});
	*/
	let model = gltf.scene;
	model.rotateX(Math.PI/4);
	model.rotateY(-Math.PI/4);
	scene.add(model);
}, undefined, function (error) {
	console.error(error);
} );

// Add lighting and camera position
const light = new THREE.AmbientLight( 0x606060 ); // soft white light
scene.add( light );
const directionalLightTop = new THREE.DirectionalLight(0xffffff, 0.3);
scene.add(directionalLightTop);
const directionalLightRight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLightRight.position.set( 0, 0, 1 );
//scene.add(directionalLightRight);


let directionalLightFront = new THREE.DirectionalLight( 0xffffff, 1);
directionalLightFront.position.set( 0, 0, 1 );
//scene.add( directionalLightFront );
const pointLight = new THREE.PointLight( 0xffffff, 0.5, 20 );
pointLight.position.set( 0, 0, 1 );
//scene.add( pointLight );

//const spotLight = new THREE.SpotLight( 0xffffff );
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
//scene.add(camera);
scene.background = new THREE.Color( 0x000000 );


// Render to screen
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();