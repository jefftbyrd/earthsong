'use client';
import React, { useState } from 'react';
import styles from './portal.module.scss';

export default function SoundDescription({
  sound,
  index,
  setPlayerTarget,
  setPlaying,
  playing,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <button
        onClick={() => {
          setPlaying(!playing);
          setPlayerTarget(sound.id);
        }}
      >
        main button
      </button>
      <span className={styles.soundNumber}>{index + 1}</span>
      <div>{sound.name}</div>
      <button onClick={toggle}>?</button>
      {isOpen ? (
        <div className={styles.showDescription}>
          <p>{sound.description}</p>
        </div>
      ) : null}
    </>
  );
}
