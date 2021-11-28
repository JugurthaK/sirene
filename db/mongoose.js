const mongoose = require('mongoose');
const { Company } = require('./CompanyModel');
const insertInDatabase = (rows) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      `mongodb://localhost:27017/sirene?keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=720000&connectTimeoutMS=720000`
    );
    Company.insertMany(rows)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

module.exports = { insertInDatabase };
