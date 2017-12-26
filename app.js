'use strict'


// Prueba git


var express = require('express');
var bodyParse = require('body-parser');

var app = express();

// Carga de rutas
var album_routes = require('./routes/album');
var image_routes = require('./routes/image');

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

// Configurar cabeceras

// Configurar rutas bases
app.use('/api', album_routes); 
app.use('/api', image_routes); 

module.exports = app;
