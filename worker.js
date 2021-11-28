const fs = require('fs');
const readline = require('readline');
const csvLineToJson = require('./utils/lineParser');
const { insertInDatabase } = require('./db/mongoose');

console.log('Worker invoked');

process.on('message', (payload) => {
  console.log(`Listening for a message`)
  if (payload.data.subject === 'newFile') {
    const file = payload.data.file;
    console.log(`In charge of file ${file}`)
    const rows = [];
    const rd = readline.createInterface({
      input: fs.createReadStream(file),
      console: false,
    });

    rd.on('line', (line) => {
      const json = csvLineToJson(line);
      rows.push(json);
    });

    rd.on('pause', async () => {
      try {
        insertInDatabase(rows)
          .then(_ => console.log("Data on database"))
          .catch(err => console.error(err))
      } catch (e) {
        console.error(e)
      }
    })

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
