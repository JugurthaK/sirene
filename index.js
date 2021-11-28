const pm2 = require('pm2');
const fs = require('fs');
const { parser } = require('./utils/parser');
const { workersInit } = require('./workersInit');
const { asyncList } = require('./utils/pm2Async');

const notifier = (filename) => {
  let worker = freeWorkers.shift();
  pm2.sendDataToProcessId(worker, {
    type: 'process:msg',
    data: {
      subject: 'newFile',
      file: `./output/${filename}`,
    },
  });
};

const freeWorkers = [];
const notParsedYet = [];

pm2.launchBus(async (err, bus) => {
  bus.on('process:msg', (packet) => {
    if (packet.data.subject === 'workDone') {
      // console.log(packet);
      freeWorkers.push(packet.data.pm_id);
    }
  });
});

pm2.connect(async (err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  await workersInit(10);
  let list = await asyncList();
  list = list.forEach((worker) => {
    freeWorkers.push(worker.pid);
  });

  parser('./sample/sample_10000.csv');
  fs.watch('./output', (eventType, filename) => {
    if (eventType === 'rename') {
      notifier(filename);
    }
  });
});
