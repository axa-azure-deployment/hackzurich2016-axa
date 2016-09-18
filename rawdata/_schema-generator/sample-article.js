exports.sample_articles = function () {
    return {
        object: function () {
            return this.jsonObject;
        },
        jsonObject :
            {
                "category": "HIFI",
                "title": "Hifi tuner",
                "brand": "revox",
                "price_from": 5000,
                "price_to": 10000,
                "file": "/images/favorites/hifi-tuner.png"
        }
    }
};