const pm2 = require('pm2');
const { asyncStart } = require('./utils/pm2Async');
const workersInit = async (nb) => {
  await asyncStart({
    script: 'worker.js',
    name: 'sirene',
    instances: 'max',
    exec_mode: 'cluster',
  });
};

module.exports = { workersInit };
