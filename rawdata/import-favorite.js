var importMeta = [
    { "collection" : "favorites", "file" : "./favorites/favorites.json", "noDrop" : false },
    { "collection" : "favorites", "file" : "./favorites/favorites2.json", "noDrop" : true },
    { "collection" : "favorites", "file" : "./favorites/favorites3.json", "noDrop" : true },
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

