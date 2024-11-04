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
  const [lngLat, setLngLat] = useState();

  const { lat, lng: long } = e.lngLat;

  const handleAddClick = (e) => {
    const [lat, long] = e.lngLat;
    setNewPlace({ lat, long });
  };

  return (
    <Map
      style="mapbox://styles/jefftbyrd/cm2u9hrbc00al01padk1f48s8"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      onClick={(e) => {
        // event.preventDefault();
        // let coordinates = event.lngLat;
        // console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
        // lng = event.lngLat.lng;
        // lat = event.lngLat.lat;
        // Marker.setLngLat(lngLat).addTo(Map);
        // this.Marker.setLngLat(coordinates).addTo(this.map);
        // event.preventDefault();
        // setLngLat(lngLat);
        setLngLat(event.lngLat.lng);
        // lat = event.lngLat.lat;
        console.log(`${lng}, ${lat}`);
      }}
      // add_marker: function (event) {
      //   var coordinates = event.lngLat;
      //   console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
      //   this.marker.setLngLat(coordinates).addTo(this.map);
    >
      {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer> */}
      {console.log('lng:', lng)}
    </Map>
  );
}
