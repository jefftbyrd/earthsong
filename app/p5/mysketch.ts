import p5Types from 'p5';
import React, { useEffect, useRef, useState } from 'react';

export const sketch: P5jsSketch = (p5, parentRef) => {
  let parentStyle: CSSStyleDeclaration;
  let canvasHeight: number;
  let canvasWidth: number;
  let audioState: string;
  let cnv: any;
  let sine: any;

  p5.setup = () => {
    parentStyle = window.getComputedStyle(parentRef);
    canvasWidth = parseInt(parentStyle.width) * 0.99;
    canvasHeight = parseInt(parentStyle.width) * 0.4;
    cnv = p5.createCanvas(canvasWidth, canvasHeight).parent(parentRef);

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
