import { CGFobject, CGFappearance } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, stacks, slices, thickness) {
        super(scene);
        this.stacks = stacks
        this.slices = slices
        this.thickness = thickness
        this.initBuffers();

    }

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];
    
        let increment_angle = (2 * Math.PI) / this.slices;
        let increment_stack = 1 / this.stacks;
    
        // Side vertices and indices
        for (let i = 0; i <= this.slices; i++) {
            let x1 = Math.cos(i * increment_angle) * this.thickness;
            let y1 = Math.sin(i * increment_angle) * this.thickness;
    
            for (let j = 0; j <= this.stacks; j++) {
                let stack_z = j * increment_stack;
    
                let u = i / this.slices;
                let v = j / this.stacks;
    
                this.vertices.push(y1, stack_z, x1);
                this.normals.push(x1, y1, 0);
                this.texCoords.push(u, v);
    
                if (i < this.slices && j < this.stacks) {
                    let current = i * (this.stacks + 1) + j;
                    let next = (i + 1) * (this.stacks + 1) + j;
    
                    this.indices.push(current, next, current + 1);
                    this.indices.push(current + 1, next, next + 1);
                }
    
            }
        }

        let vertex = this.vertices.length / 3 - 1

        console.log(vertex)
        
        this.vertices.push(0)
        this.vertices.push(1)
        this.vertices.push(0)
        this.normals.push(0, 0, -1)
        this.texCoords.push(0.5, 0.5)

        vertex++;

        for (let i = 0; i < this.slices * 2; i++){
            this.indices.push(i)
            this.indices.push(i+2)
            this.indices.push(vertex);
        }

        this.vertices.push(0)
        this.vertices.push(0)
        this.vertices.push(0)
        this.normals.push(0, 0, -1)
        this.texCoords.push(0.5, 0.5)

        vertex++;

        for (let i = 1; i <= this.slices * 2 + 1; i++){
            this.indices.push(i+2)
            this.indices.push(i)
            this.indices.push(vertex);
            this.indices.push(i,0,vertex);
        }



        
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    

}
