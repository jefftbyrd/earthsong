'use client';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export default function TonePage() {
  const multiPlayer = new Tone.Players({
    1: 'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
    2: 'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
    3: 'https://cdn.freesound.org/previews/11/11700_2-hq.mp3',
    4: 'https://cdn.freesound.org/previews/437/437418_6086320-hq.mp3',
  }).toDestination();

  function play1() {
    multiPlayer.player('4').start();
    multiPlayer.player('2').start();
  }

  async function allowSound() {
    await Tone.start();
  }

  return (
    <>
      <h1>try this</h1>
      <button onClick={allowSound}>allow</button>
      <button onClick={play1}>play1</button>
    </>
  );
}
