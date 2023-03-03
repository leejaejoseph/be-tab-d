import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';
import Background from './components/Background';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Login from './pages/login';
import Files from './pages/files';
import Tables from './pages/tables';

export default function App() {
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [user, setUser] = useState();

  useEffect(() => {
    window.addEventListener('hashchange', () => setRoute(parseRoute(window.location.hash)));
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    setUser(user);
  }, []);

  function pageSelection() {
    const { path } = route;
    switch (path) {
      case 'sign-in':
      case 'sign-up':
        return (<Login />);
      case 'my-files':
        return (<Files />);
      case 'my-tables':
        return (<Tables/>);
    }
  }

  function handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('login-token', token);
    window.location.hash = 'my-files';
    setUser(user);
  }

  const contextObject = { user, route, handleSignIn };

  return (
    <AppContext.Provider value={contextObject}>
      <Background/>
      <Navbar />
      <div className='w-11/12 m-0-auto'>
        {pageSelection()}
      </div>
    </AppContext.Provider>
  );
}
