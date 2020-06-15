const { Router } = require('express');
const jwt = require('jsonwebtoken');
const privateKey = require('./privateKey');

const auth = Router();

auth.post('',
  (req, res) => {
    const token = jwt.sign({ id: 'id', otherData: 'data' }, privateKey, {
      expiresIn: '30d',
    });
    res.send(token);
  });

module.exports = auth;
