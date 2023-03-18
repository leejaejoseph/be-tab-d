/**
 * The AppContext object shares state between components in the React application.
 *
 * The Provider passes the current user and page route to child components that need its states to
 * add files, display correct tables, and retrieve the correct informations.
 */

import React from 'react';

const AppContext = React.createContext();

export default AppContext;
