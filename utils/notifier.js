const pm2 = require('pm2');

const notifier = (id, filename) => {
  console.log(`In charge of file ${filename}`);
  pm2.sendDataToProcessId(
    id,
    {
      id: id,
      type: 'process:msg',
      data: {
        subject: 'newFile',
        file: `./output/${filename}`,
      },
      topic: true,
    },
    (err) => {
      if (err) console.error(err);
    }
  );
};

module.exports = notifier;
