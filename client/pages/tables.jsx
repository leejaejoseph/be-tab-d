import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

export default function tables() {
  const { route, handleSignIn, user } = useContext(AppContext);
  return (
    <div className='flex justify-between'>
      <div className="basis-4/12">
        <LeftText />
      </div>
      <div className="basis-5/12">
        <SignIn
          action={route.path}
          onSignIn={handleSignIn}
          user={user} />
      </div>
    </div>
  );
}
