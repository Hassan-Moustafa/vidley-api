const config = require('config');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:${config.get('port')}/${config.get('dbName')}`)
        .then(() => console.log('connected to database'))
        .catch(() => console.log('can not connect to database server'));
module.exports = mongoose;