import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPetal } from "./MyPetal.js"

export class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers()
        
    }

    initBuffers(){
        this.vertices = [
            0.5, 0, 0,
            1, 0, 0,
            0.75, 0.5, 0,
            0.75, -0.5, 0.5
        ]

        this.indices = [
            0, 1, 2,
            2, 0, 1,
            0, 1, 3,
            3, 0, 1
        ]

        this.texCoords = [
            0.5, 1,
            0.5, 0,
            1, 0.5,
            0, 0.5
        ]

        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    }
}