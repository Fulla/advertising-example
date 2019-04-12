const mongoose = require('mongoose');

const mongoPort = '27017';
const mongoHost = 'localhost';
const database = 'advertising';

function connect() {
    return mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${database}`)
    .then(
        () => console.log("Connected to mongo"),
        (err) => {throw err}
    );
}

module.exports = connect;
