'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

// import { type Sketch } from '@p5-wrapper/react';
// import React, { useEffect, useRef, useState } from 'react';
// import * as Tone from 'tone';

export const sketch = (p5) => {
  let w;
  let h;
  let x_step = 30;
  let y_step = 20;

  // constant for increasing or decreaseing the starting point of mountains
  const distance_variance_factor = 270;

  // scale mountains vertically
  const scale_factor = 1.8;

  // starting point from center
  const start = 30;

  // increment y_off for different noise values
  const y_factor = 0.4;
  let y_off = 0;

  const nrStars = 200;

  p5.setup = () => {
    w = p5.windowWidth;
    h = p5.windowHeight;
    p5.createCanvas(w, h);
    p5.colorMode(p5.HSB);

    // FOR NO LOOPING
    p5.noLoop();

    // FOR LOOPING
    //frameRate(1);

    // let button = p5.createButton('Generate New');
    // button.position(0, h - 20);
    // button.mousePressed(loop);
    // button.mouseReleased(noLoop);
  };

  p5.draw = () => {
    p5.background('black');

    p5.fill(0, 0, 255, 150);
    p5.noStroke();

    // stars across the sky
    for (let i = 0; i < nrStars; i++) {
      p5.ellipse(
        p5.random(0, w),
        p5.random(0, h - x_step * (x_step / 10)),
        p5.random(1, 2),
      );
    }

    // Get points for mountains
    const mountains = [];
    for (let i = 0; i <= w; i += x_step) {
      let mountain = [];
      for (let j = -y_step; j <= h + y_step; j += y_step) {
        // horizontal points distributed along the midpoint of canvas
        let c = p5.abs(j - h / 2) - start;

        // HELP FROM INSPIRATION CODE
        let variance = -1 * p5.max(distance_variance_factor - c, 0);

        let p = [j, i + p5.noise(y_off) * p5.round(variance / scale_factor)];

        mountain.push(p);
        y_off += y_factor;
      }
      mountains.push(mountain);
    }

    // Draw the mountains
    for (let i = 5; i < mountains.length - 5; i++) {
      p5.beginShape();
      p5.fill(191, 38, 58 - (x_step / 10) * i);
      for (let j = 0; j < mountains[i].length; j++) {
        p5.noStroke();

        // fill underneath the mountains
        p5.rect(mountains[i][0][0], mountains[i][0][1], w + x_step);

        // COMMENT OUT FOR NO STROKE
        // stroke(0)
        // strokeWeight(1)
        p5.curveVertex(mountains[i][j][0], mountains[i][j][1]);
      }
      p5.endShape();
    }
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
