const express = require('express');
const router = express.Router();

const Category = require('./models/category');

router.get("/search/:name", (req, res, next) => {
    search(req.params.name)
    .then(
        category => { 
            console.log(category);
            res.send(category);
        }
    )
    .catch(
        err => { res.end(err) }
    );
});


router.post("/add/:category/:name", (req, res) => {
    add(req.param.category, req.param.name)
    .then(
        category => { res.send(category) }
    )
})


module.exports = router;



function search(name) {
    return Category.findOne({name: name})
    .then(
        category => { 
            if (!category) {
                return `No category with name ${name}`
            }
            console.log(category);
            return category;
        }
    )
    .catch(
        error => { 
            console.log(error);
            throw error;
        }
    )
}


function add(name) {
    Category.create({name:name})
    .catch(
        error => { console.log(error) }
    );
}