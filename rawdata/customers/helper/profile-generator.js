var mocker = require("mocker-data-generator");
var util = require("util");

var profile = {
    id: { incrementalId: 1 },
    customer: {
        function: function () {
            return "" + this.object.id;
        }
    },
    age: {
        chance: 'integer({"min": 18, "max": 66})'
    },
    profile_date: {
        function: function () {
            return "2016-" +
                this.faker.random.arrayElement(["04", "05", "06", "07", "08"]) + "-" +
                this.chance.integer({ "min": 10, "max": 30 });
        }
    },
    live_in_city_center: {
        function: function () {
            // 16% of all live in a city center
            return this.chance.integer({ "min": 0, "max": 6 }) == 6 ? 1 : 0;
        }
    },
    job: {
        function: function () {
            return this.chance.integer({ "min": 0, "max": 1 });
        }
    },
    nof_housing_partner: {
        function: function () {
            // kids under 23, no partner in home
            if (this.object.age < 23) {
                return 0;
            }
            // btw 23 and 75, 75% have a partner
            if (this.object.age >= 23 && this.object.age < 75) {
                return this.chance.integer({ "min": 0, "max": 3 }) < 3 ? 0 : 1;
            }
            // abover 75, 66% have no partner anymore
            if (this.object.age >= 75) {
                return this.chance.integer({ "min": 0, "max": 2 }) < 2 ? 0 : 1;
            }
        }
    },
    nof_kids_total: {
        function: function () {
            if (this.object.nof_housing_partner == 1) {
                return this.chance.integer({ "min": 0, "max": 5 });
            } else {
                var nofKids = this.chance.integer({ "min": 0, "max": 5 });
                if (nofKids < 5) {
                    return 0;
                } else {
                    return 1;
                }
            }
        }
    },
    nof_kids_under_7: {
        function: function () {
            if (this.object.nof_kids_total > 0) {
                if (this.object.age <= 35) {
                    return this.chance.integer({ "min": 1, "max": this.object.nof_kids_total });
                }
                // btw 36 and 47, probability of 20% to have kids at 7
                if (this.object.age <= 47) {
                    return this.chance.integer({ "min": 0, "max": 5 }) == 5 ? 1 : 0;
                }
            }
            return 0;
        }
    },
    segment_overall: {
        function: function () {
            if (this.object.age <= 25 && this.object.nof_kids_total == 0 && this.object.job == 0) {
                return "Millenials";
            }
            if (this.object.age <= 35 && this.object.job == 1 && this.object.nof_kids_total == 0) {
                return "Young professional";
            }
            if (this.object.age <= 45 && this.object.nof_kids_under_7 > 0) {
                return "Young family";
            }
            if (this.object.age >= 26 && this.object.age <= 49 && this.object.nof_kids_under_7 == 0) {
                return "Established family";
            }
            if (this.object.age >= 46 && this.object.age <= 49 && this.object.nof_kids_total > 0) {
                return "Established family";
            }
            if (this.object.age >= 36 && this.object.age <= 49 && this.object.nof_kids_total == 0) {
                return "Independent";
            }
            if (this.object.age >= 50 && this.object.age <= 65) {
                return 'Pre-retirement';
            }
            if (this.object.age >= 66 && this.object.age <= 80) {
                return 'Active retirement';
            }
            if (this.object.age >= 66 && this.object.age <= 80) {
                return 'Passive retirement';
            }
            return "no-segment calculated-strange";
        }
    },
    nof_cars: {
        function: function () {
            if (this.object.nof_housing_partner == 1) {
                if (this.object.nof_kids_total == 0) {
                    return this.chance.integer({ "min": 1, "max": 3 });
                } else {
                    return this.chance.integer({ "min": 1, "max": 2 });
                }
            } else {
                if (this.object.live_in_city_center == 1) {
                    return 0;
                } else {
                    return 1;
                }
            }
        }
    },
    nof_housing_flat: {
        function: function () {
            if (this.object.live_in_city_center == 1) {
                return 1
            }
            if (this.object.age < 30 && this.object.nof_kids_total == 0) {
                return 1;
            }
            if (this.object.age > 68) {
                return 1;
            }
            return 0;
        }
    },
    nof_housing_homeowner: {
        function: function () {
            return 1 - this.object.nof_housing_flat;
        }
    },
    nof_residents: {
        function: function () {
            return this.object.nof_housing_partner + this.object.nof_kids_total;
        }
    },
    age_segment: {
        function: function () {
            var a = this.object.age;
            if (a <= 25) {
                return "<= 25";
            }
            if (a <= 35) {
                return "26-35";
            }
            if (a <= 45) {
                return "36-45";
            }
            if (a <= 55) {
                return "46-55";
            }
            if (a <= 65) {
                return "56-65";
            }
            if (a <= 80) {
                return "65-80";
            }
            return "> 80";
        }
    }
};
var count = process.argv.length > 2 ? parseInt(process.argv[2]) : 10;
mocker()
    .schema('profile', profile, count)
    .build(function (data) {
        console.log(JSON.stringify(data.profile))
        //This returns an object 
        // { 
        //      user:[array of users], 
        //      group: [array of groups], 
        //      conditionalField: [array of conditionalFields] 
        // } 
    })

