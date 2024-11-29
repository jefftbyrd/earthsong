'use client';
import p5Types from 'p5';
import React, { useEffect, useRef, useState } from 'react';

// can go in "./types/global.d.ts"
type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;
type P5jsContainer = ({ sketch }: { sketch: P5jsSketch }) => React.JSX.Element;

// sketches/mysketch.ts
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

// components/P5jsContainer.tsx
export const P5jsContainer: P5jsContainer = ({ sketch }) => {
  const parentRef = useRef<P5jsContainerRef>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let p5instance: p5Types;
    const initP5 = async () => {
      try {
        // import the p5 and p5-sounds client-side
        const p5 = (await import('p5')).default;
        await import('p5/lib/addons/p5.sound');
        // initalize the sketch
        new p5((p) => {
          sketch(p, parentRef.current);
          p5instance = p;
        });
      } catch (error) {
        console.log(error);
      }
    };

    initP5();

    return p5instance.remove();
  }, [isMounted, sketch]);

  return <div ref={parentRef} />;
};

export default function PeeFive() {
  return <P5jsContainer sketch={sketch} />;
}
