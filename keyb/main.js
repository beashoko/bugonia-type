import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// SCENE
const scene = new THREE.Scene() ;
{
    scene.background = new THREE.Color('#8b9197');
}

//CAMERA

const fov = 45;
const aspect = window.innerWidth / window.innerHeight
const near = 10;
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


// LIGHTS
const color = 0xFFFFFF;
const intensity = 200;
const light = new THREE.PointLight(color, intensity);
light.position.set(5, 10, 0);
scene.add(light);

//BOX

const geometry = new THREE.BoxGeometry(5, 5, 5);

function createCube(color, xPos, zPos = 0) {
    const cube = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color }));
    cube.position.set(xPos, 5, zPos);
    scene.add(cube);
    return cube;
}

const cubes = {
    w: createCube(0xff0000, 5, -6.5),  // red cube at x = -15, z = 10
    a: createCube(0x00ff00, -2, 0),
    s: createCube(0x0000ff, 5, 0),
    d: createCube(0xffff00, 12, 0),
};


const keysPressed = { w: false, a: false, s: false, d: false };

const originalY = 5;
const downY = 4;
const speed = 0.8;

// Event listeners track key state properly
window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (key in keysPressed) {
        keysPressed[key] = true;
    }
});

window.addEventListener('keyup', e => {
    const key = e.key.toLowerCase();
    if (key in keysPressed) {
        keysPressed[key] = false;
    }
});

function animate() {
    requestAnimationFrame(animate);

    for (const key in cubes) {
        const cube = cubes[key];
        const targetY = keysPressed[key] ? downY : originalY;
        cube.position.y += (targetY - cube.position.y) * speed;
    }

    renderer.render(scene, camera);
}
//d
animate();