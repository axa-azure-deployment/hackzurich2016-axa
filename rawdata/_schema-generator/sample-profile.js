exports.sample_profiles = function () {
    return {
        object: function () {
            return this.jsonObject;
        },
        jsonObject:
        {
            "id": "200",
            "customer": "1",
            "profile_date": "2016-08-15",
            "segment_overall": "young_families",
            "segment_age": "40-45",
            "nof_housing_partner": 1,
            "nof_housing_flat": 1,
            "nof_housing_homeowner": 1,
            "nof_residents": 4,
            "nof_kids_total": 2,
            "nof_kids_under_18": 1,
            "nof_cars": 2
        }
    }
};