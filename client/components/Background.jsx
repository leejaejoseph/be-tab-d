/**
 * The background component is mainly a front-end function that allows a radial
 * circular div to trail to the user's mouse after a delay. Due to the project
 * being based off react, instead of running this background off the static html,
 * this project uses state based off mouse position. The state of the mouse position
 * rerenders the react but is limited using lodash throttle.
 */

import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export default function Background() {
  // set state off mousePosition
  const [mousePosition, setMousePosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /**
   * To prevent React from rerendering as state changes by mouse movement
   * lodash throttle is used to limit how many re-renders occur.
   */
  const handleMouseMove = useCallback(
    debounce((event) => {
      setMousePosition({ left: event.clientX, top: event.clientY });
    }, 500), []);

  /**
   * The first div is a countainer housing the inner circular blob animated to
   * rotate and is styled with a gradient.
   * This container is then blurred by the second div.
   */
  return (
    <>
      <div className='overflow-hidden absolute w-screen h-screen -z-20'>
        <div
          style={{ left: mousePosition.left, top: mousePosition.top }}
          className="radial-blob -z-20"
        />
      </div>
      <div className="fixed w-screen h-screen backdrop-blur-3xl -z-10" />
    </>
  );
}
