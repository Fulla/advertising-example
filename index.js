const express = require('express');
const dbConnect = require('./src/database')
const bodyParser = require('body-parser');
const categoriesRouter = require('./src/categories');
const brandsRouter = require('./src/brands');
const clientRouter = require('./src/clients');
const filterRouter = require('./src/filters');

const port = '3000'

const app = express();



app.use(bodyParser.json())
app.use('/category', categoriesRouter)
// app.use('/brand', brandsRouter)
// app.use('/user', filterRouter)
// app.use('/client', clientRouter);
app.get('/', index)


app.use(genericErrorHandler)

function index(req, res, next) {
    res.json('the index')
    next();
}

function genericErrorHandler(err, req, res, next) {
    if (err) {
        console.log(err);
        res.status(500);
        res.send("Server failure");
    }
}


// connect to mongoDB and, if succeed, start listening 
dbConnect()
.then(
    () => {
        const server = app.listen(port, function () {
            console.log('Server listening at port %s', port)
        });
    }
)
.catch(
    (err) => console.log(err)
);