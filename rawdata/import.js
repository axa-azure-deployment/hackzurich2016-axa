var importMeta = [
    { "collection" : "customers", "file" : "./customers/customers.json"},
    { "collection" : "profiles", "file" : "./customers/profiles.json"},
    
    { "collection" : "trips", "file" : "./telematics/all-trips.json"},
    { "collection" : "transactions", "file" : "./transactions/transactions.json"},

    { "collection" : "trucks", "file" : "./cars/trucks.json"},
    { "collection" : "cars", "file" : "./cars/cars.json"},

    { "collection" : "insuranceTypes", "file" : "./favorites/insuranceTypes.json"},
    { "collection" : "categories", "file" : "./favorites/categories.json"},
    { "collection" : "risks", "file" : "./favorites/risks.json"},

    { "collection" : "contacts", "file" : "./contacts/contacts.json"},
    { "collection" : "favorites", "file" : "./favorites/favorites.json"},
    { "collection" : "favorites", "file" : "./favorites/favorites2.json", "noDrop" : true},
    { "collection" : "favorites", "file" : "./favorites/favorites3.json", "noDrop" : true},

];

for (var i = 0, l = importMeta.length; i < l; i++){
    var noDrop = importMeta[i].noDrop;
    if (noDrop == undefined) {
        noDrop = false;
    }
    if (!noDrop) {
        print(" start collection "+importMeta[i].collection + " dropping and importing ...");
        db.getCollection(importMeta[i].collection).drop();
        db.getCollection(importMeta[i].collection).dropIndex( { "$**": "-1" });
    } else {
        print(" start collection "+importMeta[i].collection + " importing ...");
    }

    var fileContent = cat(importMeta[i].file);
    db.getCollection(importMeta[i].collection).insertMany(JSON.parse(fileContent));
    if (!noDrop) {
        db.getCollection(importMeta[i].collection).createIndex( { "$**": "text" });
    }
    
    print(" done. imported "+db.getCollection(importMeta[i].collection).count()+ " objects");
}


db.customers.ensureIndex( { "location" : "2dsphere" } );
db.contacts.ensureIndex( { "location" : "2dsphere" } );
