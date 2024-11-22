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

  let now;

  p5.setup = () => {
    // noiseSynth1 = new Tone.NoiseSynth().toDestination();
    noiseSynth1 = new Tone.NoiseSynth({
      mute: false,
      volume: -9.999999999999998,
      fadeIn: 0,
      fadeOut: 0,
      playbackRate: 1,
      type: 'brown',
    }).toDestination();

    noiseSynth2 = new Tone.NoiseSynth({
      noise: {
        type: white,
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
      },
    }).toDestination();
    // noiseSynth1.set('noise.type', 'brown');
    // noiseSynth1.volume.value = -6;
    ns1Button = p5.createButton('startNoiseSynth1');
    ns1Button.position(p5.width / 2 - 50, p5.height / 2 - 10);
    ns1Button.mousePressed(startNoiseSynth1);

    p5.createCanvas(800, 800);
  };

  function startNoiseSynth1() {
    // await Tone.start();
    noiseSynth1.triggerAttackRelease(1, 12, now);
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
