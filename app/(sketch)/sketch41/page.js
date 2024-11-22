'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
// import { type Sketch } from '@p5-wrapper/react';
// import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export const sketch = (p5) => {
  const tileCount = 100;
  const noiseScale = 0.03;

  let noiseVector;
  let noiseVelocity;
  let noiseAcceleration;
  let button;
  let startTime;
  let showStartScreen = false;

  let initialSkyColor;
  let targetSkyColor;
  let initialCloudColor;
  let targetCloudColor;
  let noiseSynth1;
  let ns1Button;
  // let startNoiseSynth1;

  p5.setup = () => {
    noiseSynth1 = new Tone.NoiseSynth().toDestination();
    ns1Button = p5.createButton('noise synth 1');
    ns1Button.position(p5.width / 2 - 50, p5.height / 2 - 10);
    ns1Button.mousePressed(startNoiseSynth1);

    let canvas = p5.createCanvas(100, 100);
    // p5.position.canvas;
    canvas.position(0, 0);

    // Initialize vectors for moving noise field
    noiseVector = p5.createVector(0, 0); // Starting position
    noiseVelocity = p5.createVector(0.03, 0); // Initial velocity moves from left to right
    noiseAcceleration = p5.createVector(
      p5.random(-0.005, 0.005),
      p5.random(-0.005, 0.005),
    ); // Small acceleration for drift

    // Create the button
    // button = p5.createButton('dreamscape');
    // button.position(p5.width / 2 - 50, p5.height / 2 - 10);
    // button.mousePressed(startDreamscape);

    // Initialize colors
    initialSkyColor = p5.color(150, 180, 255);
    targetSkyColor = p5.color(0, 50, 150);
    initialCloudColor = p5.color(252, 230, 252);
    targetCloudColor = p5.color(255, 105, 180);
    startTime = p5.millis();
  };

  // hide screen at start
  // function startDreamscape() {
  //   showStartScreen = false;
  //   startTime = p5.millis();
  //   button.hide();
  // }

  p5.draw = () => {
    // Show screen
    if (showStartScreen) {
      p5.background(252, 230, 252);
      button.show();

      // After button is pressed
    } else {
      // Calculate the progress over 30 seconds
      let timeElapsed = p5.millis() - startTime;
      let progress = p5.constrain(timeElapsed / 30000, 0, 1);

      // Change sky and cloud colors based on the progress
      let currentSkyColor = p5.lerpColor(
        initialSkyColor,
        targetSkyColor,
        progress,
      );
      let currentCloudColor = p5.lerpColor(
        initialCloudColor,
        targetCloudColor,
        progress,
      );

      // Set the background to the interpolated sky color
      // p5.background(currentSkyColor);
      p5.clear();

      // Update the noise field
      noiseVelocity.add(noiseAcceleration);
      noiseVector.sub(noiseVelocity);

      // Move noise field slightly in all directions
      noiseAcceleration.x = p5.random(-0.0005, 0.0005);
      noiseAcceleration.y = p5.random(-0.0005, 0.0005);

      // Calculate size of tiles
      let tileSize = p5.width / tileCount;
      for (let row = 0; row < tileCount; row++) {
        for (let col = 0; col < tileCount; col++) {
          let x = col * tileSize;
          let y = row * tileSize;

          // Calculate Perlin noise value based on noiseVector and grid position
          let xnoise = noiseVector.x + col * noiseScale;
          let ynoise = noiseVector.y + row * noiseScale;
          let noiseValue = p5.noise(xnoise, ynoise);

          // Map noise to opacity to create cloud transparency with a value
          let a = p5.map(noiseValue, 0, 0.5, 0, 210);
          p5.fill(
            currentCloudColor.levels[0],
            currentCloudColor.levels[1],
            currentCloudColor.levels[2],
            a,
          );

          // Draw tiles
          p5.noStroke();
          p5.rect(x, y, tileSize, tileSize);
        }
      }

      // Check if 30 seconds have passed
      // if (timeElapsed > 30000) {
      //   showStartScreen = true;
      //   noiseVector = p5.createVector(0, 0); // Reset the noise vector
      //   noiseVelocity = p5.createVector(0.03, 0); // Reset velocity
      // }
    }
  }; // End DRAW

  async function startNoiseSynth1() {
    await Tone.start();
    noiseSynth1.triggerAttackRelease('8n', 0.05);
  }
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
