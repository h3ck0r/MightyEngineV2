import * as THREE from 'three/webgpu';

import { playAnimation } from '../utils/animation.js'
import { globals } from './globals.js';
import { loadModel } from '../utils/modelLoader.js';
import { generateBushes } from '../mesh/bush.js';
import { generateGrass, updateGrassPosition } from '../mesh/grass.js';

export class GameScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.bushes = [];
        this.playerModel = null;
    }
    update() {
        updateGrassPosition(this.grass);
    }

    async loadScene() {

        await loadModel('./models/playerModel.glb').then(model => {
            this.playerModel = model;
            playAnimation(this.playerModel, 'LongIdle');
        });
        await generateBushes();

        this.grassFieldSize = 30;
        const { grassMesh, coordinates } = generateGrass();
        this.grass = grassMesh;
        this.grassCoordinates = coordinates;
        globals.gameScene.scene.add(this.grass);
    }

}
