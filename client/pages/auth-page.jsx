/**
 * @returns div elements where user sees an explanation of what project is and
 * It also passes in the context states for each div with sign-in swapping depending
 * on whether the action is sign in or signup.
 */

import React, { useContext } from 'react';
import WelcomeText from '../components/welcomeText';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default function AuthPage() {
  const { currentRoute, handleSignIn, currentUser } = useContext(AppContext);
  return (
    <div className='flex justify-between'>
      <div className="basis-4/12">
        <WelcomeText />
      </div>
      <div className="basis-5/12">
        <AuthForm
          action={currentRoute.path}
          onSignIn={handleSignIn}
          user={currentUser} />
      </div>
    </div>
  );
}
