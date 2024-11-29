'use client';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export default function TonePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const multiPlayer = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    multiPlayer.current = new Tone.Players({
      1: 'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
      2: 'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
      3: 'https://cdn.freesound.org/previews/11/11700_2-hq.mp3',
      4: 'https://cdn.freesound.org/previews/437/437418_6086320-hq.mp3',
    }).toDestination();
  }, []);

  // const multiPlayer = new Tone.Players({
  //   1: 'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
  //   2: 'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
  //   3: 'https://cdn.freesound.org/previews/11/11700_2-hq.mp3',
  //   4: 'https://cdn.freesound.org/previews/437/437418_6086320-hq.mp3',
  // }).toDestination();

  async function startMultiPlayer() {
    await Tone.start();
    multiPlayer.current.player('4').start();
    multiPlayer.current.player('2').start();
    multiPlayer.current.player('3').start();
    // setStart((prevState) => !prevState);
  }

  function stopSounds() {
    multiPlayer.current.stopAll();
  }

  // async function allowSound() {
  //   await Tone.start();
  // }

  return (
    <>
      <h1>try this</h1>
      {/* <button onClick={allowSound}>allow</button> */}
      <button onClick={startMultiPlayer}>play</button>
      <br />
      <button onClick={stopSounds}>stop</button>
    </>
  );
}
