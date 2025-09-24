import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.position.set(5, 30, 0);
scene.add(pointLight);

const secondpointLight = new THREE.PointLight(0xCBC3E3, 1);
secondpointLight.position.set(-5, 40, 10);
scene.add(secondpointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// KEYCAP VARIABLES
const keycaps = {};
const keysPressed = { w: false, a: false, s: false, d: false };

const originalY = 2.5;
const downY = 1.0;
const speed = 0.8;

// KEYCAP
const loader = new GLTFLoader();
loader.load(
    '/models/demo_keycap.gltf',
    function (gltf) {
        const baseKeycap = gltf.scene;
        baseKeycap.scale.set(5, 5, 5);

        // KEYBOARD MAPPING
        const positions = {
            w: [5, originalY, -6.5],
            a: [-2, originalY, 0],
            s: [5, originalY, 0],
            d: [12, originalY, 0],
        };

        //FUNCTION
        for (const key in positions) {
            const keycap = baseKeycap.clone(true);
            keycap.position.set(...positions[key]);
            scene.add(keycap);
            keycaps[key] = keycap;
        }
    },
);

// KEY FUNCTIONS
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

    const t = time * 0.001;
    camera.position.x = 5 + Math.sin(t * 0.5) * 0.5;
    camera.position.y = 40 + Math.sin(t * 0.7) * 0.3;
    camera.lookAt(5, 2.5, 0);

    for (const key in keycaps) {
        const cap = keycaps[key];
        const targetY = keysPressed[key] ? downY : originalY;
        cap.position.y += (targetY - cap.position.y) * speed;
    }

    renderer.render(scene, camera);
}

animate();
