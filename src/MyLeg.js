import { CGFnurbsObject, CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyLeg extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 360, 180, 2, false);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.5);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.4);
        this.scene.translate(0, 8, 3);
        this.sphere.display();
        this.scene.popMatrix();
    }
}