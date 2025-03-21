import { globals } from "./globals";

export function loadModel(url) {
    return new Promise((resolve, reject) => {
        globals.loader.load(
            url,
            (gltf) => {
                gltf.scene.traverse(node => {
                    if(node.isMesh)
                        node.castShadow = true;
                })
                globals.scene.add(gltf.scene);
                resolve(gltf.scene);
            },
            undefined,
            (error) => reject(error)
        );
    });
}
