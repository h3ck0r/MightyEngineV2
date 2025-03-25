import { Pane } from 'tweakpane';
import * as THREE from 'three/webgpu';
import { globals } from '../core/globals';
import Stats from 'three/examples/jsm/libs/stats.module'

export class Debug {
    constructor() {
        globals.isDebug = location.hash.indexOf('debug') !== -1;

        this.renderer = globals.renderer;
        if (globals.isDebug) {
            this.pane = new Pane({

            });
            this.addPlayerInfo();
            this.addGraphicsControls();
            this.addGridHelper();
            this.addHemisphereLightControls();
            this.addGlobalLightControls();
            globals.stats = Stats();
            document.body.appendChild(globals.stats.dom);
        }
    }
    addPlayerInfo() {
        const folder = this.pane.addFolder(
            {
                title: 'Player Position',
            }
        );
        const playerPosition = globals.gameScene.playerModel.position;

        folder.addBinding(playerPosition, 'x', {
            readonly: true,
        });
        folder.addBinding(playerPosition, 'y', {
            readonly: true,
        });
        folder.addBinding(playerPosition, 'z', {
            readonly: true,
        });
    }
    addGlobalLightControls() {
        const folder = this.pane.addFolder(
            {
                title: 'Global Light',
            }
        );
        let PARAMS = {
            offset: { x: 0, y: 0 },
        };

        folder.addBinding(PARAMS, 'offset', {
            picker: 'inline',
        }).on('change', (e) => {
            const { x, y } = e.value;
            globals.light.globalOffset.x = x;
            globals.light.globalOffset.y = y;
        });
        PARAMS = {
            topColor: '#9ec3ff',
        };

        folder.addBinding({ globalLightColor: "#ffe89e" }, 'globalLightColor', {
            picker: 'inline',
        }).on('change', (e) => {
            const hexColor = e.value.replace('#', '');
            const colorValue = parseInt(hexColor.substring(0, 6), 16);

            globals.light.directionalGlobalLight.color = new THREE.Color(colorValue);
        });

        folder.addBinding(PARAMS, 'topColor', {
            picker: 'inline',
        }).on('change', (e) => {
            const hexColor = e.value.replace('#', '');
            const colorValue = parseInt(hexColor.substring(0, 6), 16);

            globals.light.hemisphere.color = new THREE.Color(colorValue);
        });

        PARAMS = {
            bottomColor: '#ffed7a',
        };
        folder.addBinding(PARAMS, 'bottomColor', {
            picker: 'inline',
        }).on('change', (e) => {
            const hexColor = e.value.replace('#', '');
            const colorValue = parseInt(hexColor.substring(0, 6), 16);

            globals.light.hemisphere.groundColor = new THREE.Color(colorValue);
        });

        folder.expanded = false;
    }
    addGridHelper() {
        const gridHelper = new THREE.GridHelper(1000, 1000);
        gridHelper.receiveShadow = true;
        globals.gameScene.scene.add(gridHelper);
        const shadowHelper = new THREE.CameraHelper(globals.light.directionalGlobalLight.shadow.camera);
        globals.gameScene.scene.add(shadowHelper);
    }
    addGraphicsControls() {
        const folder = this.pane.addFolder(
            {
                title: 'Graphics Settings',
            }
        );

        folder.addBinding({ pixelRatio: 'auto', }, 'pixelRatio', {
            options: {
                auto: 'auto',
                '1/2': 0.5,
                '4/5': 0.8,
                '1': 1,
                '1.5': 1.5,
                '2': 2,
            }
        }).on('change', (e) => {

            if (e.value === 'auto') {
                globals.renderer.setPixelRatio(window.devicePixelRatio);
            }
            else {
                this.renderer.setPixelRatio(e.value);
            }
        });

        folder.addBinding({ tone: THREE.AgXToneMapping, }, 'tone', {
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

        folder.addBinding({ shadowMapSize: 1024, }, 'shadowMapSize', {
            options: {
                '512': 512,
                '1024': 1024,
                '2048': 2048,
                '4096': 4096,
                '8192': 8192,
            }
        }).on('change', (e) => {

            light.shadow.mapSize.width = globals.shadow.mapSize.width;
            light.shadow.mapSize.height = globals.shadow.mapSize.height;
        });
        folder.expanded = false;
    }
    addHemisphereLightControls() {


    }
}
