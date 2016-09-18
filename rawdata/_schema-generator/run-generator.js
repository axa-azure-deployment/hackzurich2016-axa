var g = require("./generator");

//var s = require("./sample-profile");
//g.generator().swagger("Profile", "Profiles", s.sample_profiles().object());

//var s = require("./sample-category");
//g.generator().swagger("Category", "Categories", s.sample_categories().object());

//var s = require("./sample-risk");
//g.generator().swagger("Risk", "Risks", s.sample_risks().object());

//var s = require("./sample-favorite");
//g.generator().swagger("Favorite", "Favorites", s.sample_favorites().object());

var s = require("./sample-article");
g.generator().swagger("Articles", "Article", s.sample_articles().object());


//var s = require("./sample-contact");
//g.generator().swagger("Contact", "Contacts", s.sample_contacts().object());
