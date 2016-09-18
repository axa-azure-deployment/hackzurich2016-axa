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
    { "collection" : "articles", "file" : "./favorites/articles.json"},

    { "collection" : "favorites", "file" : "./favorites/favorites.json"}

];

for (var i = 0, l = importMeta.length; i < l; i++){
    print("count of "+importMeta[i].collection+"="+db.getCollection(importMeta[i].collection).count()+ " objects");
}
