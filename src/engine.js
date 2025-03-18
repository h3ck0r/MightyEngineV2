import * as THREE from 'three/webgpu';
import { globals } from './globals';
import { setupMovement, updateMovement } from './movement';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { setupLights } from './lights';
import { loadModel } from './modelLoader';
import { setupEventListeners } from './eventListeners';

export class Engine {
    constructor() {
        this.animate = this.animate.bind(this);
        this.renderer = new THREE.WebGPURenderer({ antialias: true });
        this.controls = new PointerLockControls(globals.camera.camera, this.renderer.domElement);
        globals.camera.camera.position.set(0, 2, 10); 


        document.body.appendChild(this.renderer.domElement);
    }

    async init() {
        this.setupRenderer();
        this.setupControls();
        setupMovement();
        this.setupEvents();

        await loadModel('./resources/models/model.glb');

        setupLights();
        this.renderer.setAnimationLoop(this.animate);
    }

    setupRenderer() {
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupControls() {
        this.controls.lookSpeed = 0.1;
        this.controls.movementSpeed = 5;
        this.controls.activeLook = false;
    }

    setupEvents() {
        setupEventListeners(this.renderer, this.controls);
    }

    animate() {
        updateMovement(globals.clock.getDelta());
        this.controls.update(globals.clock.getDelta());
        this.renderer.render(globals.scene, globals.camera.camera);
    }
}
