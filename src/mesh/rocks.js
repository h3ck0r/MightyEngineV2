import { globals } from '../core/globals.js';
import { mergeGeometries } from '../imports/imports.js';

import { loadModel } from '../utils/modelLoader.js';

export async function loadRocks(grassFieldSize=100) {
    const rocks = await loadModel('./models/rocks.glb');

    rocks.children.forEach(child => {
        
        for (let i = 0; i < 10; i++) {
            
            const clonedRock = child.clone();

            
            clonedRock.position.set(
                Math.random() * grassFieldSize - grassFieldSize / 2, 
                0, 
                Math.random() * grassFieldSize - grassFieldSize / 2 
            );

            globals.gameScene.scene.add(clonedRock);
            
        }
    });

    
}
