import { THREE } from '../imports/imports.js';

import { playAnimation } from '../utils/animation.js'
import { globals } from './globals.js';
import { loadModel } from '../utils/modelLoader.js';
import { generateBushes } from '../mesh/bush.js';
import { generateGrass, updateGrassPosition } from '../mesh/grass.js';
import { loadRocks } from '../mesh/rocks.js';

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

        const playerModelPromise = loadModel('./models/playerModelOpt.glb').then(model => {
            this.playerModel = model;
            playAnimation(this.playerModel, 'LongIdle');
        });
        const houseModelPromise = loadModel('./models/house.glb').then(model => {
            this.houseModel = model;
        });
        const runeRockModelPromise = loadModel('./models/runeRock.glb').then(model => {
            this.runeRock = model;
        });
        const bushesPromise = generateBushes();
        const rocksPromise = loadRocks();
        const grassPromise = generateGrass();

        await Promise.all([playerModelPromise, runeRockModelPromise, bushesPromise, houseModelPromise, rocksPromise, grassPromise]);
        globals.gameScene.scene.add(this.playerModel);
        globals.gameScene.scene.add(this.houseModel);
        globals.gameScene.scene.add(this.runeRock);
    }

}
