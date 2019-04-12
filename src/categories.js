const express = require('express');
const router = express.Router();

const Category = require('./models/category');

//  get to /category/:name returns the category with name = :name
router.get("/:name", (req, res, next) => {
    search(req.params.name)
    .then(
        category => { 
            console.log(category);
            res.send(category);
        }
    )
    .catch(next);
});


// post to /category expects a json in the form { "name": "", "description": "" }
// and adds the category with such a name and description
router.post("", (req, res, next) => {
    add(req.body.name, req.body.description)
    .then(
        category => { res.send(category) }
    )
    .catch(next);
});


// put to /category expects a json in the form { "name": "", "description": "" }
// and edits the category with such a name, updating the description
router.put("", (req, res, next) => {
    edit(req.body.name, req.body.description)
    .then(
        category => { res.send(category) }
    )
    .catch(next);
});

// delete to /category/:name removes the category with name = :name
router.delete("/:name", (req, res, next) => {
    remove(req.params.name)
    .then(
        msg => { res.send(msg) }
    )
    .catch(next);
});


module.exports = router;



function search(name) {
    return Category.findOne({name: name})
    .then(
        category => { 
            if (!category) {
                return `No category with name ${name}`;
            }
            console.log(category);
            return category;
        },
        err => { throw new Error(err) }
    )
}

function add(name, description) {
    return Category.findOne({name:name})
    .then(
        (category) => {
            if (category) {
                return `Category with name ${name} already exists`;
            }
            return Category.create({name:name, description: description })
            .then(
                category => { return category },
                err => { throw new Error(err) }
            )
        },  
        err => { throw new Error(err) }  
    )
}

function edit(name, description) {
    return Category.findOne({name:name})
    .then(
        category => { 
            if (!category) {
                return `No category with name ${name}`;
            }
            category.description = description;
            return category.save()
            .then(
                category => { return category },
                err => { throw new Error(err) }
            );
        },
        err => { throw new Error(err) }
    )
}

function remove(name) {
    return Category.deleteOne({name:name})
    .then(
        () => { return `Category ${name} deleted` },
        err => { throw new Error(err) }
    )
}