exports.contacts = function () {
    return {
        swagger: function (name, multipleName) {
            this.walkObject(this.json(), 2, name);
        },
        ind: function(i) {
            return new Array(i + 1).join( ' ' );
        },
        walkObject: function (object, i, name) {
            console.log(this.ind(i)+name+":");
            console.log(this.ind(i+1)+"type: object");
            console.log(this.ind(i+1)+"properties:");
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    if (object[property].constructor === Array) {
                        console.log(this.ind(i+2)+property+":");
                        console.log(this.ind(i+3)+"type: array");
                        this.walkArray(object[property][0], i+3, "items")
                    } else if (object[property].constructor === Object) {
                        this.walkObject(object[property], i+2, property);
                    } else {
                        console.log(this.ind(i+2)+property+":");
                        this.walkElement(object[property], i+3, property);
                    }
                }
            }
        },
        walkArray: function (object, i, name) {
            if (object.constructor === Array) {
                console.log(this.ind(i)+"items:");
                console.log(this.ind(i+1)+"type: array");
                this.walkArray(object[0], i+2, "items")
            } else if (object.constructor === Object) {
                this.walkObject(object, i, "items");
            } else {
                console.log(this.ind(i)+"items:");
                this.walkElement(object, i+1, name);
            }
        },
        isInt: function(n){
            return Number(n) === n && n % 1 === 0;
        },
        isFloat: function(n){
            return Number(n) === n && n % 1 !== 0;
        },
        walkElement: function (object, i, name) {
            if (object.constructor === String) {
                console.log(this.ind(i)+"type: string");
            } else
            if (this.isInt(object)) {
                console.log(this.ind(i)+"type: number");
                console.log(this.ind(i)+"format: integer");
            } else 
            if (this.isFloat(object)) {
                console.log(this.ind(i)+"type: number");
                console.log(this.ind(i)+"format: float");
            } else {
                console.log(this.ind(i)+"type: string / tbd");
            }
        },
        
        jsonObject :
        {
            "_id": "57abbbe5f719db907340514f",
            "type": "PC",
            "city": "Aarau",
            "language": "de",
            "location": {
                "type": "Point",
                "coordinates": [
                    47.3934653,
                    8.045237199999999
                ]
            },
            "mail": "5001@axa-winterthur.ch",
            "name": "Generalagentur M R",
            "phone": "062 123 45 67",
            "street": "Schlossplatz 1",
            "zip": "5001",
            "openingHours": {
                "days": {
                    "Mo": {
                        "ranges": {
                            "8:00": "12:00",
                            "13:00": "17:30"
                        }
                    },
                    "Di": {
                        "ranges": {
                            "8:00": "12:00",
                            "13:00": "17:30"
                        }
                    },
                    "Mi": {
                        "ranges": {
                            "8:00": "12:00",
                            "13:00": "17:30"
                        }
                    },
                    "Do": {
                        "ranges": {
                            "8:00": "12:00",
                            "13:00": "19:30"
                        }
                    },
                    "Fr": {
                        "ranges": {
                            "8:00": "12:00",
                            "13:00": "16:00"
                        }
                    },
                    "Sa": {
                        "ranges": {
                            "8:00": "12:00",
                            "13:00": "16:00"
                        }
                    }
                }
            },
            "agents": [
                {
                    "agentStatus": "ID",
                    "email": "103926@axa-winterthur.ch",
                    "firstname": "C.",
                    "lastname": "Felber",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "105643@axa-winterthur.ch",
                    "firstname": "D.",
                    "lastname": "Richner",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "110728@axa-winterthur.ch",
                    "firstname": "L.",
                    "lastname": "Schärer",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "125628@axa-winterthur.ch",
                    "firstname": "A.",
                    "lastname": "Kalberer",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "125636@axa-winterthur.ch",
                    "firstname": "T.",
                    "lastname": "Furter",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "126381@axa-winterthur.ch",
                    "firstname": "S.",
                    "lastname": "Kanik",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "126438@axa-winterthur.ch",
                    "firstname": "S.",
                    "lastname": "Ünal",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "131695@axa-winterthur.ch",
                    "firstname": "D.",
                    "lastname": "Rocha",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "136948@axa-winterthur.ch",
                    "firstname": "E.",
                    "lastname": "Melunovic",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "147486@axa-winterthur.ch",
                    "firstname": "M.",
                    "lastname": "Schmid",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "148660@axa-winterthur.ch",
                    "firstname": "C.",
                    "lastname": "Giudice",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "148938@axa-winterthur.ch",
                    "firstname": "E.",
                    "lastname": "Farsaci",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "150606@axa-winterthur.ch",
                    "firstname": "S.",
                    "lastname": "Mastria",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "205672@axa-winterthur.ch",
                    "firstname": "M.",
                    "lastname": "Heldmann",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "241849@axa-winterthur.ch",
                    "firstname": "S.",
                    "lastname": "Rose",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "241903@axa-winterthur.ch",
                    "firstname": "I.",
                    "lastname": "Lorente",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "241946@axa-winterthur.ch",
                    "firstname": "M.",
                    "lastname": "Erismann",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "267961@axa-winterthur.ch",
                    "firstname": "R.",
                    "lastname": "Hirsiger",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "305005@axa-winterthur.ch",
                    "firstname": "B.",
                    "lastname": "Steffen",
                    "mobile": "+41791234567",
                    "phone": "056 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "724544@axa-winterthur.ch",
                    "firstname": "M.",
                    "lastname": "Pierri",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "726249@axa-winterthur.ch",
                    "firstname": "M.",
                    "lastname": "Rothen",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "765309@axa-winterthur.ch",
                    "firstname": "J.",
                    "lastname": "Rothen",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "795984@axa-winterthur.ch",
                    "firstname": "V.",
                    "lastname": "Steffen",
                    "mobile": "+41791234567",
                    "phone": "056 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "921009@axa-winterthur.ch",
                    "firstname": "C.",
                    "lastname": "Napoli",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "945277@axa-winterthur.ch",
                    "firstname": "K.",
                    "lastname": "Fehlmann",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "945285@axa-winterthur.ch",
                    "firstname": "H.",
                    "lastname": "Howald-Riner",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "953687@axa-winterthur.ch",
                    "firstname": "A.",
                    "lastname": "Landolfi",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "955779@axa-winterthur.ch",
                    "firstname": "P.",
                    "lastname": "Stillhard",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "955930@axa-winterthur.ch",
                    "firstname": "M.",
                    "lastname": "Moser",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "AD",
                    "email": "960217@axa-winterthur.ch",
                    "firstname": "L.",
                    "lastname": "Serratore",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                },
                {
                    "agentStatus": "ID",
                    "email": "961221@axa-winterthur.ch",
                    "firstname": "C.",
                    "lastname": "Hüryasar",
                    "mobile": "+41791234567",
                    "phone": "062 123 45 67"
                }
            ],
            "closedOnDays": {
                "days": [
                    {
                        "event": "Fasnacht",
                        "date": "bis 16:00"
                    }
                ]
            }
        },
        json: function () {
            return this.jsonObject;
        }
    }
}
