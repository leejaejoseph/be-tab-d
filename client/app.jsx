import React from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import LeftText from './components/LeftText';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <div className='npm install file-loader --save-dev'>
      <Background/>
      <Navbar />
      <div className='flex justify-between w-11/12 m-0-auto'>
        <div className="basis-4/12">
          <LeftText />
        </div>
        <div className="basis-5/12">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
