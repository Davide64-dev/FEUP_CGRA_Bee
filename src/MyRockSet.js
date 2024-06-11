import { CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { MyRockPlane } from './MyRockPlane.js';
import { MyHive } from './MyHive.js';

export class MyRockSet extends CGFobject {
    constructor(scene, rockSize) {
        super(scene);
        this.hive = new MyHive(this.scene);
        this.texture = new CGFtexture(this.scene, 'textures/rock.jpg');
        this.rockSetSize = rockSize;
        this.rocks = []
        for (let i = 0; i < this.rockSetSize ** 2; i++){
            this.rocks.push(new MyRock(this.scene, 10, 10, 1));
        }

        this.rockPlanes = []

        for (let i = 0; i < this.rockSetSize; i++){
            let rockPlane = new MyRockPlane(this.scene, this.rockSetSize - i)
            this.rockPlanes.push(rockPlane)
        }

        this.initBuffers();
    }


    display(){
        /*
        for (let i = 0; i < this.rocketSetSize; i++){
            for (let j = i; j < this.rocketSetSize; j++){
                for (let k = i; k < this.rocketSetSize; k++){
                    this.scene.pushMatrix();
                    this.scene.translate(j * 3, i * 3, k * 3);
                    this.rocks[i].display()
                    this.scene.popMatrix();
                }
            }
        }
        */
       for (let i = 0; i < this.rockSetSize; i++){
        this.scene.pushMatrix();
        this.scene.translate(-15, 0 ,-15);
        this.scene.translate(i * 0.8, i * 1.5, i * 0.8);
        this.texture.bind();
        this.rockPlanes[i].display()
        this.scene.popMatrix();
       }
       this.scene.pushMatrix();
       this.scene.translate(-15, 0, -15);
       this.scene.translate((this.rockSetSize-1)*0.8,6.4, (this.rockSetSize-1)*0.8);
       this.scene.rotate(Math.PI/2, 1, 0, 0);
       this.hive.display();
       this.scene.popMatrix();

    }


}