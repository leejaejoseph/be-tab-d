/**
 * taking the first row as the parameter and split by commas, the header structured
 * for sql usage is formatted here as a string and returned.
 */

function extractHeader(headers, num) {
  let returnString = '';

  for (let i = 0; i < num; i++) {
    returnString += `"${headers[i]}", `;
  }
  returnString += '"fileId"';
  return returnString;
}
module.exports = extractHeader;
