import React from 'react';

export default function SignIn() {
  return (
    <div className="my-10 rounded-3xl comfortaa h bg-[#E6E6E6]/[.4] items-center">
      <div className='m-0-auto w-9/12'>
        <div className="text-4xl text-[#555] text-center pt-32">
          WELCOME BACK
        </div>
        <div className="mt-28 text-xl text-[#323232] pb-5 mb-4">
          Username
        </div>
        <input type="text" className='text-2xl bg-transparent !outline-none border-0 border-solid border-b-2 border-[#646464] w-full mb-7'/>
        <div className="text-xl text-[#323232] pb-5 mb-4">
          Password
        </div>
        <input type="password" className='text-2xl bg-transparent !outline-none border-0 border-solid border-b-2 border-[#646464] w-full mb-4' />
        <div className="text-[#838383] text-right text-base">
          Forgot Password?
        </div>
        <button className='mb-6 text-white w-3/4 py-4 text-2xl bg-[#838383] hover:bg-[#7ecbc0] hover:tracking-wider button-login'>
          Let&apos;s get started
        </button>
      </div>
    </div>
  );
}
