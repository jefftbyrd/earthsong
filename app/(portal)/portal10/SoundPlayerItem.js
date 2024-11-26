'use client';
import React, { useState } from 'react';
import styles from './portal.module.scss';

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

  // function toggle(id) {
  //   setIsOpen(!isOpen);
  // }

  return (
    <>
      <button
        onClick={() => {
          setPlaying(!playing);
          setPlayerTarget(sound.id);
        }}
      >
        <div
          className={`s${sound.id}`}
          style={{ backgroundColor: sound.color }}
        >
          <span className={styles.soundNumber}>{index + 1}</span>
          <div>{sound.name}</div>
        </div>
      </button>
      <button
        onClick={() => {
          setDisplayingItem(sound.id);
          setIsOpen(!isOpen);
        }}
      >
        ?
      </button>
      {isOpen && displayingItem === sound.id && (
        <div className={styles.soundDescription}>
          <p>{sound.description}</p>
        </div>
      )}
    </>
  );
}
