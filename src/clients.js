const express = require('express');

const router = express.Router();

router.get("/search", search);


module.exports = router;


function search(req, res, next) {
    res.json("show this");
    next();
}