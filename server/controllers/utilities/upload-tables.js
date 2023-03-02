const extractHeader = require('./extract-header');
const valuesCounter = require('./values-counter');

function uploadTables(param) {
  const { user, db } = param;
  const { tableType, file, fileId } = user;
  const rows = file.split('\r\n');
  const headersArray = rows[0].split(',');
  const headers = extractHeader(headersArray, headersArray.length);

  for (let i = 1; i < rows.length; i++) {
    const param = rows[i].split(',');
    const params = [...param, fileId];
    const values = valuesCounter(headersArray.length + 1);
    const sql = `
            insert into "${tableType}" (${headers})
            values (${values})
            returning *
          `;
    db.query(sql, params);
  }
}

module.exports = uploadTables;
