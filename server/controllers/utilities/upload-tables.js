const valuesCounter = require('./values-counter');
const extractHeader = require('./extract-header');

/**
 * UploadTables takes the parametered object and destructures the inner objects
 * into variables. the main functionality of taking headers and using it within
 * sql insert is done by callign the extract-headers.js which is the first row in
 * the csv. The rows are split into arrays using \r\n and further split to individual
 * cells using commas.
 */
function uploadTables(param) {
  const { user, db } = param;
  const { tableType, file, fileId, userId } = user;
  const rows = file.split('\r\n');
  const headersArray = rows[0].split(',');
  const headers = extractHeader(headersArray, headersArray.length);

  /**
   * after getting the array of headers, the parameters with using tableType as
   * keys table and using the individual values in the cell by separating by commas
   * after row 1, every row is the pushed into the database under the tableType.
   */
  for (let i = 1; i < rows.length; i++) {
    const param = rows[i].split(',');
    const params = [...param, fileId, userId];
    // valuesCounter is used to create a string for parameters in length of the header count.
    const values = valuesCounter(headersArray.length + 2);
    const sql = `
            insert into "${tableType}" (${headers})
            values (${values})
            returning *
          `;
    db.query(sql, params);
  }
}

module.exports = uploadTables;
