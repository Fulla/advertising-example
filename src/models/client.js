const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
});

// hook to remove all related brand filters whenever a client is removed
schema.pre('remove', function() {
    var client = this;
    return client.model('BrandFilter').remove({client: client._id});
});

// hook to remove all related category filters whenever a client is removed
schema.pre('remove', function() {
    var client = this;
    return client.model('CategoryFilter').remove({client: client._id});
});

module.exports = mongoose.model('Client', schema);