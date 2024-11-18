'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import * as Tone from 'tone';
import styles from '../sketch.module.scss';

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
  let soundObj1;
  let soundObject;
  let diameter = 300;
  let dragging = false;
  let soundObjX = p5.windowWidth / 2;
  let soundObjY = p5.windowHeight / 2;
  let channel;
  let panX;
  let volY;
  let rate = 1;
  let objColor = 0.7;
  let isLoaded = false;

  p5.setup = () => {
    p5.colorMode(p5.HSB);
    player = new Tone.Player({
      url: '/sounds/32655__greysound__frogsandcrickets-excerptb-jma-24bit-48k.wav',
      onload: () => {
        isLoaded = true;
        playButton.removeAttribute('disabled');
        console.log('isLoaded', isLoaded);
      },
    });

    meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
    reverb = new Tone.Reverb();
    player.connect(meter);
    // delay = new Tone.FeedbackDelay();
    channel = new Tone.Channel();
    player.connect(channel);
    channel.connect(reverb);
    reverb.toDestination();

    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.colorMode(p5.HSB);
    p5.textAlign(p5.LEFT);
    // p5.textColor('white');
    p5.noStroke();
    p5.textOutput();
    playButton = p5.createButton('play');
    playButton.attribute('disabled', '');
    // if (!isLoaded) {
    //   // Re-enable the button
    //   playButton.attribute('disabled', '');
    // }
    // if (isLoaded) {
    //   playButton.removeAttribute('disabled');
    // }
    // playButton.removeAttribute('disabled');
    playButton.position(p5.windowWidth / 2, 40);
    playButton.mousePressed(p5.play1);
    // playButton.style('color', 'deeppink');
  };

  p5.draw = () => {
    p5.translate(-p5.width / 2, -p5.height / 2, 0); // moves our drawing origin to the top left corner
    const meterLevel = meter.getValue();
    p5.background(0);

    p5.line(0, 200, p5.windowWidth, 200);
    p5.stroke('lightblue');

    for (let i = 0; i < 48; i++) {
      let step = p5.windowWidth / 48;
      p5.line(
        step * i,
        200,
        step * i * 10 - p5.windowWidth * 4,
        p5.windowWidth,
      );
    }

    if (dragging) {
      soundObjX = p5.mouseX;
      soundObjY = p5.mouseY;
    }

    // const circleHue = p5.map(p5.mouseX, 0, p5.width, 0, 360);
    let meterRead = p5.map(meterLevel, 0, 0.3, 0, 200);
    let diameter = p5.map(soundObjY, 0, p5.windowHeight, 50, 800);
    let revWet = p5.map(soundObjY, 0, p5.windowHeight, 1, 0);
    diameter += meterRead;
    panX = p5.map(soundObjX, 0, p5.windowWidth, -1, 1);
    volY = p5.map(soundObjY, 0, p5.windowHeight, -8, 6);
    objColor = p5.map(soundObjY, 0, p5.windowHeight, 0.3, 1);
    if (panX > 1) {
      panX = 1;
    }
    if (panX < -1) {
      panX = -1;
    }
    if (revWet > 1) {
      revWet = 1;
    }
    if (revWet < 0) {
      revWet = 0;
    }
    channel.pan.value = panX;
    channel.volume.value = volY;
    reverb.wet.value = revWet;
    // if (diameter < 300) {
    //   diameter = 300;
    // }
    // p5.text(p5.int(wetMix.value() * 100) + '% delay', 30, 30);
    // p5.text(speed.value().toFixed(2) + ' speed', 30, 90);
    // p5.text(p5.int(revMix.value() * 100) + '% reverb', 30, 150);

    // soundObjX = p5.width / 2;
    // soundObjY = p5.height / 2;

    let d1 = p5.dist(p5.mouseX, p5.mouseY, soundObjX, soundObjY);
    // this is the distance I'm checking for in my circle.

    // this will change the fill of my circle when I hover

    // if (d1 < 100) {
    //   p5.fill('yellow');
    // } else {
    //   p5.fill('red');
    // }

    soundObj1 = p5.ellipse(soundObjX, soundObjY, diameter);
    soundObj1.fill(`rgba(255, 0, 0, ${objColor})`);
    // soundObj1.brightness = 100;
    // p5.brightness = 0;
    // p5.fill(125);

    // this if/else statement will make sure
    // the background changes color ONLY if the
    // mouseIsPressed AND the mouse is in the circle.

    // if (player.state === 'started') {
    //   soundObj1.fill('yellow');
    // }

    if (p5.keyIsPressed === true) {
      if (p5.key === 'w' && d1 < 100) {
        rate += 0.02;
      } else if (p5.key === 's' && d1 < 100) {
        rate -= 0.02;
      } else if (p5.key === 'd' && d1 < 100) {
        rate = 1;
      }
    }
    if (rate > 4) {
      rate = 4;
    }
    if (rate < 0.01) {
      rate = 0.01;
    }
    player.playbackRate = rate;
    p5.textSize(30);
    p5.text(`X: ${soundObjX}`, 30, 60);
    p5.text(`Y: ${soundObjY}`, 30, 100);
    p5.text(`Pan: ${panX.toFixed(2)}`, 30, 140);
    p5.text(`Vol: ${volY.toFixed(2)}`, 30, 180);
    p5.text(`Rate: ${player.playbackRate.toFixed(2)}`, 30, 220);
    p5.text(`Reverb: ${reverb.wet.value.toFixed(2)}`, 30, 260);
  }; // End DRAW

  p5.mousePressed = () => {
    // check if mouse is over the ellipse
    if (p5.dist(soundObjX, soundObjY, p5.mouseX, p5.mouseY) < diameter / 2) {
      dragging = true;
    }
  };

  p5.mouseReleased = () => {
    dragging = false;
  };

  // p5.enableButton = () => {
  //   if (isLoaded === true) {
  //     // Re-enable the button
  //     button.removeAttribute('disabled');
  //   }
  // };

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
