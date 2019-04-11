const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
});


module.exports = mongoose.model('Brand', schema);


