// 'use client';
import React, { useEffect, useState } from 'react';
import PlayerVolume7 from './PlayerVolume7';

export default function Freesound(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [sounds, setSounds] = useState();
  // const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D${props.pin.lat}%2C${props.pin.lng}%2520d%3D10%257D%2520tag%3Afield-recording&fields=id%2Cpreviews%2Cname%2Cdescription%2Cgeotag%2Ctags&page_size=12  &token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
      );
      const json = await response.json();
      setSounds(json);
      setIsLoading(false);
    };

    fetchData();
  }, [props.fetch]);

  if (isLoading) {
    // early return
    return 'Loading...';
  }

  // const soundsArray = Array.from(sounds);
  // console.log('soundsArray', soundsArray);
  // console.log('sounds', sounds);
  // console.log(typeof sounds);

  return (
    <>
      <h1>
        {props.pin.lng}, {props.pin.lat}
      </h1>
      {/* {console.log('sounds', sounds)} */}
      <div className="soundsList">
        {sounds.results.map((sound) => {
          return (
            <div key={`soundId-${sound.id}`} className="soundItem">
              <h2>{sound.name}</h2>
              {/* <h4>{sound.previews['preview-lq-mp3']}</h4> */}
              <p>
                <strong>Geo-tag:</strong> {sound.geotag}
              </p>

              {sounds.results ? (
                <PlayerVolume7 soundUrl={sound.previews['preview-lq-mp3']} />
              ) : null}
              <p>
                <strong>Tags:</strong> {sound.tags.join(', ')}
              </p>
              <hr />
              <h3>Description</h3>
              <p>{sound.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
