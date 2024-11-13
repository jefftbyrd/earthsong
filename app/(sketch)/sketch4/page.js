'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import { type Sketch } from '@p5-wrapper/react';
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

// useEffect(() => {
//   const meter = new Tone.Meter();
//   player.connect(meter);
//   const interval = setInterval(() => setMeterLevel(meter.getValue()), 20);

//   return () => {
//     clearInterval(interval);
//   };
// }, []);

const sketch = (p5) => {
  // let meterLevel = 0;
  // const [meterLevel, setMeterLevel] = useState(0);

  const player = new Tone.Player({
    url: '/sounds/vox.wav',
    // onload: () => {
    //   setIsLoaded(true);
    // },
  }).toDestination();

  const meter = new Tone.Meter();
  player.connect(meter);
  // const interval = setInterval(() => setMeterLevel(meter.getValue()), 20);

  // const meter = new Tone.Meter();
  // player.connect(meter);
  const meterLevel = setInterval(() => meter.getValue(), 500);
  console.log('meterLevel', meterLevel);
  // const intervalID = setInterval(() => meter.getValue(), 100);

  // console.log('meterLevel', meterLevel);

  // p5.preload = () => {
  //   const player = new Tone.Player({
  //     url: '/sounds/vox.wav',
  //     // onload: () => {
  //     //   setIsLoaded(true);
  //     // },
  //   }).toDestination();
  // }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.textAlign(p5.CENTER);
    // p5.fill(255);
    p5.noStroke();
    p5.textOutput();
    const button1 = p5.createButton('p5 play');
    button1.position(p5.width / 2, 40);
    button1.mousePressed(p5.play1);
  };

  p5.draw = () => {
    p5.background('pink');
    const circleHue = p5.map(p5.mouseX, 0, p5.width, 0, 360);
    // let meterMap = meterLevel;
    const diameter = p5.map(meterLevel, -100, -20, 20, 300);
    // const diameter = p5.map(p5.mouseY, 0, p5.height, 20, 300);
    p5.fill(circleHue, 80, 90);
    p5.circle(p5.width / 2, p5.height / 2, diameter);
    // p5.background(0);
    // let level = amp.getLevel();
    // p5.background(meterMap, 0, 0);
    p5.text(`${meterLevel}, ${diameter}`, p5.width / 2, 20);
  };

  p5.play1 = () => {
    player.start();
  };
};

export default function Sketch1() {
  // const [isLoaded, setIsLoaded] = useState(false);
  // const playerRef = useRef(null);
  // const [meterLevel, setMeterLevel] = useState(0);

  // useEffect(() => {
  //   playerRef.current = new Tone.Player({
  //     url: '/sounds/vox.wav',
  //     onload: () => {
  //       setIsLoaded(true);
  //     },
  //   }).toDestination();
  //   playerRef.current.loop = true;
  // }, []);

  // useEffect(() => {
  //   const meter = new Tone.Meter();
  //   playerRef.current.connect(meter);
  //   const interval = setInterval(() => setMeterLevel(meter.getValue()), 20);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // useEffect(() => {
  //   meter.current = new Tone.Meter();
  //   playerRef.current.connect(meter.current);
  // }, []);

  // const meterLevel = () =>
  //   setInterval(() => console.log(meter.current.getValue()), 100);

  // const play = () => playerRef.current.start();

  // const stop = () => playerRef.current.stop();

  return (
    <>
      <NextReactP5Wrapper sketch={sketch} />
    </>
  );
}
