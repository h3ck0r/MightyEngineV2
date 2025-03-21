import * as THREE from 'three/webgpu';
import { globals } from "./globals";
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export class Inputs {

    constructor(renderer) {
        this.renderer = renderer;
        this.rotationReturnSpeed = 0.02;
        this.isLooking = false;
        this.setupControls();
        this.setupMovement();
        this.zoomAmount = 20;
        this.maxZoom = 40;
        this.minZoom = 5;
    }

    setupControls() {
        this.topLook = location.hash.indexOf('topcontrol') !== -1;
        if (this.topLook) {
            globals.camera.camera.position.set(10, 20, 0);
            globals.camera.camera.rotation.set(-Math.PI / 2, 0, 0);
            globals.controls = new PointerLockControls(globals.camera.camera, globals.renderer.domElement);
        } else {
            globals.controls = new PointerLockControls(globals.camera.camera, globals.renderer.domElement);
        }
    }

    setupMovement() {
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
        window.addEventListener('wheel', (event) => this.onWheel(event));
    }
    onWheel(event) {
        this.zoomAmount += event.deltaY * 0.1;
        const xZoomVal = globals.playerCat.position.x + this.zoomAmount;
        const yZoomVal = globals.playerCat.position.y + this.zoomAmount;
        if (xZoomVal < 5 || yZoomVal < 5) {
            this.zoomAmount = this.minZoom;
        }
        if (xZoomVal > this.maxZoom || yZoomVal > this.maxZoom) {
            this.zoomAmount = this.maxZoom;
        }
    }
    onKeyDown(event) {
        switch (event.code) {
            case 'KeyW': globals.camera.moveForward = true; break;
            case 'KeyS': globals.camera.moveBackward = true; break;
            case 'KeyA': globals.camera.moveLeft = true; break;
            case 'KeyD': globals.camera.moveRight = true; break;
            case 'Space': globals.camera.moveUp = true; break;
            case 'ShiftLeft': globals.camera.speedUp = true; break;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case 'KeyW': globals.camera.moveForward = false; break;
            case 'KeyS': globals.camera.moveBackward = false; break;
            case 'KeyA': globals.camera.moveLeft = false; break;
            case 'KeyD': globals.camera.moveRight = false; break;
            case 'Space': globals.camera.moveUp = false; break;
            case 'ShiftLeft': globals.camera.speedUp = false; break;
        }
    }

    updateMovement(delta) {
        if (this.topLook) {
            globals.camera.direction.set(0, 0, 0);
            let moveDirection = new THREE.Vector3(0, 0, 0);

            if (globals.camera.moveForward) moveDirection.z = -1;
            if (globals.camera.moveBackward) moveDirection.z = 1;
            if (globals.camera.moveLeft) moveDirection.x = -1;
            if (globals.camera.moveRight) moveDirection.x = 1;
            if (globals.camera.moveUp) moveDirection.y = 1;

            globals.camera.movementSpeed = globals.camera.baseMovementSpeed * (globals.camera.speedUp ? globals.camera.fastSpeed : 1);
            const speed = globals.camera.movementSpeed * delta;

            globals.playerCat.position.x += moveDirection.x * speed;
            globals.playerCat.position.y += moveDirection.y * speed;
            globals.playerCat.position.z += moveDirection.z * speed;


            const directionalLightPosition = new THREE.Vector3(
                globals.playerCat.position.x + 10,
                globals.playerCat.position.y + 10,
                globals.playerCat.position.z + 20
            )
            globals.light.directionalGlobalLight.position.copy(directionalLightPosition);
            const targetCameraPosition = new THREE.Vector3(
                Math.max(Math.min(globals.playerCat.position.x + this.zoomAmount, this.maxZoom),this.minZoom),
                Math.max(Math.min(globals.playerCat.position.y + this.zoomAmount, this.maxZoom),this.minZoom),
                globals.playerCat.position.z + 10
            );

            globals.camera.camera.position.lerp(targetCameraPosition, 0.01);
            globals.camera.camera.lookAt(globals.playerCat.position);
        }
        else {
            globals.camera.direction.set(0, 0, 0);

            if (globals.camera.moveForward) globals.camera.direction.z = -1;
            if (globals.camera.moveBackward) globals.camera.direction.z = 1;
            if (globals.camera.moveLeft) globals.camera.direction.x = -1;
            if (globals.camera.moveRight) globals.camera.direction.x = 1;
            if (globals.camera.moveUp) globals.camera.direction.y = 1;

            globals.camera.movementSpeed = globals.camera.baseMovementSpeed * (globals.camera.speedUp ? globals.camera.fastSpeed : 1);
            const speed = globals.camera.movementSpeed * delta;

            globals.camera.direction.normalize();
            globals.camera.camera.translateX(globals.camera.direction.x * speed);
            globals.camera.camera.translateY(globals.camera.direction.y * speed);
            globals.camera.camera.translateZ(globals.camera.direction.z * speed);
        }
    }
}
