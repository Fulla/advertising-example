const express = require('express');
const router = express.Router();

const Brand = require('./models/brand');
const Category = require('./models/category');


//  get to /brand/:name returns the brand with name = :name
router.get("/:name", (req, res, next) => {
    search(req.params.name)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// post to /brand expects a json in the form { "name": "", "description": "", "category": "" }
// and adds the brand with such a name, description and category
router.post("", (req, res, next) => {
    add(req.body.name, req.body.description, req.body.category)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});


// put to /brand expects a json in the form { "name": "", "description": "", "category": "" }
// and edits the brand with such a name, updating the description and category
router.put("", (req, res, next) => {
    edit(req.body.name, req.body.description, req.body.category)
    .then(
        brand => { res.send(brand) }
    )
    .catch(next);
});

// delete to /brand/:name removes the brand with name = :name
// and all the filters for that brand
router.delete("/:name", (req, res, next) => {
    remove(req.params.name)
    .then(
        msg => { res.send(msg) }
    )
    .catch(next);
});


module.exports = router;


function search(name) {
    return Brand.findOne({name: name})
    .populate('category', 'name -_id')
    .then(
        brand => { 
            if (!brand) {
                return `No brand with name ${name}`;
            }
            return brand;
        },
        err => { throw new Error(err) }
    )
}


function add(name, description, categoryName) {
    return Category.findOne({name: categoryName})
    .then(
        category => { 
            if (!category) {
                return `No category with name ${categoryName}`;
            }
            return Brand.findOne({name: name})
            .then(
                brand => { 
                    if (brand) {
                        return `Brand with name ${name} already exists`;
                    }
                    brand = new Brand({
                        name: name, 
                        category: category._id,
                        description: description
                    })
                    return brand.save()
                },
                err => { throw new Error(err) }
            )
        },
        err => { throw new Error(err) }
    )
}


function edit(name, description, categoryName) {
    return Brand.findOne({name:name})
    .then(
        brand => { 
            if (!brand) {
                return `No brand with name ${name}`;
            }

            return Category.findOne({name:categoryName})
            .then(
                category => { 
                    if (!category) {
                        return `No category with name ${categoryName}`;
                    }

                    brand.description = description;
                    brand.category = category._id
                    return brand.save()
                },
                err => { throw new Error(err) }
            )
        },
        err => { throw new Error(err) }
    )
}


function remove(name) {
    return Brand.findOne({name:name})
    .then(
        brand => {
            if (!brand) {
                return `No brand with name ${name}`;
            }
            return brand.remove()
            .then(
                () => { return `Brand ${name} deleted` },
                err => { throw new Error(err) }
            )
        },
        err => { throw new Error(err) }
    )
}