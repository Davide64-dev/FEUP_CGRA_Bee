import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyAntenna extends CGFobject{
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 360, 180, 2, false);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.02, 0.02);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.scale(0.2, 0.02, 0.02);
        this.scene.translate(3.5, 8, 0);
        this.sphere.display();
        this.scene.popMatrix();
    }
}