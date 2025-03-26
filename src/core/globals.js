import { THREE } from '../imports/imports';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const globals = {
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
        globalColorLight: 0xfffacf,
        globalHemisphereTopColor: 0xa9d4ff,
        globalHemisphereBottomColor: 0xffecec,

        globalOffset: {
            x: 9,
            y: -10,
            z: 0
        }
    },
    clock: new THREE.Clock(),
    loader: new GLTFLoader(),
    textureLoader: new THREE.TextureLoader(),
    mixers: []
}