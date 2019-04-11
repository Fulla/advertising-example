const express = require('express');
const dbConnect = require('./src/database')
const categoriesRouter = require('./src/categories');
const brandsRouter = require('./src/brands');
const clientRouter = require('./src/clients');
const filterRouter = require('./src/filters');

const port = '3000'

const app = express();

dbConnect()

app.use('/categories', categoriesRouter)
// app.use('/brands', brandsRouter)
// app.use('/user', filterRouter)
// app.use('/client', clientRouter);
app.get('/', index)

const server = app.listen(port, function () {
    console.log('Server listening at port %s', port)
});

function index(req, res, next) {
    res.json('the index')
    next();
}