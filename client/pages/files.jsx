import React, { useContext, useState, useRef } from 'react';
import AppContext from '../lib/app-context';

export default function Files() {
  const { user, route } = useContext(AppContext);
  const [description, setDescription] = useState('');
  const [tableType, setTableType] = useState('students');
  const url = useRef();
  const action = route.path;

  function handleSubmit(event) {
    event.preventDefault();
    const userId = user.userId;
    const objects = new FormData();
    objects.append('userId', userId);
    objects.append('description', description);
    objects.append('tableType', tableType);

    const csvFile = url.current.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      objects.append('file', reader.result);

      const req = {
        method: 'POST',
        body: objects
      };
      fetch(`/api/auth/${action}`, req)
        .then((res) => res.json())
        .catch((err) => console.error(err));
    });
    reader.readAsText(csvFile);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Hello WORLD</h1>
      <h2>Description</h2>
      <input type="file" ref={url} accept=".csv" />
      <input
        required
        type="text"
        className="bg-red-300"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <select
        onChange={(event) => {
          setTableType(event.target.value);
        }}>
        <option value="students">students</option>
        <option value="courses">courses</option>
        <option value="teachers">teachers</option>
      </select>
      <button type="submit" className="bg-blue-200">
        Submit
      </button>
    </form>
  );
}
