'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

// import { type Sketch } from '@p5-wrapper/react';
// import React, { useEffect, useRef, useState } from 'react';
// import * as Tone from 'tone';

const sketch = (p5) => {
  let grotesk = p5.loadFont('/Grotesk-03Regular.otf');

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.textFont(grotesk);
    p5.textSize(100);
  };

  p5.draw = () => {
    p5.background(255);
    p5.textWrap(p5.CHAR);
    p5.text(
      'ⵣⵒⵁⴽⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ⵣⵒⵁⴽⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜ ⵓⵔⴰⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ⵣⵒⵁⴽⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ⵣⵒ ⵁⴽⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ⵣⵒⵁⴽⵙⴻⵅ ⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰⵙⴻ ⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ⵣⵒⵁⴽⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ⵣⵒⵁⴽⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ⵣⵒⵁⴽⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ',
      20,
      20,
      p5.width,
    );
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
