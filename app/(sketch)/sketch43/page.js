'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import { type Sketch } from '@p5-wrapper/react';
// import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export const sketch = (p5) => {
  let noiseSynth1;
  let noiseSynth2;
  let ns1Button;
  // let startNoiseSynth1;
  let noise;
  let autoFilter;

  let now;

  p5.setup = () => {
    noise = new Tone.Noise('white');
    autoFilter = new Tone.AutoFilter({
      frequency: '2n',
      baseFrequency: 200,
      octaves: 1,
    }).toDestination();
    // .start();
    noise.connect(autoFilter);
    // autoFilter.start();
    ns1Button = p5.createButton('startNoiseSynth1');
    ns1Button.position(p5.width / 2 - 50, p5.height / 2 - 10);
    ns1Button.mousePressed(startNoise);

    p5.createCanvas(800, 800);
  };

  function startNoise() {
    noise.start();
    autoFilter.start();
  }

  p5.draw = () => {
    p5.background(200);
    // noiseSynth1.triggerAttackRelease('2n', 1);
  };

  // async function startNoiseSynth1() {
  //   await Tone.start();
  //   noiseSynth1.triggerAttackRelease('8n', 0.05);
  // }

  // p5.play1 = async () => {
  //   await Tone.start();
  //   noiseSynth1.triggerAttackRelease('8n', 0.05);
  // };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
