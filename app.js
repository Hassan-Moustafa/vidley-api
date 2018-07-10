const mongoose = require('./db/dbConfig');
const config = require('config'); //external package
const morgan = require('morgan');
const express = require('express');
const courses = require('./routers/genres');
const joi = require('joi');
const app = express();



app.use(express.json());

console.log(config.get('name'));

if(app.get('env') === "development")
{
    app.use(morgan('tiny'));
}

app.use('/genres',courses);

app.listen(3000 , () => {
    console.log("server starting ... ");
})