'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import Freesound from './Freesound';

const initialCenter = [16.38389, 48.1944];
const initialZoom = 10.12;

export default function MapTest() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [pin, setPin] = useState({});
  const [fetch, setFetch] = useState(false);

  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiamVmZnRieXJkIiwiYSI6ImNtMnVhMGVnajAwMDQya3NsZnppaGRoZGgifQ.h_ngiCgv-Xi_aQxRiRV6aQ';
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jefftbyrd/cm2u9hrbc00al01padk1f48s8',
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
      <div className="sidebar">
        Longitude: {pin.lng} | Latitude: {pin.lat} | Zoom: {zoom.toFixed(2)}
      </div>
      <div id="map-container" ref={mapContainerRef} />
      <div>
        {/* <Freesound pin={pin} /> */}
        {pin.lat ? <Freesound pin={pin} fetch={fetch} /> : null}
      </div>
    </>
  );
}
