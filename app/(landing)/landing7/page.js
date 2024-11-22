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
import { wind2 } from './wind2';

export function EarthSong(props) {
  return (
    <>
      <motion.div
        className={styles.logo}
        animate={{
          opacity: [0, 0, 1, 1, 0],
          transition: { duration: 8, times: [0, 0.7, 0.8, 0.9, 1] },
        }}
      >
        <h1>Earth Song</h1>
      </motion.div>

      {/* <motion.div
        className={styles.instruction}
        animate={{
          opacity: [0, 0, 1, 1],
          transition: { duration: 10, times: [0, 0.8, 0.9, 1] },
        }}
      >
        <motion.div
          // animate={{ opacity: [0.7, 1, 0.7] }}
          animate={{
            color: ['rgb(255, 0, 89)', 'rgb(255, 230, 0)', 'rgb(255, 0, 89)'],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <h2>Choose a place to explore.</h2>
        </motion.div>
      </motion.div> */}

      <motion.div
        animate={{
          opacity: [0, 0, 1],
          transition: { duration: 5, times: [0, 0.5, 1] },
        }}
      >
        <Map portal={() => console.log('here is the portal')} />
      </motion.div>

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

      {/* {props.pin ? <h2>Take me there</h2> : null} */}

      {/* <div>{pin.lat ? <Freesound pin={pin} fetch={fetch} /> : null}</div> */}
    </>
  );
}

export default function MapTest() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      {/* {!isStarted ? (
        <button onClick={() => setIsStarted(true)}>test2</button>
      ) : null} */}

      {/* {console.log('pin', pin)} */}

      {isStarted ? <EarthSong startWind={isStarted} /> : null}

      {/* <NextReactP5Wrapper sketch={wind2} startWind={isStarted} /> */}

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

      <NextReactP5Wrapper sketch={wind2} startWind={isStarted} />
    </>
  );
}
