import * as THREE from 'three/webgpu';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { uv, sin, texture, time, vec3, mod, vec2, normalWorld, positionWorld, color, positionLocal } from 'three/tsl';
import { mx_noise_vec3 } from 'three/src/nodes/TSL.js';

import { globals } from '../core/globals';

export async function generateBush() {
    const highLeavesCount = 100;
    const createLeaves = (leafCount) => {
        const planes = [];
        for (let i = 0; i < leafCount; i++) {
            const plane = new THREE.PlaneGeometry(1, 1);
            planes.push(plane);

            const scaleX = Math.random() * 0.5 + 1; 
            const scaleY = Math.random() * 0.5 + 1;
            const scaleZ = Math.random() * 0.5 + 1;
            plane.scale(scaleX, scaleY, scaleZ);
            
            const sphericalPosition = new THREE.Spherical(
                1 - Math.pow(Math.random(), 3)*0.1,
                Math.PI * 2 * Math.random(),
                Math.PI * Math.random()
            );
            const position = new THREE.Vector3().setFromSpherical(sphericalPosition);
            plane.rotateX(Math.random() * 99999);
            plane.rotateY(Math.random() * 99999);
            plane.rotateZ(Math.random() * 99999);
            plane.translate(
                position.x,
                position.y,
                position.z
            );

            const normal = position.clone().normalize();
            const normalArray = new Float32Array(12);
            for (let i = 0; i < 4; i++) {
                const i3 = i * 3;
                const position = new THREE.Vector3(
                    plane.attributes.position.array[i3],
                    plane.attributes.position.array[i3 + 1],
                    plane.attributes.position.array[i3 + 2],
                )
                const mixedNormal = position.lerp(normal, 0.4);

                normalArray[i3] = mixedNormal.x;
                normalArray[i3 + 1] = mixedNormal.y;
                normalArray[i3 + 2] = mixedNormal.z;
            }
            plane.setAttribute('normal', new THREE.BufferAttribute(normalArray, 3));
        }
        return mergeGeometries(planes);
    };
    const highLeavesGeometry = createLeaves(highLeavesCount);

    const textureLoader = new THREE.TextureLoader();
    const alphaMap = await textureLoader.loadAsync('/textures/bushAlpha.webp');

    const material = new THREE.MeshStandardMaterial({
        color: 0xbdeb34,
        // side: THREE.DoubleSide,
        alphaMap: alphaMap,
        transparent: true,
        opacity: 1.0,
        alphaTest: 0.1,
        depthTest: true,
        depthWrite: false,
    });
    const perlinUV = positionWorld.xz.mul(1).add(sin(time).mul(0.2));
    const perlinColor = texture(globals.noiseTexture, perlinUV).sub(0.5).mul(positionWorld.y);
    material.positionNode = positionLocal.add(vec3(perlinColor.r, 0, perlinColor.r));

    const lod = new THREE.LOD();

    const highLODMesh = new THREE.Mesh(highLeavesGeometry, material);
    highLODMesh.castShadow = true;
    highLODMesh.shadowBias = 0.05;
    highLODMesh.position.set(0, 1, 0);

    const lowLODObject = new THREE.Object3D(); 
    lod.addLevel(lowLODObject, 70);
    lod.addLevel(highLODMesh, 0);

    
    return highLODMesh;
}
export async function generateBushes() {
    const bushPrototype = await generateBush();
    const count = 400;
    const range = 100;

    const bushGeometry = bushPrototype.geometry;
    const bushMaterial = bushPrototype.material;
    const instancedMesh = new THREE.InstancedMesh(bushGeometry, bushMaterial, count);

    const matrix = new THREE.Matrix4();

    for (let i = 0; i < count; i++) {
        const x = Math.random() * range - range / 2;
        const z = Math.random() * range - range / 2;
        const y = 1 - (Math.random() * 0.5);

        const rotationX = Math.random() * Math.PI * 2;
        const rotationY = Math.random() * Math.PI * 2;
        const rotationZ = Math.random() * Math.PI * 2;

        const scale = Math.random() * 0.5 + 0.5;

        matrix.identity();
        matrix.rotationX = rotationX;
        matrix.rotationY = rotationY;
        matrix.rotationZ = rotationZ;
        matrix.makeRotationX(rotationX);
        matrix.makeRotationY(rotationY);
        matrix.makeRotationZ(rotationZ);
        matrix.setPosition(x, y, z);

        matrix.scale(new THREE.Vector3(scale, scale, scale));

        instancedMesh.setMatrixAt(i, matrix);
    }

    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;
    globals.gameScene.scene.add(instancedMesh);
}