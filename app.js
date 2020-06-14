/* eslint-disable no-console */
const express = require('express');

const mongoose = require('mongoose');

const fs = require('fs');

const PokemonModel = require('./schema');

const PORT = 3000;

const DB = 'mongodb+srv://sdackovskij:0zdtsbBiweDOodc0@pokemonnodelab-rpazt.mongodb.net/MyFirstDB?retryWrites=true&w=majority';

const app = express();
app.use(express.json());

const pokemons = JSON.parse(fs.readFileSync('./pokemons.json', () => {}));

app.get('/pokemons', (req, res) => {
  if (Object.keys(req.query).length) {
    PokemonModel.find({ name: req.query.name }, (err, docs) => {
      res.send(docs);
    });
  } else {
    PokemonModel.find({}, (err, docs) => {
      res.send(docs);
    });
  }
});

app.get('/pokemons/caught-list', (req, res) => {
  PokemonModel.find({ isMy: true }, (err, docs) => {
    res.send(docs);
  });
});

app.get('/pokemons/caught', (req, res) => {
  PokemonModel.find({ id: req.query.id }, (err, docs) => {
    PokemonModel.updateOne({ id: docs[0].id }, { isMy: !docs[0].isMy }, () => {
      res.send(`Pokemon caught: ${!docs[0].isMy}`);
    });
  });
});

app.get('/pokemons/id-search', (req, res) => {
  PokemonModel.find({ id: req.query.id }, (err, docs) => {
    res.send(docs);
  });
});

app.post('/pokemons/create', (req, res) => {
  PokemonModel.create({ ...req.body }, () => {
    res.send('Pokemon was created!');
  });
});

app.put('/pokemons/update', (req, res) => {
  PokemonModel.updateOne({ id: req.query.id }, { ...req.body }, () => {
    res.send('Pokemon was updated!');
  });
});

app.delete('/pokemons/delete', (req, res) => {
  PokemonModel.findOneAndDelete({ id: req.query.id }, () => {
    res.send('Pokemon was deleted!');
  });
});


async function init() {
  try {
    await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => {
      console.log('Server running...');
    });
    PokemonModel.estimatedDocumentCount((err, count) => {
      if (!count) {
        PokemonModel.create(...pokemons);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

init();
