
mongoimport --db hackzurich2016-axa --jsonArray --collection customers < ./customers/customers.json
mongoimport --db hackzurich2016-axa --jsonArray --collection trucks < ./cars/trucks.json
mongoimport --db hackzurich2016-axa --jsonArray --collection cars < ./cars/cars.json
