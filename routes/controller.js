const { Router } = require('express');
const pokemonService = require('../services/pokemonService');

const pokemons = Router();

pokemons.get('/', async (req, res) => {
  const data = await pokemonService.getAll();
  res.send(data);
});

pokemons.get('/by-name', async (req, res) => {
  const data = await pokemonService.getByName(req.query.name);
  res.send(data);
});

pokemons.get('/caught-list', async (req, res) => {
  const data = await pokemonService.getCaughtList();
  res.send(data);
});

pokemons.get('/caught', async (req, res) => {
  await pokemonService.catchItem(req.query.id);
  res.send('Information updated!');
});

pokemons.get('/id-search', async (req, res) => {
  const data = await pokemonService.getById(req.query.id);
  res.send(data);
});

pokemons.post('/create', async (req, res) => {
  await pokemonService.create(req.body);
  res.send('Pokemon was created!');
});

pokemons.put('/update', async (req, res) => {
  await pokemonService.update(req.query.id, req.body);
  res.send('Pokemon was updated!');
});

pokemons.delete('/delete', async (req, res) => {
  await pokemonService.deleteItem(req.query.id);
  res.send('Pokemon was deleted!');
});

module.exports = pokemons;
