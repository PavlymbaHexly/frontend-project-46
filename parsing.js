const fs = require('fs');

function parseFile(filepath) {
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
}

module.exports = parseFile;
