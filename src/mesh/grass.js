import { THREE, uniform, smoothstep, Fn, mix, mergeGeometries, uv, sin, texture, time, vec3, mod, vec2, normalWorld, positionWorld, color, positionLocal } from '../imports/imports';

import { globals } from '../core/globals';


export async function generateGrass(count = 1000000, maxRange = 100) {
    const grassGeometry = new THREE.PlaneGeometry(3, 1.5);
    const alphaMap = new THREE.TextureLoader().load('textures/grassAlpha.webp');
    const grassMaterial = new THREE.MeshStandardMaterial({
        alphaMap: alphaMap,
        // transparent: true,
        // opacity: 1.0,
        side: THREE.DoubleSide,
        alphaTest: 0.05,
        depthWrite: true,
        depthTest: true,
    });
    const bottomColor = new THREE.Color(0x8fc906);
    const middleColor = new THREE.Color(0x6ee657);
    const topColor = new THREE.Color(0xdbffd4);

    const middleBlend = smoothstep(0.0, 0.5, positionWorld.y);

    const topBlend = smoothstep(0.5, 1.0, positionWorld.y);

    grassMaterial.colorNode = mix(
        mix(bottomColor, middleColor, middleBlend),
        mix(middleColor, topColor, topBlend),
        smoothstep(0.0, 1.0, positionWorld.y)
    );

    const instancedMesh = new THREE.InstancedMesh(grassGeometry, grassMaterial, count);
    const matrix = new THREE.Matrix4();
    const tempQuaternion = new THREE.Quaternion();
    const tempPosition = new THREE.Vector3();
    const tempScale = new THREE.Vector3(1, 1, 1);
    for (let i = 0; i < count; i++) {
        const x = Math.random() * (maxRange + maxRange) - maxRange - 20;
        const z = Math.random() * (maxRange + maxRange) - maxRange - 20;

        const randomScale = Math.random() * 0.5 + 0.75;
        tempPosition.set(x, 0, z);
        tempScale.set(randomScale, randomScale, randomScale);

        const randomRotation = Math.random() * Math.PI * 2; 
        tempQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), randomRotation); 

        matrix.compose(tempPosition, tempQuaternion, tempScale);
        instancedMesh.setMatrixAt(i, matrix);
    }


    instancedMesh.instanceMatrix.needsUpdate = true;
    instancedMesh.receiveShadow = true;

    globals.gameScene.scene.add(instancedMesh);
}

export function updateGrassPosition(grassMesh) {
    // cameraPos.value.copy(globals.camera.camera.position);
    // grassMesh.position.set(globals.gameScene.playerModel.position.x, 0, globals.gameScene.playerModel.position.z);
}
