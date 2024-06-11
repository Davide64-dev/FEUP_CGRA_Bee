import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyTriangle } from "./MyTriangle.js";

export class MyStem extends CGFobject {
    constructor(scene, cylinder_number, stem_color, leaf_color, cylinder_width = 0.1) {
        super(scene);
        this.cylinder_number = cylinder_number;
        this.stem_color = stem_color;
        this.leaf_color = leaf_color;
        this.angle = Math.random()*(Math.PI/36);
        this.angles = []
        this.cylinders = [];
        this.cylinder_width = cylinder_width;
        this.texture = new CGFtexture(this.scene, 'textures/stem.jpeg');
        this.leaf_texture = new CGFtexture(this.scene, "textures/leaf.jpg");
        this.z = 0;
        this.y = 0;
        this.sumAngle = 0;
        for (let i = 0; i < this.cylinder_number; i++) {
            this.cylinders.push(new MyCylinder(this.scene, 1, 5, this.cylinder_width));
            let temp = Math.random() * 5 * Math.PI / 180
            this.angles.push(temp)
            this.sumAngle += temp
        }
        this.cylinder_leaf = new MyCylinder(this.scene, 5, 10, 0.1);
        this.leaf = new MyTriangle(this.scene)
    }

    display() {
        let currAngle = 0;
        let side = false;
        for(let i = 0; i < this.cylinder_number; i++) {
            this.scene.pushMatrix();
            if(i != 0) {
                this.scene.translate(0, this.y, this.z);
                currAngle += this.angles[i];
                this.scene.rotate(currAngle, 1, 0, 0);
                this.scene.translate(0, -(Math.sqrt(2*(1-Math.cos(currAngle)))), 0);
                this.z += 1*Math.sin(currAngle);
                this.y += 1*Math.cos(currAngle);

                this.scene.pushMatrix();
                if (side){
                    this.scene.scale(-1, 1, 1);
                }
                this.scene.rotate(90 * Math.PI / 180, 0, 0, 1);
                this.stem_color.apply();
                this.texture.bind();
                this.cylinder_leaf.display();
                this.scene.popMatrix();

                if (!side){
                    this.scene.scale(-1, 1, 1); 
                }

                this.leaf_color.apply()

                this.leaf_texture.bind()

                this.leaf.display()

                side = !side
            }
            else {
                this.z = 0;
                this.y = 1;
            }
            this.stem_color.apply();
            this.texture.bind();
            this.cylinders[i].display(); 
            this.scene.popMatrix();
        }


    }

    static createRandomStem(scene) {
        
        const number_cylinders = parseInt(Math.random() * 8 + 4) + 1

        const color = Math.random() * 0.8 + 0.2
        let stemColor = new CGFappearance(scene);
        stemColor.setAmbient(0, color, 0, 1);
        stemColor.setSpecular(0, color, 0, 1);
        stemColor.setDiffuse(0, color, 0, 1);
        
        const color2 = Math.random() * 0.8 + 0.2
        let leaf_color = new CGFappearance(scene);
        leaf_color.setAmbient(0, color2, 0, 1);
        leaf_color.setSpecular(0, color2, 0, 1);
        leaf_color.setDiffuse(0, color2, 0, 1);

        let cylinder_width = Math.random() * 0.2 + 0.1;

        return new MyStem(scene, number_cylinders, stemColor, leaf_color, cylinder_width)


    }
}