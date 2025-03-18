import { globals } from "./globals";

export function setupMovement(){
    document.addEventListener('keydown', (event) => onKeyDown(event));
    document.addEventListener('keyup', (event) => onKeyUp(event));
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW': globals.camera.moveForward = true; break;
        case 'KeyS': globals.camera.moveBackward = true; break;
        case 'KeyA': globals.camera.moveLeft = true; break;
        case 'KeyD': globals.camera.moveRight = true; break;
        case 'Space': globals.camera.moveUp = true; break;
        case 'ShiftLeft': globals.camera.speedUp = true; break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW': globals.camera.moveForward = false; break;
        case 'KeyS': globals.camera.moveBackward = false; break;
        case 'KeyA': globals.camera.moveLeft = false; break;
        case 'KeyD': globals.camera.moveRight = false; break;
        case 'Space': globals.camera.moveUp = false; break;
        case 'ShiftLeft': globals.camera.speedUp = false; break;
    }
}
export function updateMovement(delta) {

    globals.camera.direction.set(0, 0, 0);

    if (globals.camera.moveForward) globals.camera.direction.z = -1;
    if (globals.camera.moveBackward) globals.camera.direction.z = 1;
    if (globals.camera.moveLeft) globals.camera.direction.x = -1;
    if (globals.camera.moveRight) globals.camera.direction.x = 1;
    if (globals.camera.moveUp) globals.camera.direction.y = 1;
    if (globals.camera.speedUp) globals.camera.movementSpeed = globals.camera.baseMovementSpeed * 3;
    else globals.camera.movementSpeed = globals.camera.baseMovementSpeed ;
    const speed = globals.camera.movementSpeed * delta;

    globals.camera.direction.normalize();
    globals.camera.camera.translateX(globals.camera.direction.x * speed);
    globals.camera.camera.translateY(globals.camera.direction.y * speed);
    globals.camera.camera.translateZ(globals.camera.direction.z * speed);
}
