exports.trips = function() {
    return {
        all_trips : [],
        add: function(name, overview, positions) {
            this.all_trips.push( { "key" : name, "value": { "overview" : overview, "positions" :  positions} } );
            console.log("trip "+name+" added with "+overview.resultData.length +" overview + "+positions.positions.length + " positions");
        },
        addTrip: function(trip) {
            this.add(trip.name(), trip.overview(), trip.positions());
        }
    };
};
