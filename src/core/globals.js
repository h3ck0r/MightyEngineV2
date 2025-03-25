import * as THREE from 'three/webgpu';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/Addons.js';

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
            width: 4096,
            height: 4096
        }
    },
    light: {
        globalOffset: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    playerModel: null,
    clock: new THREE.Clock(),
    loader: new GLTFLoader(),
    textureLoader: new THREE.TextureLoader(),
    ktxLoader: new KTX2Loader(),
    mixers: []
}