# Advertising Service

## Features:

### What does include

- Get, create, edit and delete category
- Get, create, edit and delete brand
- Create and delete client
- Add or remove brand/category from the brand/category blacklist for a client

### What does not include

- Authentication. Any user of the service has access to every endpoint. So anyone can get/create/edit/delete brands, categories, clients and modify the filters for any client. 

## To make it work:

- Install `nodeJS`
- Install `mongoDB` for your OS (it may be more or less difficult, according to your OS. Here some instructions for `Ubuntu 16.04` https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
- `cd` to project root dir
- run `node index.js` to make the server run and start listening on `localhost:3000`
