import React from 'react';

export default function Tables({ data }) {
  const rowTables = [];
  for (let i = 0; i < data.length; i++) {
    const tables = [];
    for (let j = 0; j < data[i].length; j++) {
      const headers = Object.keys(data[i][j][0]);
      const tableHeading = headers.map((header, index) => <th key={index}>{header}</th>);

      const row = [];
      for (let k = 0; k < data[i][j].length; k++) {
        const obj = Object.values(data[i][j][k]);
        const rowObj = obj.map((obj, index) => <td key={index}>{obj}</td>);
        const returnObj = <tr>{rowObj}</tr>;
        row.push(returnObj);
      }
      tables.push(
        <table>
          <tr>
            {tableHeading}
          </tr>
          {row}
        </table>
      );
    }
    rowTables.push(tables);
  }
  return (
    <div>
      {rowTables}
    </div>
  );
}
