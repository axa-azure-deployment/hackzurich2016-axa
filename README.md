# hackzurich2016-axa
AXA Winterthur at hackzurich 2016 - topic: "insurance as simple as a game" aka "Clash of claims"
...

## Use API
Our services are deployed on Microsoft AZURE cloud at https://hackzurich16.azurewebsites.net. 
Use the swagger documentation and the REST Endpoint to send requests

### Security
we do not have any security installed, no authentication needed. And our endpoints are supporting [HTTP](http://hackzurich16.azurewebsites.net) and [HTTPS](https://hackzurich16.azurewebsites.net). 
The only restriction is a maximum limit of 25 entries per search or GET requests. Most of the services are using ranges with skip + limit 

## Installation
Our provided APIs are implemented with nodejs and using mongodb. 
With this repo you are able to install the whole REST APIs and database locally.

Please clone our repository to be able to do this.

git clone https://github.com/lolo8304/hackzurich2016-axa.git

## Install node application

### Preconditions
* you need npm installed, min '2.9.1'

### Steps

* clone repo
* cd hackzurich2016-axa/rest-app
* npm install
* npm start (npm will start webserver on port 3000)

### Verify
* open a browser with http://localhost:3000/
* now you should see the swagger frontend
* try to run the GET /customer, with default parameters and use "try again"
* the database is still connected to our mongodb in the cloud (with read only access)

important to know

* node_modules directory is automatically created but it is a part of the .gitignore
* data directory for mongodb is also part of .gitignore


## install mongodb database
install your mongodb locally on your local machine via [mongodb website](https://www.mongodb.com/) or use apt-get to download any linux packages. Read mongodb download support material how to install on your infrastructure.

every mongdb needs a "data" directory. Out "data" directory for mongodb is already a part of .gitignore.

We have import files that can be adapted or extended if needed or just launched to import / reset our hackzurich2016-axa instance.

* create "data" directory in "rest-app" folder
* cd data
* mongod --dbpath `pwd` --port 27018 (just to not mess up with any other default 27017 mongodb port)
* our database we are connecting to is named "hackzurich2016-axa"

start another command line / bash to import

* cd to our "rawdata" directory
* use the generic "run-local.sh" to call any mongodb javascript file to be executed
* adapt the run-local.sh if needed to import into your local database (run.sh script is to be used to import into our SaaS Mongodb - password needed)
* test connection first using: ./run-local.sh test.js

Output to be verified after test.js
```bash
MongoDB shell version: ?.?.?
connecting to: localhost:27018/hackzurich2016-axa
count of customers = 10000
```

* ./run-local.sh import.js (to import delete all and import all data again - reset)

Output to be verified after test.js
```bash
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

* import.js (import all)
* import-profile.js (import profiles 10000 only)
* import-no-customer.js (import all except customer + profiles)
* drop.js (drop all collections)
* count.js (list all counts from any used collection)
* test.js (use to test connection with database)


##Development support
some features had been developed here to support further locale development or support of hackzurich.

* editing swagger.yaml files for API using local [Swagger Editor](http://swagger.io/swagger-editor/)
* copying automatically swagger.* files to your local distribution to update express
* node monitor to reload automatically if files have been updated
* node debugging tools using [Visual Studio Code](https://code.visualstudio.com/docs#vscode)

### Swagger Editor
git repo contains a full instance of the swagger editor "swagger-editor". It is a full nodejs compliant webapplication.
If you are lazy you can use [Swagger Editor online](http://editor.swagger.io/#/) to edit your swagger files

* cmdline: cd swagger-editor
* npm start
* your default browser will be automatically opened
* startup time takes a while
* running on http://localhost:8080/#/

### Copy swagger.yaml + swagger.json files
working with localhost or swagger online, the following functions are helping you deploying your swagger.yaml into our hackzurich git repo
* use "File / Import File ..." to load our swagger.yaml from hackzurich2016-axa/rest-app/dist folder

The swagger editor does not allow inplace editing of files because it is running as standalone webserver

* normally files are downloaded into "$HOME/Download" folder
* run the script 'copySwagger.sh' in hackzurich2016-axa/rest-app/dist folder. This will copy downloaded files into the distribution

### use node monitor to automatically restart node on change
To support a fast edit, compile, test cycle we are using [nodemon](https://www.npmjs.com/package/nodemon). 
Please install it as described and start instead of "npm start"

* npm install -g nodemon
* nodemon -e js,json --watch . --watch routes --exec npm start

(explanations: watch on . + routes of all changes in js, json files and restart via 'npm start')

interesting to know:

* watch out for compilation errors due to restart!!!!
* from time to time the npm engine is not restarted and node monitor is stuck. Just use "ctr-c" several times to stop the npm monitor and start it again.

### node debugging with "Visual Studio Code"
Debugging using "console.log(...)" is very dirty and timeconsuming. Live debugging and stepping into code in real time lets you find bugs much faster. 
I am using [Visual Studio Code](https://code.visualstudio.com/docs#vscode) from Microsoft to edit node applications.

To support debugging within Visual Studio we are using [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome). 
Install it via the IDE at "Extensions" and configure your launcher

* see our 'launch.json' settings file in '.vscode' folder (if needed)
* start command "Attach to Process" via the "Debugging" tools to support automatic reloads of ressources with npm
* use "node ./bin/www" process to be attached to
* done. 

  * use manual breakpoints to halt
  * use "uncaught exceptions" [x] to halt the code :-)
  * or even halt at "throwing any exception" too


### Links
imteresting addional links

* [REST API tutorial - best practices](http://www.restapitutorial.com/httpstatuscodes.html)