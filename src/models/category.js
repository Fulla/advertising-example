const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    description: String,
});

// hook to remove all related brands whenever a category is removed,
// This is complex because neither model.remove({...}) or model.deleteMany
// trigger schema middleware, and I need the removal of brand to delete, in time
// all the brandFilters related to those brands
schema.pre('remove', function() {
    var category = this;
    return category.model('Brand')
    .find({category: category._id})
    .then(
        (brands) => {
            for (var i in brands) {
                var brand = brands[i]
                brand.remove()
            } 
        }
    )
});

// hook to remove all related categoryFilters whenever a category is removed
schema.pre('remove', function() {
    var category = this;
    return category.model('CategoryFilter').remove({category: category._id});
});

module.exports = mongoose.model('Category', schema);
