/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useEffect, useState } from 'react';
import styles from './portal.module.scss';
// import uniqolor from 'uniqolor';
// import { getSnapshots } from '../../../database/snapshots';
// import { getUser } from '../../../database/users';
import { portalSound } from './portalSound';
import SaveSnapshot from './SaveSnapshot';
import SoundPlayerItem from './SoundPlayerItem';

export default function Portal1() {
  const [isLoading, setIsLoading] = useState(true);
  // const [soundsColor, setSoundsColor] = useState();
  const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  // const [dataFromChild, setDataFromChild] = useState();
  // const [sounds, setSounds] = useState();
  // const [isOpen, setIsOpen] = useState(false);
  const [displayingItem, setDisplayingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const soundsColor = [
    {
      id: 380483,
      name: 'french sex',
      tags: ['orgasm', 'woman', 'sex'],
      description: 'couple having sex',
      geotag: '46.55886030311717 4.5703125',
      duration: 31.8433,
      username: 'excuse',
      color: 'rgb(104, 81, 200)',
      url: 'https://cdn.freesound.org/previews/380/380483_7060922-lq.mp3',
    },
    {
      id: 750633,
      name: 'Grillons Aigrefeuille 1',
      tags: [
        'morvan',
        'summer',
        'insects',
        'field-recording',
        'night',
        'crickets',
        'grillon',
      ],
      description:
        "Un soir d'été à Aigrefeuille, Morvan. Grillons, un vent léger, quelques grenouilles au début.\n" +
        'A summer evening in Aigrefeuille, Morvan, France. Crickets, a light wind, some frogs at the beginning of the recording.\n' +
        '\n' +
        'AB Stéréo : 2 x EM272 (omni electret)',
      geotag: '46.776993 4.286129',
      duration: 184,
      username: 'nicotep',
      color: 'rgb(203, 104, 93, 1)',
      url: 'https://cdn.freesound.org/previews/750/750633_7529214-lq.mp3',
    },
    {
      id: 547901,
      name: 'Turdus merula',
      tags: [
        'merula',
        'field-recording',
        'spring',
        'Turdus',
        'merle',
        'blackbird',
        'bird',
        'birdsong',
      ],
      description:
        'Turdus merula / merle noir / blackbird\n' +
        'Singing in the countryside in the morning\n' +
        'Cormatin, France, spring 2020',
      geotag: '46.5350492262 4.695093',
      duration: 155.174,
      username: 'nicotep',
      color: 'rgb(204, 92, 118)',
      url: 'https://cdn.freesound.org/previews/547/547901_7529214-lq.mp3',
    },
    {
      id: 559881,
      name: 'Machines 1',
      tags: [
        'file',
        'industrial',
        'electric',
        'metal',
        'factory',
        'machine',
        'motor',
        'tools',
        'lime',
      ],
      description: 'Metal file start &amp; stop, close take.',
      geotag: '46.6500031584 4.566212',
      duration: 127,
      username: 'nicotep',
      color: 'rgba(86, 179, 200, 1)',
      url: 'https://cdn.freesound.org/previews/559/559881_7529214-lq.mp3',
    },
    {
      id: 631565,
      name: 'four Potiers.aif',
      tags: [
        'ceramique',
        'firing',
        'field-recording',
        'gaz',
        'ceramic',
        'gas',
        'four',
        'poterie',
        'ceramics',
      ],
      description:
        'Firing ceramics, close-up recording of the gas injectors.\n' +
        'Four céramique à gaz, enregistrement rapproché',
      geotag: '46.5590644274 4.73318438594',
      duration: 84,
      username: 'nicotep',
      color: 'rgb(69, 196, 97)',
      url: 'https://cdn.freesound.org/previews/631/631565_7529214-lq.mp3',
    },
  ];

  return (
    <>
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
      </div>

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
