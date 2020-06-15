/* eslint-disable import/no-useless-path-segments */
const { Router } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const jwt = require('jsonwebtoken');
const privateKey = require('../privateKey');
const userService = require('../services/userService');

const router = Router();

const pokemons = require('../routes/controller');
const auth = require('../auth');


function verifyJWT(token) {
  let isValid = false;
  if (token) {
    jwt.verify(token, privateKey, (err) => {
      if (err) {
        isValid = false;
      } else {
        isValid = true;
      }
    });
  } else {
    isValid = false;
  }
  return isValid;
}

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordFiels: 'password',
  },
  async (name, pass, done) => {
    const isUser = await userService.checkUser(name, pass);
    if (!isUser.length) {
      return done(null, false, { error: { 'name or password': 'invalid' } });
    }
    return done(null, { name });
  }),
);

passport.use(
  new BearerStrategy(
    (token, done) => {
      const isValid = verifyJWT(token);
      if (!isValid) {
        return done(null, false, { error: { 'name or password': 'invalid' } });
      }
      return done(null, token);
    },
  ),
);

router.use('/pokemons', passport.authenticate('bearer', { session: false }), pokemons);
router.use('/auth', passport.authenticate('local', { session: false }), auth);

module.exports = router;
