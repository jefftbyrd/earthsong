'use client';
import { useEffect, useRef, useState } from 'react';
import { Player } from 'tone';
import Potentiometer from './Potentiometer';

// const player = new Tone.Player(props.soundUrl).toDestination();

export default function PlayerVolume(props) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const player = useRef(null);
  // const playerRef = useRef(player);
  // const vol = useRef(null);
  const [volumeControl, setVolumeControl] = useState(0);
  // players.player("quietGong").volume.value = 50;

  // var vol = new Tone.Volume(-12);
  // instrument.chain(vol, Tone.Master);

  // const player = new Tone.Player(props.soundUrl).toDestination();

  useEffect(() => {
    player.current = new Player(props.soundUrl).toDestination();
    // vol.current = new Tone.Volume(volume).toDestination();
    // player.current.loop = true;
    player.current.volume.value = volumeControl;
    // vol.current = new Tone.Volume(12);
    // player.current.chain(vol);
    // const osc = new Tone.Oscillator().connect(vol).start();
    // player.current.volume.value = volume;
    // player.current.volume.value = volume;
    // player.setLoopPoints(0.2, 0.3);
    // player.current.loop = true;
    // Tone.loaded().then(() => {
    //   player.current.start();
    // });
  }, [props.soundUrl, volumeControl]);

  // async function startPlayer() {
  //   // await Tone.start();
  //   await Tone.loaded().then(() => {
  //     player.current.start();
  //   });
  //   await Tone.start();
  // }

  const play = () => {
    player.current.start();
  };

  const volume = (event) => {
    // console.log(event.target.value);
    setVolumeControl(event.target.value);
  };

  const stop = () => {
    player.current.stop();
  };

  // const vol = new Tone.Volume(-12).toDestination();

  // const vol = new Tone.Volume(-12).toDestination();
  // const osc = new Tone.Oscillator().connect(vol).start();

  return (
    <>
      <button onClick={play}>play</button>
      <button onClick={stop}>stop</button>
      <span className="vol-box">
        <label htmlFor="vol">Volume</label>
        <Potentiometer
          onChange={volume}
          volumeControl={volumeControl}
          id="volM"
          name="vol"
          min={-20}
          max={20}
          step="0.1"
        />
      </span>
    </>
  );
}
