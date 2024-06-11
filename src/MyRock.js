import { CGFobject, CGFtexture } from '../lib/CGF.js';

function shuffle(array) {

    const shuffledArray = array.slice();
    
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
  }


export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.texture = new CGFtexture(this.scene, 'textures/rock.jpg');

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        let x, y, z, xy; //vertex position
        let nx, ny, nz; //vertex normal
        let length = 1.0 / this.radius;
        let s, t;
    
        let sliceStep = 2 * Math.PI / this.slices;
        let stackStep = Math.PI / this.stacks;
        let sliceAngle, stackAngle;
    
        for (let i = 0; i <= this.stacks; ++i) {
            stackAngle = Math.PI / 2 - i * stackStep;
            xy = this.radius * Math.cos(stackAngle);
            z = this.radius * Math.sin(stackAngle);
            for (let j = 0; j <= this.slices; ++j) {
                sliceAngle = j * sliceStep;
    
                let distortionX = (Math.random() - 0.5) * 0.1;
                let distortionY = (Math.random() - 0.5) * 0.1;
                let distortionZ = (Math.random() - 0.5) * 0.1;
    
                x = xy * Math.cos(sliceAngle) * (1 + distortionX);
                y = xy * Math.sin(sliceAngle) * (1 + distortionY);
                z = z * (1 + distortionZ);
    

                x = Math.max(-this.radius, Math.min(this.radius, x));
                y = Math.max(-this.radius, Math.min(this.radius, y));
                z = Math.max(-this.radius, Math.min(this.radius, z));
    
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
    
        for (let i = 0; i < this.stacks; i++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (i * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        for(let i = 0; i < this.stacks; i++){
            let first = (i * (this.slices + 1));
            let second = first + this.slices + 1;

            this.indices.push(first, first + this.slices, second);
            this.indices.push(second, first + this.slices, second + this.slices);
        }


        this.texCoords = shuffle(this.texCoords)
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }

}