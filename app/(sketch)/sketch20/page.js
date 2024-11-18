'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import * as Tone from 'tone';

const sketch = (p5) => {
  let x = 200;
  let y = 200;
  let diameter = 20;
  let dragging = false;

  p5.setup = () => {
    p5.createCanvas(400, 300);
  };

  p5.draw = () => {
    p5.background('lightskyblue');

    // if dragging is true
    // set x, y to mouseX, mouseY
    if (dragging) {
      x = p5.mouseX;
      y = p5.mouseY;
    }

    p5.noStroke();
    p5.ellipse(x, y, diameter, diameter);
  }; // end draw

  // when mouse is pressed,
  // check if mouse is intersecting w/ circle */
  p5.mousePressed = () => {
    // check if mouse is over the ellipse
    if (p5.dist(x, y, p5.mouseX, p5.mouseY) < diameter / 2) {
      dragging = true;
    }
  };

  p5.mouseReleased = () => {
    dragging = false;
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
