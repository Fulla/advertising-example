const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    client: {type: Schema.Types.ObjectId, ref: 'Client'}
});


schema.post('save', function(doc, next) {
    doc
    .populate('brand', 'name -_id')
    .populate('client', 'name -_id')
    .execPopulate().then(function() {
        next();
    });
});

module.exports = mongoose.model('BrandFilter', schema);