'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import { type Sketch } from '@p5-wrapper/react';
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

const sketch = (p5) => {
  let meterLevel = 0;

  p5.setup = () => {
    p5.createCanvas(720, 400);
    // p5.cnv.mousePressed(p5.playSound);
    p5.textAlign(p5.CENTER);
    p5.fill(255);
    // p5.amp = new p5.Amplitude();
    // p5.sound.connect(p5.amp);
    p5.describe(
      'The color of the background changes based on the amplitude of the sound.',
    );
  };

  p5.updateWithProps = (props) => {
    if (props.meterLevel) {
      meterLevel = props.meterLevel;
    }
  };

  p5.draw = () => {
    // p5.background(0);
    // let level = amp.getLevel();
    let meterMap = meterLevel;
    meterMap = p5.map(meterMap, -40, -20, 0, 255);
    p5.background(meterMap, 0, 0);
    p5.text(`${meterLevel}, ${meterMap}`, p5.width / 2, 20);
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
      </div>
      <NextReactP5Wrapper sketch={sketch} meterLevel={meterLevel} />
    </>
  );
}
