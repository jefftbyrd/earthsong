'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

// import { type Sketch } from '@p5-wrapper/react';
// import React, { useEffect, useRef, useState } from 'react';
// import * as Tone from 'tone';

const sketch = (p5) => {
  let timer = 0;
  let interval = 2000; // 2 seconds
  let grotesk = p5.loadFont('/Grotesk-03Regular.otf');

  let sourceText =
    'A rainbow is an optical phenomenon caused by refraction, internal reflection and dispersion of light in water droplets resulting in a continuous spectrum of light appearing in the sky.[1] The rainbow takes the form of a multicoloured circular arc.[2] Rainbows caused by sunlight always appear in the section of sky directly opposite the Sun. Rainbows can be caused by many forms of airborne water. These include not only rain, but also mist, spray, and airborne dew.';
  let words;

  let halfText;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.textFont(grotesk);
    p5.textSize(100);

    // argument to split is "delimiter"
    words = sourceText.split(' ');
    console.log(words);
  };

  p5.draw = () => {
    p5.background(255);

    if (p5.millis() - timer > interval) {
      let word = p5.random(words);
      // p5.textWrap(p5.CHAR);
      p5.textAlign(p5.CENTER, p5.CENTER);
      // p5.textSize(word.length * 2);
      p5.text(word, p5.random(p5.width), p5.random(p5.height));

      // reset the timer to equal
      // the current number of milliseconds
      timer = p5.millis();
    }
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
