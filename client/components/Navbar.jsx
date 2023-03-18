/**
 * This component is the navbar where the logo links to the about while the other
 * individual anchors link to specific hash pages
 */

import React from 'react';
import logo from '../images/Icon.png';

export default function Navbar() {
  return (
    <div className='flex comfortaa p-10 flex-nowrap w-full justify-between'>
      <a href='#about' className='flex items-center gap-4'>
        <img src={logo} className="w-10 h-10 inline-block" />
        <p className='inline-block paytone text-5xl m-0'>be tab&apos;d</p>
      </a>
      <ul className='flex font-light items-center list-none m-0 p-0 justify-end text-2xl gap-6'>
        <li><a href='#my-files'>My files</a></li>
        <li><a href='#about'>About</a></li>
        <li><a href='#sign-in'>Sign In</a></li>
        <li className='rounded-3xl px-4 py-1 border-solid border-4'><a href='#sign-up'>Sign Up</a></li>
      </ul>
    </div>
  );
}
