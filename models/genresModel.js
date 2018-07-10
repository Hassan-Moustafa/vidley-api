

const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

const genreModel = new mongoose.model('genre' , genreSchema);

module.exports = genreModel;