# hackzurich2016-axa
AXA Winterthur at hackzurich 2016 - topic: "insurance as simple as a game" aka "Clash of claims"
...

## installation
Our provided APIs are implemented with nodejs and using mongodb. 
With this repo you are able to install the whole REST APIs and database locally.

Please clone our repository to be able to do this.

`bash` clone repo https://github.com/lolo8304/hackzurich2016-axa.git

## install node application

### preconditions
* you need npm installed, min '2.9.1'

### steps

* clone repo
* cd hackzurich2016-axa/rest-app
* npm install
* npm start (npm will start webserver on port 3000)

### verify
* open a browser with http://localhost:3000/
* now you should see the swagger frontend
* try to run the GET /customer, with default parameters and use "try again"
* the database is still connected to our mongodb in the cloud (with read only access)


## install mongodb database


## Links
imteresting addional links to REST API

### REST API tutorial - best practices
* http://www.restapitutorial.com/httpstatuscodes.html