const fs = require('fs');
const readline = require('readline');
const csvLineToJson = require('./utils/lineParser');

process.on('process:msg', (payload) => {
  if (payload.data.subject === 'newFile') {
    const file = payload.data.file;

    console.log('Message received');
    /* const rd = readline.createInterface({
      input: fs.createReadStream(file),
      console: false,
    });

    rd.on('line', (line) => {
      const json = JSON.stringify(csvLineToJson(line));
      // Database
    }); */

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
