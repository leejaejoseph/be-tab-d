function extractHeader(headers, num) {
  let returnString = '';

  for (let i = 0; i < num; i++) {
    returnString += `"${headers[i]}", `;
  }
  returnString += '"fileId"';
  return returnString;
}
module.exports = extractHeader;
