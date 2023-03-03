import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../lib/app-context';
import Tables from '../components/Tables';
import organizedData from '../components/utilities/organized-data';

export default function Files() {
  const [get, setGet] = useState([]);
  const { user, route } = useContext(AppContext);
  const action = route.path;
  const userId = user.userId;
  const req = {
    method: 'GET'
  };

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

  return (
    <div>
      <h1>Hello WORLD</h1>
      <Tables
        data={get}/>
    </div>
  );
}
