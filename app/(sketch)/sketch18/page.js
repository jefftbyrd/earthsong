'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import * as Tone from 'tone';

const sketch = (p5) => {
  // Define variables.
  let radius = 25;
  let circles = [
    { x: 50, y: 50, color: ' #000', active: false },
    { x: 150, y: 50, color: '#000', active: false },
    { x: 250, y: 50, color: '#000', active: false },
  ];

  // Set up canvas.
  p5.setup = () => {
    // Create canvas using width/height of window.
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.ellipseMode(p5.RADIUS);
  };

  // Draw on the canvas.
  p5.draw = () => {
    p5.background('#fff');
    if (circles.length > 0) {
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        p5.noStroke();
        p5.fill(circle.color);
        p5.ellipse(circle.x, circle.y, radius, radius);
      }
    }
  };

  // Run when the mouse/touch is down.
  p5.mousePressed = () => {
    if (circles.length > 0) {
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i],
          distance = p5.dist(p5.mouseX, p5.mouseY, circle.x, circle.y);
        if (distance < radius) {
          circle.active = true;
          circle.color = '#f00';
        } else {
          circle.active = false;
          circle.color = '#000';
        }
      }
    }
    // Prevent default functionality.
    return false;
  };

  // Run when the mouse/touch is dragging.
  p5.mouseDragged = () => {
    if (circles.length > 0) {
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        if (circle.active) {
          circle.x = p5.mouseX;
          circle.y = p5.mouseY;
          break;
        }
      }
    }
    // Prevent default functionality.
    return false;
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
