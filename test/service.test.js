const { describe, before, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const PokemonService = require('../services/pokemonService');

describe('Pokemon service: getALL', () => {
  let service;
  let pokemonsServiceStub;
  const pokemons = [
    {
      name: 'bulbasaur',
      id: 1,
      isMy: true,
      date: '2020-04-17',
      damage: 10,
    },
    {
      name: 'ivysaur',
      id: 2,
      isMy: false,
      date: '2020-04-17',
      damage: 18,
    },
    {
      name: 'venusaur',
      id: 3,
      isMy: true,
      date: '2020-04-17',
      damage: 77,
    },
    {
      name: 'charmander',
      id: 4,
      isMy: false,
      date: '2020-04-17',
      damage: 12,
    },
    {
      name: 'charmeleon',
      id: 5,
      isMy: true,
      date: '2020-04-17',
      damage: 33,
    },
    {
      name: 'charizard',
      id: 6,
      isMy: false,
      date: '2020-04-17',
      damage: 75,
    },
    {
      name: 'squirtle',
      id: 7,
      isMy: true,
      date: '2020-04-17',
      damage: 100,
    },
    {
      name: 'wartortle',
      id: 8,
      isMy: false,
      date: '2020-04-17',
      damage: 40,
    },
    {
      name: 'blastoise',
      id: 9,
      isMy: true,
      date: '2020-04-17',
      damage: 60,
    },
    {
      name: 'caterpie',
      id: 10,
      isMy: false,
      date: '2020-04-17',
      damage: 15,
    },
    {
      name: 'metapod',
      id: 11,
      isMy: true,
      date: '2020-04-17',
      damage: 85,
    },
    {
      name: 'butterfree',
      id: 12,
      isMy: false,
      date: '2020-04-17',
      damage: 90,
    },
  ];

  before(() => {
    service = PokemonService;
    pokemonsServiceStub = sinon.stub(service, 'getAll');
  });

  it('getAll should return all pokemons', () => {
    pokemonsServiceStub.returns(pokemons);
    const result = service.getAll();
    expect(result).to.be.eql(pokemons);
  });
});
