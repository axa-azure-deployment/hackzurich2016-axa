    var all = require("./trips");
    var t1 = require("./trip1");
    var t2 = require("./trip2");
    var t3 = require("./trip3");
    var t4 = require("./trip4");
    var t5 = require("./trip5");
    var t6 = require("./trip6");
    var t7 = require("./trip7");
    
    all.trips().addTrip(t1.trip1());
    all.trips().addTrip(t2.trip2());
    all.trips().addTrip(t3.trip3());
    all.trips().addTrip(t4.trip4());
    all.trips().addTrip(t5.trip5());
    all.trips().addTrip(t6.trip6());
    all.trips().addTrip(t7.trip7());
