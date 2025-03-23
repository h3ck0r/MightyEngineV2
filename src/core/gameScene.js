import { playAnimation } from '../utils/animation.js'
import { globals } from './globals.js';
import { loadModel } from '../utils/modelLoader.js';
import { generateBush } from '../mesh/bush.js';

export class GameScene {
    constructor(scene){
        this.scene = scene;
        this.bushes = [];
        this.playerModel = null;
    }
    async loadScene() {
        await loadModel('./public/models/playerModel.glb').then(model => {
            globals.playerModel = model;
            playAnimation(globals.playerModel, 'LongIdle');
        });
        const bushPrototype = generateBush();
        const count = 100;
        const range = 100;
        for (let i = 0; i < count; i++) {
            const bushClone = bushPrototype.clone();
            bushClone.rotation.set(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );
            const scale = Math.random() * 0.5 + 0.5;
            bushClone.scale.set(scale, scale, scale);

            const x = Math.random() * range - range / 2;
            const z = Math.random() * range - range / 2;
            let y = 1;
            y -= scale * 0.5;

            bushClone.position.set(x, y, z);
            globals.scene.add(bushClone);
        }
    }
}
