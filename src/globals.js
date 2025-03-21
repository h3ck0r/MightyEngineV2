import * as THREE from 'three/webgpu';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const globals = {
    camera: {
        camera: new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.25, 50),
        movementSpeed: 4,
        baseMovementSpeed: 4,
        fastSpeed: 2,
        direction: new THREE.Vector3(),
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        speedUp: false,
    },
    light: {},
    playerCat: null,
    clock: new THREE.Clock(),
    scene: new THREE.Scene(),
    loader: new GLTFLoader(),

}