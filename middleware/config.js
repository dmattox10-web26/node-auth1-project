const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const KnexStore = require('connect-session-knex')(session)
const knex = require('../database/db-config') // needed for storing sessions in the db

const sessionConfig = {
  name: 'monster',
  secret: 'keep it secret, keep it safe!',
  resave: false,
  saveUninitialized: true, // GDPR
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 minutes
    secure: false, // should be true in prod
    httpOnly: true, // prevents js access
  },
  store: new KnexStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    sidfieldname: 'sid',
    clearInterval: 1000 * 60 * 15,

  }), //knex

}
module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig))
};
