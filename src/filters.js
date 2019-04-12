const express = require('express');

const Brand = require('./models/brand');
const Category = require('./models/category');
const Client = require('./models/client');
const BrandFilter = require('./models/brand_filter');
const CategoryFilter = require('./models/category_filter');

const router = express.Router({mergeParams:true});

const routerBrand = express.Router({mergeParams:true});

//  get to /filter/:client/brand/allowed/:name returns the brand with name = :name
// if the brand is not blacklisted for the client
routerBrand.get("/allowed/:name", (req, res, next) => {
    allowedBrand(req.clientId, req.params.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// post to /filter/:client/brand expects a json in the form { "name": "" }
// and blacklists the brand with such a name for the client
routerBrand.post("", (req, res, next) => {
    addBrandFilter(req.clientId, req.body.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// delete to /filter/:client/brand/:name removes the brand with name = :name
// from the blacklist for the client
routerBrand.delete("/:name", (req, res, next) => {
    removeBrandFilter(req.clientId, req.params.name)
    .then(
        msg => { res.send(msg) }
    )
    .catch(next);
});


const routerCategory = express.Router({mergeParams:true});

//  get to /filter/:client/category/allowed/:name returns the category with name = :name
// if the category is not blacklisted for the client
routerCategory.get("/allowed/:name", (req, res, next) => {
    allowedCat(req.clientId, req.params.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// post to /filter/:client/category expects a json in the form { "name": "" }
// and blacklists the category with such a name for the client
routerCategory.post("", (req, res, next) => {
    addCatFilter(req.clientId, req.body.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// delete to /filter/:client/category/:name removes the category with name = :name
// from the blacklist for the client
routerCategory.delete("/:name", (req, res, next) => {
    removeCatFilter(req.clientId, req.params.name)
    .then(
        msg => { res.send(msg) }
    )
    .catch(next);
});


router.use(getClient)

router.use("/brand", routerBrand)
router.use("/category", routerCategory)

module.exports = router;


// middleware that obtains the id for a client with name :name,
// and sets as req.clientId to be used by next handlers
function getClient(req, res, next) {
    clientName = req.params.client
    return Client.findOne({name: clientName})
    .then (
        (client) => {
            if (!client) {
                res.send(`No client with name ${clientName}`)
            }
            req.clientId = client._id
            next()
        }
    )
}



function allowedBrand(client, name) {
    return Brand.findOne({name: name})
    .populate('category', 'name')
    .then(
        brand => { 
            if (!brand) {
                return `No brand with name ${name}`;
            }

            return CategoryFilter.findOne({
                client:client,
                category: brand.category._id,
            })
            .populate('category', 'name')
            .then(
                (filter) => {
                    if (filter) {
                        return `Brand ${name} is from the category ${brand.category.name} that is blacklisted`
                    }
                    
                    return BrandFilter.findOne({
                        client:client,
                        brand: brand._id,
                    })
                    .then(
                        filter => {
                            if (filter) {
                                return `Brand ${name} is blacklisted`;
                            }
                            return brand.populate('category', 'name -_id');
                        }
                    )

                }
            )
        },
        err => { throw new Error(err) }
    )
}


function addBrandFilter(client, name) {
    return Brand.findOne({name: name})
    .then(
        brand => { 
            if (!brand) {
                return `No brand with name ${name}`;
            }

            return BrandFilter.findOne({
                client:client,
                brand: brand._id,
            })
            .then(
                filter => {
                    if (filter) {
                        return `Brand ${name} is already blacklisted`;
                    }
                    
                    filter = new BrandFilter({
                        client:client,
                        brand: brand._id,
                    })
                    return filter.save()
                }
            )
        },
        err => { throw new Error(err) }
    )
}


function removeBrandFilter(client, name) {
    return Brand.findOne({name: name})
    .then(
        brand => { 
            if (!brand) {
                return `No brand with name ${name}`;
            }

            return BrandFilter.findOne({
                client:client,
                brand: brand._id,
            })
            .then(
                filter => {
                    if (!filter) {
                        return `Brand ${name} is not blacklisted`;
                    }
                    
                    return filter.remove()
                }
            )
        },
        err => { throw new Error(err) }
    )
}


function allowedCat(client, name) {
    return Category.findOne({name: name})
    .then(
        category => { 
            if (!category) {
                return `No category with name ${name}`;
            }

            return CategoryFilter.findOne({
                client:client,
                category: category._id,
            })
            .then(
                filter => {
                    if (filter) {
                        return `Category ${name} is blacklisted`;
                    }
                    return category;
                }
            )
        },
        err => { throw new Error(err) }
    )
}


function addCatFilter(client, name) {
    return Category.findOne({name: name})
    .then(
        category => { 
            if (!category) {
                return `No category with name ${name}`;
            }

            return CategoryFilter.findOne({
                client:client,
                category: category._id,
            })
            .then(
                filter => {
                    if (filter) {
                        return `Category ${name} is already blacklisted`;
                    }
                    
                    filter = new CategoryFilter({
                        client:client,
                        category: category._id,
                    })
                    return filter.save()
                }
            )
        },
        err => { throw new Error(err) }
    )
}


function removeCatFilter(client, name) {
    return Category.findOne({name: name})
    .then(
        category => { 
            if (!category) {
                return `No category with name ${name}`;
            }

            return CategoryFilter.findOne({
                client:client,
                category: category._id,
            })
            .then(
                filter => {
                    if (!filter) {
                        return `Category ${name} is not blacklisted`;
                    }
                    
                    return filter.remove()
                }
            )
        },
        err => { throw new Error(err) }
    )
}