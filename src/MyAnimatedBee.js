import { MyBee } from "./MyBee.js";

export class MyAnimatedBee {
    constructor(scene, s=0, e=5, st=3, d=2) {
        this.scene = scene;
        this.Bee = new MyBee(this.scene, 0, 0, 0);
        this.startVal=s;
        this.endVal=e;
        this.animStartTimeSecs=st;
        this.animDurationSecs=d;
        this.length=(this.endVal-this.startVal);

        this.animVal=this.startVal;
    }

    tween(y) {
        return Math.sin(y* 10);
    }

    update(timeSinceAppStart, speedFactor, scaleFactor, garden)
    {
      var elapsedTimeSecs=timeSinceAppStart-this.animStartTimeSecs;

      if (elapsedTimeSecs>=0 && elapsedTimeSecs<=this.animDurationSecs)
          this.animVal=this.startVal + this.tween(elapsedTimeSecs/3) * this.length;
        
      this.Bee.update(timeSinceAppStart, speedFactor, scaleFactor, garden);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0,this.animVal,0);

        this.Bee.display();

        this.scene.popMatrix();
    }

}