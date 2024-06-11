import { CGFnurbsObject, CGFobject, CGFshader } from "../lib/CGF.js";

export class MyLeaf extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initBuffers()
    }

    

    initBuffers(){
        this.vertices = [
            0.2, 0, 0,
            0.133, 0.33, 0,
            0.066, 0.66, 0,
            0, 0.99, 0,
            -0.2, 0, 0,
            -0.133, 0.33, 0,
            -0.066, 0.66, 0
        ];
        this.indices = [
            0,4,5,
            5,4,0,
            1,5,0,
            5,1,0,
            5,6,1,
            5,1,6,
            1,2,6,
            2,3,6,
            6,3,2,
            2,1,6
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    
    display(){

        super.display();
    }
    
}