const express = require('express');
const router = express.Router();

const Category = require('./models/category');

router.get("/search/:name", (req, res, next) => {
    search(req.param.name)
    .then(
        category => { res.send(category) }
    );
    next()
});


router.post("/add/:category/:name", (req, res) => {
    add(req.param.category, req.param.name)
    .then(
        category => { res.send(category) }
    )
})


module.exports = router;



function search(name) {
    Category.findOne({name: name})
    .then(
        category => { 
            console.log(category);
            return category;
        }
    )
    .catch(
        error => { console.log(error) }
    );
}


function add(name) {
    Category.findOne({name: name})
    .then(
        category => { 
            console.log(category);
            return category;
        }
    )
    Category.create
    .catch(
        error => { console.log(error) }
    );
}