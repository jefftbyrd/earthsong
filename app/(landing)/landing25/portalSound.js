// 'use client';
// import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

// import uniqolor from 'uniqolor';
// import styles from './sketch.module.scss';

export const portalSound = (p5) => {
  let bins = 64;

  let scl = 2;
  let strip;
  let strips = [];

  let fft;
  let waveforms = [];
  let waveform;

  var col = {
    r: 0,
    g: 0,
    b: 0,
  };
  let shapes = [],
    sampleDraw,
    playRate;
  let multiPlayer;
  let sounds2;
  let sounds3;
  let player;
  let shapesButton;
  let analyzer;

  p5.updateWithProps = (props) => {
    if (props.soundsColor) {
      sounds2 = [...props.soundsColor];
    }
    if (props.soundsColor && shapes.length < 1) {
      generateShapes();
    }
    if (props.playerTarget && multiPlayer.player(props.playerTarget).loaded) {
      playSound2(props.playerTarget);
    }
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    multiPlayer = new Tone.Players();

    // 32 bins
    // fft = new Tone.FFT();
    waveform = new Tone.Waveform();
    multiPlayer.connect(waveform);

    // analyzer = new Tone.FFT(512);
    // multiPlayer.connect(analyzer);
  }; // END SETUP

  function generateShapes() {
    sounds2.map((sound) => {
      let x = p5.random(p5.width);
      let y = p5.random(p5.height);
      let id = sound.id;
      let name = sound.name;
      let bg = sound.color;
      let url = sound.url;
      let b = new Shape(x, y, id, name, bg, url);
      shapes.push(b);
    });
    generatePlayers();
  }

  function generatePlayers() {
    for (let i = 0; i < shapes.length; i++) {
      // shapes[i].rollover();
      // shapes[i].move();
      shapes[i].players();
      // shapes[i].showName();
    }
  }

  p5.draw = () => {
    p5.background(0);
    // p5.line(0, 200, p5.windowWidth, 200);
    p5.stroke('lightblue');

    for (let i = 0; i < 48; i++) {
      let step = p5.windowWidth / 48;
      p5.line(step * i, 0, step * i * 10 - p5.windowWidth * 4, p5.windowWidth);
    }

    // let frequencyData = analyzer.getValue();

    // p5.beginShape();
    // p5.vertex(0, p5.height);
    // for (let i = 0; i < frequencyData.length; i++) {
    //   let x = p5.map(p5.log(i), 0, p5.log(frequencyData.length), 0, p5.width);
    //   let y = p5.map(frequencyData[i], -127, 0, p5.height, 0);
    //   p5.vertex(x, y);
    // }
    // p5.vertex(p5.width, p5.height);
    // p5.endShape();

    for (let i = 0; i < shapes.length; i++) {
      shapes[i].show();
      shapes[i].audioControls();
    }

    let frequencyData = waveform.getValue();
    p5.beginShape();
    p5.noFill();
    for (let i = 0; i < frequencyData.length; i++) {
      let y = p5.map(frequencyData[i], -1, 1, p5.height / 2, 0) - 100;
      p5.vertex(i * scl, y);
    }
    p5.endShape();
  }; // END DRAW

  p5.keyPressed = () => {
    if (p5.key === '1') {
      playSound2(shapes[0].id);
    }
    if (p5.key === '2') {
      playSound2(shapes[1].id);
    }
    if (p5.key === '3') {
      playSound2(shapes[2].id);
    }
    if (p5.key === '4') {
      playSound2(shapes[3].id);
    }
    if (p5.key === '5') {
      playSound2(shapes[4].id);
    }
  };

  function playSound2(id) {
    if (multiPlayer.player(id).loaded) {
      if (multiPlayer.player(id).state === 'started') {
        multiPlayer.player(id).stop();
      } else {
        multiPlayer.player(id).start();
      }
    }
  }

  class Shape {
    constructor(x, y, id, name, bg, url) {
      this.x = x;
      this.y = y;
      this.isClicked = false;
      this.id = id;
      this.name = name;
      this.bg = bg;
      this.url = url;
      this.rate = 1;
      this.volBase = 0;
      this.reverse = false;
    }

    move() {
      this.x = this.x + p5.random(-2, 2);
      this.y = this.y + p5.random(-2, 2);
    }

    show() {
      if (multiPlayer.player(this.id).loaded) {
        if (multiPlayer.player(this.id).state === 'started') {
          p5.fill(this.bg);
          p5.select(`.s${this.id}`).attribute(
            'style',
            `background-color:${this.bg}`,
          );
        } else {
          p5.fill(this.bg.replace('1)', '0.75)'));
          p5.select(`.s${this.id}`).attribute(
            'style',
            `background-color:${this.bg.replace('1)', '0.75)')}`,
          );
        }
      } else if (!multiPlayer.player(this.id).loaded) {
        p5.fill(this.bg.replace('1)', '0)'));
        p5.select(`.s${this.id}`).attribute(
          'style',
          `background-color:${this.bg.replace('1)', '0)')}`,
        );
      }
      this.diameter =
        p5.map(this.y, 0, p5.windowHeight, 50, 800) + this.meterMap;
      p5.ellipse(this.x, this.y, this.diameter);
    }

    players() {
      multiPlayer.add(this.id, this.url, () => {
        // console.log(`${this.id} loaded`);
      });
      multiPlayer.player(this.id).loop = true;
      multiPlayer.player(this.id).fadeIn = 0.1;
      multiPlayer.player(this.id).fadeOut = 0.3;
      this.meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
      this.channel = new Tone.Channel();
      this.reverb = new Tone.Reverb();
      multiPlayer.player(this.id).connect(this.meter);
      multiPlayer.player(this.id).connect(this.channel);
      this.channel.connect(this.reverb);
      this.reverb.toDestination();
    }
    audioControls() {
      this.meterLevel = this.meter.getValue();
      this.meterMap = p5.map(this.meterLevel, 0, 0.3, 0, 200);
      this.revWet = p5.map(this.y, 0, p5.windowHeight, 1, 0);
      this.panX = p5.map(this.x, 0, p5.windowWidth, -1, 1);

      if (this.panX > 1) {
        this.panX = 1;
      }
      if (this.panX < -1) {
        this.panX = -1;
      }
      if (this.revWet > 1) {
        this.revWet = 1;
      }
      if (this.revWet < 0) {
        this.revWet = 0;
      }
      this.channel.pan.value = this.panX;
      this.reverb.wet.value = this.revWet;

      this.d = p5.dist(p5.mouseX, p5.mouseY, this.x, this.y);
      if (this.d < this.diameter / 2) {
        if (p5.keyIsPressed === true) {
          if (p5.key === 'd') {
            this.rate += 0.02;
          }
          if (p5.key === 'a') {
            this.rate -= 0.02;
          }
          if (p5.key === 's') {
            this.rate = 1;
          }
          if (p5.key === 'e') {
            this.volBase += 0.3;
          }
          if (p5.key === 'q') {
            this.volBase -= 0.3;
          }
          if (p5.key === 'w') {
            this.volBase = 0;
          }
        }

        p5.keyTyped = () => {
          if (p5.key === 'r' && this.d < this.diameter / 2) {
            // Reverse sound by typing R
            this.toggleValue = (value) => !value;
            multiPlayer.player(this.id).reverse = this.toggleValue;
            // p5.select(`.s${this.id} h3`).attribute(
            //   'style',
            //   `color:rgba(181, 0, 78, 1)`,
            // );
            this.switch = p5.select(`.s${this.id} h3`);
            this.switch.toggleClass('reversed');
          }
        };

        if (this.rate > 4) {
          this.rate = 4;
        }
        if (this.rate < 0.05) {
          this.rate = 0.05;
        }
        if (this.volBase > 12) {
          this.volBase = 12;
        }
        if (this.volBase < -12) {
          this.volBase = -12;
        }
        this.volY = p5.map(this.y, 0, p5.windowHeight, -8, 6);
        this.channel.volume.value = this.volY + this.volBase;

        multiPlayer.player(this.id).playbackRate = this.rate;
      }
    }
  } // END SHAPE CLASS

  // Run when the mouse/touch is down.
  p5.mousePressed = () => {
    if (shapes.length > 0) {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        let distance = p5.dist(p5.mouseX, p5.mouseY, shape.x, shape.y);
        let diameter = p5.map(p5.mouseY, 0, p5.windowHeight, 50, 800);

        if (distance < diameter / 2) {
          shape.active = true;
        } else {
          shape.active = false;
        }
      }
    }
    // Prevent default functionality.
    return false;
  };

  p5.mouseDragged = () => {
    if (shapes.length > 0) {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        if (shape.active) {
          shape.x = p5.mouseX;
          shape.y = p5.mouseY;
          break;
        }
      }
    }
    // Prevent default functionality.
    return false;
  };
};
