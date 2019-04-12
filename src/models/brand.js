const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    description: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
});
// here, for simplification, I'm assuming that a brand is just from a single category

// hook to remove all related brand filters whenever a category is removed
schema.pre('remove', function() {
    var brand = this;
    return brand.model('BrandFilter').remove({brand: brand._id});
});


schema.post('save', function(doc, next) {
    doc.populate('category', 'name -_id').execPopulate().then(function() {
        next();
    });
});


module.exports = mongoose.model('Brand', schema);


