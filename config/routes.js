const axios = require('axios');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../_secrets/keys').jwtKey;

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/', checkAlive);
};

function register(req, res) {
  // implement user registration
  const hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hash;
  const {username, password} = req.body;
  const user = {username, password};
  db('users').insert(user)
    .then(idArray => {
      res.status(200).json({id:idArray[0]});
    })
    .catch(err => res.status(500).json(err.message));
}

function login(req, res) {
  // implement user login
  const {username, password} = req.body;
  db('users').where({username}).first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({username: user.username, token: token});
      }else{
        res.status(401).json({message:'username and password do not match'});
      }
    })
    .catch(err => res.status(500).json(err.message));
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function checkAlive(req, res){
  res.status(200).json("It's alive!");
}

function generateToken(user){
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '5m'
  };
  return jwt.sign(payload, secret, options);
}