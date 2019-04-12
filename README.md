# Advertising Service
### By Santiago Fulladoza

## Features:

### What does include

- Get, create, edit and delete category
    - `GET /category/:name`
    - `POST /category`   with json `{"name": "categ_name", "description": "" }`
    - `PUT /category`   with json `{"name": "categ_name", "description": "" }`
    - `DELETE /category/:name`
- Get, create, edit and delete brand
    - `GET /brand/:name`
    - `POST /brand`   with json `{"name": "categ_name", "description": "", "category": "categ_name" }`
    - `PUT /brand`   with json `{"name": "categ_name", "description": "", "category": "categ_name" }`
    - `DELETE /brand/:name`
- Create and delete client
    - `POST /client`   with json `{"name": "client_name" }`
    - `DELETE /client/:name`
- Add or remove brand/category from the brand/category blacklist for a client
    - `POST /filter/:client/brand`   with json `{"name": "category_name" }`
    - `DELETE /filter/:client/brand/:name`
    - `POST /filter/:client/category`   with json `{"name": "category_name" }`
    - `DELETE /filter/:client/category/:name`
- Check if a brand is available (not blacklisted) for a client (a brand will not be available also if is of a category that is blacklisted for a client)
    - `GET /filter/:client/brand/allowed/:name`
- Check if a category is available (not blacklisted) for a client
    - `GET /filter/:client/category/allowed/:name`

### What does not include

- Authentication. Any user of the service has access to every endpoint. So anyone can get/create/edit/delete brands, categories, clients and modify the filters for any client. 

## To make it work:

- Install `nodeJS`
- Install `mongoDB` for your OS (it may be more or less difficult, according to your OS. Here some instructions for `Ubuntu 16.04` https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
- `cd` to project root dir
- run `node index.js` to make the server run and start listening on `localhost:3000`
