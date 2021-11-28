const fs = require('fs');

const createFile = (index, data) => {
  fs.writeFile(`./output/generated_${index}.csv`, data, (err) => {
    if (err) console.error(err);
  });
};

module.exports = { createFile };
