import React from 'react';
// import logo from '../images/Icon.png';

export default function Navbar() {
  return (
    <div className='flex paytone py-10 flex-nowrap w-full justify-between'>
      <a className='logo-anchor'>
        {/* <img src={logo} className="w-10 h-10 inline-block"/> */}
        <p className='inline-block paytone text-5xl m-0 text-slate-700'>be tab&apos;d</p>
      </a>
      <ul className='nav-items'>
        <li className='nav-item'><a>My files</a></li>
        <li className='nav-item'><a>About</a></li>
        <li className='nav-item'><a>Sign In</a></li>
        <li className='nav-button'><a>Sign Up</a></li>
      </ul>
    </div>
  );
}
