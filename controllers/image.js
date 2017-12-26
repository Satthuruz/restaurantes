'use strict'

var Image = require('../models/image');
var Album = require('../models/album');

function pruebas(req, res){
    res.status(200).send({message: 'Pruebas de controlador de imagenes'});
}

function getImage(req, res){
    var imageId = req.params.id;

    Image.findById(imageId, (err, image)=>{
        if(err){
            res.status(500).send({message: 'Error al cargar la imagen'});
        }else{
            if(!image){
                res.status(404).send({message: 'No se encontro la imagen'});
            }else{
                Album.populate(image, {path: 'album'}, (err, image)=>{
                    if(err){
                        res.status(500).send({message: 'Error al cargar los datos de la image'});
                    }else{
                        res.status(200).send({image});
                    }
                });
            }
        }
    });
}

function getImages(req, res){

    var albumId = req.params.album;
    //Aqui tengo el error

    if(!albumId){
        // Sacar todas las imagenes de la BDD
        Image.find({}).sort('-title').exec((err, images)=>{
            if(err){
                res.status(500).send({message: 'Error en la peticion'});
            }else{
                if(!images){
                    res.status(404).send({message: 'No hay imagenes en este album !!'});
                }else{
                    res.status(200).send({images});
                }
            }
        });

    }else{
        //imagenes asociadas al album
        Image.find({album: albumId}).sort('-title').exec((err, images)=>{
            if(err){
                res.status(500).send({message: 'Error en la peticion'});
            }else{
                if(!images){
                    res.status(404).send({message: 'No hay imagenes en este album !!'});
                }else{
                    res.status(200).send({images});
                }
            }
        });
    }
}

function saveImage(req, res){
    var image = new Image();
    var params = req.body;

    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err,imageStored)=>{
        if(err){
            res.status(500).send({message: 'Error al cargar la imagen'});
        }else{
            if(!imageStored){
                res.status(404).send({message: 'No se ha guardado la imagen'});
            }else{
                
                res.status(200).send({image: imageStored});
            }
        }
    });

}

module.exports = {
    pruebas,
    getImage,
    saveImage,
    getImages
}
