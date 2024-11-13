import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoiamVmZnRieXJkIiwiYSI6ImNtMnQ1aHV2bzA1am8ya3I0N2J1eWdjZWsifQ.nO7VLi8QEAcJUjvA_NMRpA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
