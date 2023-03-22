/**
 * displays relational tables starting from primary key of all csv files.
 * The function uses the appcontext's user and gets the tables for the files
 * uploaded by the user.
 */

import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../lib/app-context';
import Tables from '../components/tables';
import organizedData from '../components/utilities/organized-data';

export default function TableView() {
  const [get, setGet] = useState([]);
  const { currentUser, currentRoute } = useContext(AppContext);
  const action = currentRoute.path;
  const userId = currentUser.userId;
  const req = {
    method: 'GET'
  };
  /**
   * Runs a get request at mount of file fetching all files under UserID.
   * OrganizedData gets called in order to organize all files into organized arrays
   * ordered by primary to foreign key relationships.
   *
   * State array is updated to hold return of method
   */
  useEffect(() => {
    fetch(`/api/auth/${action}/${userId}`, req)
      .then((res) => res.json())
      .then((data) => {
        const organized = organizedData(data);
        setGet(organized);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // State array is passed as a property of data.
  return (
    <div>
      <Tables
        data={get} />
    </div>
  );
}
