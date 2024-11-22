'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
// import Freesound from './Freesound';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import mapboxgl from 'mapbox-gl';
import { motion } from 'motion/react';
// import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { clouds } from './clouds';
import styles from './landing.module.scss';
import { occult } from './occult';

const initialCenter = [4.510020088079064, 44.66199079784276];
const initialZoom = 2.14;

export default function MapTest() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [pin, setPin] = useState({});
  const [fetch, setFetch] = useState(false);

  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GENERIC_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jefftbyrd/cm38mcin600jv01nw6mrq473m',
      center: center,
      zoom: zoom,
    });

    let lng;
    let lat;

    const marker = new mapboxgl.Marker({
      color: '#314ccd',
    });

    mapRef.current.on('click', (event) => {
      lng = event.lngLat.lng;
      lat = event.lngLat.lat;
      console.log(`${lng}, ${lat}`);
      const coords = { lng: lng, lat: lat };
      marker.setLngLat(coords).addTo(mapRef.current);
      console.log('coords', coords);
      setPin(coords);
      setFetch((prevState) => !prevState);
    });

    mapRef.current.on('move', () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      // update state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

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

      <motion.div
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
      </motion.div>

      <motion.div
        animate={{
          opacity: [0, 0, 1],
          transition: { duration: 5, times: [0, 0.5, 1] },
        }}
      >
        <div id="map-container" ref={mapContainerRef} />
      </motion.div>

      {/* <div className={styles.occult}>
        <NextReactP5Wrapper sketch={occult} />
      </div> */}

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

      {/* <div>{pin.lat ? <Freesound pin={pin} fetch={fetch} /> : null}</div> */}
    </>
  );
}
