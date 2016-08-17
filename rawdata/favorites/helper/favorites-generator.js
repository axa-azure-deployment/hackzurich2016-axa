var mocker = require("mocker-data-generator");
var util = require("util");

var sample = require("./articles");
var favoritesSamples = sample.sample_favorites().object();

var sample = require("../../customers/helper/cust");
var users = sample.sample_cust().object();

var sample = require("./categories");
var sampleCat = sample.sample_categories();
var categories = sampleCat.object();
var categoriesMap = sampleCat.map();

var favorite = {
    id: { incrementalId: 1 },
    ref: {
        function: function () {
            return this.chance.integer({ "min": 0, "max": favoritesSamples.length - 1 });
        }
    },
    customer: {
        function: function () {
            return this.faker.random.arrayElement(users).id;
        }
    },
    category: {
        function: function () {
            var newCat = favoritesSamples[this.object.ref].category.toUpperCase();
            var cat = categoriesMap[newCat];
            if (!cat) {
                console.log("category '"+newCat+"' not found");
                throw new Error("category '"+newCat+"' not found");
            }
            return newCat;
        }
    },
    title: {
        function: function () {
            return favoritesSamples[this.object.ref].title;
        }
    },
    brand: {
        function: function () {
            return favoritesSamples[this.object.ref].brand;
        }
    },
    price: {
        function: function () {
            var p = this.chance.integer({ 
                        "min": favoritesSamples[this.object.ref].price_from, 
                        "max": favoritesSamples[this.object.ref].price_to });
            p = Math.floor(p / 10) * 10;
            return {
                "value" : p,
                "currency" : "CHF"
                };
        }
    },
    currentPrice: {
        function: function () {
            var p = this.object.price.value * 
                this.faker.random.arrayElement([0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5]);
            p = Math.floor(p/10) * 10;
            var curDate = "2016-" +
                this.faker.random.arrayElement(["07", "08"]) + "-" +
                this.chance.integer({ "min": 10, "max": 30 });
            return {
                "value" : p,
                "currency" : this.object.price.currency,
                "date": curDate
            };
        }
    },
    imageURL: {
        function: function () {
            return "/images/favorites/"+favoritesSamples[this.object.ref].file;
        }
    },
    purchaseDate: {
        function: function () {
            delete this.object.ref;
            var i = this.chance.integer({ "min": 0, "max": 1});
            if (i > 0) {
                return "2016-" +
                    this.faker.random.arrayElement(["01", "02", "03", "04", "05", "06"]) + "-" +
                    this.chance.integer({ "min": 10, "max": 30 });
            } else {
                return this.faker.random.arrayElement(["2011","2012","2013","2014","2015",]) + "-" +
                    this.faker.random.arrayElement(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]) + "-" +
                    this.chance.integer({ "min": 10, "max": 30 });
            }
        }
    }
};
var count = process.argv.length > 2 ? parseInt(process.argv[2]) : 10;
mocker()
    .schema('favorite', favorite, count)
    .build(function (data) {
        console.log(JSON.stringify(data.favorite))
    })

