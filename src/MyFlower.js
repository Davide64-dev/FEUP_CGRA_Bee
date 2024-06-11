import { CGFobject } from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";
import { MyPetal } from "./MyPetal.js";
import { MyCylinder } from "./MyCylinder.js"
import { MyReceptacle } from './MyReceptacle.js';
import { MyCorolla } from './MyCorolla.js';
import { MyStem } from './MyStem.js';


export class MyFlower extends CGFobject {


    constructor(scene, corolla, stem) {
        super(scene);
        this.corolla = corolla
        this.stem = stem;
        console.log("Stem y component: ", this.stem.y)

        this.firstTime = true;
    }

    display(){
        this.stem.display()
        
        this.scene.pushMatrix();
        this.scene.translate(0, this.stem.y, this.stem.z);
        this.scene.rotate(-(50) * Math.PI / 180,1,0,0);
        this.corolla.display();
        this.scene.popMatrix();
        if (this.firstTime){
            this.corolla.pollenPosition[1] += this.stem.y;
            this.corolla.pollenPosition[2] += this.stem.z
            this.firstTime = false
        }
    }

    static createRandomFlower(scene) {
        
        let stem = MyStem.createRandomStem(scene);

        let corolla = MyCorolla.createRandomFlower(scene)

        return new MyFlower(scene, corolla, stem)

    }


}
