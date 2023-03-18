/**
 * This file is the start for the React applicationm rendering the App component
 * to the root DOM element with the ID 'root'.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

// Take the imported App component and render to root DOM.
root.render(<App />);
