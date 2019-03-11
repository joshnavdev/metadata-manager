const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Node Express Boilerplate API');
});

module.exports = app;
