'use client';
// import 'p5/lib/addons/p5.sound';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { type Sketch } from '@p5-wrapper/react';
// import p5 from 'p5';
// import p5Types from 'p5';
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
  // let sound, amp, cnv;

  // p5.preload = () => {
  //   p5.sound = p5.loadSound(
  //     'https://tonejs.github.io/audio/berklee/gong_1.mp3',
  //   );
  // };

  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    // mousePressed(p5.playSound);
    // new p5.Amplitude();
    // new p5.sound.connect(amp);
  };

  //   p5.playSound = () => {
  //     p5.sound.play();
  //   };

  p5.draw = () => {
    p5.level = p5.amp.getLevel();
    p5.level = p5.map(level, 0, 0.2, 0, 255);
    p5.background(level, 0, 0);
    p5.text('tap to play', width / 2, 20);
  };
};

export default function Page() {
  return <NextReactP5Wrapper sketch={sketch2} />;
}
