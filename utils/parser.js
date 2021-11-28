const fs = require('fs');
const readline = require('readline');
const { createFile } = require('./file');

const parser = (file) => {
  let rows = '';
  let rowCounter = 0;
  let fileCounter = 0;
  const rd = readline.createInterface({
    input: fs.createReadStream(file),
    console: false,
  });

  rd.on('line', (line) => {
    if (rowCounter === 6000) {
      createFile(fileCounter, rows);
      fileCounter += 1;
      rows = '';
      rowCounter = 0;
    } else {
      rows += line + '\n';
      rowCounter += 1;
    }
  });
};

// parser('/home/jugurthak/epita/sirene/sample/sample.csv');
module.exports = { parser };
// parser('/home/jugurthak/epita/sirene/sample/sample_20000.csv');
// parser('/home/jugurthak/epita/csv/StockEtablissement_utf8.csv');
