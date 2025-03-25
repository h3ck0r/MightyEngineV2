import * as THREE from 'three/webgpu';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import { globals } from './globals.js';
import { playAnimation } from '../utils/animation.js';

export class Inputs {
    constructor() {
        this.zoomAmount = 10;
        this.isLooking = false;
        this.isWalking = false;
        this.isRotating = false;
        this.movementControl = this.topControl;
        this.currentAnimation = 'LongIdle';
        this.lastInputTime = Date.now();
        this.longIdleTimeout = 2000;
        this.setupControls();
        this.setupMovement();
    }

    setupControls() {
        this.directLook = location.hash.indexOf('direct') !== -1;
        if (this.directLook) {
            this.movementControl = this.fpsControl;
            globals.controls = new PointerLockControls(globals.camera.camera, globals.renderer.domElement);

        } else {
            globals.camera.camera.position.set(0, 10, 20);
            globals.camera.camera.rotation.set(-Math.PI / 2, 0, 0);
            this.movementControl = this.topControl;

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
        const yZoomVal = globals.gameScene.playerModel.position.y + this.zoomAmount;
        if (yZoomVal < globals.movement.minZoom) {
            this.zoomAmount = globals.movement.minZoom;
        }
        if (yZoomVal > globals.movement.maxZoom) {
            this.zoomAmount = globals.movement.maxZoom;
        }
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'KeyW':
                globals.camera.moveForward = true;
                break;
            case 'KeyS': globals.camera.moveBackward = true; break;
            case 'KeyA': globals.camera.moveLeft = true; break;
            case 'KeyD': globals.camera.moveRight = true; break;
            case 'Space': globals.camera.moveUp = true; break;
            case 'ShiftLeft': globals.camera.speedUp = true; break;
        }
        this.lastInputTime = Date.now();
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
        this.lastInputTime = Date.now();
    }

    updateMovement(delta) {
        let moveDirection = new THREE.Vector3(0, 0, 0);
        let isMoving = false;


        if (globals.camera.moveLeft) {
            globals.gameScene.playerModel.rotation.y += globals.movement.rotationSpeed;

        }
        if (globals.camera.moveRight) {
            globals.gameScene.playerModel.rotation.y -= globals.movement.rotationSpeed;

        }


        const rotationQuaternion = globals.gameScene.playerModel.rotation instanceof THREE.Euler
            ? new THREE.Quaternion().setFromEuler(globals.gameScene.playerModel.rotation)
            : globals.gameScene.playerModel.rotation;


        if (globals.camera.moveForward) {
            let forward = new THREE.Vector3(0, 0, -1.5).applyQuaternion(rotationQuaternion);
            moveDirection.lerp(forward, 0.9);
            isMoving = true;
            if (globals.camera.speedUp && this.currentAnimation !== 'Run') {
                playAnimation(globals.gameScene.playerModel, 'Run', 0.3);
                this.currentAnimation = 'Run';
            }
            else if (!globals.camera.speedUp && this.currentAnimation !== 'Walk') {
                playAnimation(globals.gameScene.playerModel, 'Walk', 0.3);
                this.currentAnimation = 'Walk';
            }
        }
        else if (globals.camera.moveBackward) {
            let backward = new THREE.Vector3(0, 0, 0.4).applyQuaternion(rotationQuaternion);
            moveDirection.add(backward);
            isMoving = true;
            if (this.currentAnimation !== 'WalkBack') {
                playAnimation(globals.gameScene.playerModel, 'WalkBack', 0.3);
                this.currentAnimation = 'WalkBack';
            }
        }

        if (!isMoving) {
            if (Date.now() - this.lastInputTime > this.longIdleTimeout) {
                if (this.currentAnimation !== 'LongIdle') {
                    playAnimation(globals.gameScene.playerModel, 'LongIdle', 0.3);
                    this.currentAnimation = 'LongIdle';
                }
            }
            else if (this.currentAnimation !== 'Idle') {
                playAnimation(globals.gameScene.playerModel, 'Idle', 0.3);
                this.currentAnimation = 'Idle';
            }

        }


        this.movementControl(moveDirection, delta);
    }



    topControl(moveDirection, delta) {
        const speed = globals.camera.speedUp ? globals.movement.fastSpeed : globals.movement.movementSpeed;

        globals.gameScene.playerModel.position.x += moveDirection.x * speed * delta;
        globals.gameScene.playerModel.position.y += moveDirection.y * speed * delta;
        globals.gameScene.playerModel.position.z += moveDirection.z * speed * delta;

        const directionalLightPosition = new THREE.Vector3(
            globals.gameScene.playerModel.position.x + 20 + globals.light.globalOffset.x,
            globals.gameScene.playerModel.position.y + 20 + globals.light.globalOffset.y,
            globals.gameScene.playerModel.position.z + 10 + globals.light.globalOffset.z
        );
        globals.light.directionalGlobalLight.position.copy(directionalLightPosition);
        const targetCameraPosition = new THREE.Vector3(
            globals.gameScene.playerModel.position.x + this.zoomAmount,
            globals.gameScene.playerModel.position.y + this.zoomAmount,
            globals.gameScene.playerModel.position.z + 10
        );
        globals.camera.camera.position.lerp(targetCameraPosition, 0.01);
        globals.camera.camera.lookAt(globals.gameScene.playerModel.position);
    }

    fpsControl(moveDirection, speed) {
        globals.camera.direction.normalize();
        globals.camera.camera.translateX((globals.camera.direction.x + moveDirection.x) * speed);
        globals.camera.camera.translateY((globals.camera.direction.y + moveDirection.y) * speed);
        globals.camera.camera.translateZ((globals.camera.direction.z + moveDirection.z) * speed);

    }
}
