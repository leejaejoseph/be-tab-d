/* eslint-disable react-hooks/exhaustive-deps -- Run only once on mount */
import React, { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const handleMouseMove = useCallback(
    throttle((event) => {
      setMousePosition({ left: event.clientX, top: event.clientY });
    }, 1000), []);
  return (
    <>
      <div
        style={{ left: mousePosition.left, top: mousePosition.top }}
        className='radial-blob -z-20' />
      <div className="absolute w-screen h-screen backdrop-blur-3xl -z-10" />
    </>
  );
}
