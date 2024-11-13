'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import * as Tone from 'tone';

const sketch = (p5) => {
  const player = new Tone.Player({
    url: '/sounds/vox.wav',
  }).toDestination();

  const meter = new Tone.Meter();
  player.connect(meter);

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.textAlign(p5.CENTER);
    p5.noStroke();
    p5.textOutput();
    const button1 = p5.createButton('p5 play');
    button1.position(p5.width / 2, 40);
    button1.mousePressed(p5.play1);
  };

  p5.draw = () => {
    const meterLevel = meter.getValue();
    console.log('meterLevel', meterLevel);
    p5.background(0);
    const circleHue = p5.map(p5.mouseX, 0, p5.width, 0, 360);
    const diameter = p5.map(meterLevel, -50, -20, 20, 300);
    p5.fill(circleHue, 80, 90);
    p5.circle(p5.width / 2, p5.height / 2, diameter);
    p5.text(`${meterLevel} --- ${diameter}`, p5.width / 2, 20);
  };

  p5.play1 = () => {
    player.start();
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
