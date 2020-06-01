/* eslint-disable no-console */
const express = require('express');

const fs = require('fs');

const PORT = 3000;

const app = express();
app.use(express.json());

const pokemons = JSON.parse(fs.readFileSync('./pokemons.json', () => {}));
const wrPokemons = () => fs.writeFile('./pokemons.json', JSON.stringify(pokemons), () => {});

app.get('/pokemons', (req, res) => {
  if (Object.keys(req.query).length) {
    res.send(pokemons.filter((pokemon) => pokemon.name === req.query.name));
  } else {
    res.send(pokemons);
  }
});

app.get('/pokemons/caught-list', (req, res) => {
  res.send(pokemons.filter((pokemon) => pokemon.isMy === true));
});

app.get('/pokemons/caught', (req, res) => {
  const updPokemon = pokemons.find((pokemon) => +pokemon.id === +req.query.id);
  updPokemon.isMy = !updPokemon.isMy;
  wrPokemons();
  res.send(`Pokemon caught: ${updPokemon.isMy}`);
});

app.get('/pokemons/id-search', (req, res) => {
  res.send(pokemons.filter((pokemon) => +pokemon.id === +req.query.id));
});

app.post('/pokemons/create', (req, res) => {
  const newPokemon = req.body;
  newPokemon.id = Object.keys(pokemons).length + 1;
  pokemons.push(newPokemon);
  wrPokemons();
  res.send('Pokemon was created!');
});

app.put('/pokemons/update', (req, res) => {
  const updPokemon = pokemons.find((pokemon) => +pokemon.id === +req.query.id);
  Object.assign(updPokemon, req.body);
  wrPokemons();
  res.send('Pokemon was updated!');
});

app.delete('/pokemons/delete', (req, res) => {
  pokemons.splice(req.query.id - 1, req.query.id - 1);
  wrPokemons();
  res.send('Pokemon was deleted!');
});

app.listen(PORT, () => {
  console.log('Server running...');
});
