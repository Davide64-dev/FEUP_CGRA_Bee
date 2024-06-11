import { CGFnurbsObject, CGFobject, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyLeaf } from "./MyLeaf.js"

export class MyGrass extends CGFobject {

    static texture;
    constructor(scene, n_leafs = 100) {
        super(scene);
        this.initBuffers()
        this.leaf = new MyLeaf(this.scene);
        this.n_leafs = n_leafs
        MyGrass.texture = new CGFtexture(this.scene, 'textures/leaf.jpg');

        this.displacement = []
        this.scale = []
        this.rotate = []

        for (let i = 0; i < this.n_leafs; i++){
            let dis_x = Math.random() * 50;
            let dis_z = Math.random() * 50;
            this.displacement.push([dis_x, dis_z]);
            let scale_x = Math.random() * 0.4 + 0.1; 
            let scale_z = Math.random() * 10 + 0.5;
            this.scale.push([scale_x, scale_z]);
            let rotate = Math.random() * 2 * Math.PI;
            this.rotate.push(rotate)
        }
    }

    
    display(){
        this.scene.setActiveShader(this.scene.shader);
        for (let i = 0; i < this.n_leafs; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.displacement[i][0], 0, this.displacement[i][1]);
            this.scene.rotate(this.rotate[i], 0, 1, 0)
            this.scene.scale(this.scale[i][0], 1, this.scale[i][1]);
            MyGrass.texture.bind()
            this.leaf.display();
            this.scene.popMatrix();
        }
        
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    
}