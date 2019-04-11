const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    client: {type: Schema.Types.ObjectId, ref: 'Client'}
});


module.exports = mongoose.model('BrandFilter', schema);