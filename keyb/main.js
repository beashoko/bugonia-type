import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// SCENE AND CAMERA
const scene = new THREE.Scene();
const fov = 45;
const aspect = window.innerWidth / window.innerHeight  // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 20);


//RENDERER
const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({ canvas });
const controls = new OrbitControls(camera, renderer.domElement);

const {devicePixelRatio} = window;
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

renderer.render(scene, camera);

// OBJECTS

const light = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(light);

const geometry = new THREE.BoxGeometry(10, 10, 10, 100);
const material = new THREE.MeshBasicMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)



// LOOP
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.y += 0.01;
    torus.rotation.x += 0.01;
    torus.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate()