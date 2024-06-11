import { CGFobject } from '../lib/CGF.js';
import { MyCorolla } from './MyCorolla.js';
import { MyFlower } from './MyFlower.js';

const displacement = 15


function rotateY(vector, angle) {

    let cosTheta = Math.cos(angle);
    let sinTheta = Math.sin(angle);

    let x = vector[0];
    let y = vector[1];
    let z = vector[2];

    let rotatedX = x * cosTheta + z * sinTheta;
    let rotatedY = y;
    let rotatedZ = -x * sinTheta + z * cosTheta;

    return [rotatedX, rotatedY, rotatedZ];
}



export class MyGarden extends CGFobject {

    constructor(scene, rows, columns) {
        super(scene);
        this.rows = rows;
        this.columns = columns;
        this.initGarden();
    }

    initGarden(){
        this.matrix = []
        this.matrixDisplacementx = []
        this.matrixDisplacementz = []
        this.matrixAngle = []
        this.flowers = []

        const displacement = 15;
        
        for (let i = 0; i < this.rows; i++){
            let row = []
            let rowX = []
            let rowZ = []
            let rowAngle = []
            for (let j = 0; j < this.columns; j++){
                let flower = MyFlower.createRandomFlower(this.scene);
                let dx = Math.random() * 0.4;
                let dz = Math.random() * 0.4;
                rowX.push(dx);
                rowZ.push(dz);

                let angle = Math.random() * 2 * Math.PI
                rowAngle.push(angle)

                this.flowers.push({
                    x: (i + dx) * displacement,
                    y: 0,
                    z: (j + dz) * displacement
                });

                flower.corolla.pollenPosition = rotateY(flower.corolla.pollenPosition, angle)
                
                flower.corolla.pollenPosition[0] += (dx + i) * displacement
                flower.corolla.pollenPosition[2] += (dz + j) * displacement
                row.push(flower);
                console.log(flower.corolla.pollenPosition)
            }
            this.matrix.push(row)
            this.matrixDisplacementx.push(rowX)
            this.matrixDisplacementz.push(rowZ)

            this.matrixAngle.push(rowAngle)
        }
    }

    updateRowsAndColumns(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.initGarden();
    }

    display(){
        for (let z = 0; z < this.columns; z += 1){
            for (let x = 0; x < this.rows; x += 1){
                this.scene.pushMatrix();
                this.scene.translate((x + this.matrixDisplacementx[x][z]) * displacement, 0, (z + this.matrixDisplacementz[x][z]) * displacement);
                this.scene.rotate(this.matrixAngle[x][z], 0, 1, 0);
                this.matrix[x][z].display()
                this.scene.popMatrix(); 
            }
        }
    }
}
