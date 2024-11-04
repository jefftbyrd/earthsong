'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { type Sketch } from '@p5-wrapper/react';
import * as Tone from 'tone';

// import React from 'react';

const sketch: Sketch = (p5) => {
  let multiPlayer, button1, button2, button3, button4, stopButton;

  function preload() {
    multiPlayer = new Tone.Players({
      1: 'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
      2: 'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
      3: 'https://cdn.freesound.org/previews/11/11700_2-hq.mp3',
      4: 'https://cdn.freesound.org/previews/437/437418_6086320-hq.mp3',
    }).toDestination();
  }

  function setup() {
    createCanvas(600, 500);
    console.log(Tone);

    button1 = createButton('1');
    button1.position(50, height / 3);
    button1.mousePressed(play1);

    button2 = createButton('2');
    button2.position(135, height / 2);
    button2.mousePressed(play2);

    button3 = createButton('3');
    button3.position(230, height / 3);
    button3.mousePressed(play3);

    button4 = createButton('4');
    button4.position(320, height / 6);
    button4.mousePressed(play4);

    stopButton = createButton('stop all sounds');
    stopButton.position(width / 2, height * 0.66);
    stopButton.mousePressed(stopSound);
  }

  function play1() {
    multiPlayer.player('1').start();
  }

  function play2() {
    multiPlayer.player('2').start();
  }

  function play3() {
    multiPlayer.player('3').start();
  }

  function play4() {
    multiPlayer.player('4').start();
  }

  function stopSound() {
    multiPlayer.stopAll();
  }
  // p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);
  // p5.draw = () => {
  //   p5.background(250);
  //   p5.normalMaterial();
  //   p5.push();
  //   p5.rotateZ(p5.frameCount * 0.01);
  //   p5.rotateX(p5.frameCount * 0.01);
  //   p5.rotateY(p5.frameCount * 0.01);
  //   p5.plane(100);
  //   p5.pop();
  // };
};

export default function Player() {
  return (
    <>
      {/* <h1>this is a test</h1> */}
      <NextReactP5Wrapper sketch={sketch} />
    </>
  );
}
