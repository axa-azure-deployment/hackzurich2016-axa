
mongoimport --db hackzurich2016-axa --jsonArray --collection customers < ./customers/customers.json
mongoimport --db hackzurich2016-axa --jsonArray --collection trucks < ./cars/trucks.json
mongoimport --db hackzurich2016-axa --jsonArray --collection cars < ./cars/cars.json
mongoimport --db hackzurich2016-axa --jsonArray --collection trips < ./telematics/all-trips.json

mongoimport --db hackzurich2016-axa --jsonArray --collection transactions < ./transactions/transactions1.json
mongoimport --db hackzurich2016-axa --jsonArray --collection transactions < ./transactions/transactions2.json
mongoimport --db hackzurich2016-axa --jsonArray --collection transactions < ./transactions/transactions3.json
mongoimport --db hackzurich2016-axa --jsonArray --collection transactions < ./transactions/transactions4.json
mongoimport --db hackzurich2016-axa --jsonArray --collection transactions < ./transactions/transactions11.json
mongoimport --db hackzurich2016-axa --jsonArray --collection transactions < ./transactions/transactions21.json
mongoimport --db hackzurich2016-axa --jsonArray --collection transactions < ./transactions/transactions31.json
mongoimport --db hackzurich2016-axa --jsonArray --collection transactions < ./transactions/transactions41.json

mongoimport --db hackzurich2016-axa --jsonArray --collection categories < ./favorites/categories.json
mongoimport --db hackzurich2016-axa --jsonArray --collection insuranceTypes < ./favorites/insuranceTypes.json
mongoimport --db hackzurich2016-axa --jsonArray --collection risks < ./favorites/risks.json
mongoimport --db hackzurich2016-axa --jsonArray --collection favorites < ./favorites/favorites.json
