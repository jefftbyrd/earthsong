'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import * as Tone from 'tone';

const sketch = (p5) => {
  let wetMix;
  let speed;
  let meter;
  let delay;
  let player;
  let playButton;
  let reverb;
  let revMix;
  // let soundObj1;
  let toneStart = 0;
  let soundObjX;
  let soundObjY;
  let soundObj1;
  const synth = window.speechSynthesis;
  let pitchMultiplier;
  let rateMultiplier;
  let utterance;

  p5.setup = () => {
    player = new Tone.Player({
      url: '/sounds/vox.wav',
    }).toDestination();
    meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
    reverb = new Tone.Reverb();
    player.connect(meter);
    delay = new Tone.FeedbackDelay();
    // synth.connect(delay);
    wetMix = p5.createSlider(0, 1, 1, 0);
    wetMix.style('width', '200px');
    wetMix.position(p5.width / 2, p5.height / 2 + 60);
    revMix = p5.createSlider(0, 1, 1, 0);
    revMix.style('width', '200px');
    revMix.position(p5.width / 2, p5.height / 2 + 180);
    player.connect(delay);
    delay.connect(reverb);
    reverb.toDestination();
    speed = p5.createSlider(0.01, 4, 1, 0);
    speed.style('width', '200px');
    speed.position(p5.width / 2, p5.height / 2 + 120);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.textAlign(p5.LEFT);
    // p5.textColor('white');
    p5.noStroke();
    p5.textOutput();
    playButton = p5.createButton('play');
    playButton.position(p5.width / 2, 40);
    playButton.mousePressed(p5.play1);
    playButton.style('color', 'deeppink');
  };

  p5.draw = () => {
    delay.wet.value = wetMix.value();
    reverb.wet.value = revMix.value();
    player.playbackRate = speed.value();
    const meterLevel = meter.getValue();
    p5.background(0);
    const circleHue = p5.map(p5.mouseX, 0, p5.width, 0, 360);
    let diameter = p5.map(meterLevel, 0, 0.3, 300, 400);
    if (diameter < 300) {
      diameter = 300;
    }
    // p5.fill(circleHue, 80, 90);
    // p5.circle(p5.width / 2, p5.height / 2, diameter);
    // soundObj1 = p5.rect(30, 20, 55, 55);
    // soundObj1.move();
    // soundObj1.rollover(p5.mouseX, p5.mouseY);

    p5.text(`${meterLevel} --- ${diameter}`, p5.width / 2, 20);
    p5.text(p5.int(wetMix.value() * 100) + '% delay', 30, 30);
    p5.text(speed.value().toFixed(2) + ' speed', 30, 90);
    p5.text(p5.int(revMix.value() * 100) + '% reverb', 30, 150);

    soundObjX = p5.width / 2;
    soundObjY = p5.height / 2;

    const d1 = p5.dist(p5.mouseX, p5.mouseY, soundObjX, soundObjY);
    // this is the distance I'm checking for in my circle.

    // this will change the fill of my circle when I hover

    // if (d1 < 100) {
    //   p5.fill('yellow');
    // } else {
    //   p5.fill('red');
    // }

    soundObj1 = p5.ellipse(soundObjX, soundObjY, diameter);
    soundObj1.fill('red');

    // this if/else statement will make sure
    // the background changes color ONLY if the
    // mouseIsPressed AND the mouse is in the circle.

    if (p5.mouseIsPressed && d1 < 100) {
      p5.play1();
    }

    if (player.state === 'started') {
      soundObj1.fill('yellow');
    }

    pitchMultiplier = p5.map(p5.mouseX, 0, p5.height, 0.1, 2.0);
    rateMultiplier = p5.map(p5.mouseX, 0, p5.height, 0.1, 2.0);
  };

  // p5.mousePressed = async () => {
  //   if (toneStart === 0) {
  //     await Tone.start();
  //     toneStart = 1;
  //   }
  //   if (player.state === 'started') {
  //     player.stop();
  //   } else {
  //     player.start();
  //   }
  // };

  // p5.move = () => {
  //   this.x = this.x + p5.random(-2, 2);
  //   this.y = this.y + p5.random(-2, 2);
  // };

  // p5.play1 = async () => {
  //   if ((toneStart = 0)) {
  //     await Tone.start();
  //     toneStart = 1;
  //   }
  //   player.start();
  //   started = !started;
  //   if (!started) {
  //     player.stop();
  //   }
  //   console.log('player state', player.state);
  // };

  p5.mousePressed = () => {
    utterance = new SpeechSynthesisUtterance('dog' + p5.mouseX);
    utterance.pitch = pitchMultiplier;
    utterance.rate = rateMultiplier;
    synth.speak(utterance);
  };

  p5.play1 = async () => {
    if (toneStart === 0) {
      await Tone.start();
      toneStart = 1;
    }
    if (player.state === 'started') {
      player.stop();
    } else {
      player.start();
    }
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
