/**
 * This component is the navbar where the logo links to the about while the other
 * individual anchors link to specific hash pages
 */

import React, { useState } from 'react';
import logo from '../images/Icon.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }
  return (
    <>
      <div className='flex comfortaa p-10 flex-nowrap w-full justify-between'>
        <a href='#about' className='flex items-center gap-4'>
          <img src={logo} className="w-7 h-7 md:w-10 md:h-10 inline-block" />
          <p className='inline-block paytone text-3xl md:text-5xl m-0'>be tab&apos;d</p>
        </a>
        <ul className='hidden md:flex font-light items-center list-none m-0 p-0 justify-end text-2xl gap-6'>
          <li><a href='#my-files'>My files</a></li>
          <li><a href='#about'>About</a></li>
          <li><a href='#sign-in'>Sign In</a></li>
          <li className='rounded-3xl px-4 py-1 border-solid border-4'><a href='#sign-up'>Sign Up</a></li>
        </ul>
        <button onClick={handleMenuClick} className='md:hidden text-3xl md:text-4xl'><i className="fa fa-bars" aria-hidden="true" /></button>
      </div>
      <div className={menuOpen ? 'md:hidden overflow-hidden bg-gray-400 bg-opacity-60' : 'menu md:hidden hidden'}>
        <ul className='md:flex font-light items-center list-none m-0 p-0 justify-end text-2xl'>
          <li className='p-3 border-b-2 border-solid'><a className='block' href='#my-files'>My files</a></li>
          <li className='p-3 border-b-2 border-solid'><a className='block' href='#about'>About</a></li>
          <li className='p-3 border-b-2 border-solid'><a className='block' href='#sign-in'>Sign In</a></li>
          <li className='p-3'><a className='block' href='#sign-up'>Sign Up</a></li>
        </ul>
      </div>
    </>
  );
}
