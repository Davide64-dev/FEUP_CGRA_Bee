import { CGFobject, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 360, 180, 2, false);

        this.hiveTexture = new CGFtexture(scene, 'textures/hive.jpg');
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 1.3);
        this.scene.rotate(Math.PI, 0,1, 0)
        this.hiveTexture.bind()
        this.sphere.display();
        this.scene.popMatrix();
    }
}