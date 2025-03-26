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
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshStandardMaterial({ color: 0xa8fc0d })
        );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;

        const playerModelPromise = loadModel('./models/playerModelOpt.glb').then(model => {
            this.playerModel = model;
            playAnimation(this.playerModel, 'LongIdle');
        });
        const houseModelPromise = loadModel('./models/house.glb').then(model => {
            this.houseModel = model;
        });

        const loader = new THREE.CubeTextureLoader();
        const skyboxPromise = loader.loadAsync([
            'skyboxes/anime/right.webp',  // +X (right)
            'skyboxes/anime/left.webp',   // -X (left)
            'skyboxes/anime/top.webp',    // +Y (top)
            'skyboxes/anime/bottom.webp', // -Y (bottom)
            'skyboxes/anime/front.webp',  // +Z (front)
            'skyboxes/anime/back.webp'    // -Z (back)
        ]).then(texture => {
            this.scene.background = texture;
        });

        const bushesPromise = generateBushes(100, 100);
        const rocksPromise = loadRocks(10, 100);
        const grassPromise = generateGrass(500000, 100);

        await Promise.all([playerModelPromise, skyboxPromise, bushesPromise, houseModelPromise, rocksPromise, grassPromise]);
        this.scene.add(this.playerModel);
        this.scene.add(this.houseModel);
        this.scene.add(mesh);
    }

}
