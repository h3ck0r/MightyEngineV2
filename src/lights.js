import * as THREE from 'three';
import { globals } from './globals';

export function setupLights() {
    let light = new THREE.DirectionalLight(0xffffff, 2);
    light.castShadow = true;
    light.scale.set(new THREE.Vector3(10, 10, 10));
    light.target = globals.playerCat;
    const shadowCamera = light.shadow.camera;
    const size = 10;
    shadowCamera.left = -size;
    shadowCamera.right = size;
    shadowCamera.top = size;
    shadowCamera.bottom = -size;
    shadowCamera.near = 0.1;
    shadowCamera.far = 100;
    shadowCamera.updateProjectionMatrix();


    globals.light = { directionalGlobalLight: light };
    globals.scene.add(light);

    light = new THREE.HemisphereLight();
    globals.scene.add(light);
}
