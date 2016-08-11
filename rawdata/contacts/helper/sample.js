exports.sample_favorites = function () {
    return {
        object: function () {
            return this.jsonObject;
        },
        jsonObject :
            {
            "id": "200",
            "title": "my bike",
            "category": "SPORT_AND_LEISURE",
            "model": "bicicleta nova",
            "price": {
                "value": "950",
                "currency": "EUR"
            },
            "currentPrice": {
                "value": "800",
                "currency": "EUR"
            },
            "purchaseDate": {
                "day": "04",
                "month": "08",
                "year": "2015"
            }
        }
    }
};