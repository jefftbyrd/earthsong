'use client';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export default function PlayerVolume7(props) {
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [reverbLoaded, setReverbLoaded] = useState();
  const playerRef = useRef(null);
  // const [volumeControl, setVolumeControl] = useState(0);
  const [panControl, setPanControl] = useState(0);
  // const [delayWet, setDelayWet] = useState(0);
  // const [revWet, setRevWet] = useState(0);

  // const panVol = new Tone.PanVol({
  //   pan: panControl,
  //   volume: volumeControl,
  //   mute: false,
  // }).toDestination()
  // useEffect(() => {
  //   const panVol = new Tone.PanVol({
  //     pan: panControl,
  //     volume: 0,
  //     mute: false,
  //   }).toDestination();
  // }, []);
  //   async function setupReverb() {
  //   await reverb.generate();
  // }

  // useEffect(() => {
  //   const panVol = new Tone.PanVol({
  //         pan: Number(panControl),
  //       }).toDestination();
  //     }, [panControl]);

  // const panVol = new Tone.PanVol({
  //   pan: Number(panControl),
  // }).toDestination();

  // const reverb = new Tone.Reverb().toDestination;

  // console.log('panvol', panVol);

  // useEffect(() => {
  //   playerRef.current = new Tone.Player(props.soundUrl).toDestination();
  // }, [props.soundUrl]);

  useEffect(() => {
    playerRef.current = new Tone.Player({
      url: props.soundUrl,
      onload: () => {
        setIsLoaded(true);
      },
    }).toDestination();
  }, [props.soundUrl]);

  // useEffect(() => {
  //   playerRef.current = new Tone.Player(props.soundUrl).toDestination();
  // }, [props.soundUrl]);

  // useEffect(() => {
  //   playerRef.current = new Tone.Player(props.soundUrl).toDestination();
  //   // player.setLoopPoints(0.2, 0.3);
  //   playerRef.current.loop = true;
  //   // Tone.loaded().then(() => {
  //   //   player.current.start();
  //   // });
  // }, [props.soundUrl]);

  // useEffect(() => {
  //   const feedbackDelay = new Tone.FeedbackDelay().toDestination;
  //   playerRef.current.connect(feedbackDelay);
  // }, []);

  // const feedbackDelay = new Tone.FeedbackDelay().toDestination;

  // useEffect(() => {
  //   playerRef.current.volume.value = volumeControl;
  // }, [volumeControl]);

  // const play = () => playerRef.current.start();

  async function startPlayer() {
    await Tone.loaded().then(() => {
      playerRef.current.start();
    });
    await Tone.start();
  }

  const play = () => playerRef.current.start();

  const startOne = async () => {
    await Tone.start();
    await playerRef.current.start();
  };

  const stop = () => {
    playerRef.current.stop();
  };

  return (
    <>
      <button disabled={!isLoaded} onClick={play}>
        play
      </button>
      <button onClick={stop}>stop</button>
      {/* <div>
        <input
          type="range"
          id="volume"
          name="volume"
          min={-20}
          max={20}
          step="0.1"
          value={Number(volumeControl)}
          onChange={(event) => {
            setVolumeControl(event.currentTarget.value);
          }}
        />
        <label htmlFor="volume">Volume</label>
      </div>
      <div>
        <input
          type="range"
          id="pan"
          name="pan"
          min={0}
          max={1}
          step="0.1"
          value={Number(panControl)}
          onChange={(event) => {
            setPanControl(event.currentTarget.value);
          }}
        />
        <label htmlFor="pan">Pan</label>
      </div> */}
    </>
  );
}
