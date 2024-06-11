import { CGFobject, CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyLeg } from "./MyLeg.js";
import { MySphere } from "./MySphere.js";
import { MyWing } from "./MyWing.js";
import { MyPollen } from "./MyPollen.js";

export class MyThorax extends CGFobject {
    constructor(scene, s=0, e=5, st=3, d=2) {
        super(scene);
        this.sphere = new MySphere(this.scene, 360, 180, 2, false);
        this.leg = new MyLeg(this.scene);
        this.wing = new MyWing(this.scene);
        this.pollen = new MyPollen(this.scene, 7, 7, 0.2, 1, 0.9);
        this.texture = new CGFtexture(this.scene, 'textures/bee.jpg');
        this.legTexture = new CGFtexture(this.scene, 'textures/brown.jpg');
        this.wingTexture = new CGFtexture(this.scene, 'textures/wing.jpg');
        this.wingAppearance = new CGFappearance(this.scene);
        this.wingAppearance.setTexture(this.wingTexture);
        this.wingAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.wingAppearance.setAmbient(0.2, 0.2, 0.2, 0.2);
        this.wingAppearance.setDiffuse(0.4, 0.4, 0.4, 0.4);
        this.wingAppearance.setSpecular(0,0,0, 0);
        this.wingAppearance.setEmission(0,0,0,0);
        this.wingAppearance.setShininess(0);

        this.startVal=s;
        this.endVal=e;
        this.animStartTimeSecs=st;
        this.animDurationSecs=d;
        this.length=(this.endVal-this.startVal);
        this.animVal=this.startVal;
    }

    tween(y) {
        return -(Math.sin(y* 100)+1)/2;
    }

    update(timeSinceAppStart)
    {
      var elapsedTimeSecs=timeSinceAppStart-this.animStartTimeSecs;

      if (elapsedTimeSecs>=0 && elapsedTimeSecs<=this.animDurationSecs)
          this.animVal=this.startVal + this.tween(elapsedTimeSecs/3) * this.length;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-3, 0, 0)
        this.scene.scale(1, 0.75, 1);
        this.texture.bind();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.sphere.display();
        this.scene.popMatrix();

        //pollen
        if(this.hasPollen == true) {
            this.scene.pushMatrix();
            this.scene.scale(4, 4, 4);
            this.scene.translate(-0.5,-0.5,0.5);
            this.pollen.display();
            this.scene.popMatrix();

        }

        //first legs
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/9, 1, 0, 0);
        this.scene.translate(-2, 0, 2);
        this.legTexture.bind();
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/6, 1, 0, 0);
        this.scene.translate(2, 0, 2);
        this.leg.display();
        this.scene.popMatrix();

        //second legs
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 1, 0, 0);
        this.scene.translate(-3, 0, 2);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/6, 1, 0, 0);
        this.scene.translate(3, 0, 2);
        this.leg.display();
        this.scene.popMatrix();

        //wings
        this.scene.pushMatrix();
        this.scene.translate(-2.5, 1.5, 0);
        this.scene.rotate(this.animVal*Math.PI/6, 1, 0, 0);
        this.scene.translate(0,0,3);
        this.wingAppearance.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2.5, 1.5, 0);
        this.scene.rotate(-this.animVal*Math.PI/6, 1, 0, 0);
        this.scene.translate(0,0,-3);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.8, 0.75);
        this.scene.translate(-8, 1.65, 0);
        this.scene.rotate(this.animVal*Math.PI/6, 1, 0, 0);
        this.scene.translate(0, 0, 3);
        this.scene.rotate(Math.PI/12, 0,0,1);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.8, 0.75);
        this.scene.translate(-8, 1.65, 0);
        this.scene.rotate(-this.animVal*Math.PI/6, 1, 0, 0);
        this.scene.translate(0, 0, -3);
        this.scene.rotate(Math.PI/12, 0,0,1);
        this.wing.display();
        this.scene.popMatrix();

    }
}