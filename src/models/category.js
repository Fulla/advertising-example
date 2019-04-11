const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
});


module.exports = mongoose.model('Category', schema);