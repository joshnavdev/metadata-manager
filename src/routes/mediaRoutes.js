const express = require('express');
const multerService = require('../utils/libs/multer');
const mediaController = require('../controllers/mediaController');

const Router = express.Router();

Router.get('/metadata', multerService.upload.single('file'), mediaController.getMetadata);
Router.put('/metadata', multerService.upload.single('file'), mediaController.setMetadata);
Router.post('/crop', multerService.upload.single('file'), mediaController.cropImage);

module.exports = Router;
