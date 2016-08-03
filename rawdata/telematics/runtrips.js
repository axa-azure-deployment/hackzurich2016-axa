    var all = require("./trips");
    var t1 = require("./trip1");
    var t2 = require("./trip2");
    var t3 = require("./trip3");
    var t4 = require("./trip4");
    var t5 = require("./trip5");
    var t6 = require("./trip6");
    var t7 = require("./trip7");
    var trips = all.trips();
    
    trips.addTrip(t1.trip1());
    trips.addTrip(t2.trip2());
    trips.addTrip(t3.trip3());
    trips.addTrip(t4.trip4());
    trips.addTrip(t5.trip5());
    trips.addTrip(t6.trip6());
    trips.addTrip(t7.trip7());
    console.log(JSON.stringify(trips.trips()))