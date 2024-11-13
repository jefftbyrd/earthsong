'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
// import dotenvSafe from 'dotenv-safe';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

const INITIAL_CENTER = [16.38389, 48.1944];
const INITIAL_ZOOM = 10.12;

export default function MapTest() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [pin, setPin] = useState({});

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  // const [lngLat, setLngLat] = useState();

  useEffect(() => {
    mapboxgl.accessToken =
      pk.eyJ1IjoiamVmZnRieXJkIiwiYSI6ImNtMnQ1aHV2bzA1am8ya3I0N2J1eWdjZWsifQ.nO7VLi8QEAcJUjvA_NMRpA;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jefftbyrd/cm2u9hrbc00al01padk1f48s8',
      center: center,
      zoom: zoom,
    });

    let lng;
    let lat;

    // const lngDisplay = document.getElementById('lng');
    // const latDisplay = document.getElementById('lat');

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

  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  // const handleButtonClick = () => {
  //   mapRef.current.flyTo({
  //     center: INITIAL_CENTER,
  //     zoom: INITIAL_ZOOM,
  //   });
  // };

  return (
    <>
      {/* <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
        Zoom: {zoom.toFixed(2)}
      </div> */}
      <div className="sidebar">
        Longitude: {pin.lng} | Latitude: {pin.lat} | Zoom: {zoom.toFixed(2)}
      </div>
      {/* <div className="displayCoords">
        <div>
          Longitude:&nbsp;<span id="lng">{pin.lng}</span>
        </div>
        <div>
          Latitude:&nbsp;<span id="lat"></span>
        </div>
      </div>
      <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button> */}
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}
