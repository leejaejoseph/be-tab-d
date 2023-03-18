import React, { useContext } from 'react';
import LeftText from '../components/LeftText';
import SignIn from '../components/SignIn';
import AppContext from '../lib/app-context';

/**
 * @returns div elements where user sees an explanation of what project is and
 * It also passes in the context states for each div with sign-in swapping depending
 * on whether the action is sign in or signup.
 */
export default function Login() {
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
