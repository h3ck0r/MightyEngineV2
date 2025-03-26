import { THREE } from '../imports/imports';
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
        maxZoom: 20,
        minZoom: 8,
        movementSpeed: 2,
        fastSpeed: 5,
    },
    shadow: {
        size: 25,
        mapSize: {
            width: 2048,
            height: 2048
        }
    },
    light: {
        globalOffset: {
            x: 9,
            y: -10,
            z: 0
        }
    },
    playerModel: null,
    clock: new THREE.Clock(),
    loader: new GLTFLoader(),
    textureLoader: new THREE.TextureLoader(),
    mixers: []
}