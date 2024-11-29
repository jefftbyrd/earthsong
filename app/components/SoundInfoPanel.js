'use client';
import React, { useState } from 'react';
import styles from './portal.module.scss';

// const elements = document.querySelectorAll('.soundNumber');

export default function SoundInfoPanel({ sound }) {
  const minutes = Math.floor(sound.duration / 60);
  const seconds = Math.floor(sound.duration % 60)
    .toString()
    .padStart(2, '0');
  const geotagSplit = sound.geotag.split(' ');
  const location = `${Number(geotagSplit[0]).toFixed(4)}, ${Number(geotagSplit[1]).toFixed(4)}`;

  return (
    <div className={styles.soundInfoPanel}>
      <h2>{sound.name}</h2>
      <ul>
        <li>Location: {location}</li>
        <li>Username: {sound.username}</li>
        <li>
          Duration: {minutes}:{seconds}
        </li>
        <li>Tags: {sound.tags.join(', ')}</li>
      </ul>
      <p>{sound.description}</p>
    </div>
  );
}
