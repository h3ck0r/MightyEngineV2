import * as THREE from 'three/webgpu';
import { mix, positionWorld, cross, dot, normalize, If, smoothstep, float, hash, mod, Loop, mul, Fn, vec3, add, uniform, sin, time, texture, positionLocal, fract, mat3, sub, modelViewMatrix, length } from 'three/tsl';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { globals } from '../core/globals';
import { generateNoiseTexture } from '../utils/noise';


const cameraPos = uniform(globals.camera.camera.position);

export function generateGrass(size = 1000, maxRange = 20) {
    const coordinates = [];
    const grasses = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const x = Math.random() * (maxRange + maxRange) - maxRange;
            const z = Math.random() * (maxRange + maxRange) - maxRange;

            const grassGeometry = new THREE.BufferGeometry();
            grasses.push(grassGeometry);

            const bladeHeight = Math.random() + 0.2;
            const vertices = new Float32Array([
                0, 0, 0,
                0, bladeHeight, 0,
                0.07, bladeHeight * 0.8, 0,
            ]);

            grassGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

            const positionAttribute = grassGeometry.getAttribute('position');

            const yAngle = Math.random() * Math.PI * 2;
            const tiltAngle = (Math.random() * 0.4) - 0.2;

            const rotationMatrix = new THREE.Matrix4();
            rotationMatrix.makeRotationY(yAngle);
            const tiltMatrix = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(Math.cos(yAngle), 0, Math.sin(yAngle)),
                tiltAngle
            );
            rotationMatrix.multiply(tiltMatrix);

            for (let k = 0; k < positionAttribute.count; k++) {
                const vertex = new THREE.Vector3(
                    positionAttribute.getX(k),
                    positionAttribute.getY(k),
                    positionAttribute.getZ(k)
                );

                vertex.applyMatrix4(rotationMatrix);

                // Apply position after rotation
                positionAttribute.setXYZ(k, vertex.x + x, vertex.y, vertex.z + z);
            }

            row.push({ x, z });
        }
        coordinates.push(row);
    }
    const grassMaterial = new THREE.MeshStandardNodeMaterial({
        
    });
    grassMaterial.colorNode = mix(
        new THREE.Color(0x162100),
        new THREE.Color(0xa8fc0d),
        smoothstep(0.0, 1.0, positionWorld.y)
    );

    const billboard = Fn(() => {
        const localPos = positionLocal.toVar();
        const worldPos = positionWorld.toVar();
        const toCamera = normalize(sub(cameraPos, worldPos));
        const up = vec3(0.0, 1.0, 0.0);
        const right = normalize(cross(up, toCamera));
        const trueUp = cross(toCamera, right);

        const rotationMatrix = mat3(
            right,
            trueUp,
            toCamera
        );
        const scaleVec = vec3(
            length(vec3(modelViewMatrix[0].x, modelViewMatrix[0].y, modelViewMatrix[0].z)),
            length(vec3(modelViewMatrix[1].x, modelViewMatrix[1].y, modelViewMatrix[1].z)),
            length(vec3(modelViewMatrix[2].x, modelViewMatrix[2].y, modelViewMatrix[2].z))
        );
        const rotatedPos = mul(rotationMatrix, mul(localPos, scaleVec));

        return add(worldPos, rotatedPos);
    });

    // grassMaterial.positionNode = billboard();
    const grassMesh = new THREE.Mesh(mergeGeometries(grasses), grassMaterial);

    return { grassMesh, coordinates };
}



export function updateGrassPosition(grassMesh) {
    cameraPos.value.copy(globals.camera.camera.position);
    // grassMesh.position.set(globals.gameScene.playerModel.position.x, 0, globals.gameScene.playerModel.position.z);
}
