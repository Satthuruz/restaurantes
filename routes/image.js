'use strict'

var express = require('express');
var ImageController = require('../controllers/image')
var api = express.Router();

api.get('/prueba-image', ImageController.pruebas);
api.get('/image/:id', ImageController.getImage);
api.get('/images/:album?', ImageController.getImages);
api.post('/image', ImageController.saveImage);



module.exports = api;