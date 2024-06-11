import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyAbdomen extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 360, 180, 2, false);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-4.0, 0, 0);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.scale(2, 1, 1);
        this.scene.translate(-2.0, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.sphere.display();
        this.scene.popMatrix();
    }
}