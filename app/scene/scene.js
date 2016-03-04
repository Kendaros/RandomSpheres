/*
scene.js
 */

class Scene {

  /**
   * @constructor
   */
  constructor() {

    this.width = window.innerWidth
    this.height = window.innerHeight
    

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha:false } );
    this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 2000 ) 
    this.scene = new THREE.Scene()


    //this.controls = new THREE.TrackballControls( this.camera );
    //this.controls.target.set( 0, 0, 0 );

    
    this.renderer.setSize( this.width, this.height )

    this.camera.position.z = 1100

  }

  /**
   * Add a child to the scene
   *
   * @param {Obj} child - a THREE object
   */
  add( child ) {

    this.scene.add( child )

  }

  /**
   * Remove a child from the scene
   *
   * @param {Obj} child - a THREE object
   */
  remove( child ) {

    this.scene.remove( child )

  }

  /**
   * Renders/Draw the scene
   */
  render() {

    this.renderer.render( this.scene, this.camera )

  }

  /**
   * Resize the scene according to screen size
   *
   * @param {Number} newWidth
   * @param {Number} newHeight
   */
  resize( newWidth, newHeight ) {

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize( newWidth, newHeight )

  }

}

export default Scene
