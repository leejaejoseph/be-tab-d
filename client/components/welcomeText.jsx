/**
 * This only returns a text div for the authPage.
 */

import React from 'react';

export default function WelcomeText() {
  return (
    <>
      <div className='hidden md:flex mt-36 flex-col gap-3'>
        <p className="comfortaa text-7xl font-bold text-[#676767] mb-16">
          be tab&apos;d
        </p>
        <p className="comfortaa text-xl text-[#323232] leading-8">
          be tab’d is a tool to convert a csv file to a relational database and is soon to organize your docs/pdf files into folders by keywords.
        </p>
        <p className="comfortaa text-xl text-[#323232] pt-5">
          Please start by signing up or signing in.
        </p>
      </div>
      <div className='md:hidden mt-10 flex flex-col gap-3'>
        <p className="comfortaa text-5xl font-bold text-[#676767] ml-5 mb-16 welcome-text">
          be tab&apos;d
        </p>
        <p className="comfortaa text-l text-[#323232] leading-8 welcome-text mx-4">
          be tab’d is a tool to convert a csv file to a relational database and is soon to organize your docs/pdf files into folders by keywords.
        </p>
        <p className="comfortaa text-l text-[#323232] pt-5 welcome-text mx-4">
          Please start by signing up or signing in.
        </p>
      </div>
    </>
  );
}
