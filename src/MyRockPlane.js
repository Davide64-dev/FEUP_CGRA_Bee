import { CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockPlane extends CGFobject {
    constructor(scene, rocketSetSize) {
        super(scene);
        this.texture = new CGFtexture(this.scene, 'textures/rock.jpg');
        this.rocketSetSize = rocketSetSize;
        this.rocks = []
        this.scaling = []
        for (let i = 0; i < this.rocketSetSize ** 2; i++){
            let rock = new MyRock(this.scene, 7, 7, 1);
            let scaleMatrix = [Math.random() * 0.2 + 0.8, Math.random() * 0.2 + 0.8, Math.random() * 0.2 + 0.8];
            this.scaling.push(scaleMatrix);
            this.rocks.push(rock);
        }

        this.initBuffers();
    }


    display(){
        for (let i = 0; i < this.rocketSetSize; i++){
            for (let j = 0; j < this.rocketSetSize; j++){
                this.scene.pushMatrix();
                this.scene.translate(i * 1.5, 0, j * 1.5);
                let index = i * this.rocketSetSize + j
                this.scene.scale(this.scaling[index][0], this.scaling[index][1], this.scaling[index][2])
                this.rocks[i * this.rocketSetSize + j].display()
                this.scene.popMatrix();
            }
        }
    }


}