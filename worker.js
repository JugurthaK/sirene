const fs = require('fs');
const readline = require('readline');
const csvLineToJson = require('./utils/lineParser');

console.log('Worker invoked');

process.on('message', (payload) => {
  if (payload.data.subject === 'newFile') {
    const file = payload.data.file;

    console.log('Message received');
    const rd = readline.createInterface({
      input: fs.createReadStream(file),
      console: false,
    });

    rd.on('line', (line) => {
      const json = JSON.stringify(csvLineToJson(line));
    });
    setTimeout(() => {}, 1500);

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
