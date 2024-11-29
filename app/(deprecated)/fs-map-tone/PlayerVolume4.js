'use client';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export default function PlayerVolume4(props) {
  const playerRef = useRef(null);
  const [volumeControl, setVolumeControl] = useState(0);
  const [panControl, setPanControl] = useState(0);
  const [delayWet, setDelayWet] = useState(0);
  const [revWet, setRevWet] = useState(0);

  // const panVol = new Tone.PanVol({
  //   pan: panControl,
  //   volume: volumeControl,
  //   mute: false,
  // }).toDestination()

  useEffect(() => {
    playerRef.current = new Tone.Player(props.soundUrl).toDestination();
  }, [props.soundUrl]);

  // useEffect(() => {
  //   const panVol = new Tone.PanVol({
  //     pan: panControl,
  //     volume: volumeControl,
  //     mute: false,
  //   });
  //   const reverb = new Tone.Reverb({ decay: 14, wet: revWet });
  //   const feedbackDelay = new Tone.FeedbackDelay({
  //     delayTime: '4n',
  //     feedback: 0.7,
  //     wet: delayWet,
  //   });
  //   playerRef.current.chain(panVol, feedbackDelay, reverb, Tone.Destination);
  // }, [delayWet, panControl, revWet, volumeControl]);

  // useEffect(() => {
  //   const panVol = new Tone.PanVol({
  //     //     pan: panControl,
  //     //     volume: volumeControl,
  //     //     mute: false,
  //     //   });
  // }, [volumeControl]);

  useEffect(() => {
    playerRef.current.volume.value = volumeControl;
  }, [volumeControl]);

  const play = () => {
    playerRef.current.start();
  };

  const stop = () => {
    playerRef.current.stop();
  };

  return (
    <>
      <button onClick={play}>play</button>
      <button onClick={stop}>stop</button>
      <div>
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
          min={-1}
          max={1}
          step="0.1"
          value={Number(panControl)}
          onChange={(event) => {
            setPanControl(event.currentTarget.value);
          }}
        />
        <label htmlFor="feedback">Pan</label>
      </div>
      <div>
        <input
          type="range"
          id="delayWet"
          name="delayWet"
          min={0}
          max={0.5}
          step="0.1"
          value={Number(delayWet)}
          onChange={(event) => {
            setDelayWet(event.currentTarget.value);
          }}
        />
        <label htmlFor="feedback">Feedback</label>
      </div>
      <div>
        <input
          type="range"
          id="revWet"
          name="revWet"
          min={0}
          max={1}
          step="0.1"
          value={Number(revWet)}
          onChange={(event) => {
            setRevWet(event.currentTarget.value);
          }}
        />
        <label htmlFor="feedback">Reverb amount</label>
      </div>
    </>
  );
}
