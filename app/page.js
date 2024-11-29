'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { AnimatePresence, motion } from 'motion/react';
// import Image from 'next/image';
import { useState } from 'react';
// import logo from '../public/earthsongLogo.svg';
import Logo from '../public/Logo.js';
import { clouds } from './components/clouds';
import styles from './components/landing.module.scss';
// import Login from './components/Login';
// import LoginScreen from './components/LoginScreen';
// import { occult } from './occult';
import Map from './components/Map';
import { occult } from './components/occult';
import Portal from './components/Portal';
import ProfileScreen from './components/ProfileScreen';
import { wind } from './components/wind';

export default function Earthsong() {
  const [isStarted, setIsStarted] = useState(false);
  const [enterPortal, setEnterPortal] = useState(false);
  const [dataFromChild, setDataFromChild] = useState('');

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  return (
    <>
      {/* <ProfileScreen /> */}
      {/* <LoginScreen /> */}
      {/* Wait until user clicks ✹ to start Earthsong */}
      {!isStarted ? (
        <div className={styles.initiate}>
          <motion.div
            className={styles.star}
            onClick={() => setIsStarted(true)}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.08, 1],
              color: ['rgb(255, 0, 89)', 'rgb(181, 0, 78)', 'rgb(255, 0, 89)'],
              // rotate: [-3, 3, -3],
              // width: ['13vw', '16vw', '13vw'],
              // textShadow: [' ', '#FC0 24px 0 5px', ' '],
            }}
            transition={{
              // restSpeed: 0.9,
              repeat: Infinity,
              duration: 3,
              // type: 'spring',
            }}
            // whileHover={{ scale: 1.5 }}
          >
            <Logo height="15vw" width="15vw" />
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
            transition: { duration: 6, times: [0, 0.6, 0.8, 0.9, 1] },
          }}
        >
          Earth Song
        </motion.h1>
      ) : null}

      {/* Map waits for start */}
      <AnimatePresence>
        {isStarted && !enterPortal ? (
          <motion.div
            animate={{
              opacity: [0, 0, 1],
              transition: { duration: 4, times: [0, 0.3, 1] },
            }}
            exit={{
              scale: 10,
              opacity: 0,
              transition: { duration: 2 },
            }}
          >
            <Map
              openPortal={() => setEnterPortal(true)}
              sendDataToParent={handleDataFromChild}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Clouds overlay waits to start, ends when portal is entered. */}
      <AnimatePresence>
        {isStarted && !enterPortal ? (
          <motion.div
            className={styles.noClick}
            animate={{
              opacity: [0, 0.7, 0.4],
              // scale: [0.8, 0.8, 1, 1, 0.8],
              transition: { duration: 4, times: [0, 0.9, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 2 },
            }}
          >
            <NextReactP5Wrapper sketch={clouds} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Show the occult text */}
      {enterPortal ? (
        <motion.div
          className={styles.occult}
          animate={{
            opacity: [0, 0.8, 1, 0],
            transition: { duration: 3, times: [0, 0.1, 0.8, 1] },
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
