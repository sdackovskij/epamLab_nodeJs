/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const checkDB = require('./services/onStartService');
const router = require('./routes/router');

const PORT = 3000;

const DB = 'mongodb+srv://sdackovskij:0zdtsbBiweDOodc0@pokemonnodelab-rpazt.mongodb.net/MyFirstDB?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use('/', router);

async function init() {
  try {
    await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
    checkDB();
    app.listen(PORT, () => {
      console.log('Server running...');
    });
  } catch (e) {
    console.log(e);
  }
}

init();
