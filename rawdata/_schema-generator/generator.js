exports.generator = function () {
    return {
        swagger: function (name, multipleName, sample) {
            console.log("  "+name+"ResultList:");
            console.log("    description: result of "+name+" search used for paging");
            console.log("    type: object");
            console.log("    properties:");
            console.log("      data:");
            console.log("        $ref: '#/definitions/"+multipleName+"'");
            console.log("      links:");
            console.log("        $ref: '#/definitions/Link'");
            console.log("");
            console.log("  "+multipleName+":");
            console.log("    type: array");
            console.log("    items:");
            console.log("      $ref: '#/definitions/"+name+"'");
            console.log("");
            this.walkObject(sample, 1, name);
            console.log("");
            console.log("");
        },
        ind: function(i) {
            return new Array(i + 1).join( '  ' );
        },
        walkObject: function (object, i, name) {
            console.log(this.ind(i)+name+":");
            console.log(this.ind(i+1)+"description: tbd");
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
        isNumeric: function(n) {
            return !Array.isArray(n) && (n - parseFloat(n) + 1) >= 0;
        },
        isInt: function(n){
            return this.isNumeric(n) && n.toString().indexOf('.') < 0;
        },
        isFloat: function(n){
            return this.isNumeric(n) && !this.isInt(n);
        },
        walkElement: function (object, i, name) {
            console.log(this.ind(i)+"description: tbd");
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
        }
    }
}
