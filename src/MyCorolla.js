import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";
import { MyPetal } from "./MyPetal.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyReceptacle } from './MyReceptacle.js';
import { MySphere } from './MySphere.js';
import {MyPollen} from './MyPollen.js'

export class MyCorolla extends CGFobject {

    static pollen;


    constructor(scene, receptacleRadius, receptacleColor, petalColor, petalHeight, petalRadius, number_petals){
        super(scene);
        this.petal = new MyPetal(scene, 0, petalColor, petalHeight, petalRadius);
        this.receptacle = new MyReceptacle(scene, receptacleRadius, receptacleColor);
        this.number_petals = number_petals;
        MyCorolla.pollen = new MyPollen(scene, 7, 7, 0.2, 1, 0.9);
        this.pollenPosition = [0, 0, 0]
        this.hasPollen = true;

        this.rotation = [Math.random() * Math.PI / 180, Math.random() * Math.PI / 180, Math.random() * Math.PI / 180]

        console.log(this.petal)
        console.log(this.petal)

        this.angles = []
        this.insertions = []

        for (let i = 0; i < this.number_petals; i ++){
            let petalInclination = Math.random() * 60;
            let petalInsertionAngle = Math.random() * 20 - 10;
            this.angles.push(petalInclination)
            this.insertions.push(petalInsertionAngle);
        }
    }

    display(){
        this.receptacle.display();

        let increment = 360 / this.number_petals;
        let count = 0;
        for (let i = 0; i < 360; i += increment){
            // get the flower.corolla
            this.scene.pushMatrix();
            this.scene.rotate(i * Math.PI / 180, this.insertions[count] * Math.PI / 180, 0, 1);
            this.petal.display_with_angle(this.angles[count]);
            this.scene.popMatrix(); 
            count++;
        }

        if (this.hasPollen){
            this.scene.pushMatrix();
            this.scene.rotate(0, this.rotation[0], 0, 1);
            this.scene.translate(0,0,this.receptacle.radius);
            MyCorolla.pollen.display();
            this.scene.popMatrix();
        }
    }

        static createRandomFlower(scene) {

            const petal = MyPetal.createRandomPetal(scene);
            const receptacle = MyReceptacle.createRandomReceptacle(scene)

            const number_petals = parseInt(Math.random() * 2 + 8) + 1

            console.log("Number of petals: " + number_petals)
            return new MyCorolla(scene, receptacle.radius, receptacle.color, petal.color, petal.height, petal.radius, number_petals);
    }
}
