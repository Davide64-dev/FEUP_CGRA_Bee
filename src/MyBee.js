import { CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyHead } from "./MyHead.js";
import { MyThorax } from "./MyThorax.js";
import { MyAbdomen } from "./MyAbdomen.js";
import { MyPollen } from "./MyPollen.js";
import { MyGarden } from "./MyGarden.js";

export class MyBee extends CGFobject {

    constructor(scene, x=0, y=0, z=0) {
        super(scene);
        this.head = new MyHead(scene);
        this.thorax = new MyThorax(scene, 0,1,1,Infinity);
        this.abdomen = new MyAbdomen(scene);
        this.texture = new CGFtexture(this.scene, 'textures/bee.jpg');
        this.pollen = new MyPollen(scene, 7, 7, 0.2, 1, 0.9);

        this.position = {x: x, y: y, z: z};
        this.defaultPosition = {x: x, y: y, z: z};
        this.hivePosition = {x: -15, y: -5, z: -15}; 
        this.scale = 1;
        this.orientation = 0;
        this.speed = 0;
        this.yspeed = 0;
        this.lastSpeedFactor = 1;
        this.thorax.hasPollen = false;
        this.goingToHive = false;
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 15, 0);
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.head.display();
        this.texture.bind();
        this.abdomen.display();
        this.thorax.display();
        this.scene.popMatrix();
    }

    update(t, speedFactor, scaleFactor, garden) {    
        this.thorax.update(t);
        this.scale = scaleFactor;

        this.checkKeys(speedFactor/5);

        if(this.goingToHive && this.thorax.hasPollen) {
            this.moveToHive();
        }else {
            if (speedFactor !== this.lastSpeedFactor && this.speed != 0) {
                this.speed += (speedFactor - this.lastSpeedFactor);
                this.lastSpeedFactor = speedFactor;
            }
            this.position.x += this.speed * Math.cos(-this.orientation);
            this.position.z += this.speed * Math.sin(-this.orientation);

            this.position.y -= this.yspeed;
            if (this.position.y > 0) {
                this.position.y = 0;
                this.yspeed=0;
            } else if (this.position.y < -10) {
                this.position.y = -10;
                this.yspeed=0;
            }
            if (this.checkCollision(this.position.x, this.position.y, this.position.z, garden)) {
                this.speed = 0; 
                this.yspeed=0;
            }
        }
    }

    moveToHive() {
        const dx = this.hivePosition.x - this.position.x;
        const dy = this.hivePosition.y - this.position.y;
        const dz = this.hivePosition.z - this.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        this.speed = 1;
        this.yspeed = 1;
        this.orientation = -Math.atan2(dz, dx);
        console.log(distance);
        if (distance < 0.6) {
            this.position.x = this.hivePosition.x;
            this.position.y = this.hivePosition.y;
            this.position.z = this.hivePosition.z;
            this.goingToHive = false;
            this.speed = 0;
            this.yspeed = 0;
            this.thorax.hasPollen = false;
        } else {
            const direction = {x: dx / distance, y: dy / distance, z: dz / distance};
            this.position.x += direction.x * this.speed;
            this.position.y += direction.y * this.speed;
            this.position.z += direction.z * this.speed;
        } 
    }

    checkCollision(newX, newY, newZ, garden) {
        //const collisionThreshold = 1.0;  

        
        let min = Math.sqrt(
            Math.pow(newX - garden.matrix[0][0].corolla.pollenPosition[0], 2) +
            Math.pow(newY - garden.matrix[0][0].corolla.pollenPosition[1], 2) +
            Math.pow(newZ - garden.matrix[0][0].corolla.pollenPosition[2], 2)
        );

        let minFlower = garden.matrix[0][0]

        let minRow = 0;
        let minCol = 0;
        
        let colCount = 0;
        for (let row of garden.matrix){
            let rowCount = 0;
            for (let flower of row){
                let distance = Math.sqrt(
                    Math.pow(newX - flower.corolla.pollenPosition[0], 2) +
                    Math.pow(newY - flower.corolla.pollenPosition[1]+15, 2) +
                    Math.pow(newZ - flower.corolla.pollenPosition[2], 2)
                );
                if (distance < min){
                    minRow = rowCount
                    minCol = colCount
                    min = distance;
                    minFlower = flower
                }
                rowCount++;

            }
            colCount++;
            
        }
        if (min < 3.5 && !this.thorax.hasPollen && garden.matrix[minRow][minCol].corolla.hasPollen == true){
            garden.matrix[minRow][minCol].corolla.hasPollen = false;
            this.thorax.hasPollen = true;
            //console.log(minFlower.corolla.pollenPosition)
            return true;
        }
        //console.log(minFlower.corolla.pollenPosition)
        //console.log(min)
        return false
        /*
        for (let flower of flowers) {
            let distance = Math.sqrt(
                Math.pow(newX - flower.x, 2) +
                Math.pow(newY - flower.y, 2) +
                Math.pow(newZ - flower.z, 2)
            );
            console.log(distance);
            if (distance < collisionThreshold) {
                return true;
            }
        }
        */
        return false;
    }

    turn(v) {
        this.orientation += v;
    }

    accelerate(v) {
        this.speed = Math.max(this.speed + v, 0)
    }

    reset() {
        this.speed = 0;
        this.yspeed = 0;
        this.orientation = 0;
        this.position = {x: this.defaultPosition.x, y: this.defaultPosition.y, z: this.defaultPosition.z};  
    }

    goDown(v) {
        this.yspeed = this.yspeed + v
    }

    goUp(v) {
        this.yspeed= this.yspeed+v
    }

    backToHive() {
        this.goingToHive=true;
    }

    checkKeys(factor) {
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.accelerate(factor);
        }
        if (this.scene.gui.isKeyPressed("KeyS")) {
            this.accelerate(-factor);
        }
        if (this.scene.gui.isKeyPressed("KeyA")) {
            this.turn(factor);
        }
        if (this.scene.gui.isKeyPressed("KeyD")) {
            this.turn(-factor);
        }
        if (this.scene.gui.isKeyPressed("KeyR")) {
            this.reset();
        }
        if (this.scene.gui.isKeyPressed("KeyF")) {
            this.goDown(factor);
        }
        if (this.scene.gui.isKeyPressed("KeyP")) {
            this.goUp(-factor);
        }
        if (this.scene.gui.isKeyPressed("KeyO")) {
            this.backToHive();
        }
    }
}