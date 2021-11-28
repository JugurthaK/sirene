const pm2 = require('pm2');

const notifier = (id, filename) => {
  pm2.sendDataToProcessId(
    id,
    {
      id: id,
      type: 'process:msg',
      data: {
        subject: 'newFile',
        file: `/Users/jk/epita_dev/sirene/output/${filename}`,
      },
      topic: true,
    },
    (err) => {
      if (err)
        console.error(err)
      else
        console.log(`${id} in charge of ${filename}`)
    }
  );
};

module.exports = notifier;
