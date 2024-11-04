'use client';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export default function Player2(props) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const player = useRef(null);
  // const [start, setStart] = useState(false);

  useEffect(() => {
    player.current = new Tone.Player(props.soundUrl).toDestination();
    // player.setLoopPoints(0.2, 0.3);
    player.current.loop = true;
  }, []);

  async function startPlayer() {
    await Tone.start();
    player.current.start();
  }

  function stopSounds() {
    player.current.stop();
  }

  return (
    <>
      {/* <h3>try this</h3> */}
      <button onClick={startPlayer}>play</button>
      <br />
      <button onClick={stopSounds}>stop</button>
    </>
  );
}
