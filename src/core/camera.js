import { THREE } from "../imports/imports";
import { globals } from "./globals";

export class Camera {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.25, 50);
        this.camera.far = 120;
        this.direction = new THREE.Vector3();
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.speedUp = false;
    }
}