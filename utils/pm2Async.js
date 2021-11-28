const pm2 = require('pm2');

const asyncList = () => {
  return new Promise((resolve, reject) => {
    pm2.list((err, list) => {
      if (err) {
        reject(err);
      }

      resolve(list);
    });
  });
};

const asyncStart = (options) => {
  return new Promise((resolve, reject) => {
    pm2.start(options, (err, apps) => {
      if (err) return reject(err);
      resolve(apps);
    });
  });
};

module.exports = { asyncList, asyncStart };
