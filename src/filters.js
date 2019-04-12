const express = require('express');
const router = express.Router();

const Brand = require('./models/brand');
const Category = require('./models/category');
const BrandFilter = require('./models/brand_filter');
const CategoryFilter = require('./models/category_filter');

const routerBrand = express.Router();

//  get to /filter/:client/brand/allowed/:name returns the brand with name = :name
// if the brand is not blacklisted for the client
routerBrand.get("/allowed/:name", (req, res, next) => {
    allowedBrand(req.params.client, req.params.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// post to /filter/:client/brand expects a json in the form { "name": "" }
// and blacklists the brand with such a name for the client
router.post("", (req, res, next) => {
    addBrandFilter(req.params.client, req.body.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// delete to /filter/:client/brand/:name removes the brand with name = :name
// from the blacklist for the client
router.delete("/:name", (req, res, next) => {
    removeBrandFilter(req.params.name)
    .then(
        msg => { res.send(msg) }
    )
    .catch(next);
});


const routerCategory = express.Router();

//  get to /filter/:client/category/allowed/:name returns the category with name = :name
// if the category is not blacklisted for the client
routerBrand.get("/allowed/:name", (req, res, next) => {
    allowedCat(req.params.client, req.params.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// post to /filter/:client/category expects a json in the form { "name": "" }
// and blacklists the category with such a name for the client
router.post("", (req, res, next) => {
    addCatFilter(req.params.client, req.body.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// delete to /filter/:client/category/:name removes the category with name = :name
// from the blacklist for the client
router.delete("/:name", (req, res, next) => {
    removeCatFilter(req.params.name)
    .then(
        msg => { res.send(msg) }
    )
    .catch(next);
});


router.use("/brand", routerBrand)
router.use("/category", routerCategory)
module.exports = router;


function allowedBrand(clientName, name) {
    return ClientRect.findOne({name: client})
    .then(
        client => {
            if (!client) {
                return `No client with name ${clientName}`;
            }

            Brand.findOne({name: name})
            .populate('category', 'name -_id')
            .then(
                brand => { 
                    if (!brand) {
                        return `No brand with name ${name}`;
                    }

                    return CategoryFilter.find({
                        client:client._id,
                        category: brand.category,
                    })
                    .populate('category', 'name')
                    .then(
                        (filter) => {
                            if (filter) {
                                return `Brand ${name} is from the category ${filter.category.name} that is blacklisted`
                            }
                            
                            return BrandFilter.find({
                                client:client._id,
                                brand: brand._id,
                            })
                            .then(
                                filter => {
                                    if (filter) {
                                        return `Brand ${name} is blacklisted`;
                                    }
                                    return brand;
                                }
                            )

                        }
                    )
                },
                err => { throw new Error(err) }
            )
        }
    )
}





function addBrandFilter(clientName, name) {
    return ClientRect.findOne({name: client})
    .then(
        client => {
            if (!client) {
                return `No client with name ${clientName}`;
            }

            Brand.findOne({name: name})
            .then(
                brand => { 
                    if (!brand) {
                        return `No brand with name ${name}`;
                    }

                    return BrandFilter.find({
                        client:client._id,
                        brand: brand._id,
                    })
                    .then(
                        filter => {
                            if (filter) {
                                return `Brand ${name} is already blacklisted`;
                            }
                            
                            filter = new BrandFilter({
                                client:client._id,
                                brand: brand._id,
                            })
                            return filter.save()
                        }
                    )
                },
                err => { throw new Error(err) }
            )
        }
    )
}


function removeBrandFilter(clientName, name) {
    return ClientRect.findOne({name: client})
    .then(
        client => {
            if (!client) {
                return `No client with name ${clientName}`;
            }

            Brand.findOne({name: name})
            .then(
                brand => { 
                    if (!brand) {
                        return `No brand with name ${name}`;
                    }

                    return BrandFilter.find({
                        client:client._id,
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
    )
}




function allowedCat(clientName, name) {
    return ClientRect.findOne({name: clientName})
    .then(
        client => {
            if (!client) {
                return `No client with name ${clientName}`;
            }

            Category.findOne({name: name})
            .then(
                category => { 
                    if (!category) {
                        return `No category with name ${name}`;
                    }

                    return CategoryFilter.find({
                        client:client._id,
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
    )
}


function addCatFilter(clientName, name) {
    return ClientRect.findOne({name: client})
    .then(
        client => {
            if (!client) {
                return `No client with name ${clientName}`;
            }

            Category.findOne({name: name})
            .then(
                category => { 
                    if (!category) {
                        return `No category with name ${name}`;
                    }

                    return CategoryFilter.find({
                        client:client._id,
                        category: category._id,
                    })
                    .then(
                        filter => {
                            if (filter) {
                                return `Category ${name} is already blacklisted`;
                            }
                            
                            filter = new CategoryFilter({
                                client:client._id,
                                category: category._id,
                            })
                            return filter.save()
                        }
                    )
                },
                err => { throw new Error(err) }
            )
        }
    )
}


function removeCatFilter(clientName, name) {
    return ClientRect.findOne({name: client})
    .then(
        client => {
            if (!client) {
                return `No client with name ${clientName}`;
            }

            Category.findOne({name: name})
            .then(
                category => { 
                    if (!category) {
                        return `No category with name ${name}`;
                    }

                    return CategoryFilter.find({
                        client:client._id,
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
    )
}