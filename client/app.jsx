import React from 'react';
import Home from './pages/home';
import Navbar from './components/Navbar';
import Background from './components/Background';
import LeftText from './components/LeftText';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <>
      <Background/>
      <Navbar />
      <div className='row'>
        <LeftText />
        <SignIn />
      </div>
    </>
  );
}
