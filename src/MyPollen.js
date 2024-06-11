import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyPollen extends CGFobject {
    constructor(scene, slices, stacks, radius, scaleFactorTop, scaleFactorBottom) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.scaleFactorTop = scaleFactorTop; // Scale factor for the top hemisphere
        this.scaleFactorBottom = scaleFactorBottom; // Scale factor for the bottom hemisphere

        // Orange material with a rough texture
        this.orangeMaterial = new CGFappearance(scene);
        this.orangeMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.orangeMaterial.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.orangeMaterial.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.orangeMaterial.setShininess(10.0);

        // Load rough texture
        this.roughTexture = new CGFtexture(scene, 'textures/pollen.jpg');

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let x, y, z, xy;
        let nx, ny, nz;
        let length = 1.0 / this.radius;
        let s, t;

        let sliceStep = 2 * Math.PI / this.slices;
        let stackStep = Math.PI / this.stacks;
        let sliceAngle, stackAngle;

        let k1, k2;

        for (let i = 0; i <= this.stacks; ++i) {
            stackAngle = Math.PI / 2 - i * stackStep;
            xy = this.radius * Math.cos(stackAngle);
            z = this.radius * Math.sin(stackAngle);

            let scaleFactor = i < this.stacks / 2 ? this.scaleFactorTop : this.scaleFactorBottom;

            for (let j = 0; j <= this.slices; ++j) {
                sliceAngle = j * sliceStep;

                x = xy * Math.cos(sliceAngle) * scaleFactor;
                y = xy * Math.sin(sliceAngle) * scaleFactor;
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

        for (let i = 0; i < this.stacks; ++i) {
            k1 = i * (this.slices + 1);
            k2 = k1 + this.slices + 1;

            for (let j = 0; j < this.slices; ++j, ++k1, ++k2) {
                if (i != 0) {
                    this.indices.push(k1, k2, k1+1);
                }

                if (i != (this.stacks - 1)) {
                    this.indices.push(k1+1, k2, k2+1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display() {
        // Bind the orange material with the texture
        this.orangeMaterial.apply();

        this.roughTexture.bind();
    
        // Call the superclass display method to render the pollen
        super.display();
    }
}
