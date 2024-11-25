import { useEffect, useState } from 'react';

export default function Freesound(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [sounds, setSounds] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://freesound.org/apiv2/search/text/?filter=%257B%2521geofilt%2520sfield%3Dgeotag%2520pt%3D${props.pin.lat}%2C${props.pin.lng}%2520d%3D10%257D%2520&fields=previews%2Cname%2Cdescription%2Cusername%2Cid%2Ctags%2Cduration%2Cgeotag  &token=${process.env.NEXT_PUBLIC_FREESOUND_API_KEY}`,
      );
      const json = await response.json();
      setSounds(json);
      setIsLoading(false);
    };

    fetchData();
  }, [props.pin]);

  props.sendDataToParent(sounds);

  if (isLoading) {
    // early return
    return 'Loading...';
  }

  console.log('sounds on Freesound', sounds);
}
