/**
 * This is the main Component for the React application.
 * It renders the static Navbar, Background to reduce Manual DOM creation
 * and routes the pages based on the current state route.
 * The app uses an AppContext provider to share state between components.
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import jwtDecode from 'jwt-decode';
import Background from './components/background';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import AuthPage from './pages/auth-page';
import Files from './pages/files';
import TableView from './pages/table-view';
import About from './pages/about';

export default function App() {
  // State variables for current route based on hash and current user
  const [currentRoute, setCurrentRoute] = useState(parseRoute(window.location.hash));
  const [currentUser, setCurrentUser] = useState();
  // Set up event listener to swap pages on hashchange and verify user's login status
  useEffect(() => {
    const handleHashChange = () => setCurrentRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', handleHashChange);
    const token = window.localStorage.getItem('login-token');
    const user = token ? jwtDecode(token) : null;
    setCurrentUser(user);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Swap pages on hash change based on AppContext.Provider states.
  function selectPage() {
    const { path } = currentRoute;
    switch (path) {
      case 'sign-in':
      case 'sign-up':
        return (<AuthPage />);
      case 'my-files':
        if (currentUser === null) {
          window.location.hash = 'sign-in';
        }
        return (<Files />);
      case 'my-tables':
        return (<TableView />);
      case 'about':
        return (<About/>);
      default:
        return (<About />);
    }
  }
  // Handle the Sign-In button to update the current user state and shift hash to route to my-files page
  function handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('login-token', token);
    setCurrentUser(user);
    window.location.hash = 'my-files';
  }

  // Create an object with the context to be shared between components
  const contextObject = { currentUser, currentRoute, handleSignIn };

  return (
    <AppContext.Provider value={contextObject}>
      <Background />
      <Navbar />
      <div className='w-11/12 my-0 mx-auto'>
        {selectPage()}
      </div>
    </AppContext.Provider>
  );
}
