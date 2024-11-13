'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import { type Sketch } from '@p5-wrapper/react';
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

const sketch = (p5) => {
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

export default function Sketch1() {
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current = new Tone.Player({
      url: 'https://cdn.freesound.org/previews/320/320466_4536481-lq.mp3',
      onload: () => {
        setIsLoaded(true);
      },
    }).toDestination();
  }, []);

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
      <NextReactP5Wrapper sketch={sketch} />
    </>
  );
}
