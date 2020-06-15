const User = require('../models/user');

function checkUser(name, pass) {
  return User.find({ username: name, password: pass }, (err, docs) => docs);
}

module.exports = {
  checkUser,
};
