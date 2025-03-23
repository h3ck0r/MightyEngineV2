import * as THREE from 'three/webgpu';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const globals = {
    camera: {
        camera: new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.25, 50),
        direction: new THREE.Vector3(),
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        speedUp: false,
    },
    movement: {
        rotationSpeed: 0.015,
        maxZoom: 40,
        minZoom: 10,
        movementSpeed: 2,
        fastSpeed: 5,
    },
    shadow: {
        size: 70,
        mapSize: {
            width: 4096,
            height: 4096
        }
    },
    light: {},
    playerModel: null,
    clock: new THREE.Clock(),
    scene: new THREE.Scene(),
    loader: new GLTFLoader(),
    mixers: []
}