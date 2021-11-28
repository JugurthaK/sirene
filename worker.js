const fs = require('fs');
const readline = require('readline');
const csvLineToJson = require('./utils/lineParser');
const { insertInDatabase } = require('./db/mongoose');

console.log('Worker invoked');

process.on('message', async (payload) => {
  if (payload.data.subject === 'newFile') {
    const file = payload.data.file;
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
          .then((_) => console.log(`${rows.length} pushed to database`))
          .catch((err) => console.error(err));
      } catch (e) {
        console.error(e);
        process.exit(2);
      }
    });

    process.send({
      type: 'process:msg',
      data: {
        subject: 'workDone',
        pm_id: process.env.pm_id,
      },
    });
  }
});
