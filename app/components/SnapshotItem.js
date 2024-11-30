'use client';
import React, { useState } from 'react';
import SoundInfoPanel from './SoundInfoPanel';
import styles from './ui.module.scss';

// const elements = document.querySelectorAll('.soundNumber');

export default function SnapshotItem({
  snapshot,
  setRecallId,
  setPortalRecall,
  setProfileOpen,
  setEnterPortal,
  resetPortal,
  setResetPortal,
  setStartWind,
  setIsStarted,
}) {
  // const [isOpen, setIsOpen] = useState(false);
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
      {snapshot.title} {snapshot.id}
      <button
        className={styles.uiButton}
        onClick={async () => {
          await setResetPortal(true);
          await setResetPortal(false);
          await setEnterPortal(false);
          await setRecallId(snapshot.id);
          await setPortalRecall(true);
          setStartWind(false);
          setProfileOpen(false);
          setEnterPortal(true);
          setIsStarted(true);
        }}
      >
        summon
      </button>
    </>
  );
}
