import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';

export class MyPetal extends CGFobject {

    constructor(scene, angle, color, height = 1, radius = 1) {
        super(scene);
        this.angle = angle
        this.color = color;
        this.height = height;
        this.radius = radius;
        this.initBuffers();
        this.texture = new CGFtexture(this.scene, 'textures/petal.jpeg');
    }

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        
        let z_curvature = this.height / 2 * Math.sin(this.angle * Math.PI / 180)
        let y_curvature = this.height / 2 + ((this.height / 2) * Math.cos(this.angle * Math.PI / 180))


        this.vertices = [
            0, 0, 0,
            this.height/2, this.height / 2, 0,
            -this.height/2, this.height / 2, 0,
            0, y_curvature, z_curvature
        ];
        // Generating indices
        this.indices = [
            0, 1, 2,
            1, 2, 3,
            2, 1, 3,
            1, 2, 0
        ];

        this.texCoords = [
            0.5,0,
            0,0.5,
            1,0.5,
            0.5,1
        ]

        // Initialize normals (assuming all normals point in the z direction)
        for (let i = 0; i < this.vertices.length / 3; i++) {
            this.normals.push(0, 0, 1);
        }
        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    }

    setFillMode() {
        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
    }

    setLineMode() {
        this.primitiveType = this.scene.gl.LINES;
    }

    display_with_angle(angle){

        let z_curvature = this.radius / 2 * Math.sin(angle * Math.PI / 180)
        let y_curvature = this.radius / 2 + ((this.radius / 2) * Math.cos(angle * Math.PI / 180))

        this.vertices = [
            0, 0, 0,
            this.height/2, this.radius / 2, 0,
            -this.height/2, this.radius / 2, 0,
            0, y_curvature, z_curvature
        ];


        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();

        this.color.apply()

        this.texture.bind();

        this.display()
        
    }

    updateBuffers(){

    }

    static createRandomPetal(scene) {
        // Define parameters for the random flower
        const receptacleRadius = Math.random() * 2 + 1; // Random radius between 1 and 3

        const red = Math.random()
        const green = Math.random()
        const  blue = Math.random()
        let petalColor = new CGFappearance(scene);
        petalColor.setAmbient(red, green, blue, 1);
        petalColor.setSpecular(red, green, blue, 1);
        petalColor.setDiffuse(red, green, blue, 1);
        const petalHeight = Math.random() * 4 + 3; // Random height between 3 and 7
        const petalRadius = Math.random() + 1; // Random radius between 0 and 1

        // Create and return the random flower
        return new MyPetal(scene, 0, petalColor, petalRadius, petalHeight);
    }
}
