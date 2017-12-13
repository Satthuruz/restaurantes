'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3700;

// Coneccion a la bdd
mongoose.connect('mongodb://localhost:27017/app_albums', (err, rest) => {
    if(err){
        throw err;
    }else{
        console.log('Base de datos cargada !!');
// Crear servidor
        app.listen(port, function(){
            console.log('API RESFULL de albums escuchando..');
        });
    }
});