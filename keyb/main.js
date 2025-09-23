import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// SCENE AND CAMERA
const scene = new THREE.Scene() ;
{
    const color = 0xFFFFFF;  // white
    const near = 1;
    const far = 100;
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color('#8b9197');
}

const fov = 45;
const aspect = window.innerWidth / window.innerHeight  // the canvas default
const near = 0.1;
const far = 1000;
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
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

// GUI controls
import GUI from 'lil-gui';

const gui = new GUI();

const lightSettings = {
    color: '#' + color.toString(16).padStart(6, '0'),
    intensity: intensity,
};

gui.addColor(lightSettings, 'color').onChange((value) => {
    light.color.set(value);
});

gui.add(lightSettings, 'intensity', 0, 2).onChange((value) => {
    light.intensity = value;
});


// plane

{

    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set( repeats, repeats );

    const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
    const planeMat = new THREE.MeshPhongMaterial( {
        map: texture,
        side: THREE.DoubleSide,
    } );
    const mesh = new THREE.Mesh( planeGeo, planeMat );
    mesh.rotation.x = Math.PI * - .5;
    scene.add( mesh );

}



const geometry = new THREE.BoxGeometry(10, 10, 10, 100);
const textureLoader = new THREE.TextureLoader();
const boxTexture = textureLoader.load('attorney.jpg'); // 🐶 Replace with your image path

const material = new THREE.MeshPhongMaterial({
    map: boxTexture,
});
const box = new THREE.Mesh(geometry, material);
box.position.y = 10;

scene.add(box)



// LOOP
function animate() {
    requestAnimationFrame(animate);

    box.rotation.y += 0.01;
    box.rotation.x += 0.01;
    box.rotation.z += 0.01;

    renderer.render(scene, camera);
}



animate()