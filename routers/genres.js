const express = require('express');
const Genres = require('../models/genresModel');
const pickBody = require('../utilities/pickBody');
const router = express.Router();



router.get('/' , (req,res) => {
    Genres.find({}).then((genres) => {
        res.status(200).send(genres);
    }) 
});

router.get('/:id' , (req,res) => {
    let id = req.params.id;
    Genres.find({_id : id}).then((genre) => {
        if(!genre)
        {
            res.status(404).send("Genre not found");
        }

        return res.status(200).send(genre);

    });
});

router.post('/' , (req,res) => {

    pickBody(req.body).then((body) => {
        let newGenre = new Genres({
            name: body.name
        });
        newGenre.save().then(() => {
            return res.status(200).send(newGenre);
        })
        .catch((error) => {
            res.status(400).send('error while saving genre data ');
        });
    }).catch((error) => res.status(400).send(error));
});

router.put('/:id',(req,res) => {

    let id = req.params.id;
    Genres.findById(id).then((genre) => {
        if(!genre)
        {
            return res.status(404).send("Genre not found");
        }
        pickBody(req.body).then((body) => {

            genre.name = body.name;
            genre.save().then(() => {
                return res.status(200).send();
            }).catch((error) => {
                console.log(error);
                return res.status(500).send(error);
            });
        }).catch((error) => res.status(500).send(error))
    })
});

router.delete('/:id',(req,res) => {
    let id = req.params.id;
    Genres.findByIdAndRemove(id).then((genre) => {
        if(!genre)
        {
            return res.status(404).send('Genre not found');
        }
        return res.status(200).send(genre);
    });
})


module.exports = router;