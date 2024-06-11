import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, radius, insideView = true) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.insideView = insideView

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let x, y, z, xy; //vertex position
        let nx, ny, nz; //vertex normal
        let length = 1.0 /this.radius;
        let s, t;

        let sliceStep = 2*Math.PI/this.slices;
        let stackStep = Math.PI/this.stacks;
        let sliceAngle, stackAngle;

        let k1, k2;

        for(let i = 0; i <= this.stacks; ++i) {
            stackAngle = Math.PI/ 2 - i * stackStep;
            xy = this.radius * Math.cos(stackAngle);
            z = this.radius * Math.sin(stackAngle);
            for(let j = 0; j <= this.slices; ++j) {
                sliceAngle = j * sliceStep;

                x = xy * Math.cos(sliceAngle);
                y = xy * Math.sin(sliceAngle);
                this.vertices.push(x, y, z);

                nx = x * length;
                ny = y * length;
                nz = z * length;
                this.normals.push(nx, ny, nz);

                s = j / this.slices;
                t = i / this.stacks;
                this.texCoords.push(s, t);

            }
        }

        for(let i = 0; i < this.stacks; ++i) {
            k1 = i * (this.slices + 1);
            k2 = k1 + this.slices + 1;

            for(let j = 0; j < this.slices; ++j, ++k1, ++k2) {
                if(i != 0) {
                    if (this.insideView){
                        this.indices.push(k2, k1, k1+1);
                    }
                    else{
                        this.indices.push(k1, k2, k1+1);
                    }
                }

                if(i !=(this.stacks - 1)) {
                    if (this.insideView){
                        this.indices.push(k2, k1+1, k2+1);
                    }
                    else{
                        this.indices.push(k1+1, k2, k2+1);
                    }
                }
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}