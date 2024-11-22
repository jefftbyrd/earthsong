'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';

const sketch = (p5) => {
  let basteleur = p5.loadFont('/Basteleur-Moonlight.otf');
  let sourceText = '☀ ☽ ☾ ✬ ✷ ✷ ‡ ☀ ★ ☆ ✹ ✶';
  let words;

  let halfText;
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.textFont(basteleur);

    // argument to split is "delimiter"
    words = sourceText.split(' ');
    console.log(words);
  };

  p5.draw = () => {
    p5.background(255, 10);

    let word = p5.random(words);

    p5.textAlign(p5.CENTER, p5.CENTER);
    // p5.textSize(word.length * 2);
    p5.textSize(100);
    p5.text(word, p5.random(p5.width), p5.random(p5.height));
  };
};

export default function Sketch1() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
