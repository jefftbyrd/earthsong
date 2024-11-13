'use client';
import { useEffect, useRef, useState } from 'react';
// import React from 'react';
import * as Tone from 'tone';

export default function TonePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const synth = useRef(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [startAudio, setStartAudio] = useState();

  // useEffect(() => {
  //   const audioStart = async () => {
  //     const synth = new Tone.Synth().toDestination();
  //     // const json = await response.json();
  //     // setSounds(json);
  //     setIsLoading(false);
  //   };

  //   audioStart();
  // }, []);

  useEffect(() => {
    synth.current = new Tone.Synth({
      onload: () => {
        setIsLoaded(true);
      },
    }).toDestination();
  }, []);

  // const synth = new Tone.Synth().toDestination();

  // function playSynth() {
  //   synth.current.triggerAttackRelease('C3', '8n');
  // }

  const playSynth = () => synth.current.triggerAttackRelease('C3', '8n');

  return (
    <>
      <h1>synth!</h1>
      <button disabled={!isLoaded} onClick={playSynth}>
        click me
      </button>
      {console.log('isLoaded', isLoaded)}
    </>
  );
}
