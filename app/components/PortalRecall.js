'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useEffect, useState } from 'react';
import uniqolor from 'uniqolor';
import styles from './portal.module.scss';
import { portalSound } from './portalSound';
import Save from './Save';
import SoundPlayerItem from './SoundPlayerItem';

export default function PortalRecall(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState();
  const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  const [dataFromChild, setDataFromChild] = useState();
  const [displayingItem, setDisplayingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [saveIsOpen, setSaveIsOpen] = useState(false);
  const [manualClose, setManualClose] = useState(false);

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  console.log('props.sounds on portal recall', props.sounds);

  useEffect(() => {
    const recallSnapshot = async () => {
      const recalledSounds = await props.sounds;
      setSoundsColor(recalledSounds);
      setIsLoading(false);
      // console.log('soundsColor on portal recall', soundsColor);
    };

    recallSnapshot();
  }, []);

  if (isLoading) {
    // early return
    return 'Loading...';
  }

  return (
    <>
      {soundsColor.length > 0 ? (
        <NextReactP5Wrapper
          sketch={portalSound}
          soundsColor={soundsColor}
          generate={generate}
          playerTarget={playerTarget}
          play={playing}
          resetPortal={props.resetPortal}
        />
      ) : null}

      <div className={styles.multiController}>
        {soundsColor.map((sound, index) => {
          return (
            <div key={`soundId-${sound.id}`}>
              <SoundPlayerItem
                sound={sound}
                index={index}
                setPlayerTarget={setPlayerTarget}
                setPlaying={setPlaying}
                setDisplayingItem={setDisplayingItem}
                playing={playing}
                displayingItem={displayingItem}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            </div>
          );
        })}

        {props.user ? (
          <button
            onClick={() => {
              setSaveIsOpen(!saveIsOpen);
            }}
          >
            Save
          </button>
        ) : null}
        {saveIsOpen ? (
          <Save sounds={soundsColor} setSaveIsOpen={setSaveIsOpen} />
        ) : null}
      </div>
    </>
  );
}
