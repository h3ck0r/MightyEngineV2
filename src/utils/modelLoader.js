

import { AnimationMixer } from 'three';
import { globals } from '../core/globals';


export function loadModel(url) {
    return new Promise((resolve, reject) => {

        globals.loader.load(
            url,
            (gltf) => {

                const animations = gltf.animations;
                const model = gltf.scene;
                let mixer = null;

                if (animations && animations.length > 0) {
                    mixer = new AnimationMixer(model);
                    globals.mixers.push({ mixer, model, animations });

                }
                model.traverse(node => {
                    if (node.isMesh)
                        node.castShadow = true;
                });
                globals.gameScene.scene.add(model);
                resolve(model);
            },
            undefined,
            (error) => reject(error)
        );
    });
}
