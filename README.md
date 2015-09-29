# extends-js
Javascript Inheritance -- the right way. Better than what you've seen elsewhere.

To use in the browser, just add extend.js to your project:

        <script src="extend.js"></script>




To use in your node projects, install via npm:

        npm install extends-js


And simply require it anywhere in your program before using the extends syntax:

        var extend = require('extends-js');


# What's different about extends-js?

Other Javascript Inheritance libraries you will find online do several things wrong:

1. Abandoning JS Object definitions - I don't want my code cluttered with this:

        // BAD!! 
        var Person = ArbitraryInheritanceLibrary.extend({ /* arbitrary object definition conforming to the library syntax */ })
        
        // GOOD!
        Person.extends(Animal); // extends-js syntax doesn't get in the way of normal Object syntax!
        function Person (name) {
                this.name = name; 
        }

extends-js leverages the proper, normal way of Object/constructor creation in Javascript and doesn't require you to define your constructors in a special way. 

2. Abandoning prototype chains - I don't want my object instances cluttered with own properties that are endlessly copied down through the inheritance chain! extends-js respects both Own Properties and Prototypal Properties and does not confuse them. 

3. Poor or missing super constructor implementation - I don't want to re-write my constructors over and over! I want to be able to super() to the constructor of the class being extended, WITHOUT having to define my constructors in a special way! extends-js utilizes the actual constructors of your normal Javascript objects! 



#Examples

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
be prefixed with an arbitrary value (defaults to '$') with extend.noConflict(), allowing them
to be used as '$extends' and '$super'

        // $extends() and $super(), the default noConflict settings
        extend.noConflict();
        extend.noConflict('$');

        // __extends() and __super()
        extend.noConflict('__');
