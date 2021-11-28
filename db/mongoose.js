const mongoose = require('mongoose');
const { Company } = require('./CompanyModel');

const insertInDatabase = (rows) => {
  console.log("Preparing a bulk")
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://localhost:27017/sirene`);
    Company.insertMany(rows)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

module.exports = { insertInDatabase };
