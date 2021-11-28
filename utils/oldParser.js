const fs = require('fs');
const { createFile } = require('./file');

const parser = (file, registerFile = false) => {
  const rs = fs.createReadStream(file, {
    encoding: 'utf-8',
    //highWaterMark: 64,
  });
  var buffer = '';
  const rows = [];
  let rowCounter = 1;
  let fileCounter = 0;

  rs.on('error', (err) => console.error(err));

  rs.on('data', (chunk) => {
    let index = chunk.indexOf('\n');
    if (index > -1) {
      let [end, rest] = chunk.split('\n');
      rows.push(buffer + end);
      buffer = rest;
      if (rowCounter % 1000 === 0) {
        if (registerFile) createFile(fileCounter, rows.join('\n'));
        else console.log(rows.join('\n'));
        rows.length = 0;
        fileCounter += 1;
      }
      rowCounter += 1;
    } else {
      buffer += chunk;
    }
  });

  rs.on('end', () => {
    console.log('File parsed', 'Buffer', buffer);
  });
};

// parser('/home/jugurthak/epita/sirene/sample/sample.csv');
parser('/home/jugurthak/epita/sirene/sample/sample_10000.csv');
// parser('/home/jugurthak/epita/csv/StockEtablissement_utf8.csv');
// 1,7h
