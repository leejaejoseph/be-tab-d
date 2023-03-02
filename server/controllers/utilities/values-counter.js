function valuesCounter(num) {
  let values = '';
  for (let i = 1; i < num; i++) {
    values += `$${i}, `;
  }
  values += `$${num}`;
  return values;
}

module.exports = valuesCounter;
