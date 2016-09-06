hackzurich2016-axa
=================
AXA Winterthur at hackzurich 2016 - topic: "Insurance as Simple as a Game" aka "Clash of Claims"
...


Table of Contents
=================

  * [hackzurich2016-axa](#hackzurich2016-axa)
  * [Table of Contents](#table-of-contents)
  * [AXA Winterthur - API installation and configuration](#axa-winterthur---api-installation-and-configuration)
    * [Usage](#usage)
      * [Security](#security)
    * [Installation](#installation)
    * [Install node application](#install-node-application)
      * [Preconditions](#preconditions)
      * [Steps](#steps)
      * [Verify](#verify)
    * [install local mongodb database](#install-local-mongodb-database)
    * [Development support](#development-support)
      * [Swagger Editor](#swagger-editor)
      * [Copy swagger.yaml   swagger.json files](#copy-swaggeryaml--swaggerjson-files)
      * [use node monitor to automatically restart node on change](#use-node-monitor-to-automatically-restart-node-on-change)
      * [node debugging with "Visual Studio Code"](#node-debugging-with-visual-studio-code)
      * [node script to generate swagger YAML schema definition](#node-script-to-generate-swagger-yaml-schema-definition)
      * [Links](#links)

#AXA Winterthur - API installation and configuration

## Usage
Our services are deployed on Microsoft AZURE cloud at https://hackzurich16.azurewebsites.net. 
Use the swagger documentation and the REST Endpoint to send requests

### Security
we do not have any security installed, no authentication needed. And our endpoints are supporting [HTTP](http://hackzurich16.azurewebsites.net) and [HTTPS](https://hackzurich16.azurewebsites.net). 
The only restriction is a maximum limit of 25 entries per search or GET requests. Most of the services are using ranges with skip + limit 

## Installation
Our provided APIs are implemented with nodejs and using mongodb. 
With this repo you are able to install the whole REST APIs and database locally.

Please clone our repository to be able to do this.

```bash
git clone https://github.com/axa-azure-deployment/hackzurich2016-axa.git
```

## Install node application

### Preconditions
* you need nodejs + npm installed (npm min '2.9.1')
* install nodejs + npm using standard documentation [online](https://nodejs.org/en/download/)

### Steps

```bash
git clone https://github.com/axa-azure-deployment/hackzurich2016-axa.git
cd hackzurich2016-axa/rest-app
npm install
npm start (npm will start webserver on port 3000)
```

### Verify
* open a browser with http://localhost:3000/
* now you should see the swagger frontend
* try to run the GET /customer, with default parameters and use "try again"
* the database is still connected to our mongodb in the cloud (with read only access)

important to know

* node_modules directory is automatically created but it is a part of the .gitignore
* data directory for mongodb is also part of .gitignore


## install local mongodb database
install your mongodb locally on your local machine via [mongodb website](https://www.mongodb.com/) or use apt-get to download any linux packages. Read mongodb download support material how to install on your infrastructure.

every mongdb needs a "data" directory. Out "data" directory for mongodb is already a part of .gitignore.

We have import files that can be adapted or extended if needed or just launched to import / reset our hackzurich2016-axa instance.

```bash
cd rest-app
mkdir data\db
cd data
mongod --dbpath `db` --port 27018

//port 27018 just to not mess up with any other default 27017 mongodb port
//our database we are connecting to is named "hackzurich2016-axa"
````

start another command line / bash to import

```bash
cd rawdata
./run-local.sh any-javascript.js
```

Use the generic "run-local.sh" to call any mongodb javascript file to be executed.
Adapt the run-local.sh if needed to import into your local database. 
"run.sh" script shall only be used to import into our SaaS mongodb on azure - password needed)

Test connection first using local database:
```bash
$ ./run-local.sh test.js
MongoDB shell version: ?.?.?
connecting to: localhost:27018/hackzurich2016-axa
count of customers = 10000
```

Run following script to delete and import all data again - reset

```bash
$ ./run-local.sh import.js
MongoDB shell version: ?.?.?
connecting to: localhost:27018/hackzurich2016-axa
 start collection customers dropping and importing ...
 done. imported 10000 objects
 start collection profiles dropping and importing ...
 done. imported 10000 objects
 start collection trips dropping and importing ...
 done. imported 7 objects
 start collection transactions dropping and importing ...
 done. imported 1100 objects
 start collection trucks dropping and importing ...
 done. imported 388 objects
 start collection cars dropping and importing ...
 done. imported 1789 objects
 start collection insuranceTypes dropping and importing ...
 done. imported 22 objects
 start collection categories dropping and importing ...
 done. imported 23 objects
 start collection risks dropping and importing ...
 done. imported 21 objects
 start collection contacts dropping and importing ...
 done. imported 371 objects
 start collection favorites dropping and importing ...
 done. imported 3 objects
```

use following script files to execute

```bash
$ ./run-local.sh import.js               import all

$ ./run-local.sh import-customer.js      import customers only
$ ./run-local.sh import-profile.js       import profiles  only
$ ./run-local.sh import-favorite.js      import favorites only
$ ./run-local.sh import-no-large.js      import all except large sets

$ ./run-local.sh drop.js                 drop all collections
$ ./run-local.sh count.js                list all counts from any used collection
$ ./run-local.sh test.js                 use to test connection with database
````

## configure local mongodb database

edit the rest-app/app.js file and modify

```js
// uncomment for localhost database
var dbURL = 'localhost:27018/hackzurich2016-axa';
```

##Development support
some features had been developed here to support further locale development or support of hackzurich.

* editing swagger.yaml files for API using local [Swagger Editor](http://swagger.io/swagger-editor/)
* copying automatically swagger.* files to your local distribution to update express
* node monitor to reload automatically if files have been updated
* node debugging tools using [Visual Studio Code](https://code.visualstudio.com/docs#vscode)
* nodejs swagger schema definition generator tool

### Swagger Editor
git repo contains a full instance of the swagger editor "swagger-editor". It is a full nodejs compliant webapplication.
If you are lazy you can use [Swagger Editor online](http://editor.swagger.io/#/) to edit your swagger files

```bash
cd swagger-editor
npm start
```

* your default browser will be automatically opened
* startup time takes a while
* running on http://localhost:8080/#/

### Copy swagger.yaml + swagger.json files
working with localhost or swagger online, the following functions are helping you deploying your swagger.yaml into our hackzurich git repo
* use "File / Import File ..." to load our swagger.yaml from hackzurich2016-axa/rest-app/dist folder

The swagger editor does not allow inplace editing of files because it is running as standalone webserver

* normally files are downloaded into "$HOME/Download" folder
* run the script in hackzurich2016-axa/rest-app/dist folder. This will copy downloaded files into the distribution

```bash
$ cd rest-app/dist
$ ./copySwagger.sh
Listening to changes every 1s in _____/Downloads/swagger.* to move to _____/git/hackzurich2016-axa/rest-app/dist
Sun Aug 14 21:07:41 CEST 2016 - copy swagger.json file to git
Sun Aug 14 21:07:41 CEST 2016 - copy swagger.local.json file to git for localhost
Sun Aug 14 21:07:41 CEST 2016 - copy swagger.yaml file to git
Sun Aug 14 21:07:41 CEST 2016 - copy swagger.local.yaml file to git for localhost
```


### use node monitor to automatically restart node on change
To support a fast edit, compile, test cycle we are using [nodemon](https://www.npmjs.com/package/nodemon). 
Please install it as described and start instead of "npm start"

```bash
$ sudo npm install -g nodemon
$ nodemon -e js,json --watch . --watch routes --exec npm start

//explanations:  
     watch on all changes in file extensions  js, json
     watch on all changes in directory        . & 'routes' 
     restart via command                      npm start

```

interesting to know:

* watch out for compilation errors due to restart!!!!
* from time to time the npm engine is not restarted and node monitor is stucked. Just use "Ctrl-C" several times to stop the npm monitor and start it again.

### node debugging with "Visual Studio Code"
Debugging using "console.log(...)" is very dirty and timeconsuming. Live debugging and stepping into code in real time lets you find bugs much faster. 
I am using [Visual Studio Code](https://code.visualstudio.com/docs#vscode) from Microsoft to edit node applications.

To support debugging within Visual Studio we are using [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome). 
Install it via the IDE at "Extensions" and configure your launcher. See our 'launch.json' settings file in '.vscode' folder (if needed)

* start command "Attach to Process" via the "Debugging" tools to support automatic reloads of ressources with npm
* use "node ./bin/www" process to be attached to
* manage breakpoints within Visual Studio Code
  * use manual breakpoints to halt
  * use [x] "uncaught exceptions" to halt the code :-)
  * use [x] "throwing any exception" to halt too

### node script to generate swagger YAML schema definition
This tools can be used if you have an example JSON result structure to be able to generate a YAML schema definition based on the JSON structure.
the JSON structure can be complex, can contain Arrays, object structures and native types (string, float, integer)

The generated YAML schema definition can be copied into swagger-editor or YAML definition files.
The following schema definitions will be created:

* "name"ResultList
* "name"s (multiple form)
* "name" (single form)


```bash
cd rawdata/_schema-generator
node run-generator.js > out.yaml
```

adapt the run-generator.js to run against your own sample.js (here example with risk)
```bash
$ vi run-generator.js

var g = require("./generator");
var s = require("./sample-risk");
g.generator().swagger("Risk", "Risks", s.sample_profiles().object());
```

generate you own sample.js file with the structure

```js
exports.sample_<name> = function () {
    return {
        object: function () {
            return this.jsonObject;
        },
        jsonObject:

// insert your structure here

        {
            _id: "57ac4099402f9292dc3d0820",
            id: "ACCIDENT",
            value: "Accident",
            lineOfBusiness: "Health"
        }

// end your structure

    }
};
```

This will produc the following YAML output

```yaml
  RiskResultList:
    description: result of Risk search used for paging
    type: object
    properties:
      data:
        $ref: '#/definitions/Risks'
      links:
        $ref: '#/definitions/Link'

  Risks:
    type: array
    items:
      $ref: '#/definitions/Risk'

  Risk:
    description: tbd
    type: object
    properties:
      _id:
        description: tbd
        type: string
      id:
        description: tbd
        type: string
      type:
        description: tbd
        type: number
        format: integer
      factor:
        description: tbd
        type: number
        format: float
      value:
        description: tbd
        type: string
      lineOfBusiness:
        description: tbd
        type: string

```




### Links
interesting addional links

* [REST API tutorial - best practices](http://www.restapitutorial.com/httpstatuscodes.html)
* [Mongodb query docu](https://docs.mongodb.com/manual/tutorial/query-documents/)
* [Mongodb nodejs find docu](https://mongodb.github.io/node-mongodb-native/api-generated/collection.html#find)
