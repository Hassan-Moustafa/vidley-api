const express = require('express');

const router = express.Router();

const Genres = [
    {id: 1 , name: "pop"},
    {id: 2 , name: "rock"},
    {id: 3 , name: "jazz"},
    {id: 4 , name: "hip hop"},
    {id: 5 , name: "metal"},

]

router.get('/' , (req,res) => {
    res.status(200).send(Genres);
});

router.get('/:id' , (req,res) => {
    let id = parseInt(req.params.id);
    let genre = Genres.find((genre) => {
        return genre.id === id
    });

    if(!genre)
    {
        return res.status(404).send("Genre not found");
    }

    return res.status(200).send(genre);
});

router.post('/' , (req,res) => {

    let {error , value} = validateReq(req);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }
    let newGenre = {
        id: ++Genres[Genres.length - 1].id,
        name: req.body.name
    }
    Genres.push(newGenre);
    return res.status(200).send(newGenre);
});

router.put('/:id',(req,res) => {

    let id = parseInt(req.params.id);
    let genre = Genres.find((genre) => {
        return genre.id === id
    });

    if(!genre)
    {
        return res.status(404).send("Genre not found");
    }

    let {error} = validateReq(req);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name;
    
    return res.status(200).send();

});

router.delete('/:id',(req,res) => {
    let id = parseInt(req.params.id);
    let genre = Genres.find((genre) => {
        return genre.id === id
    });

    if(!genre)
    {
        return res.status(404).send("Genre not found");
    }

    Genres.splice(Genres.indexOf(genre) , 1);
    return res.status(200).send();
})

const validateReq = (req) => {
    const schema = joi.object().keys({
        name: joi.string().min(3).required()
    });
    let result = joi.validate(req.body , schema);
    return result;
}

module.exports = router;