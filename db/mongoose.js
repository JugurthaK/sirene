const mongoose = require('mongoose');
const { Company } = require('./CompanyModel');
const { mongoDns } = require('../.config');
const insertInDatabase = (rows) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${mongoDns}:27017/sirene`);
    Company.insertMany(rows)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

module.exports = { insertInDatabase };
