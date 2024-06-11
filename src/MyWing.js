import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 360, 180, 2, false);
    }

    display() {
        this.scene.pushMatrix();
        //this.scene.translate(0, 1.25, 0);
        this.scene.scale(0.5, 0.02, 1.5);
        this.sphere.display();
        this.scene.popMatrix();
    }
}