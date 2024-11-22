'use client';
// import { motion } from 'motion/react';
import react, { useState } from 'react';

export default function Landing4() {
  // const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  return (
    <>
      <div>test</div>
      <button onClick={() => setIsMounted(true)}>test2</button>
      {isMounted ? <p>this shit is mounted!</p> : null}
    </>
  );
}
