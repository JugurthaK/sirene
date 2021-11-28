const pm2 = require('pm2');

const notifier = (id, filename) => {
  pm2.sendDataToProcessId(
    id,
    {
      id: id,
      type: 'process:msg',
      data: {
        subject: 'newFile',
        file: `/home/jugurthak/epita/sirene/output/${filename}`,
      },
      topic: true,
    },
    (err) => {
      if (err) console.error(err);
    }
  );
};

module.exports = notifier;
