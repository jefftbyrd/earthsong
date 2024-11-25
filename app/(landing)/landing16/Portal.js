/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useEffect, useState } from 'react';
// import * as Tone from 'tone';
import uniqolor from 'uniqolor';
// import { getSnapshots } from '../../../database/snapshots';
// import { getUser } from '../../../database/users';
import { portalSound } from './portalSound';
import SaveSnapshot from './SaveSnapshot';
import styles from './sketch.module.scss';

export default function Portal(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState();
  const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  const [dataFromChild, setDataFromChild] = useState();

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  // console.log('props.sounds', props.sounds);
  // console.log('props.pin', props.pin);
  // console.log('props.sounds.pin', props.sounds.pin);

  useEffect(() => {
    const addColor = async () => {
      const response = await props.sounds;
      const soundsWithColor = response.results
        .slice(0, 5)
        .map((sound) => ({
          ...sound,
          color: uniqolor
            .random({ format: 'rgb' })
            .color.replace(')', ', 1)')
            .replace('rgb', 'rgba'),
          url: sound.previews['preview-lq-mp3'],
          name: sound.name
            .replaceAll('.wav', '')
            .replaceAll('.mp3', '')
            .replaceAll('.WAV', '')
            .replaceAll('.MP3', ''),
        }))
        .map(({ previews, ...sound }) => sound);
      setSoundsColor(soundsWithColor);
      setIsLoading(false);
    };

    addColor();
  }, []);

  if (isLoading) {
    // early return
    return 'Loading...';
  }

  return (
    <>
      <div className={styles.statusBar}>
        {soundsColor.map((sound) => {
          return (
            <div
              key={`soundId-${sound.id}`}
              // id={sound.id}
              className={`s${sound.id}`}
              style={{ backgroundColor: sound.color }}
              onClick={() => {
                setPlayerTarget(sound.id);
                setPlaying(!playing);
              }}
            >
              <h3>{sound.name}</h3>
            </div>
          );
        })}
        {/* <button>Save current state</button> */}
        <SaveSnapshot sounds={soundsColor} />
      </div>

      {/* {console.log('soundsColor', soundsColor)}
      {console.log('dataFromChild in Portal return', dataFromChild)} */}

      {soundsColor.length > 0 ? (
        <NextReactP5Wrapper
          sketch={portalSound}
          soundsColor={soundsColor}
          generate={generate}
          playerTarget={playerTarget}
          play={playing}
        />
      ) : null}
    </>
  );
}
