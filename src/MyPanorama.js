import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {
    constructor(scene, panoramaTexture) {
        super(scene);
        this.sphere = new MySphere(this.scene, 360, 180, 200);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(panoramaTexture);
    }

    display(moveWithCamera) {
        if (moveWithCamera){
            this.scene.pushMatrix();
            this.material.apply();
            this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2])
            this.scene.rotate(-Math.PI/2,1, 0, 0);
            this.scene.rotate(3*Math.PI/4, 0, 0, 1);
            this.sphere.display();
            this.scene.popMatrix();
        }
        else{
            this.scene.pushMatrix();
            this.material.apply();
            this.scene.rotate(-Math.PI/2,1, 0, 0);
            this.scene.rotate(3*Math.PI/4, 0, 0, 1);
            this.sphere.display();
            this.scene.popMatrix();
        }
    }
}