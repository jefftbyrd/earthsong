'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import uniqolor from 'uniqolor';
import styles from './sketch.module.scss';

export const portal = (p5) => {
  var col = {
    r: 0,
    g: 0,
    b: 0,
  };
  let shapes = [],
    sampleDraw,
    playRate;
  let multiPlayer;
  let sounds2;
  let sounds3;
  let player;
  let shapesButton;
  // let name;
  let radius = 150;
  // let bg;

  p5.updateWithProps = (props) => {
    if (props.soundsColor) {
      sounds2 = [...props.soundsColor];
    }
    if (props.soundsColor && shapes.length < 1) {
      generateShapes();
    }
    if (props.playerTarget) {
      playSound2(props.playerTarget);
    }
    // if (props.sendDataToParent) {
    //   function handleClick() {
    //     sendDataToParent(data);
    //   }
    // }
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    multiPlayer = new Tone.Players();
  };

  function generateShapes() {
    sounds2.map((sound) => {
      let x = p5.random(p5.width);
      let y = p5.random(p5.height);
      // let r = p5.random(40, 200);
      let id = sound.id;
      let name = sound.name;
      // let bg = p5.color(sound.color);
      let bg = sound.color;
      let url = sound.previews['preview-lq-mp3'];
      let b = new Shape(x, y, id, name, bg, url);
      shapes.push(b);
      // generatePlayers();
      // multiplayer.add(sound.id, sound.previews['preview-lq-mp3']);
      // let newSound = new Sound(sound.id, sound.name, sound.description);
    });
    generatePlayers();
  }

  function generatePlayers() {
    for (let i = 0; i < shapes.length; i++) {
      // shapes[i].rollover(p5.mouseX, p5.mouseY);
      // shapes[i].move();
      shapes[i].players();
      // shapes[i].showName();
    }
  }

  p5.draw = () => {
    p5.background(0);
    // p5.select(`.s329708`).attribute('font-size', '300');
    p5.line(0, 200, p5.windowWidth, 200);
    p5.stroke('lightblue');

    for (let i = 0; i < 48; i++) {
      let step = p5.windowWidth / 48;
      p5.line(
        step * i,
        200,
        step * i * 10 - p5.windowWidth * 4,
        p5.windowWidth,
      );
    }

    for (let i = 0; i < shapes.length; i++) {
      shapes[i].rollover(p5.mouseX, p5.mouseY);
      // shapes[i].move();
      shapes[i].show();
      shapes[i].audioControls();
      // shapes[i].showName();
    }
  };

  function playSound2(id) {
    if (multiPlayer.player(id).state === 'started') {
      multiPlayer.player(id).stop();
    } else {
      multiPlayer.player(id).start();
    }
  }

  // class Sound {
  //   constructor(id, name, description) {
  //     this.id = id;
  //     this.name = name;
  //     this.description = description;
  //   }
  // }

  class Shape {
    constructor(x, y, id, name, bg, url) {
      this.x = x;
      this.y = y;
      // this.r = r;
      // this.brightness = 0;
      this.isClicked = false;
      // multiplayer.player(id).state = 'started';
      this.id = id;
      this.name = name;
      this.bg = bg;
      this.url = url;
    }

    rollover(px, py) {
      let d = p5.dist(px, py, this.x, this.y);
      if (d < this.diameter) {
        // boolean flag
        // use for anytime you want something to only happen once
        // if the mouse is pressed set clicked to true
        // directly after the mouse is pressed set it to false to remove double triggers
        // if (p5.mouseIsPressed && !this.isClicked) {
        //   // switch the boolean so we don't get
        //   // double triggers
        //   // we need this since mouseIsPressed will
        //   // happen continuously in the draw loop
        //   this.isClicked = true;
        //   // console.log(this.isClicked);
        //   this.playSound(this.id);
        // }
        // this.brightness = 255;
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
      // let targetStatus = p5.select(`#${this.id}`, '.statusBar');
      // let targetStatus = p5.select(`.s${this.id}`);
      // p5.select(`.s329708`).attribute('font-size', '300');
      // console.log('targetStatus', targetStatus);
      if (multiPlayer.player(this.id).state === 'started') {
        p5.fill(this.bg);
        p5.select(`.s${this.id}`).attribute(
          'style',
          `background-color:${this.bg}`,
        );
        // sendDataToParent(this.id);
        // p5.fill(255, 255, 255);
        // p5.fill(this.bg.replace(')', ', 1)'));
        // targetStatus.fill(this.bg);
      } else {
        // p5.fill(this.bg);
        p5.fill(this.bg.replace('1)', '0.75)'));
        p5.select(`.s${this.id}`).attribute(
          'style',
          `background-color:${this.bg.replace('1)', '0.75)')}`,
        );
        // p5.fill(255, 255, 255);
        // console.log('bg', this.bg);
      }
      // p5.stroke(255);
      // p5.strokeWeight(4);
      this.diameter =
        p5.map(this.y, 0, p5.windowHeight, 50, 800) + this.meterMap;
      p5.ellipse(this.x, this.y, this.diameter);
      // this.diameter = p5.map(this.y, 0, p5.windowHeight, 50, 800);
      // this.diameter += this.meterMap;
      // this.diameter += this.meterRead;
    }

    players() {
      // multiPlayer.add(this.id, this.url);
      multiPlayer.add(this.id, this.url, () => {
        console.log(`${this.id} loaded`);
        // players.player('gong').start();
      });
      multiPlayer.player(this.id).loop = true;
      multiPlayer.player(this.id).fadeIn = 0.1;
      multiPlayer.player(this.id).fadeOut = 0.3;
      this.meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
      this.channel = new Tone.Channel();
      this.reverb = new Tone.Reverb();
      multiPlayer.player(this.id).connect(this.meter);
      multiPlayer.player(this.id).connect(this.channel);
      this.channel.connect(this.reverb);
      this.reverb.toDestination();
    }

    // playerControls() {}

    audioControls() {
      this.meterLevel = this.meter.getValue();
      this.meterMap = p5.map(this.meterLevel, 0, 0.3, 0, 200);
      // this.diameter = p5.map(this.y, 0, p5.windowHeight, 50, 800);
      // this.diameter += this.meterMap;
      // this.diameter += this.meterRead;
      this.revWet = p5.map(this.y, 0, p5.windowHeight, 1, 0);
      this.panX = p5.map(this.x, 0, p5.windowWidth, -1, 1);
      this.volY = p5.map(this.y, 0, p5.windowHeight, -8, 6);
      if (this.panX > 1) {
        this.panX = 1;
      }
      if (this.panX < -1) {
        this.panX = -1;
      }
      if (this.revWet > 1) {
        this.revWet = 1;
      }
      if (this.revWet < 0) {
        this.revWet = 0;
      }
      this.channel.pan.value = this.panX;
      this.channel.volume.value = this.volY;
      this.reverb.wet.value = this.revWet;
    }

    playSound(id) {
      if (multiPlayer.player(id).state === 'started') {
        multiPlayer.player(id).stop();
      } else {
        multiPlayer.player(id).start();
      }
    }
  }

  // Run when the mouse/touch is down.
  p5.mousePressed = () => {
    if (shapes.length > 0) {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i],
          distance = p5.dist(p5.mouseX, p5.mouseY, shape.x, shape.y);
        if (distance < radius) {
          shape.active = true;
          shape.color = '#f00';
        } else {
          shape.active = false;
          shape.color = '#000';
        }
      }
    }
    // Prevent default functionality.
    return false;
  };

  p5.mouseDragged = () => {
    if (shapes.length > 0) {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        if (shape.active) {
          shape.x = p5.mouseX;
          shape.y = p5.mouseY;
          break;
        }
      }
    }
    // Prevent default functionality.
    return false;
  };
};

