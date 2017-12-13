'use strict'

var Album = require('../models/album');

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId, (err, album)=>{
        if(err){
         res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!album){
                res.status(404).send({message: 'El album no existe'});
            }else{
                res.status(200).send({album})
            }
        }
    });
}

function getAlbums(req, res){
    
    Album.find({}, (err, album)=>{
        if(err){
         res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!album){
                res.status(404).send({message: 'No hay albums'});
            }else{
                res.status(200).send({album})
            }
        }
    });
}

function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
        
    album.save((err,albumStored)=>{
        if(err){
            res.status(500).send({message: 'Error al guardar el album'});   
        }else{
            if(!album){
                res.status(404).send({message: 'No se ha guardado el album !!'});
            }else{
                res.status(200).send({album: albumStored})
            }
        }
    });
}

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;
    
    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el album'});   
        }else{
            if(!albumUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el album !!'});
            }else{
                res.status(200).send({album: albumUpdated})
            }
        }
    });
}

function deleteAlbum(req, res){
    var albumId = req.params.id;
    var removed = req.body;
    
    Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error al borrar el album'});   
        }else{
            if(!albumRemoved){
                res.status(404).send({message: 'No se ha podido borrar el album !!'});
            }else{
                res.status(200).send({album: albumRemoved})
            }
        }
    });
}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
};