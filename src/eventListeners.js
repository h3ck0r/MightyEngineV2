import { globals } from "./globals";

export function setupEventListeners(renderer, controls) {
    renderer.domElement.addEventListener("click", () => {
        renderer.domElement.requestPointerLock();
    });

    window.addEventListener('resize', () => {
        globals.camera.camera.aspect = window.innerWidth / window.innerHeight;
        globals.camera.camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
