import React from 'react';
import logo from '../images/Icon.png';

export default function Navbar() {
  return (
    <div className='flex comfortaa p-10 flex-nowrap w-full justify-between'>
      <a className='flex items-center gap-4'>
        <img src={logo} className="w-10 h-10 inline-block"/>
        <p className='inline-block paytone text-5xl m-0'>be tab&apos;d</p>
      </a>
      <ul className='flex font-light items-center list-none m-0 p-0 justify-end text-2xl gap-6'>
        <li><a>My files</a></li>
        <li><a>About</a></li>
        <li><a>Sign In</a></li>
        <li className='rounded-3xl px-4 py-1 border-solid border-4'><a>Sign Up</a></li>
      </ul>
    </div>
  );
}
