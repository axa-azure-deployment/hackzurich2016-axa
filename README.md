# hackzurich2016-axa
AXA Winterthur at hackzurich 2016 - topic: "insurance as simple as a game" aka "Clash of claims"

# install
* http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
* sudo npm install -g express-generator


# install mongo
* https://www.mongodb.com/
* download
* https://docs.mongodb.com/manual/installation/
* cd app/data
* mongod --dbpath `pwd`


link nodejs with mongodb
* add.js
* var db = monk('localhost:27017/hackzurich2016-axa');
* additional settings to keep alive connection see
http://mongodb.github.io/node-mongodb-native/api-generated/server.html#server
* driver settings: http://mongodb.github.io/node-mongodb-native/2.2/reference/connecting/connection-settings/
* ... as in tutorial

* restart npm

start
* set DEBUG=app:* & npm start

stop
* ctrl-c

# create REST service with express, node, mongodb
* http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/
* http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api


# swagger documentation with nodejs, express
* https://www.npmjs.com/package/swagger-node-express
* http://stackoverflow.com/questions/33534488/generate-swagger-document-for-existing-nodejs-server
* https://github.com/shawngong/Swagger-Node-Express-For-Existing-APIs


# install nodemon to detect changes
* install nodemon from https://www.npmjs.com/package/nodemon
* nodemon -e js,json --watch . --watch routes --exec npm start

# REST API tutorial - best practices
* http://www.restapitutorial.com/httpstatuscodes.html