{
    "swagger": "2.0",
    "info": {
        "version": "0.1.0",
        "title": "hackzurich 2016 - AXA Winterthur - API"
    },
    "host": "hackzurich16.azurewebsites.net",
    "definitions": {
        "Customer": {
            "properties": {
                "name": {
                    "type": "string"
                },
                "gender": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "givenName": {
                    "type": "string"
                },
                "middleInitial": {
                    "type": "string"
                },
                "surname": {
                    "type": "string"
                },
                "streetAddress": {
                    "type": "string"
                },
                "city": {
                    "type": "string"
                },
                "zipCode": {
                    "type": "string"
                },
                "country": {
                    "type": "string"
                },
                "countryFull": {
                    "type": "string"
                },
                "emailAddress": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "telephoneNumber": {
                    "type": "string"
                },
                "telephoneCountryCode": {
                    "type": "string"
                },
                "birthday": {
                    "type": "string"
                },
                "age": {
                    "type": "string"
                },
                "occupation": {
                    "type": "string"
                },
                "company": {
                    "type": "string"
                },
                "vehicle": {
                    "type": "string"
                },
                "kilograms": {
                    "type": "string"
                },
                "centimeters": {
                    "type": "integer"
                },
                "location": {
                    "$ref": "#/definitions/2dsphere"
                }
            }
        },
        "2dsphere": {
            "properties": {
                "type": {
                    "type": "string"
                },
                "coordinate": {
                    "type": "object"
                }
            }
        },
        "Link": {
            "title": "customer",
            "properties": {
                "cur": {
                    "type": "string"
                },
                "first": {
                    "type": "string"
                },
                "prev": {
                    "type": "string"
                },
                "next": {
                    "type": "string"
                },
                "last": {
                    "type": "string"
                },
                "count": {
                    "type": "integer"
                },
                "totalCount": {
                    "type": "integer"
                }
            }
        }
    },
    "paths": {
        "/axa/customers": {
            "get": {
                "description": "get all customers using. max limit 100, using skip + limit ro range\n",
                "responses": {
                    "200": {
                        "description": "Successful response",
                        "schema": {
                            "title": "Array of users",
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Customer"
                                    }
                                },
                                "links": {
                                    "type": "object",
                                    "items": {
                                        "$ref": "#/definitions/Link"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/axa/customers/{id}": {
            "get": {
                "description": "get customer based on id\n",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of customer",
                        "required": true,
                        "type": "number",
                        "format": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful response",
                        "schema": {
                            "title": "Array of customers",
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Customer"
                            }
                        }
                    }
                }
            }
        }
    }
}