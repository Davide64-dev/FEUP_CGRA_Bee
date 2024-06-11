import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./MyGarden.js";

import { MyRock } from "./MyRock.js";
import { MyAnimatedBee } from "./MyAnimatedBee.js";
import { MyHive } from "./MyHive.js"
import { MyLeaf } from "./MyLeaf.js"
import { MyGrass } from "./MyGrass.js"
import {MyRockSet} from "./MyRockSet.js"
import { MyCylinder } from "./MyCylinder.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.rows = 5;
    this.columns = 5;

    this.lastRows = 5;
    this.lastColumns = 5;

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,200);
    
    this.displayGarden = true;

    this.leaf = new MyLeaf(this);

    this.garden = new MyGarden(this, this.rows, this.columns)
    
    this.bee = new MyAnimatedBee(this,0,0.5,1,Infinity);

    this.rockSet = new MyRockSet(this, 3)

    this.hive = new MyHive(this);

    this.grass = new MyGrass(this, 500);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.moveWithCamera = true;
    this.displayGrass = true;
    this.displayRockSet = true;

    this.enableTextures(true);
    this.earthTexture = new CGFtexture(this, 'images/earth.jpg');
    this.panoramaTexture = new CGFtexture(this, 'images/panorama.jpg');
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.setUpdatePeriod(50); // **at least** 50 ms between animations

    this.appStartTime=Date.now();

    this.shader = new CGFshader(this.gl, "shaders/leaf.vert", "shaders/temp.frag");

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.gl.enable(this.gl.BLEND);
  }
  update(t) {
      var timeSinceAppStart=(t-this.appStartTime)/1000.0;
    
      
      this.shader.setUniformsValues({ timeFactor: Math.sin(t*0.005)});
      //this.checkKeys();
      this.bee.update(timeSinceAppStart, this.speedFactor, this.scaleFactor, this.garden);

      if (this.lastColumns != this.columns || this.lastRows != this.rows){

        this.garden = new MyGarden(this, this.rows, this.columns)
        this.lastColumns = this.columns;
        this.lastRows = this.rows;
      }
    }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
    this.lights[1].setPosition(-15, 10, -5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();

    this.lights[2].setPosition(15, 1, 5, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(0.0, 0.0, 0.0, 0.0);
    this.lights[2].enable();
    this.lights[2].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    if (this.displayGrass) this.grass.display()
    if (this.displayRockSet) this.rockSet.display()

    if (this.displayGarden) this.garden.display()




    // ---- BEGIN Primitive drawing section
    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-1,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.bee.display();
    
    this.pushMatrix()
    this.translate(0,20,0);
    this.panorama.display(this.moveWithCamera);
    this.popMatrix()


    /*this.pushMatrix();
    this.earthTexture.bind();
    this.rotate(-Math.PI/2,1, 0, 0);
    this.rotate(3*Math.PI/4, 0, 0, 1)
    this.sphere.display();
    this.popMatrix();*/


    // ---- END Primitive drawing section
  }
}
