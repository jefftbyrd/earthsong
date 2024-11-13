import React from 'react';

export default function Potentiometer(props) {
  return (
    <input
      value={props.volumeControl}
      type="range"
      onChange={props.volume}
      {...props}
    />
  );
}
