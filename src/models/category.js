const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    description: String,
});

// hook to remove all related brands whenever a category is removed
schema.pre('remove', function() {
    var category = this;
    return category.model('Brand').remove({category: category._id});
});

module.exports = mongoose.model('Category', schema);
