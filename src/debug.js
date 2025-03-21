import { Pane } from 'tweakpane';
import * as THREE from 'three/webgpu';
import { globals } from './globals';
import Stats from 'three/examples/jsm/libs/stats.module'

export class Debug {
    constructor() {
        globals.isDebug = location.hash.indexOf('debug') !== -1;

        this.renderer = globals.renderer;
        if (globals.isDebug) {
            this.pane = new Pane({

            });
            this.addToneMappingControls();
            this.addGridHelper();
            globals.stats = Stats();
            document.body.appendChild(globals.stats.dom);
        }
    }
    addPlayerInfo() {

    }
    addGridHelper() {
        const gridHelper = new THREE.GridHelper(100, 100);
        gridHelper.receiveShadow = true;
        globals.scene.add(gridHelper);
        const shadowHelper = new THREE.CameraHelper(globals.light.directionalGlobalLight.shadow.camera);
        globals.scene.add(shadowHelper);
    }
    addToneMappingControls() {
        const folder = this.pane.addFolder(
            {
                title: 'Graphics Settings',
                collapsed: true
            }
        );

        folder.addBinding({ tone: THREE.CineonToneMapping, }, 'tone', {
            options: {
                'None': THREE.NoToneMapping,
                'Linear': THREE.LinearToneMapping,
                'Reinhard': THREE.ReinhardToneMapping,
                'Cineon': THREE.CineonToneMapping,
                'AgX': THREE.AgXToneMapping,
                'Neutral': THREE.NeutralToneMapping,
                'ACES': THREE.ACESFilmicToneMapping,
            }
        }).on('change', (e) => {

            this.renderer.toneMapping = e.value;
        });
    }
}
