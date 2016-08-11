var g = require("./generator");
var s1 = require("./sample");
var s2 = require("./sample-contact");
var s3 = require("./sample-risk");
var s4 = require("./sample-category");
var s5 = require("./sample-profile");

g.generator().swagger("Profile", "Profiles", s5.sample_profiles().object());
g.generator().swagger("Category", "Categories", s4.sample_categories().object());
g.generator().swagger("Risk", "Risks", s3.sample_risks().object());
g.generator().swagger("Favorite", "Favorites", s1.sample_favorites().object());
g.generator().swagger("Contact", "Contacts", s2.sample_contacts().object());
