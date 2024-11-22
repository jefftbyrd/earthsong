'use client';
// import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import { type Sketch } from '@p5-wrapper/react';
// import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export const wind = (p5) => {
  let n1Button;
  let n2Button;
  // let startNoiseSynth1;
  let noise1;
  let filter1;
  let filter2;
  let filtFreqSlider1;
  let filtFreqSlider2;
  let filtQslider1;
  let filtQslider2;
  let drift1 = 250;
  let drift2 = 400;
  let volume1;
  let volume2;
  let noise2;
  let feedbackDelay2;
  let channel2;

  p5.setup = () => {
    p5.createCanvas(800, 800);
    noise1 = new Tone.Noise('pink');
    filter1 = new Tone.Filter(1500, 'lowpass').toDestination();
    noise1.connect(filter1);
    noise2 = new Tone.Noise('pink');
    filter2 = new Tone.Filter(1500, 'bandpass');
    channel2 = new Tone.Channel().toDestination();
    noise2.connect(filter2);
    filter2.connect(channel2);
    n2Button = p5.createButton('start');
    n2Button.position(300, 10);
    n2Button.mousePressed(startWind);
  };

  p5.updateWithProps = (props) => {
    if (props.startWind && noise1.state === 'stopped') {
      startWind();
    }
  };

  function startWind() {
    noise1.start();
    noise2.start();
  }

  p5.draw = () => {
    p5.background(200);
    drift1 += p5.random(-5, 5);
    if (drift1 < 170) {
      drift1 = 170;
    }
    if (drift1 > 300) {
      drift1 = 300;
    }
    filter1.frequency.value = drift1;
    filter1.Q.value = 7.6;
    noise1.volume.value = -6;
    let drift3 = p5.random(0.5, -0.5);
    noise2.volume.value = 0;
    let baseFreq2 = 500;
    baseFreq2 += p5.random(-50, 50);
    filter2.frequency.value = baseFreq2;
    drift2 += p5.random(-0.05, 0.05);
    if (drift2 > 0.4) {
      drift2 = 0.4;
    }
    if (drift2 < -0.4) {
      drift2 = -0.4;
    }
    filter2.Q.value = 12 + drift3;
    channel2.pan.value = drift2;
  };
};

// export default function Sketch1() {
//   return <NextReactP5Wrapper sketch={sketch} />;
// }
