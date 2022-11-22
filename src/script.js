import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//const camera = new THREE.PerspectiveCamera( 180, window.innerWidth / window.innerHeight, 0.1, 10000 );


const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('canvas.webgl')
});
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );

const loader = new GLTFLoader

loader.load( 'room.gltf', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

camera.position.z = 20;


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();