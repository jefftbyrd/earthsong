/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useEffect, useState } from 'react';
// import * as Tone from 'tone';
// import uniqolor from 'uniqolor';
// import { getSnapshots } from '../../../database/snapshots';
// import { getUser } from '../../../database/users';
import { portalSound } from './portalSound';
import SaveSnapshot from './SaveSnapshot';
import styles from './sketch.module.scss';

export default function Portal1() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [soundsColor, setSoundsColor] = useState();
  const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  // const [dataFromChild, setDataFromChild] = useState();
  const [sounds, setSounds] = useState();

  // function handleDataFromChild(data) {
  //   setDataFromChild(data);
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       // search within 10km
  //       `https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D39.7014%2C116.0366%2520d%3D999%257D&fields=previews%2Cname%2Cdescription%2Cusername%2Cid%2Ctags%2Cduration%2Cgeotag&page_size=50  &token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
  //     );
  //     const json = await response.json();
  //     // console.log('10km', json);
  //     setSounds(json);
  //   };
  //   setIsLoading(false);

  //   fetchData();
  // }, []);

  const soundsColor = [
    {
      id: 380483,
      name: 'french sex',
      tags: ['orgasm', 'woman', 'sex'],
      description: 'couple having sex',
      geotag: '46.55886030311717 4.5703125',
      duration: 31.8433,
      username: 'excuse',
      color: 'rgba(104, 81, 200, 1)',
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
      color: 'rgba(203, 104, 93, 1)',
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
      color: 'rgba(204, 92, 118, 1)',
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
      color: 'rgba(69, 196, 97, 1)',
      url: 'https://cdn.freesound.org/previews/631/631565_7529214-lq.mp3',
    },
  ];

  console.log('soundsColor', soundsColor);

  // useEffect(() => {
  //   if (sounds.length > 0) {
  //     const addColor = async () => {
  //       const response = await sounds;
  //       const soundsShuffled = response.results
  //         .sort(() => 0.5 - Math.random()) // Shuffle array
  //         .slice(0, 5); // Select the first 5 items
  //       const soundsWithColor = soundsShuffled
  //         // .slice(0, 5)
  //         .map((sound) => ({
  //           ...sound,
  //           color: uniqolor
  //             .random({ format: 'rgb' })
  //             .color.replace(')', ', 1)')
  //             .replace('rgb', 'rgba'),
  //           url: sound.previews['preview-lq-mp3'],
  //           name: sound.name
  //             .replaceAll('.wav', '')
  //             .replaceAll('.mp3', '')
  //             .replaceAll('.WAV', '')
  //             .replaceAll('.MP3', '')
  //             .replaceAll('.m4a', '')
  //             .replaceAll('.flac', '')
  //             .replaceAll('_', ' ')
  //             .replaceAll('-', ' '),
  //         }))
  //         .map(({ previews, ...sound }) => sound);
  //       setSoundsColor(soundsWithColor);
  //       setIsLoading(false);
  //     };

  //     addColor();
  //   }
  // }, []);

  // if (isLoading) {
  //   // early return
  //   return 'Loading...';
  // }

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
        {/* <SaveSnapshot sounds={soundsColor} /> */}
      </div>

      {/* {console.log('soundsColor', soundsColor)} */}

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