export default function Portal(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [soundsColor, setSoundsColor] = useState();
  const [generate, setGenerate] = useState(false);
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  const [dataFromChild, setDataFromChild] = useState();

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  useEffect(() => {
    const addColor = async () => {
      const response = await props.sounds;
      const soundsWithColor = response.results.slice(0, 5).map((sound) => ({
        ...sound,
        color: uniqolor
          .random({ format: 'rgb' })
          .color.replace(')', ', 1)')
          .replace('rgb', 'rgba'),
        // bg.replace(')', ', 0.75)').replace('rgb', 'rgba');
      }));
      // const json = await response.json();
      setSoundsColor(soundsWithColor);
      setIsLoading(false);
    };

    addColor();
  }, []);

  if (isLoading) {
    // early return
    return 'Loading...';
  }

  // const soundsColor = sounds.results.map((sound) => ({
  //   ...sound,
  //   color: uniqolor.random(),
  // }));

  // const handleGenerate = () => {
  //   if (!generate) {
  //     setGenerate(true);
  //   }
  // };

  return (
    <>
      <div className={styles.statusBar}>
        {soundsColor.map((sound) => {
          return (
            <div
              key={`soundId-${sound.id}`}
              // id={sound.id}
              class={`s${sound.id}`}
              style={{ backgroundColor: sound.color }}
              onClick={() => {
                setPlayerTarget(sound.id);
                setPlaying(!playing);
              }}
              // style={
              //   // playerTarget && playing
              //     ? { backgroundColor: sound.color }
              //     : { backgroundColor: sound.color.replace('1)', '0.75)') }
              // }
            >
              <h3>{sound.name}</h3>
              {/* .replace('1)', '0.75)') */}
            </div>
          );
        })}
        {/* <button onClick={handleGenerate}>GENERATE!</button> */}
        {/* {console.log('playerTarget', playerTarget)} */}
      </div>

      {/* {console.log('soundsColor', soundsColor)} */}
      {console.log('dataFromChild in Portal return', dataFromChild)}

      {soundsColor.length > 0 ? (
        <NextReactP5Wrapper
          sketch={portal}
          soundsColor={soundsColor}
          generate={generate}
          playerTarget={playerTarget}
          play={playing}
          // sendDataToParent={handleDataFromChild}
        />
      ) : null}
    </>
  );
}
