import * as THREE from 'three';
import { globals } from './globals';

export function setupLights() {
    const light = new THREE.HemisphereLight();
    globals.scene.add(light);
    const dirLight = new THREE.DirectionalLight(0xfff9ea, 4);
    dirLight.position.set(2, 5, 2);
    globals.scene.add(dirLight);
}
