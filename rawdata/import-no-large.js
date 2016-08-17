var importMeta = [
    { "collection" : "trips", "file" : "./telematics/all-trips.json"},
    { "collection" : "transactions", "file" : "./transactions/transactions.json"},

    { "collection" : "insuranceTypes", "file" : "./favorites/insuranceTypes.json"},
    { "collection" : "categories", "file" : "./favorites/categories.json"},
    { "collection" : "risks", "file" : "./favorites/risks.json"},

    { "collection" : "contacts", "file" : "./contacts/contacts.json"}

];

for (var i = 0, l = importMeta.length; i < l; i++){
    print(" start collection "+importMeta[i].collection + " dropping and importing ...");
    db.getCollection(importMeta[i].collection).drop();
    db.getCollection(importMeta[i].collection).dropIndex( { "$**": "-1" });

    var fileContent = cat(importMeta[i].file);
    db.getCollection(importMeta[i].collection).insertMany(JSON.parse(fileContent));
    db.getCollection(importMeta[i].collection).createIndex( { "$**": "text" });
    
    print(" done. imported "+db.getCollection(importMeta[i].collection).count()+ " objects");
}

db.contacts.ensureIndex( { "location" : "2dsphere" } );
