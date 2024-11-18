'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import * as Tone from 'tone';

// import styles from '../sketch.module.scss';

const sketch = (p5) => {
  let bubbles = [],
    synth,
    sampleDraw,
    playRate;

  // let synth;

  p5.setup = () => {
    p5.createCanvas(600, 400);
    for (let i = 0; i < 10; i++) {
      let x = p5.random(p5.width);
      let y = p5.random(p5.height);
      let r = p5.random(20, 60);
      let b = new Bubble(x, y, r);
      bubbles.push(b);
    }
    bubbles.forEach((e) => e.initSound());
  };

  p5.draw = () => {
    p5.background(0);
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].rollover(p5.mouseX, p5.mouseY);
      bubbles[i].move();
      bubbles[i].show();
    }
  };

  class Bubble {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.brightness = 0;
      this.isClicked = false;
    }

    rollover(px, py) {
      let d = p5.dist(px, py, this.x, this.y);
      if (d < this.r) {
        // boolean flag
        // use for anytime you want somethign to only happen once
        // if the mouse is pressed set clicked to true
        // directly after the mouse is pressed set it to false to remove double triggers
        if (p5.mouseIsPressed && !this.isClicked) {
          // switch the boolean so we don't get
          // double triggers
          // we need this since mouseIsPressed will
          // happen continuously in the draw loop
          this.isClicked = true;
          console.log(this.isClicked);
          this.playSound();
        }

        this.brightness = 255;
      } else {
        // reset the boolean flag when we move
        // off the circle
        if (this.isClicked) {
          this.isClicked = false;
        }

        this.brightness = 0;
      }
    }

    move() {
      this.x = this.x + p5.random(-2, 2);
      this.y = this.y + p5.random(-2, 2);
    }

    show() {
      p5.stroke(255);
      p5.strokeWeight(4);
      p5.fill(this.brightness, 125);
      p5.ellipse(this.x, this.y, this.r * 2);
    }

    initSound() {
      this.synth = new Tone.Synth().toDestination();
    }

    playSound() {
      // console.log(this.x);
      let volume = p5.map(this.y, p5.height, 0, -30, -6);
      console.log(volume);
      this.synth.volume.value = volume;
      this.synth.triggerAttackRelease(this.x, 1);
    }
  }
};

export default function Sketch11() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
