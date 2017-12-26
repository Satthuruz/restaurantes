'use strict'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

// Carga de rutas
var album_routes = require('./routes/album');
var image_routes = require('./routes/image');

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParse.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParse.json({limit: "50mb"}));
//app.use(bodyParse.json());

// Configurar cabeceras

// Configurar rutas bases
app.use('/api', album_routes); 
app.use('/api', image_routes); 

module.exports = app;