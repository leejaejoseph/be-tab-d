import React from 'react';
<<<<<<< HEAD
// this utility is where I actually take the values of their rows for displaying on the react page.
=======
/**
 * Being the React Component for Tables, this component destructures the parameter
 * for the data variable containing organized arrays by one primary key from the
 * organized-tables.js utility.
 * Then mapping through the data and attaining the headers, the table renders
 * the amount of tableTypes per different primary keys and displays the relational
 * tables.
 */
>>>>>>> e708553 (Added documentation to project.)
export default function Tables({ data }) {
  const rowTables = [];
  for (let i = 0; i < data.length; i++) {
    const tables = [];
    for (let j = 0; j < data[i].length; j++) {
      const headers = Object.keys(data[i][j][0]);
      const tableHeading = headers.map((header, index) => <th className='bg-[#e1feff]' key={index}>{header}</th>);
      const row = [];
      for (let k = 0; k < data[i][j].length; k++) {
        const obj = Object.values(data[i][j][k]);
        const rowObj = obj.map((obj, index) => <td key={index}>{obj}</td>);
        const returnObj = <tr>{rowObj}</tr>;
        row.push(returnObj);
      }
      tables.push(
        <table
          className='inline-block mx-9'>
          <tbody>
            <tr>
              {tableHeading}
            </tr>
          </tbody>
          {row}
        </table>
      );
    }
    rowTables.push(
      <div
        className='justify-center flex flex-col mt-5 line-table'>
        <h2
          className='block text-center text-2xl'>
          Table {i + 1}
        </h2>
        <div
          className='row mt-5 mb-20'>
          {tables}
        </div>
      </div>);
  }
  return (
    <div
      className="p-5 rounded-3xl comfortaa bg-[#E6E6E6]/[.4]">
      {rowTables}
    </div>
  );
}
