# extends
Javascript Inheritance -- in a single function. Better than what you've seen elsewhere. Just add extends.js to your shims, or simply paste it into your code:

        Function.prototype.extends = function (o) {
            this.prototype = Object.create(o.prototype);
            this.prototype.super = function () {
                o.prototype.constructor.apply(this, arguments);
            };
        };


&nbsp;Usage:

        function Polygon (w, h) {
            this.width = w;
            this.height = h;
        }
        Polygon.prototype.area = function () { 
            return this.width * this.height; 
        }
        
        // give Squares access to Polygon shared properties & this.super() 
        Square.extends(Polygon);
        
        function Square (width) {
            this.super(width, width);
        }
    
    
&nbsp;Square's prototype looks like this:

        {
            super: function (w, h) {
                // this will set height and width as own properties on a new Square,
                // via the actual constructor for Polygons
            },
            __proto__: Polygon.prototype
        }



&nbsp;And a new Square(5) looks like this:

        {
            width: 5,
            height: 5
        }

&nbsp;With access to the entire chain of extended shared properties:

        new Square(5).area(); // 25

&nbsp;Properties can be overridden as own properties in the extended constructor, or as shared properties:

        Triangle.extends(Polygon);
        
        function Triangle(w, h) {
            this.super(w, h);
            this.ownProp = 'example';
        }
        Triangle.prototype.area = function () {
            return this.width * this.height / 2;
        }
