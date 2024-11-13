'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
// ES6
import ReactMapboxGl, { Feature, Layer, Marker } from 'react-mapbox-gl';

export default function Map2() {
  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiamVmZnRieXJkIiwiYSI6ImNtMnVhMGVnajAwMDQya3NsZnppaGRoZGgifQ.h_ngiCgv-Xi_aQxRiRV6aQ',
  });
  // const [lngLat, setLngLat] = useState();
  // const [newPlace, setNewPlace] = useState();

  // const { lat, lng: long } = event.lngLat;

  // const handleAddClick = (event) => {
  //   const [lat, long] = event.lngLat;
  //   setNewPlace({ lat, long });
  //   Marker.setLngLat(event.lngLat).addTo(Map);
  // };

  // const marker = new mapboxgl.Marker({
  //   color: '#314ccd',
  // });

  let lng;
  let lat;

  return (
    <Map
      style="mapbox://styles/jefftbyrd/cm2u9hrbc00al01padk1f48s8"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      onClick={(event) => {
        lng = event.lngLat.lng;
        lat = event.lngLat.lat;
        console.log(`${lng}, ${lat}`);
        const coords = { lng: lng, lat: lat };
        Marker.setLngLat(coords).addTo(Map.current);
      }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
      {/* {console.log('newPlace', newPlace)} */}
    </Map>
  );
}
