import { THREE, MeshoptDecoder, KTX2Loader } from '../imports/imports.js';

import { globals } from './globals.js';
import { setupLights } from './lights.js';
import { setupEventListeners } from './eventListeners.js';
import { Debug } from '../utils/debug.js';
import { Inputs } from './inputs.js';
import { GameScene } from './gameScene.js';
import { Camera } from './camera.js';

export class Engine {
    constructor() {
        this.animate = this.animate.bind(this);

        const renderer = new THREE.WebGPURenderer({ antialias: true });
        renderer.toneMapping = THREE.AgXToneMapping;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        globals.renderer = renderer;
        document.body.appendChild(globals.renderer.domElement);

        globals.gameScene = new GameScene();
        globals.camera = new Camera();
        
    }


    async init() {
        await globals.renderer.hasFeatureAsync();
        await globals.textureLoader.loadAsync("/textures/noiseTexture.webp")
            .then((texture) => {
                globals.noiseTexture = texture;
            })
            .catch((error) => {
                console.error("Failed to load texture:", error);
            });

        const ktx2Loader = new KTX2Loader();
        
        ktx2Loader.setTranscoderPath("/libs/basis/");
        ktx2Loader.detectSupport(globals.renderer);
        ktx2Loader.setWorkerLimit(navigator.hardwareConcurrency || 4);
        globals.loader.setKTX2Loader(ktx2Loader);
        globals.loader.setMeshoptDecoder(MeshoptDecoder);

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
        globals.gameScene.update();
        globals.renderer.renderAsync(globals.gameScene.scene, globals.camera.camera);
        globals.mixers.forEach(entry => entry.mixer.update(delta));
        if (globals.isDebug) {
            globals.stats.update();
        }
    }
}
