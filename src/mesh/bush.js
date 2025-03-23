import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three/webgpu';

export function generateBush() {
    const leavesCount = 100;
    const planes = [];
    for (let i = 0; i < leavesCount; i++) {
        const plane = new THREE.PlaneGeometry(1, 1);
        planes.push(plane);

        const sphericalPosition = new THREE.Spherical(
            1 - Math.pow(Math.random(), 3),
            Math.PI * 2 * Math.random(),
            Math.PI * Math.random()
        )
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
    const geometry = mergeGeometries(planes);

    const textureLoader = new THREE.TextureLoader();
    const alphaMap = textureLoader.load('/textures/bushAlpha.webp');

    const material = new THREE.MeshStandardMaterial({
        color: 0xbdeb34,
        side: THREE.DoubleSide,
        alphaMap: alphaMap,
        transparent: true,
        opacity: 1.0,
        alphaTest: 0.1,
        depthTest: true,
        depthWrite: false,
    });

    const bushMesh = new THREE.Mesh(geometry, material);
    bushMesh.castShadow = true;
    bushMesh.position.set(0, 1, 0);
    return bushMesh;
}