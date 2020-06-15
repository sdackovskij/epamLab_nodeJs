const fs = require('fs');
const PokemonModel = require('../models/pokemons');
const User = require('../models/user');

const pokemons = JSON.parse(fs.readFileSync('./pokemons.json', () => {}));
const users = JSON.parse(fs.readFileSync('./users.json', () => {}));

function checkDBonStart() {
  PokemonModel.estimatedDocumentCount((err, count) => {
    if (!count) {
      PokemonModel.create(...pokemons);
    }
  });

  User.estimatedDocumentCount((err, count) => {
    if (!count) {
      PokemonModel.create(...users);
    }
  });
}
module.exports = checkDBonStart;
