import React, { useState } from 'react';

/**
 * @returns a form taking in two fields on username and password.
 * Depending on the action parameter, the form will be a submission for signup
 * or signin.
 */
export default function SignIn({ action, onSignIn, user }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  /**
   * This function running on submit of the form will do a fetch request to the
   * server depending on the action from the context passed as a parameter.
   */
  function handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };

    /**
   * If this fetch request results in any errors during the fetch whether through
   * sign up or sign in where passwords are invalid or usernames are duplicates,
   * the error message will take the result errors and display them by updating the
   * state.
   */
    fetch(`/api/auth/${action}`, req)
      .then((res) => res.json())
      .then((result) => {
        if (action === 'sign-up') {
          if (result.error !== undefined) {
            setErrorMessage(result.error);
          } else {
            window.location.hash = 'sign-in';
            setErrorMessage(null);
          }
        } else if (result.user && result.token) {
          onSignIn(result);
        } else {
          setErrorMessage(result);
        }
      })
    ;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="my-10 rounded-3xl comfortaa h bg-[#E6E6E6]/[.4] items-center">
      <div className='m-0-auto w-9/12'>
        <div className="text-4xl text-[#555] text-center pt-32">
          {(action === 'sign-in') ? 'Sign-In' : 'Sign-Up'}
        </div>
        <div className={errorMessage ? 'text-[#FF0000]' : 'hidden'}>
          <p>Error message: {errorMessage}</p>
        </div>
        <div
          required
          className="mt-28 text-xl text-[#323232] pb-1 mb-0 pl-1">
          Username
        </div>
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          className='text-2xl bg-transparent pl-1 !outline-none border-0 border-solid border-b-2 border-[#646464] w-full mb-7' />
        <div className="text-xl text-[#323232] pb-1 mb-0 pl-1">
          Password
        </div>
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className='text-2xl bg-transparent pl-1 !outline-none border-0 border-solid border-b-2 border-[#646464] w-full mb-4' />
        <div className="text-[#838383] text-right text-base">
          <a href={action === 'sign-in' ? '#sign-up' : '#sign-in'}>
            {(action === 'sign-in') ? 'Create an Account' : 'Already have an Account'}
          </a>
        </div>
        <button
          className='mb-6 text-white w-3/4 py-4 text-2xl bg-[#838383] hover:bg-[#7ecbc0] hover:tracking-wider button-login'>
          Let&apos;s get started
        </button>
      </div>
    </form>
  );
}
