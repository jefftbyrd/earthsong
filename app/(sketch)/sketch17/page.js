'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import * as Tone from 'tone';
import styles from '../sketch.module.scss';

const sketch = (p5) => {
  let wetMix;
  let speed;
  let meter;
  let delay;
  let player;
  let playButton;
  let reverb;
  let revMix;
  let toneStart = 0;
  let soundObjX;
  let soundObjY;
  let soundObj1;
  let radius1 = 150;
  let diameter;
  let shape1;

  class Draggable {
    constructor(x, y, w, h) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.offsetX = 0;
      this.offsetY = 0;
    }

    over() {
      // Is mouse over object
      if (
        p5.mouseX > this.x &&
        p5.mouseX < this.x + this.w &&
        p5.mouseY > this.y &&
        p5.mouseY < this.y + this.h
      ) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }

    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = p5.mouseX + this.offsetX;
        this.y = p5.mouseY + this.offsetY;
      }
    }

    show() {
      p5.stroke(0);
      // Different fill based on state
      if (this.dragging) {
        p5.fill(50);
      } else if (this.rollover) {
        p5.fill(100);
      } else {
        p5.fill(175, 200);
      }
      p5.rect(this.x, this.y, this.w, this.h);
    }

    pressed() {
      // Did I click on the rectangle?
      if (
        p5.mouseX > this.x &&
        p5.mouseX < this.x + this.w &&
        p5.mouseY > this.y &&
        p5.mouseY < this.y + this.h
      ) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - p5.mouseX;
        this.offsetY = this.y - p5.mouseY;
      }
    }

    released() {
      // Quit dragging
      this.dragging = false;
    }
  }

  p5.setup = () => {
    shape1 = new Draggable(200, 200, 100, 100);
    player = new Tone.Player({
      url: '/sounds/rattle.wav',
    }).toDestination();
    meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
    reverb = new Tone.Reverb();
    player.connect(meter);
    delay = new Tone.FeedbackDelay();
    wetMix = p5.createSlider(0, 1, 1, 0);
    wetMix.style('width', '200px');
    wetMix.position(p5.width / 2, p5.height / 2 + 60);
    revMix = p5.createSlider(0, 1, 1, 0);
    revMix.style('width', '200px');
    revMix.position(p5.width / 2, p5.height / 2 + 180);
    player.connect(delay);
    delay.connect(reverb);
    reverb.toDestination();
    speed = p5.createSlider(0.01, 4, 1, 0);
    speed.style('width', '200px');
    speed.position(p5.width / 2, p5.height / 2 + 120);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.textAlign(p5.LEFT);
    // p5.textColor('white');
    p5.noStroke();
    p5.textOutput();
    playButton = p5.createButton('play');
    playButton.position(p5.width / 2, 40);
    playButton.mousePressed(p5.play1);
    playButton.style('color', 'deeppink');
  };

  p5.draw = () => {
    shape1.over();
    shape1.update();
    shape1.show();
    delay.wet.value = wetMix.value();
    reverb.wet.value = revMix.value();
    player.playbackRate = speed.value();
    const meterLevel = meter.getValue();
    p5.background(255);
    const circleHue = p5.map(p5.mouseX, 0, p5.width, 0, 360);
    let diameter = p5.map(meterLevel, 0, 0.3, 300, 400);
    if (diameter < 300) {
      diameter = 300;
    }
    // p5.fill(circleHue, 80, 90);
    // p5.circle(p5.width / 2, p5.height / 2, diameter);
    // soundObj1 = p5.rect(30, 20, 55, 55);
    // soundObj1.move();
    // soundObj1.rollover(p5.mouseX, p5.mouseY);

    // p5.text(`${meterLevel} --- ${diameter}`, p5.width / 2, 20);
    p5.text(p5.int(wetMix.value() * 100) + '% delay', 30, 30);
    p5.text(speed.value().toFixed(2) + ' speed', 30, 90);
    p5.text(p5.int(revMix.value() * 100) + '% reverb', 30, 150);

    soundObjX = p5.width / 2;
    soundObjY = p5.height / 2;

    const d1 = p5.dist(p5.mouseX, p5.mouseY, soundObjX, soundObjY);
    // this is the distance I'm checking for in my circle.

    // this will change the fill of my circle when I hover

    soundObj1 = p5.ellipse(soundObjX, soundObjY, diameter);
    soundObj1.fill('red');

    // this if/else statement will make sure
    // the background changes color ONLY if the
    // mouseIsPressed AND the mouse is in the circle.

    // if (p5.mouseIsPressed && d1 < 100) {
    //   p5.play1();
    // }

    if (player.state === 'started') {
      soundObj1.fill('yellow');
    }
  };

  p5.mousePressed = () => {
    shape1.pressed();
  };

  p5.mouseReleased = () => {
    shape1.released();
  };

  // p5.mousePressed = () => {
  //   // Prevent default functionality.
  //   let distance = p5.dist(p5.mouseX, p5.mouseY, soundObj1.x, soundObj1.y);
  //   if (distance < diameter / 2) {
  //     soundObj1.active = true;
  //     soundObj1.color = '#f00';
  //   } else {
  //     soundObj1.active = false;
  //     soundObj1.color = '#000';
  //   }
  //   return false;
  // };

  // p5.mouseDragged = () => {
  //   if (soundObj1.active) {
  //     soundObj1.x = p5.mouseX;
  //     soundObj1.y = p5.mouseY;
  //     // break;
  //   }
  //   // Prevent default functionality.
  //   return false;
  // };

  p5.play1 = async () => {
    if (toneStart === 0) {
      await Tone.start();
      toneStart = 1;
    }
    if (player.state === 'started') {
      player.stop();
    } else {
      player.start();
    }
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
