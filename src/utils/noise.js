import * as THREE from 'three/webgpu';

import { ImprovedNoise } from 'three/examples/jsm/Addons.js';

export function generateNoiseTexture(size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    const noise = new ImprovedNoise();
    let seed = Math.random() * 100;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let value = noise.noise(x / 32, y / 32, seed);
            value = (value + 1) / 2;
            const index = (x + y * size) * 4;
            data[index] = data[index + 1] = data[index + 2] = value * 255;
            data[index + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(canvas);
}