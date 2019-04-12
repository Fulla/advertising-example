const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    client: {type: Schema.Types.ObjectId, ref: 'Client'}
});


schema.post('save', function(doc, next) {
    doc
    .populate('category', 'name -_id')
    .populate('client', 'name -_id')
    .execPopulate().then(function() {
        next();
    });
});


module.exports = mongoose.model('CategoryFilter', schema);