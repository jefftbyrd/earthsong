'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { type Sketch } from '@p5-wrapper/react';
import React from 'react';

const sketch1: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

const sketch2: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(720, 400);
    p5.colorMode(p5.HSB);
    p5.noStroke();
    p5.textOutput();
  };

  p5.draw = () => {
    p5.background(0);
    const circleHue = p5.map(p5.mouseX, 0, p5.width, 0, 360);
    const diameter = p5.map(p5.mouseY, 0, p5.height, 20, 300);
    p5.fill(circleHue, 80, 90);
    p5.circle(p5.width / 2, p5.height / 2, diameter);
  };
};

const sketch3: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.noStroke();
    p5.textOutput();
  };

  p5.draw = () => {
    p5.background(0);
    const circleHue = p5.map(p5.mouseX, 0, p5.width, 0, 360);
    const diameter = p5.map(p5.mouseY, 0, p5.height, 20, p5.height * 0.9);
    p5.fill(circleHue, 80, 90);
    p5.circle(p5.width / 2, p5.height / 2, diameter);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export default function Page() {
  return <NextReactP5Wrapper sketch={sketch3} />;
}
