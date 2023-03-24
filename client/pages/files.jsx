/**
 * @returns form object taking csv file, a tabletype, and description.
 */

import React, { useContext, useState, useRef } from 'react';
import AppContext from '../lib/app-context';

export default function Files() {
  const { currentUser, currentRoute } = useContext(AppContext);
  const [description, setDescription] = useState('');
  const [tableType, setTableType] = useState('teachers');
  const url = useRef();
  const action = currentRoute.path;

  /**
 * Utilizing the AppContext to get the ID of the user and putting the id into a
 * form object along with the description, tabletype, and file. The object is then
 * fetched to push into the database under the correct UserId.
 */
  function handleSubmit(event) {
    event.preventDefault();
    const userId = currentUser.userId;
    const objects = new FormData();
    objects.append('userId', userId);
    objects.append('description', description);
    objects.append('tableType', tableType);

    // by using the ref from the file uploaded, the variable stores the data
    const csvFile = url.current.files[0];

    /**
     * The fileReader listens for a loaded file and uses the readAsText to read the contents of the file.
     * Then taking the file appended to objects, a fetch request to post the objects is made.
     */
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
    <div>
      <div
        className='text-2xl md:text-4xl text-center comfortaa my-12 md:my-24'>
        Upload your files when ready
      </div>

      <div className='self-center mx-auto mt-20 p-10 rounded-3xl comfortaa w-11/12 md:w-7/12 bg-[#E6E6E6]/[.7]'>
        <form
          onSubmit={handleSubmit}>
          <div>
            <input className="full" type="file" ref={url} accept=".csv" />
          </div>
          <div className="flex pt-5 flex-wrap">
            <label
              htmlFor='description'>Description</label>
            <textarea
              required
              id='description'
              className="bg-[#ffffff]/[.7] mt-3 w-full rows=4 rounded-2xl px-4 py-2 resize-none"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div className="flex justify-end pt-5 px-5 gap-5">
            <label
              className='pt-2'
              htmlFor='tableType'>Table Type</label>
            <select
              id='tableType'
              className='w-60 h-10 text-center border-solid border-gray-500 border-2 rounded-xl mt-3 md:mt-0'
              onChange={(event) => {
                setTableType(event.target.value);
              }}>
              <option value="teachers">teachers</option>
              <option value="courses">courses</option>
              <option value="students">students</option>
            </select>
          </div>
          <div className="w-full flex justify-center mt-10">
            <button type="submit" className="button-upload rounded-lg m-0 bg-white w-full md:w-9/12 rounded-2xl border-2 border-gray-500 py-3">
              Upload
            </button>
          </div>
        </form>
      </div>
      <div className="mt-10 md:mx-auto px-6 flex justify-end button-wrapper md:w-7/12 md: px-0">
        <button
          className="button-tables hidden md:flex flex-nowrap bg-[#ffd5e9] h-14 rounded-full "
          onClick={() => { window.location.hash = 'my-tables'; }}>
          <p
            className="text-tables absolute py-0 px-3 top-1/2 invisible whitespace-nowrap right-1/4 text-tables text-xl">View Tables</p>
          <i className="fa fa-chevron-right text-2xl pr-5" aria-hidden="true" />
        </button>
        <button
          className="button-tables md:hidden flex flex-nowrap bg-[#ffd5e9] h-14 rounded-full "
          onClick={() => { window.location.hash = 'my-tables'; }}>
          <p
            className="py-0 px-3 whitespace-nowrap right-1/4 text-xl">View Tables</p>
          <i className="fa fa-chevron-right text-2xl pr-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
