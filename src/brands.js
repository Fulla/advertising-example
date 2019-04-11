const express = require('express');
const router = express.Router();

const Brand = require('./models/brand');
const Category = require('./models/category');

router.get("/search/:name", (req, res, next) => {
    search(req.param.name)
    .then(
        brand => { res.send(brand) }
    );
    next()
});


router.post("/add/:category/:name", (req, res) => {
    add(req.param.category, req.param.name)
    .then(
        brand => { res.send(brand) }
    )
})


module.exports = router;



function search(brandName) {
    Brand.findOne({name: brandName})
    .then(
        (err, doc) => { 
            console.log(doc);
            return doc;
        }
    )
    .catch(
        error => { console.log(error) }
    );
}


function add(categoryName, brandName) {
    Category.findOne({name: categoryName})
    .then(
        (err, doc) => { 
            console.log(doc);
            return doc;
        }
    )
    new Brand({})
    
    .catch(
        error => { console.log(error) }
    );
}