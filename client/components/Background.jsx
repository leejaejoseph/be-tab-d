import React, { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    addEventListener();
    return () => removeEventListener();
  });
  const addEventListener = () => {
    document.addEventListener('mousemove', handleMouseMove);
  };

  const removeEventListener = () => {
    document.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = useCallback(throttle(event => { setMousePosition({ left: event.clientX, top: event.clientY }); }, 1), []);
  return (
    <>
      <div
        style={{ left: mousePosition.left, top: mousePosition.top }}
        className='radial-blob' />
      <div className="overlay-blur" />
    </>
  );
}
