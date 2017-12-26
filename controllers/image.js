'use strict'

var path = require ('path');
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

    if(!albumId){
        // Sacar todas las imagenes de la BDD
        var find = Image.find({}).sort('title');

    }else{
        
        //imagenes asociadas al album
        var find = Image.find({album: albumId}).sort('title');
    
    }

    find.exec((err, images)=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!images){
                res.status(404).send({message: 'No hay imagenes en este album !!'});
            }else{
                Album.populate(images, {path: 'album'}, (err, images)=>{
                    if(err){
                        res.status(500).send({message: 'Error al cargar los datos de la image'});
                    }else{
                        res.status(200).send({images});
                    }
                });
            }
        }
    });
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

function updateImage(req,res){
    var imageId = req.params.id;
    var update = req.body;

    Image.findByIdAndUpdate(imageId, update,  (err, imageUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error al cargar la imagen'});
        }else{
            if(!imageUpdate){
                res.status(404).send({message: 'No se ha actualidao la imagen'});
            }else{
                res.status(200).send({image: imageUpdate});
            }
        } 
    });
}

function deleteImage(req, res){
    var imageId = req.params.id;

    Image.findByIdAndRemove(imageId, (err, imageRemove)=>{
        if(err){
            res.status(500).send({message: 'Error al borrar la image'});   
        }else{
            if(!imageRemove){
                res.status(404).send({message: 'No se ha podido borrar la image !!'});
            }else{
                res.status(200).send({image: imageRemove})
            }
        }
    });
}

function uploadImage(req, res){
    var imageId = req.params.id;
    var file_name = 'No subirdo..';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[1];

        console.log(file_path);
        console.log(file_name);
    }
}

module.exports = {
    pruebas,
    getImage,
    saveImage,
    getImages,
    updateImage,
    deleteImage,
    uploadImage
}