const express = require('express');
const brandsRouter = require('./src/brands');
const clientRouter = require('./src/clients');
const filterRouter = require('./src/filters');

const port = '3000'

const app = express();


app.use('/brands', brandsRouter)
app.use('/user', filterRouter)
app.use('')
app.get('/client', clientRouter);

const server = app.listen(port, function () {
    console.log('Server listening at port %s', port)
});

function index(req, res, next) {
    res.json('the index')
    next();
}