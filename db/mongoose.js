const mongoose = require('mongoose');
const { mongoDns } = require('../.config');
const { Company } = require('./CompanyModel');

/* const insertInDatabase = (rows) => {
  const toInsert = rows.map((row) => ({ insertOne: { row } }));
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${mongoIp}:27017/sirene`);
    Company.bulkWrite([...toInsert])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}; */

mongoose
  .connect(`mongodb://${mongoDns}:27017/sirene`)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// module.exports = { insertInDatabase };
