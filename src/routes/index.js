const express = require('express');
const mediaRoutes = require('./mediaRoutes');

const Router = express.Router();

Router.use('/medias', mediaRoutes);

module.exports = Router;
