import * as THREE from 'three';
import { globals } from './globals';

export function setupLights() {
    let light = new THREE.DirectionalLight(0xffe89e, 2);
    light.position.set(new THREE.Vector3(0, 0, 0));
    light.castShadow = true;
    light.scale.set(new THREE.Vector3(10, 10, 10));
    light.target = globals.playerModel;

    const shadowCamera = light.shadow.camera;
    const size = globals.shadow.size;
    shadowCamera.left = -size;
    shadowCamera.right = size;
    shadowCamera.top = size;
    shadowCamera.bottom = -size;
    shadowCamera.near = 0.1;
    shadowCamera.far = 100;
    shadowCamera.updateProjectionMatrix();
    light.shadow.mapSize.width = globals.shadow.mapSize.width; 
    light.shadow.mapSize.height = globals.shadow.mapSize.height;


    globals.light = { directionalGlobalLight: light };
    globals.scene.add(light);

    light = new THREE.HemisphereLight();
    globals.scene.add(light);
}
