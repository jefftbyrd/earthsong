'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import mapboxgl from 'mapbox-gl';
import { AnimatePresence, motion } from 'motion/react';
// import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { clouds } from './clouds';
// import Freesound from './Freesound';
import styles from './landing.module.scss';
// import { occult } from './occult';
import Map from './map';
import { occult } from './occult';
// import { portal } from './portal';
import Portal from './Portal';
import { wind } from './wind';

export default function Earthsong() {
  const [isStarted, setIsStarted] = useState(false);
  const [enterPortal, setEnterPortal] = useState(false);
  const [dataFromChild, setDataFromChild] = useState('');

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  return (
    <>
      {/* Wait until user clicks ✹ to start Earthsong */}
      {!isStarted ? (
        <div className={styles.initiate}>
          <motion.div
            className={styles.star}
            onClick={() => setIsStarted(true)}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.08, 1],
              color: ['rgb(255, 0, 89)', 'rgb(255, 230, 0)', 'rgb(255, 0, 89)'],
              rotate: [0, 3, 0],
              textShadow: [' ', '#FC0 24px 0 5px', ' '],
            }}
            transition={{
              // restSpeed: 0.5,
              repeat: Infinity,
              duration: 3,
              // type: 'spring',
            }}
            whileHover={{ scale: 1.5 }}
          >
            ✹
          </motion.div>
        </div>
      ) : null}

      {/* Wind generator is ready, but waits for start. */}
      <NextReactP5Wrapper
        sketch={wind}
        startWind={isStarted}
        stopWind={enterPortal}
      />

      {/* Title h1 waits for start */}
      {isStarted ? (
        <motion.h1
          className={styles.earthsong}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            transition: { duration: 8, times: [0, 0.7, 0.8, 0.9, 1] },
          }}
        >
          Earth Song
        </motion.h1>
      ) : null}

      {/* Map waits for start */}
      {isStarted && !enterPortal ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            transition: { duration: 5, times: [0, 0.5, 1] },
          }}
        >
          <Map
            openPortal={() => setEnterPortal(true)}
            sendDataToParent={handleDataFromChild}
          />
        </motion.div>
      ) : null}

      {/* Clouds overlay waits to start, ends when portal is entered. */}
      {isStarted && !enterPortal ? (
        <motion.div
          className={styles.noClick}
          animate={{
            opacity: [0, 0.7, 0.4],
            // scale: [0.8, 0.8, 1, 1, 0.8],
            transition: { duration: 4, times: [0, 0.9, 1] },
          }}
        >
          <NextReactP5Wrapper sketch={clouds} />
        </motion.div>
      ) : null}

      {/* Show the occult text */}
      {enterPortal ? (
        <motion.div
          animate={{
            opacity: [0, 0.8, 1, 0],
            transition: { duration: 4, times: [0, 0.4, 0.8, 1] },
          }}
        >
          <NextReactP5Wrapper sketch={occult} />
        </motion.div>
      ) : null}

      {/* Portal waits for enterPortal */}
      {enterPortal ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            // scale: [0.8, 0.8, 1, 1, 0.8],
            transition: { duration: 6, times: [0, 0.5, 1] },
          }}
        >
          <Portal sounds={dataFromChild} />
        </motion.div>
      ) : null}
    </>
  );
}
