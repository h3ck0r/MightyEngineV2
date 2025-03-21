import * as THREE from 'three/webgpu';
import { globals } from './globals';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { setupLights } from './lights';
import { loadModel } from './modelLoader';
import { setupEventListeners } from './eventListeners';
import { Debug } from './debug';
import { Inputs } from './movement';

export class Engine {
    constructor() {
        this.animate = this.animate.bind(this);

        globals.renderer = new THREE.WebGPURenderer({ antialias: true });
        globals.renderer.toneMapping = THREE.CineonToneMapping;
        globals.renderer.setPixelRatio(window.devicePixelRatio);
        globals.renderer.setSize(window.innerWidth, window.innerHeight);
        globals.renderer.shadowMap.enabled = true;
        globals.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        globals.scene.add(mesh);

        globals.camera.camera.far = 100;
        globals.camera.camera.position.set(0, 2, 10);
        
        document.body.appendChild(globals.renderer.domElement);
    }


    async init() {

        await loadModel('./resources/models/cat.glb').then(model => {
            globals.playerCat = model;
        });
        setupEventListeners(globals.renderer, globals.controls);
        setupLights();
        this.inputs = new Inputs();
        this.debug = new Debug();
        globals.renderer.setAnimationLoop(this.animate);
    }

    animate() {
        this.inputs.updateMovement(globals.clock.getDelta());
        globals.controls.update(globals.clock.getDelta());
        globals.renderer.render(globals.scene, globals.camera.camera);
        if (globals.isDebug){
            globals.stats.update();
        }
    }
}

