'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import { type Sketch } from '@p5-wrapper/react';
// import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export const sketch = (p5) => {
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
    // filter.frequency.rampTo(20000, 10);
    noise1.connect(filter1);

    n1Button = p5.createButton('noise 1');
    n1Button.position(10, 10);
    n1Button.mousePressed(startNoise1);

    // filtFreqSlider1 = p5.createSlider(1, 10000, 200, 1);
    // filtFreqSlider1.style('width', '200px');
    // filtFreqSlider1.position(10, 40);

    // filtQslider1 = p5.createSlider(0, 20, 10, 0.1);
    // filtQslider1.style('width', '200px');
    // filtQslider1.position(10, 66);

    // volume1 = p5.createSlider(-20, 6, 0, 1);
    // volume1.style('width', '200px');
    // volume1.position(10, 100);

    noise2 = new Tone.Noise('pink');
    filter2 = new Tone.Filter(1500, 'bandpass');
    // feedbackDelay2 = new Tone.FeedbackDelay('2n', 0.7).toDestination();
    channel2 = new Tone.Channel().toDestination();
    noise2.connect(filter2);
    filter2.connect(channel2);
    // filter2.connect(feedbackDelay2);

    n2Button = p5.createButton('noise 2');
    n2Button.position(300, 10);
    n2Button.mousePressed(startNoise2);

    // filtFreqSlider2 = p5.createSlider(1, 5000, 200, 1);
    // filtFreqSlider2.style('width', '200px');
    // filtFreqSlider2.position(300, 40);

    // filtQslider2 = p5.createSlider(0, 20, 10, 0.1);
    // filtQslider2.style('width', '200px');
    // filtQslider2.position(300, 66);

    // volume2 = p5.createSlider(-20, 6, 0, 1);
    // volume2.style('width', '200px');
    // volume2.position(300, 100);
  };

  function startNoise1() {
    noise1.start();
  }

  function startNoise2() {
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
    // p5.text(`filt 1 freq: ${filter1.frequency.value.toFixed(2)}`, 10, 130);
    // p5.text(`filt 1 Q: ${filter1.Q.value}`, 10, 160);
    // noiseSynth1.triggerAttackRelease('2n', 1);

    // let baseQ2 = filtQslider2.value();
    let drift3 = p5.random(0.5, -0.5);
    noise2.volume.value = 0;
    // filter2.frequency.value = filtFreqSlider2.value();
    // let baseFreq2 = filtFreqSlider2.value();
    let baseFreq2 = 500;
    baseFreq2 += p5.random(-50, 50);
    // baseFreq2 += p5.random(-15, 15);
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
    // p5.text(`filt 2 freq: ${filter2.frequency.value.toFixed(2)}`, 300, 130);
    // p5.text(`filt 2 Q: ${filter2.Q.value.toFixed(2)}`, 300, 150);
    // p5.text(`noise 2 pan: ${channel2.pan.value.toFixed(2)}`, 300, 170);
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
