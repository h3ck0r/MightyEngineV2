import * as THREE from 'three/webgpu';

import { globals } from './globals.js';
import { setupLights } from './lights.js';
import { setupEventListeners } from './eventListeners.js';
import { Debug } from '../utils/debug.js';
import { Inputs } from './inputs.js';
import { GameScene } from './gameScene.js';

export class Engine {
    constructor() {
        this.animate = this.animate.bind(this);

        globals.renderer = new THREE.WebGPURenderer({ antialias: true });
        globals.renderer.toneMapping = THREE.AgXToneMapping;
        globals.renderer.setPixelRatio(window.devicePixelRatio);
        globals.renderer.setSize(window.innerWidth, window.innerHeight);
        globals.renderer.shadowMap.enabled = true;
        globals.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        globals.gameScene = new GameScene(globals.scene);

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        globals.scene.add(mesh);

        globals.camera.camera.far = 120;

        document.body.appendChild(globals.renderer.domElement);
    }


    async init() {
        await globals.gameScene.loadScene();
        setupEventListeners(globals.renderer, globals.controls);
        setupLights();
        this.inputs = new Inputs();
        this.debug = new Debug();
        globals.renderer.setAnimationLoop(this.animate);
    }

    animate() {
        const delta = globals.clock.getDelta();
        this.inputs.updateMovement(delta);
        globals.controls.update(delta);
        globals.mixers.forEach(entry => entry.mixer.update(delta));
        globals.renderer.render(globals.scene, globals.camera.camera);
        if (globals.isDebug) {
            globals.stats.update();
        }
    }
}
