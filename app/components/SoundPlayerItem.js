'use client';
import React, { useState } from 'react';
import styles from './portal.module.scss';
import SoundInfoPanel from './SoundInfoPanel';

// const elements = document.querySelectorAll('.soundNumber');

export default function SoundPlayerItem({
  sound,
  index,
  setPlayerTarget,
  setPlaying,
  playing,
  setDisplayingItem,
  displayingItem,
  // setIsOpen,
  // isOpen,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // const [displayingItem, setDisplayingItem] = useState();

  // const aegean = [
  //   '&#x10107;',
  //   '&#x10108;',
  //   '&#x10109;',
  //   '&#x1010A;',
  //   '&#x1010B;',
  // ];

  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];
  // function toggle(id) {
  //   setIsOpen(!isOpen);
  // }

  return (
    <div className={styles.tryThis}>
      <div className={`s${sound.id}`}>
        <button
          className={styles.outerButton}
          onClick={() => {
            setPlaying(!playing);
            setPlayerTarget(sound.id);
          }}
          // style={{ backgroundColor: sound.color }}
        >
          <div
            className={styles.soundText}
            // className={`s${sound.id}`}
            // style={{ backgroundColor: sound.color }}
          >
            <span className={styles.soundNumber}>{aegean[index]}</span>
            <span className={styles.soundName}>{sound.name}</span>
          </div>
        </button>
        <button
          className={styles.infoButton}
          onClick={() => {
            setDisplayingItem(sound.id);
            setIsOpen(!isOpen);
          }}
        >
          𐙁
        </button>
      </div>
      {isOpen && displayingItem === sound.id && (
        <SoundInfoPanel
          sound={sound}
          index={index}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          color={sound.color}
        />
      )}
    </div>
  );
}
