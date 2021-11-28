const mongoose = require('mongoose');
const config = require('./.config');

mongoose.connect('mongodb://${config.mongoIp}:27017/sirene');
