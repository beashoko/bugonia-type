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
camera.position.set(6, 80, 14);
camera.rotation.set(-Math.PI / 2.2, 0, 0);

// RENDERER
const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(5, 30, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// FLOOR
const texLoader = new THREE.TextureLoader();
const floorTexture = texLoader.load('');
const planeGeometry = new THREE.PlaneGeometry(50, 33, 50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 100,
    metalness: 0.0,
    side: THREE.DoubleSide
});
const bgplane = new THREE.Mesh(planeGeometry, planeMaterial);
bgplane.scale.set(2, 2, 2);
bgplane.rotation.x = -Math.PI / 2;
bgplane.position.set(6, -2, 9);
scene.add(bgplane);

// KEYCAP VARIABLES
const keycaps = {};
const keysPressed = {
    q: false, w: false, e: false, r: false, t: false, y: false, u: false, i: false, o: false, p: false,
    a: false, s: false, d: false, f: false, g: false, h: false, j: false, k: false, l: false,
    z: false, x: false, c: false, v: false, b: false, n: false, m: false,
    ',': false, '.': false, "'": false, Backspace: false, Escape: false,
    Shift: false, Control: false, Alt: false, Enter: false
};

const originalY = 2.5;
const downY = 1.0;
const speed = 0.8;

const specialKeyModels = {
    Backspace: './models/special_keycap.gltf',
    Shift: './models/shift_keycap.gltf',
    Control: './models/ctrl.gltf',
    Alt: './models/alt.gltf',
    Enter: './models/enter_keycap.gltf',
};


// TEXTURES
const keyTextures = {
    q: texLoader.load('./textures/q.png'),
    w: texLoader.load('./textures/w.png'),
    e: texLoader.load('./textures/e.png'),
    r: texLoader.load('./textures/r.png'),
    t: texLoader.load('./textures/t.png'),
    y: texLoader.load('./textures/y.png'),
    u: texLoader.load('./textures/u.png'),
    i: texLoader.load('./textures/i.png'),
    o: texLoader.load('./textures/o.png'),
    p: texLoader.load('./textures/p.png'),
    a: texLoader.load('./textures/a.png'),
    s: texLoader.load('./textures/s.png'),
    d: texLoader.load('./textures/d.png'),
    f: texLoader.load('./textures/f.png'),
    g: texLoader.load('./textures/g.png'),
    h: texLoader.load('./textures/h.png'),
    j: texLoader.load('./textures/j.png'),
    k: texLoader.load('./textures/k.png'),
    l: texLoader.load('./textures/l.png'),
    z: texLoader.load('./textures/z.png'),
    x: texLoader.load('./textures/x.png'),
    c: texLoader.load('./textures/c.png'),
    v: texLoader.load('./textures/v.png'),
    b: texLoader.load('./textures/b.png'),
    n: texLoader.load('./textures/n.png'),
    m: texLoader.load('./textures/m.png'),
    ',': texLoader.load('./textures/comma.png'),
    '.': texLoader.load('./textures/dot.png'),
    "'": texLoader.load('./textures/quote.png'),
    Escape: texLoader.load('./textures/esc.png'),
    Backspace: texLoader.load('./textures/backspace.png'),
    Shift: texLoader.load('./textures/shift.png'),
    Control: texLoader.load('./textures/ctrl.png'),
    Alt: texLoader.load('./textures/alt.png'),
    Enter: texLoader.load('./textures/enter.png'),
};

// KEY POSITIONS
const positions = {
    Escape: [-35, originalY, -6],
    q: [-28.5, originalY, -6],
    w: [-22, originalY, -6],
    e: [-15.5, originalY, -6],
    r: [-9, originalY, -6],
    t: [-2.5, originalY, -6],
    y: [4, originalY, -6],
    u: [10.5, originalY, -6],
    i: [17, originalY, -6],
    o: [23.5, originalY, -6],
    p: [30, originalY, -6],

    a: [-26, originalY, 0.5],
    s: [-19.5, originalY, 0.5],
    d: [-13, originalY, 0.5],
    f: [-6.5, originalY, 0.5],
    g: [0, originalY, 0.5],
    h: [6.5, originalY, 0.5],
    j: [13, originalY, 0.5],
    k: [19.5, originalY, 0.5],
    l: [26, originalY, 0.5],

    z: [-22, originalY, 7],
    x: [-15.5, originalY, 7],
    c: [-9, originalY, 7],
    v: [-2.5, originalY, 7],
    b: [4, originalY, 7],
    n: [10.5, originalY, 7],
    m: [17, originalY, 7],
    ",": [23.5, originalY, 7],
    ".": [30, originalY, 7],

    Backspace: [57.5, originalY, -6],
    Enter: [59.2, originalY, 13.77],
    Shift: [-22, originalY, 13.7],
    Control: [-35, originalY, 13],
    Alt: [-25, originalY, 13]
};





//MODEL LOADERS
const loader = new GLTFLoader();
loader.load('./models/keycap.gltf', function (gltf) {
    const baseKeycap = gltf.scene;
    baseKeycap.rotation.y = Math.PI / 2;
    baseKeycap.scale.set(3, 3, 3);

    for (const key in positions) {
        if (specialKeyModels[key]) {
            const specialLoader = new GLTFLoader();
            specialLoader.load(specialKeyModels[key], function (specialGltf) {
                const specialCap = specialGltf.scene;
                specialCap.position.set(...positions[key]);
                specialCap.scale.set(3, 3, 3);
                specialCap.rotation.y = Math.PI / 2;



                specialCap.traverse((child) => {
                    if (child.isMesh) {
                        child.material = child.material.clone();
                        if (keyTextures[key]) {
                            child.material.map = keyTextures[key];
                            child.material.needsUpdate = true;
                        }
                    }
                });

                scene.add(specialCap);
                keycaps[key] = specialCap;
            });
        } else {
            // 🔹 Clone the default model for normal keys
            const keycap = baseKeycap.clone(true);
            keycap.position.set(...positions[key]);

            keycap.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                    if (keyTextures[key]) {
                        child.material.map = keyTextures[key];
                        child.material.needsUpdate = true;
                    }
                }
            });

            scene.add(keycap);
            keycaps[key] = keycap;
        }
    }
});








for (const key in keyTextures) {
    if (keyTextures[key]) {
        keyTextures[key].flipY = false;
    }
}



//KEY FUNCTIONALITY AND SOUND

const pressSoundPath = './sounds/click.mp3';
const releaseSoundPath = './sounds/release.mp3';


const keyPressed = {};

window.addEventListener('keydown', e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (!keyPressed[key]) {
        keyPressed[key] = true;

        const sound = new Audio(pressSoundPath);
        sound.play();
    }
});

window.addEventListener('keyup', e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (keyPressed[key]) {
        keyPressed[key] = false;

        const sound = new Audio(releaseSoundPath);
        sound.play();
    }
});


keyTextures.Enter = texLoader.load('./textures/enter.png', (tex) => {
    tex.flipY = false;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
});

// ANIMATE
function animate(time) {
    requestAnimationFrame(animate);

    for (const key in keycaps) {
        const cap = keycaps[key];
        const targetY = keyPressed[key] ? downY : originalY;
        cap.position.y += (targetY - cap.position.y) * speed;
    }

    renderer.render(scene, camera);
}
animate();
