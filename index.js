const pm2 = require('pm2');
const fs = require('fs');
const { parser } = require('./utils/parser');
const { workersInit } = require('./workersInit');
const { asyncList } = require('./utils/pm2Async');
const notifier = require('./utils/notifier');

const freeWorkers = [];
const notParsedYet = [];

pm2.launchBus(async (err, bus) => {
  bus.on('process:msg', (packet) => {
    if (packet.data.subject === 'workDone') {
      if (notParsedYet.length > 0 && freeWorkers.length === 0) {
        let file = notParsedYet.shift();
        notifier(packet.data.pm_id, file);
      } else {
        freeWorkers.push(packet.data.pm_id);
      }
    }
  });
});

pm2.connect(async (err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  await workersInit();

  let list = await asyncList();
  list = list.forEach((worker) => {
    freeWorkers.push(worker.pm_id);
  });

  parser('./sample/sample_20000.csv');
  fs.watch('./output', (eventType, filename) => {
    if (eventType === 'rename') {
      if (freeWorkers.length > 0) {
        let worker = freeWorkers.shift();
        console.log('Used:', worker, 'Left:', freeWorkers);
        notifier(worker, filename);
      } else {
        notParsedYet.push(filename);
        console.log('Currently available:', freeWorkers);
      }
    }
  });

  console.log('Notparsed', notParsedYet);
});
