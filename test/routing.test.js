const { describe, done, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Route: getAll pokemons', () => {
  it('getAll ("/pokemons") route should return all pokemons', () => {
    chai
      .request('http://localhost:3000')
      .get('/pokemons')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
