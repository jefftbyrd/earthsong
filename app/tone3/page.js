'use client';
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export default function TonePage() {
  // const [isLoaded, setIsLoaded] = useState(false);
  const multiPlayer = useRef(null);
  //   var players;

  // var baseURL = 'https://s3-us-west-1.amazonaws.com/leesamples/samples/';

  // function setup() {
  //   background(200);
  //   createCanvas(400, 400);
  //   players = new Tone.Players({
  //     water: baseURL + 'Popcorn+Maker+In+Hell.mp3',
  //     bees: baseURL + 'Morphed/Angry+Bees.mp3',
  //   }).toMaster();
  // }
  // const player = new Tone.Player(
  //   'https://cdn.freesound.org/previews/437/437418_6086320-hq.mp3',
  // ).toDestination();
  // //play as soon as the buffer is loaded
  // player.autostart = true;

  useEffect(() => {
    multiPlayer.current = new Tone.Players({
      1: 'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
      2: 'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
      3: 'https://cdn.freesound.org/previews/11/11700_2-hq.mp3',
      4: 'https://cdn.freesound.org/previews/437/437418_6086320-hq.mp3',
    }).toDestination();
  }, []);

  // const multiPlayer = new Tone.Players(
  //   'https://cdn.freesound.org/previews/437/437418_6086320-hq.mp3',
  //   'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
  // ).toDestination();
  // //play as soon as the buffer is loaded
  // multiPlayer.autostart = true;

  // useEffect(() => {
  //   multiPlayer.current = new Tone.Players(
  //     {
  //       dogs: 'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
  //       lady: 'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
  //     },
  //     function () {
  //       multiPlayer.current.start('dogs', 'lady');
  //     },
  //     (multiPlayer.current.autostart = true),
  //   ).toDestination();
  // }, []);

  // const multiPlayer = new Tone.Players(
  //   {
  //     dogs: 'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
  //     lady: 'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
  //   },
  //   // function () {
  //   //   multiPlayer.start();
  //   // },
  // ).toDestination();
  // // multiPlayer.autostart = true;

  // async function playSound() {
  //   await Tone.start();
  //   console.log('context started');
  // }

  function play1() {
    multiPlayer.player('1').start();
  }

  async function play1() {
    // await Tone.start();
    multiPlayer.player('1').start();
  }

  return (
    <>
      <h1>try this</h1>
      <button onClick={play1}>click me</button>
    </>
  );
}
