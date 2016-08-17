var importMeta = [
    { "collection" : "customers", "file" : "./customers/customers.json"}
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

db.customers.ensureIndex( { "location" : "2dsphere" } );
