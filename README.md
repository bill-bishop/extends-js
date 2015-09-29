# extends-js
Javascript Inheritance -- in a single function. Better than what you've seen elsewhere.

To use, just add extends.js to your project:

        <script src="extends.js"></script>


Example:

        function Polygon (w, h) {
            this.width = w;
            this.height = h;
        }
        Polygon.prototype.area = function () { 
            return this.width * this.height; 
        }
        
        // give Squares access to Polygon shared (prototypal) properties & this.super()
        Square.extends(Polygon);

        // this.super() applies Polygon's constructor to new Squares, setting height and width as own properties
        function Square (width) {
            this.super(width, width);
        }




A new Square(5) looks like this:

        {
            width: 5,
            height: 5
        }

With access to the entire chain of extended shared properties:

        new Square(5).area(); // 25


Prototypally inherited properties can be overridden as own properties or via the extended prototype.

        Triangle.extends(Polygon);
        
        function Triangle(w, h) {
            this.super(w, h);
            
            this.area = function () { return 0; }; // override via own property
        }
        
        // override via Triangle's prototype, will be called only if not overridden via own property
        Triangle.prototype.area = function () {
            return this.width * this.height / 2; 
        }



To support IE8 or compatibility with other plugins, the 'extends' and 'super' functions can
be prefixed with arbitrary values (defaults to $) and can be used as '$extend' and '$super':

        // $extends() and $super(), the default noConflict settings
        extend.noConflict();
        extend.noConflict('$');

        // __extends() and __super()
        extend.noConflict('__');
