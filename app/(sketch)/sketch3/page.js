'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import { type Sketch } from '@p5-wrapper/react';
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

const sketch = (p5) => {
  let meterLevel = 0;

  p5.setup = () => {
    p5.createCanvas(720, 400);
    p5.colorMode(p5.HSB);
    p5.textAlign(p5.CENTER);
    // p5.fill(255);
    p5.noStroke();
    p5.textOutput();
  };

  p5.updateWithProps = (props) => {
    if (props.meterLevel) {
      meterLevel = props.meterLevel;
    }
  };

  p5.draw = () => {
    p5.background(0);
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
};

export default function Sketch1() {
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef(null);
  // const meter = useRef(null);
  const [meterLevel, setMeterLevel] = useState(0);

  useEffect(() => {
    playerRef.current = new Tone.Player({
      url: '/sounds/vox.wav',
      onload: () => {
        setIsLoaded(true);
      },
    }).toDestination();
    playerRef.current.loop = true;
  }, []);

  useEffect(() => {
    const meter = new Tone.Meter();
    playerRef.current.connect(meter);
    const interval = setInterval(() => setMeterLevel(meter.getValue()), 20);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   meter.current = new Tone.Meter();
  //   playerRef.current.connect(meter.current);
  // }, []);

  // const meterLevel = () =>
  //   setInterval(() => console.log(meter.current.getValue()), 100);

  const play = () => playerRef.current.start();

  const stop = () => playerRef.current.stop();

  return (
    <>
      <div>
        <button disabled={!isLoaded} onClick={play}>
          play
        </button>
        <button onClick={stop}>stop</button>
        <p>{meterLevel}</p>
      </div>
      <NextReactP5Wrapper sketch={sketch} meterLevel={meterLevel} />
    </>
  );
}
