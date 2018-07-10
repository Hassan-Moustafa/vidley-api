const config = require('config');
const mongoose = require('mongoose');
const connectionString = `mongodb://localhost:${config.get('database.port')}/${config.get('database.dbName')}`;
mongoose.connect(connectionString)
        .then(() => console.log('connected to database'))
        .catch(() => console.log('can not connect to database server'));
module.exports = mongoose;