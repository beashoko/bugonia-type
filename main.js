import './style.css'
import * as THREE from 'three';

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color('#8b9197');

// CAMERA
const fov = 45;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


camera.position.set(5, 40, 5);
camera.rotation.set(-Math.PI / 2.2, 0, 0);

// RENDERER
const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHTS
const color = 0xFFFFFF;
const intensity = 200;
const light = new THREE.PointLight(color, intensity);
light.position.set(5, 10, 0);
scene.add(light);

// BOX GEOMETRY
const geometry = new THREE.BoxGeometry(5, 5, 5);

function createCube(color, xPos, zPos = 0) {
    const cube = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({ color })
    );
    // Put cubes on the ground (so bottoms at y=0)
    cube.position.set(xPos, 2.5, zPos);
    scene.add(cube);
    return cube;
}

const cubes = {
    w: createCube(0xff0000, 5, -6.5),
    a: createCube(0x00ff00, -2, 0),
    s: createCube(0x0000ff, 5, 0),
    d: createCube(0xffff00, 12, 0),
};

// KEY HANDLING
const keysPressed = { w: false, a: false, s: false, d: false };

const originalY = 2.5;
const downY = 1.5;
const speed = 0.8;

window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (key in keysPressed) keysPressed[key] = true;
});

window.addEventListener('keyup', e => {
    const key = e.key.toLowerCase();
    if (key in keysPressed) keysPressed[key] = false;
});

// ANIMATE
function animate(time) {
    requestAnimationFrame(animate);


    const t = time * 0.001; // convert ms to seconds
    camera.position.x = 5 + Math.sin(t * 0.5) * 0.5;  // side-to-side
    camera.position.y = 40 + Math.sin(t * 0.7) * 0.3; // slight up/down

    camera.lookAt(5, 2.5, 0);

    for (const key in cubes) {
        const cube = cubes[key];
        const targetY = keysPressed[key] ? downY : originalY;
        cube.position.y += (targetY - cube.position.y) * speed;
    }

    renderer.render(scene, camera);
}

animate();