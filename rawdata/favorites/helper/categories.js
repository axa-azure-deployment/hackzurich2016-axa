exports.sample_categories = function () {
    return {
        object: function () {
            return this.jsonObject;
        },
        map: function() {
            this.jsonObject.forEach(function(element) {
                this.idMap[element.id] = element;
            }, this);
            return this.idMap;
        },
        idMap: [],
        jsonObject: [
            {
                "id": "ELECTRONICS",
                "value": "Electronics ",
                "parent": ""
            },
            {
                "id": "COMPUTER",
                "value": "Computer & Tablet",
                "parent": "ELECTRONICS"
            },
            {
                "id": "SMARTPHONE_WATCH",
                "value": "Smartphone & smartwatch",
                "parent": "ELECTRONICS"
            },
            {
                "id": "PLAY_CONSOLE",
                "value": "Play-Console",
                "parent": "ELECTRONICS"
            },
            {
                "id": "FLATSCREEN",
                "value": "Flatscreen",
                "parent": "ELECTRONICS"
            },
            {
                "id": "PHOTO_AND_VIDEO",
                "value": "Photo & Video",
                "parent": "ELECTRONICS"
            },
            {
                "id": "PRINTER_AND_SCANNER",
                "value": "Printer, Scanner & Network",
                "parent": "ELECTRONICS"
            },
            {
                "id": "HIFI",
                "value": "HiFi & Homecinema",
                "parent": "ELECTRONICS"
            },
            {
                "id": "OTHER_ELECTRONICS",
                "value": "Others",
                "parent": "ELECTRONICS"
            },
            {
                "id": "SPORT_AND_LEISURE",
                "value": "Sport and leisure",
                "parent": ""
            },
            {
                "id": "INDOOR",
                "value": "Indoor",
                "parent": "SPORT_AND_LEISURE"
            },
            {
                "id": "OUTDOOR",
                "value": "Outdoor",
                "parent": "SPORT_AND_LEISURE"
            },
            {
                "id": "E_BIKES",
                "value": "Bikes, E-Bikes & Moped",
                "parent": "SPORT_AND_LEISURE"
            },
            {
                "id": "R_C_MODELS",
                "value": "R/C Model",
                "parent": "SPORT_AND_LEISURE"
            },
            {
                "id": "PARAGLIDE",
                "value": "Paraglide",
                "parent": "SPORT_AND_LEISURE"
            },
            {
                "id": "OTHER_SPORT",
                "value": "Others",
                "parent": "SPORT_AND_LEISURE"
            },
            {
                "id": "JEWELERY_WATCHES",
                "value": "Jewlery and traditional watches",
                "parent": ""
            },
            {
                "id": "MONETARY_VALUES",
                "value": "Monetary values",
                "parent": ""
            },
            {
                "id": "ARTWORKS",
                "value": "Artworks",
                "parent": ""
            },
            {
                "id": "MUSICAL_INSTRUMENTS",
                "value": "Musical instruments",
                "parent": ""
            },
            {
                "id": "CLOTHES_AND_ACCESSORIES",
                "value": "Clothes and accessories",
                "parent": ""
            },
            {
                "id": "FURNITURE_AND_APPLICANCES",
                "value": "Appliances and Electrical Household",
                "parent": ""
            },
            {
                "id": "OTHER",
                "value": "Others",
                "parent": ""
            }
        ]
    }
};