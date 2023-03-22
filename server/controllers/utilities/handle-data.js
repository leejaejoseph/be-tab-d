/**
 * Taking data as a parameter, it checks to see if the header row contains double
 * quotes and throws if it does include it. The headers are then split per comma.
 * The data row checks to see if the data contains a comma inside of a quote and
 * excludes it from the split use Regex and checks to see if data.length has more
 * or less amount of rows than the header row and throws using the error middleware.
 */
const ClientError = require('../../error-middleware');

function handleData(data) {
  const { user } = (data);
  const csv = user.file;
  const csvRows = csv.split(/\r?\n/);
  if (csvRows[0].includes('"')) {
    throw new ClientError('Do not have error Header row containing double quotes', 500);
  }
  const headerRow = csvRows[0].split(',');
  const headerCount = headerRow.length;
  for (let i = 1; i < csvRows.length; i++) {
    const dataRow = csvRows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if (dataRow.length > headerCount) {
      throw new ClientError(`Data Row has more data points than Header row at Row ${i + 1}`, 400);
    } else if (dataRow.length < headerCount) {
      throw new ClientError(`Data Row has less data points than Header row at Row ${i + 1}`, 400);
    }
  }
}
module.exports = handleData;
