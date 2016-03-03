import Dat from 'dat-gui';
import NumberUtils from './utils/number-utils';
import Scene from './scene/scene';
import TrackballControls from './lib/TrackballControls';

class App {

    constructor() {

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.numberOfSpheres = 60;
        this.maxSphereSize = 100;
        this.distanceOfExplosion = [-250, 250];

        this.cameraMaxZoom = 1100;
        this.cameraMinZoom = 1400;

        this.cameraReachedMinZoom = false;

        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        this.mouseX = 0;
        this.mouseY = 0;

        this.scene = new Scene();
        this.container = new THREE.Object3D();//create an empty container

        let root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.domElement);


        for (var i = 0; i < this.numberOfSpheres; i++) {
            this.addSphere();
        }

        this.scene.add(this.container);

        //this.addPointLight();

        //this.addAmbientLight();
        //this.addDirectionalLight();

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
     * Add sphere to the scene
     */
    addSphere() {

        const geometry = new THREE.SphereGeometry(Math.random() * this.maxSphereSize, 30, 30);

        //let random = Math.random();
        //
        //if (random < .3 ) {
        //    this.sphereColor = 0xCC0000;
        //} else if (random < .6 && random ) {
        //    this.sphereColor = 0xFFFFFF;
        //} else {
        //    this.sphereColor = 0x2E2E2E;
        //}

        const material = new THREE.MeshDepthMaterial(
            {});

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(NumberUtils.getRandomArbitrary(this.distanceOfExplosion[0], this.distanceOfExplosion[1]), NumberUtils.getRandomArbitrary(this.distanceOfExplosion[0], this.distanceOfExplosion[1]), NumberUtils.getRandomArbitrary(this.distanceOfExplosion[0], this.distanceOfExplosion[1]));

        this.container.add(this.mesh);

    }

    addAmbientLight() {
        var light = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light);
    }

    addDirectionalLight() {
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(15, 20, 30);
        this.scene.add(directionalLight);
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

        if (this.cameraReachedMinZoom == false) {
            if (this.scene.camera.position.z > this.cameraMinZoom - 100) {
                this.scene.camera.position.z += 0.5;
            } else {
                this.scene.camera.position.z += 1;
            }
        } else {
            if (this.scene.camera.position.z < this.cameraMaxZoom + 100) {
                this.scene.camera.position.z += 0.5;
            } else {
                this.scene.camera.position.z -= 1;
            }
        }

        if (this.scene.camera.position.z > this.cameraMinZoom) {
            this.cameraReachedMinZoom = true;
        } else if (this.scene.camera.position.z < this.cameraMaxZoom) {
            this.cameraReachedMinZoom = false;
        }

        this.scene.camera.position.x += ( this.mouseX - this.scene.camera.position.x ) * .05;
        this.scene.camera.position.y = THREE.Math.clamp(this.scene.camera.position.y + ( -this.mouseY - this.scene.camera.position.y ) * .05, 0, 1000);

        this.scene.camera.lookAt(this.scene.scene.position);


        this.scene.controls.update(this.DELTA_TIME);

        this.scene.render()

    }

    onDocumentMouseMove(event) {

        this.mouseX = ( event.clientX - window.innerWidth / 2 );
        this.mouseY = ( event.clientY - window.innerHeight / 2 );

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
