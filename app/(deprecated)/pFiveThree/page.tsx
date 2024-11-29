'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { type Sketch } from '@p5-wrapper/react';
// import { ReactP5Wrapper, type Sketch } from '@p5-wrapper/react';
import * as p5 from 'p5';
// import * as p5sound from 'p5/lib/addons/p5.sound';
import React from 'react';

// import vox from '../../public/vox.wav';

// const initP5 = async () => {
//   try {
//     // import the p5 and p5-sounds client-side
//     const p5 = (await import('p5')).default;
//     await import('p5/lib/addons/p5.sound');
//     // initalize the sketch
//   } catch (error) {
//     console.log(error);
//   }
// };

// initP5();

// const p5 = (await import('p5')).default;
// await import('p5/lib/addons/p5.sound');
(window as any).p5 = p5;

// window.p5 = p5;

await import('../../node_modules/p5.sound');
// await import(* as p5sound from 'p5/lib/addons/p5.sound');

// console.log(p5sound);

const sketch1: Sketch = (p5) => {
  let song: p5.SoundFile;
  let button: p5.Element;

  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    p5.background(255, 0, 0);
    button = p5.createButton('Toggle audio');
    song = p5.loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
    // song = p5.loadSound(
    //   'https://cdn.freesound.org/previews/320/320466_4536481-lq.mp3',
    // );

    // song = p5.interface.loadSound('../../public/vox.wav');

    button.mousePressed(() => {
      if (!song) {
        const songPath = 'https://tonejs.github.io/audio/berklee/gong_1.mp3';
        song = p5.loadSound(
          songPath,
          () => {
            song.play();
          },
          () => {
            console.error(
              `Could not load the requested sound file ${songPath}`,
            );
          },
        );
        return;
      }

      if (!song.isPlaying()) {
        song.play();
        return;
      }

      song.pause();
    });
  };

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

const sketch2: Sketch = (p5) => {
  let parentStyle: CSSStyleDeclaration;
  let canvasHeight: number;
  let canvasWidth: number;
  let audioState: string;
  let cnv: any;
  let sine: any;

  p5.setup = () => {
    // parentStyle = window.getComputedStyle(parentRef);
    // canvasWidth = parseInt(parentStyle.width) * 0.99;
    // canvasHeight = parseInt(parentStyle.width) * 0.4;
    // cnv = p5.createCanvas(canvasWidth, canvasHeight).parent(parentRef);
    p5.createCanvas(600, 400, p5.WEBGL);
    p5.background(255, 0, 0);

    audioState = p5.getAudioContext();
    audioState.suspend();
    cnv.mouseClicked(() => {
      audioState.state !== 'running' ? audioState.resume() : null;
    });
    // etc....
    loadAudio();
  };

  p5.draw = () => {
    // etc..
  };

  const loadAudio = () => {
    sine = new p5.constructor.Oscillator('sine');
    // etc..
  };
};

export default function App() {
  return <NextReactP5Wrapper sketch={sketch1} />;
}
