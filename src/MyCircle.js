import { CGFobject } from "../lib/CGF.js";

export class MyCircle extends CGFobject {
    constructor(scene, radius, nCount) {
        super(scene);
        this.radius = radius;
        this.nCount = nCount;
        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        let x, y, z, currAngle;


        let angle = 2*Math.PI/this.nCount;

        let triangleCount = this.nCount;

        this.vertices.push(0, 0, 0);
        for(let i = 0; i < this.nCount; i++) {
            currAngle = angle * i;
            x = this.radius * Math.cos(currAngle);
            y = this.radius * Math.sin(currAngle);
            z = 0.0;

            this.vertices.push(x, y, z);
        }

        for(let i = 1; i < triangleCount; i++) {
            this.indices.push(0, i, i+1);
        }
        this.indices.push(0, triangleCount, 1);

        for(let i = 1; i < triangleCount; i++) {
            this.indices.push(i, 0, i+1);
        }
        this.indices.push(triangleCount, 0, 1);

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}