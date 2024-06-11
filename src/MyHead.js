import { CGFobject, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyAntenna } from "./MyAntenna.js";

export class MyHead extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 360, 180, 2, false);
        this.antenna = new MyAntenna(this.scene);
        this.texture = new CGFtexture(this.scene, 'textures/bee.jpg');
        this.eyeTexture = new CGFtexture(this.scene, 'textures/beeEye.jpg');
        this.antennaTexture = new CGFtexture(this.scene, 'textures/brown.jpg');
        this.headTexture = new CGFtexture(this.scene, 'textures/beeHead.jpg');
    }

    display() {
        //head
        this.scene.pushMatrix();
        this.scene.scale(0.75, 1, 0.9);
        this.headTexture.bind();
        this.sphere.display();
        this.scene.popMatrix();

        //eyes
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.scale(1, 2, 1.5);
        this.scene.translate(4, 1, 3);
        this.eyeTexture.bind();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.scale(1, 2, 1.5);
        this.scene.translate(4, 1, -3);
        this.eyeTexture.bind();
        this.sphere.display();
        this.scene.popMatrix();

        //antennas
        this.scene.pushMatrix();
        this.scene.translate(1, 1.5 ,0.3);
        this.antennaTexture.bind();
        this.antenna.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1.5 ,-0.3);
        this.antenna.display();
        this.scene.popMatrix();
    }
}