
const PokemonModel = require('../models/pokemons');

function getAll() {
  return PokemonModel.find({}, (err, docs) => docs);
}

function getByName(pokemonName) {
  return PokemonModel.find({ name: pokemonName }, (err, docs) => docs);
}

function getCaughtList() {
  return PokemonModel.find({ isMy: true }, (err, docs) => docs);
}

function catchItem(pokemonId) {
  return PokemonModel.find({ id: pokemonId }, (err, docs) => {
    PokemonModel.updateOne(
      { id: docs[0].id },
      { isMy: !docs[0].isMy },
      () => {},
    );
  });
}

function getById(pokemonId) {
  return PokemonModel.find({ id: pokemonId }, (err, docs) => docs);
}

function create(body) {
  return PokemonModel.create({ ...body }, () => {});
}

function update(pokemonId, body) {
  return PokemonModel.updateOne({ id: pokemonId }, { ...body }, () => {});
}

function deleteItem(pokemonId) {
  return PokemonModel.findOneAndDelete({ id: pokemonId }, () => {});
}

module.exports = {
  getAll,
  getByName,
  getCaughtList,
  getById,
  catchItem,
  create,
  update,
  deleteItem,
};
