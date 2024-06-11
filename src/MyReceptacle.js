import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyReceptacle extends CGFobject {

    static defaultAppearence = null;

    constructor(scene, radius, color = null) {
        super(scene);
        this.radius = radius;
        this.sphere = new MySphere(this.scene, 7, 7, radius, false)
        this.color = color;
        this.initBuffers();
        if (!MyReceptacle.defaultAppearance) {
            MyReceptacle.defaultAppearance = new CGFappearance(scene);
            MyReceptacle.defaultAppearance.setAmbient(1, 1, 0, 1);
            MyReceptacle.defaultAppearance.setDiffuse(1, 1, 0, 1);
            MyReceptacle.defaultAppearance.setSpecular(1, 1, 0, 1);
        }

        this.texture = new CGFtexture(this.scene, "textures/receptacle.jpg");
    }

    static createRandomReceptacle(scene) {
        const receptacleRadius = Math.random() * 0.5 + 0.5;

        const color = Math.random() * 0.25 + 0.75
        let petalColor = new CGFappearance(scene);
        petalColor.setAmbient(color, color, 0, 1);
        petalColor.setSpecular(color, color, 0, 1);
        petalColor.setDiffuse(color, color, 0, 1);

        // Create and return the random flower
        return new MyReceptacle(scene, receptacleRadius, petalColor);
    }

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];

        const slices = 30; // adjust the number of slices for smoother circle

        // Center point
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1); // normal pointing upwards
        this.texCoords.push(0.5, 0.5); // texture coordinate at the center

        // Angle between each vertex
        const angleIncrement = (2 * Math.PI) / slices;

        for (let i = 0; i <= slices; i++) {
            const angle = i * angleIncrement;
            const x = this.radius * Math.cos(angle);
            const y = this.radius * Math.sin(angle);

            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1); // all normals pointing upwards
            this.texCoords.push(0.5 + 0.5 * Math.cos(angle), 0.5 + 0.5 * Math.sin(angle)); // texture coordinates
        }

        // Triangle indices
        for (let i = 1; i <= slices; i++) {
            this.indices.push(0, i, i + 1);
            this.indices.push(0, i + 1, i)
        }

        // Closing the circle
        this.indices.push(0, slices + 1, 1);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    setFillMode() {
        this.primitiveType = this.scene.gl.TRIANGLES;
    }

    setLineMode() {
        this.primitiveType = this.scene.gl.LINE_LOOP;
    }

    display() {
        if (this.color)
            this.color.apply();
        else
            MyReceptacle.defaultAppearance.apply();
        
        this.texture.bind()
        this.sphere.display();
    }
}
