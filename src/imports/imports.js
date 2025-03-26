import * as THREE from 'three/webgpu';
import { AnimationMixer } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { uv, sin, Fn, texture, mix, smoothstep, uniform, time, vec3, mod, vec2, normalWorld, positionWorld, color, positionLocal } from 'three/tsl';
import { Pane } from 'tweakpane';
import Stats from 'three/examples/jsm/libs/stats.module'

export {
    THREE,
    Pane,
    Stats,
    AnimationMixer,
    MeshoptDecoder,
    KTX2Loader,
    PointerLockControls,
    mergeGeometries,
    uv,
    sin,
    Fn,
    texture,
    time,
    vec3,
    mod,
    vec2,
    mix,
    normalWorld,
    positionWorld,
    color,
    positionLocal,
    uniform,
    smoothstep
};