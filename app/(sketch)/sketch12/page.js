'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

// import { testSounds } from '../../../database/testSounds';

// import styles from '../sketch.module.scss';

const sketch = (p5) => {
  let shapes = [],
    synth,
    sampleDraw,
    playRate;
  let multiplayer;
  let sounds2;
  let sounds3;
  let player;

  p5.updateWithProps = (props) => {
    console.log('props.sounds', props.sounds);
    if (props.sounds) {
      sounds2 = { ...props.sounds };
      return sounds2;
    }
  };

  p5.setup = async () => {
    p5.createCanvas(1200, 800);
    multiplayer = new Tone.Players().toDestination();
    await sounds2;
    for (let i = 0; i < 1; i++) {
      let x = p5.random(p5.width);
      let y = p5.random(p5.height);
      let r = p5.random(20, 60);
      let b = new Shape(x, y, r);
      shapes.push(b);
    }
    // shapes.forEach((e) => e.addSound());
    console.log('sounds2', sounds2);
    shapes.forEach((e) =>
      e.addSound(
        sounds2.results.map((sound) => {
          return sound.previews['preview-lq-mp3'];
        }),
      ),
    );
    // sounds2.results.map((sound) => {
    //   console.log(sound.previews['preview-lq-mp3']);
    // });
    //  sounds2.results.map((sound) => {
    //   return sound.previews['preview-lq-mp3'];
    // });

    // sounds2.results.forEach.addSound();
    // shapes.forEach(
    //   sounds2.results.map((sound) => {
    //     sound.addSound();
    //   }),
    // );
  };

  // (async function createShapes() {
  //   await sounds2;
  //   console.log('sounds2', sounds2);
  //   for (let i = 0; i < 1; i++) {
  //     let x = p5.random(p5.width);
  //     let y = p5.random(p5.height);
  //     let r = p5.random(20, 60);
  //     let b = new Shape(x, y, r);
  //     shapes.push(b);
  //   }
  //   shapes.forEach((e) => e.addSound());
  // })();

  p5.draw = () => {
    p5.background(0);
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].rollover(p5.mouseX, p5.mouseY);
      shapes[i].move();
      shapes[i].show();
    }
  };

  class Shape {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.brightness = 0;
      this.isClicked = false;
    }

    rollover(px, py) {
      let d = p5.dist(px, py, this.x, this.y);
      if (d < this.r) {
        // boolean flag
        // use for anytime you want somethign to only happen once
        // if the mouse is pressed set clicked to true
        // directly after the mouse is pressed set it to false to remove double triggers
        if (p5.mouseIsPressed && !this.isClicked) {
          // switch the boolean so we don't get
          // double triggers
          // we need this since mouseIsPressed will
          // happen continuously in the draw loop
          this.isClicked = true;
          console.log(this.isClicked);
          this.playSound();
        }

        this.brightness = 255;
      } else {
        // reset the boolean flag when we move
        // off the circle
        if (this.isClicked) {
          this.isClicked = false;
        }

        this.brightness = 0;
      }
    }

    move() {
      this.x = this.x + p5.random(-2, 2);
      this.y = this.y + p5.random(-2, 2);
    }

    show() {
      p5.stroke(255);
      p5.strokeWeight(4);
      p5.fill(this.brightness, 125);
      p5.ellipse(this.x, this.y, this.r * 2);
    }

    initSound() {
      this.synth = new Tone.Synth().toDestination();
    }

    // addSound() {
    //   // multiplayer.add(this.sounds.id, this.sounds.previews['preview-lq-mp3']);
    //   this.player = new Tone.Player(
    //     sounds.previews['preview-lq-mp3'],
    //   ).toDestination();
    // }

    // addSound() {
    //   multiplayer.add(
    //     'gong',
    //     'https://tonejs.github.io/audio/berklee/gong_1.mp3',
    //   );
    // }

    // mapSounds() {
    //   sounds2.results.map();
    // }

    // addSound() {
    //   // multiplayer.add(
    //   //   sounds2.results.map((sound) => {
    //   //     return `'test', ${sound.previews['preview-lq-mp3']}`;
    //   //   }),
    //   // );
    //   this.player = new Tone.Player({
    //     url: sounds2.results.map((sound) => {
    //       return `'test', ${sound.previews['preview-lq-mp3']}`;
    //     }),
    //   }).toDestination();
    //   console.log(`player`, this.player);
    // }

    addSound(snd) {
      console.log('snd', snd);
      this.player = new Tone.Player({
        url: `${snd[1]}`,
      }).toDestination();
      console.log('this.player', this.player);
    }

    playSound() {
      this.player.start();
    }

    // playSound() {
    //   // console.log(this.x);
    //   let volume = p5.map(this.y, p5.height, 0, -30, -6);
    //   console.log(volume);
    //   this.synth.volume.value = volume;
    //   this.synth.triggerAttackRelease(this.x, 1);
    // }
  }
};

export default function Sketch11() {
  const [isLoading, setIsLoading] = useState(true);
  const [sounds, setSounds] = useState();
  // const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D48.2255%2C16.4137%2520d%3D25%257D%2520tag%3Afield-recording&fields=previews%2Cname%2Cdescription%2Cusername%2Cid  &token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
      );
      const json = await response.json();
      setSounds(json);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    // early return
    return 'Loading...';
  }

  // console.log('sounds', sounds);

  // const shapeSounds = sounds.results.map((sound) => {
  //   return (
  //     <div key={`soundId-${sound.id}`} className="soundItem">
  //       <h2>{sound.name}</h2>
  //       {/* <h4>{sound.previews['preview-lq-mp3']}</h4> */}
  //       <p>
  //         <strong>Geo-tag:</strong> {sound.geotag}
  //       </p>

  //       {sounds.results ? (
  //         <PlayerVolume7 soundUrl={sound.previews['preview-lq-mp3']} />
  //       ) : null}
  //       <p>
  //         <strong>Tags:</strong> {sound.tags.join(', ')}
  //       </p>
  //       <hr />
  //       <h3>Description</h3>
  //       <p>{sound.description}</p>
  //     </div>
  //   );
  // });

  return <NextReactP5Wrapper sketch={sketch} sounds={sounds} />;
}
