const mongoose = require('mongoose');

const mongoPort = '27017';
const mongoHost = 'localhost';
const database = 'advertising';

function connect() {
    mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${database}`)
    .then(
        () => console.log("Connected to mongo"),
        (err) => console.log(err)
    );
}

module.exports = connect;
