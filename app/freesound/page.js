'use client';
import React, { useEffect, useState } from 'react';

export default function FreesoundApi() {
  const [isLoading, setIsLoading] = useState(true);
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D48.2255%2C16.4137%2520d%3D10%257D%2520tag%3Afield-recording&fields=id%2Cpreviews%2Cname%2Cdescription%2Cgeotag%2Ctags&page_size=12  &token=TXgf9oo3ePNtOWZ7TkZ7zEJrwWDFi8UKCjoh2zTv',
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

  const soundsArray = Array.from(sounds);
  console.log('soundsArray', soundsArray);
  console.log('sounds', sounds);
  console.log(typeof sounds);

  // sounds.results;

  return (
    <>
      <h1>48.22559496201279, 16.413783190286534</h1>
      <div className="soundsList">
        {sounds.results.map((sound) => {
          return (
            <div key={`soundId-${sound.id}`} className="soundItem">
              <h2>{sound.name}</h2>
              <h4>{sound.previews['preview-lq-mp3']}</h4>
              {/* <p>{sound.tags}</p> */}
              <p>{sound.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
