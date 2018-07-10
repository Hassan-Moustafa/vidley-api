const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        ComeFromReq: 'MUST'
    }
});

const genreModel =  mongoose.model('genre' , genreSchema);

module.exports = genreModel;