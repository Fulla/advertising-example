const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    client: {type: Schema.Types.ObjectId, ref: 'Client'}
});


module.exports = mongoose.model('CategoryFilter', schema);