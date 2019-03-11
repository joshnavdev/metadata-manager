const express = require('express');
const mediaController = require('../controllers/mediaController');

const Router = express.Router();

Router.get('/metadata', mediaController.getMetadata);
Router.put('/metadata', mediaController.setMetadata);

module.exports = Router;
