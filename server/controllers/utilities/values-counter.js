/**
 * num representing the length of the headers uses i to count up to represent
 * the position of inserted parameters for the sql database.
 */
function valuesCounter(num) {
  let values = '';
  for (let i = 1; i < num; i++) {
    values += `$${i}, `;
  }
  values += `$${num}`;
  return values;
}

module.exports = valuesCounter;
