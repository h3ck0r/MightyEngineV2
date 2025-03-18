import { globals } from "./globals";

export function loadModel(url) {
    return new Promise((resolve, reject) => {
        globals.loader.load(
            url,
            (gltf) => {
                globals.scene.add(gltf.scene);
                resolve();
            },
            undefined,
            (error) => reject(error)
        );
    });
}
