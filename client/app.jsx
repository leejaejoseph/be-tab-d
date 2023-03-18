/**
 * This is the main Component for the React application.
 * It renders the static Navbar, Background to reduce Manual DOM creation
 * and routes the pages based on the current state route.
 * The app uses an AppContext provider to share state between components.
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';
import Background from './components/Background';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Login from './pages/login';
import Files from './pages/files';
import Display from './pages/display';

export default function App() {
  // State variables for current route based on hash and current user
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [user, setUser] = useState();
  // Set up event listener to swap pages on hashchange and verify user's login status
  useEffect(() => {
    window.addEventListener('hashchange', () => setRoute(parseRoute(window.location.hash)));
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    setUser(user);
  }, []);

  // Swap pages on hash change based on AppContext.Provider states.
  function pageSelection() {
    const { path } = route;
    switch (path) {
      case 'sign-in':
      case 'sign-up':
        return (<Login />);
      case 'my-files':
        return (<Files />);
      case 'my-display':
        return (<Tables />);
    }
  }
  // Handle the Sign-In button to update the current user state and shift hash to route to my-files page
  function handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('login-token', token);
    window.location.hash = 'my-files';
    setUser(user);
  }

  // Create an object with the context to be shared between components
  const contextObject = { user, route, handleSignIn };

  return (
    <AppContext.Provider value={contextObject}>
      <Background />
      <Navbar />
      <div className='w-11/12 m-0-auto'>
        {pageSelection()}
      </div>
    </AppContext.Provider>
  );
}
