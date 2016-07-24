{
    "swagger": "2.0",
    "info": {
        "version": "0.1.0",
        "title": "hackzurich 2016 - AXA Winterthur - API"
    },
    "host": "localhost:3000",
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
                                "docs": {
                                    "type": "array",
                                    "items": {
                                        "title": "customer",
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string"
                                            },
                                            "username": {
                                                "type": "string"
                                            },
                                            "email": {
                                                "type": "string"
                                            },
                                            "fullname": {
                                                "type": "string"
                                            },
                                            "age": {
                                                "type": "integer"
                                            },
                                            "location": {
                                                "type": "string"
                                            },
                                            "gender": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                },
                                "links": {
                                    "type": "array",
                                    "items": {
                                        "title": "link",
                                        "type": "object",
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
                                }
                            }
                        }
                    }
                }
            }
        },
        "/axa/customers/{id}": {
            "get": {
                "description": "gets 1 customer based his id\n",
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
                            "title": "ArrayOfPersons",
                            "type": "array",
                            "items": {
                                "title": "Person",
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}