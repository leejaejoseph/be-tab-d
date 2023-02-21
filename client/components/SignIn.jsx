import React from 'react';

export default function SignIn() {
  return (
    <div className="w-25 loginback upp">
      <div className='inner' />
      <div className="logint">WELCOME BACK</div>
      <div className="login upp">Username</div>
      <input type="text" className='inp to'/>
      <div className="login">Password</div>
      <input type="password" className='inp lo'/>
      <div className="forgot">Forgot Password?</div>
      <button className='button-login'>Let's get started</button>
    </div>
  );
}
