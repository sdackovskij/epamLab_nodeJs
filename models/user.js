const { Schema, model } = require('mongoose');

const user = new Schema({
  username: String,
  password: String,
});

module.exports = model('User', user);
