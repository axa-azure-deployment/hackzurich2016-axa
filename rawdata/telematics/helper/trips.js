exports.trips = function() {
    return {
        all_trips : [],
        trips: function() {
            return this.all_trips;
        },
        add: function(name, overview, positions) {
            var trip = { "id" : name, "data": { "events" : overview, "positions" :  positions} };
            trip.data.events.resultHeader = [];
            this.all_trips.push( trip );
            console.log("trip "+name+" added with "+overview.resultData.length +" events + "+positions.positions.length + " positions");
        },
        addTrip: function(trip) {
            this.add(trip.name(), trip.overview(), trip.positions());
        }
    };
};
