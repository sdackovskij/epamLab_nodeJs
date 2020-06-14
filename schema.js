const { Schema, model } = require('mongoose');

const pokemon = new Schema({
  id: Number,
  name: String,
  damage: Number,
  isMy: Boolean,
  date: String,
});

module.exports = model('PokemonModel', pokemon);
