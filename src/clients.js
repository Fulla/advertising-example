const express = require('express');
const router = express.Router();

const Client = require('./models/client');
const BrandFilter = require('./models/brand_filter');
const CategoryFilter = require('./models/category_filter');

//  get to /client/:name returns the client with name = :name
router.get("/:name", (req, res, next) => {
    search(req.params.name)
    .then(
        client => { res.send(client) }
    )
    .catch(next);
});


// post to /client expects a json in the form { "name": "" }
// and adds the client with such a name
router.post("", (req, res, next) => {
    add(req.body.name)
    .then(
        client => { res.send(client) }
    )
    .catch(next);
});

// delete to /client/:name removes the client with name = :name
// and all the filters for that client
router.delete("/:name", (req, res, next) => {
    remove(req.params.name)
    .then(
        msg => { res.send(msg) }
    )
    .catch(next);
});


module.exports = router;


function search(name) {
    return Client.findOne({name: name})
    .then(
        client => { 
            if (!client) {
                return `No client with name ${name}`;
            }
            return client;
        },
        err => { throw new Error(err) }
    )
}

function add(name, description) {
    return Client.findOne({name:name})
    .then(
        (client) => {
            if (client) {
                return `Client with name ${name} already exists`;
            }
            return Client.create({ name:name })
        },  
        err => { throw new Error(err) }  
    )
}


function remove(name) {
    return Client.findOne({name:name})
    .then(
        client => {
            if (!client) {
                return `No client with name ${name}`;
            }
            return client.remove()
            .then(
                () => { return `Client ${name} deleted` },
                err => { throw new Error(err) }
            )
        }
    )
    
}