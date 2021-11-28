const fs = require('fs');
const readline = require('readline');
const csvLineToJson = require('./utils/lineParser');
const { insertInDatabase } = require('./db/mongoose');

console.log('Worker invoked');

process.on('message', (payload) => {
  if (payload.data.subject === 'newFile') {
    const file = payload.data.file;
    const rows = [];
    console.log('Message received');
    const rd = readline.createInterface({
      input: fs.createReadStream(file),
      console: false,
    });

    rd.on('line', (line) => {
      const json = csvLineToJson(line);
      rows.push(json);
    });

    insertInDatabase(rows);
    process.send({
      type: 'process:msg',
      data: {
        subject: 'workDone',
        pm_id: process.env.pm_id,
      },
    });
    console.log(`File: ${file} parsed`);
  }
});
