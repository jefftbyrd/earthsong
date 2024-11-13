'use client';
import * as Tone from 'tone';

export default function TonePage() {
  const player = new Tone.Player(
    'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
    function () {
      //the player is now ready
    },
  ).toDestination();
  player.autostart = true;

  const multiPlayer = new MultiPlayer(
    {
      dogs: 'https://cdn.freesound.org/previews/166/166421_1661766-hq.mp3',
      lady: 'https://cdn.freesound.org/previews/11/11703_2-hq.mp3',
    },
    function () {
      multiPlayer.start('dogs', 'lady');
    },
  ).toDestination();

  async function playSound() {
    await Tone.start();
  }

  return (
    <>
      <h1>try this</h1>
      <button onClick={playSound}>click me</button>
    </>
  );
}
