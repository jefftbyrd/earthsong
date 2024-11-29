'use client';
import React, { useState } from 'react';
import SoundInfoPanel from './SoundInfoPanel';
import styles from './ui.module.scss';

// const elements = document.querySelectorAll('.soundNumber');

export default function SoundPlayerItem({ snapshot }) {
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
    <>
      {snapshot.title} <button className={styles.uiButton}>summon</button>
    </>
  );
}
