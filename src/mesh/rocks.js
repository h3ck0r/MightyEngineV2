import { globals } from '../core/globals.js';
import { mergeGeometries } from '../imports/imports.js';

import { loadModel } from '../utils/modelLoader.js';

export async function loadRocks(count, maxRange =100) {
    const rocks = await loadModel('./models/rocks.glb');

    rocks.children.forEach(child => {
        
        for (let i = 0; i < count; i++) {
            
            const clonedRock = child.clone();

            clonedRock.position.set(
                Math.random() * (maxRange + maxRange) - maxRange - 20, 
                0, 
                Math.random() * (maxRange + maxRange) - maxRange - 20 
            );

            globals.gameScene.scene.add(clonedRock);
            
        }
    });

    
}
