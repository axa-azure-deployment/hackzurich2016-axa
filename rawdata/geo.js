print("count of customers = "+db.customers.find(
{
location: {
$nearSphere :
{
$geometry: { type: "Point", coordinates: [ 46.731947, 6.962926 ] },
$maxDistance: 500
}
}
}
).count());

