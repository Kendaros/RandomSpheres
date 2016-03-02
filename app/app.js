import Dat from 'dat-gui';
import NumberUtils from './utils/number-utils';
import Scene from './scene/scene';

import cubeVS from './shaders/cube/cube.vert';
import cubeFS from './shaders/cube/cube.frag';


class App {

    constructor() {

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new Scene();
        this.container = new THREE.Object3D();//create an empty container

        let root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.domElement);


        for (var i = 0; i < 10; i ++) {
            this.addSphere();
        }

        this.scene.add(this.container);

        //this.addPointLight();

        this.addAmbientLight();
        this.addDirectionalLight();

        this.addListeners();


    }

    /**
     * addListeners
     */
    addListeners() {

        window.addEventListener('resize', this.onResize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this));

    }

    /**
     * Add cube to the scene
     */
    addCube() {

        const uniforms = {
            u_time: {type: 'f', value: '1.0'},
            u_resolution: {type: 'v2', value: new THREE.Vector2(0, 0)}
        };

        const geometry = new THREE.BoxGeometry( 20, 20, 20 );

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: cubeVS(),
            fragmentShader: cubeFS()
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(Math.random() * 500, Math.random() * 500, Math.random() * 500);

        this.cubeContainer.add(this.mesh);

    }

    /**
     * Add sphere to the scene
     */
    addSphere() {

        const geometry = new THREE.SphereGeometry (100, 20, 20);

        let random = Math.random();

        if (random < .3 ) {
            this.sphereColor = 0xCC0000;
        } else if (random < .6 && random ) {
            this.sphereColor = 0xFFFFFF;
        } else {
            this.sphereColor = 0x2E2E2E;
        }

        const material = new THREE.MeshPhongMaterial(
            {
                color: this.sphereColor
            });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(NumberUtils.getRandomArbitrary(-200, 200), NumberUtils.getRandomArbitrary(-200, 200),NumberUtils.getRandomArbitrary(-200, 200));

        this.container.add(this.mesh);

    }

    addAmbientLight() {
        var light = new THREE.AmbientLight( 0x404040); // soft white light
        this.scene.add(light);
    }

    addDirectionalLight() {
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( 15, 20, 30 );
        this.scene.add( directionalLight );
    }

    addPointLight() {
        // create a point light
        var pointLight =
            new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 1000;
        pointLight.position.y = 50;
        pointLight.position.z = 2000;

        // add to the scene
        this.scene.add(pointLight);
    }

    /**
     * update
     * - Triggered on every TweenMax tick
     */
    update() {

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        this.container.rotation.x += .005;
        this.container.rotation.y += .005;
        this.container.rotation.z += .005;

        this.scene.controls.update(this.DELTA_TIME);

        this.scene.render()

    }


    /**
     * onResize
     * - Triggered when window is resized
     * @param  {obj} evt
     */
    onResize(evt) {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);


    }


}

export default App;
