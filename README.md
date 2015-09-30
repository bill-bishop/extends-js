# extends-js
Javascript Inheritance -- the right way. Better than what you've seen elsewhere.

To use in the browser, just add extends.js to your project:

        <script src="extends.js"></script>




To use in your node projects, install via npm:

        npm install extends-js


And simply require it anywhere in your program before using the extends syntax:

        var extend = require('extends-js');


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

<b>instanceof</b> works normally as these Objects are prototypally related in the proper way:

        (new Square(5)) instanceof Square // true
        (new Square(5)) instanceof Polygon // true
        (new Square(5)) instanceof Object // true

Since extend-js is inheritance "the proper Javascript way," you can extend native classes normally:

        List.extends(Array);
        
        function List () {
                this.super.apply(this, arguments); // pass all arguments through to super constructor
        }
        
        var myList = new List('why has JS inheritance not always been implemented this way?');
        myList.push('It has now. That is all that matters.');
        myList.forEach(function (e, i) { console.log(i, e); });


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


# What's different about extends-js?
Other Javascript Inheritance libraries online do several things <b>wrong</b>:

Mistake #1: <b>Abandoning normal Javascript constructor syntax</b> - I don't want my code cluttered with this:

        // BAD!! 
        var Person = ArbitraryInheritanceLibrary.extend({
                /* arbitrary object definition conforming to the library syntax */
        })

There is no reason to throw out normal Javascript object syntax just to achieve inheritance:
        
        // GOOD! extends-js doesn't get in the way of normal Object syntax!
        Person.extends(Animal);

        // plain old constructor!
        function Person (name) {
                this.name = name; 
        }

extends-js leverages normal Object constructors in Javascript and doesn't require you to define your constructors in a special way.

Mistake #2: <b>Abandoning prototype chains</b> - I don't want my object instances cluttered with own properties that are endlessly copied down through the inheritance chain! I want <b>instanceof</b> to be useful! extends-js respects both Own Properties and Prototypal Properties and does not confuse them. extend-js relates the constructors prototypally in the proper way, such that they really are instances of the super class!

Mistake #3: <b>Poor or missing super constructor implementation</b> - I don't want to re-write my constructors over and over! I want to be able to super() to the constructor of the class being extended, WITHOUT having to define my constructors in a special way! extends-js utilizes the actual constructors of your normal Javascript objects and gives extended Objects access to those constructors via this.super()! 



#Compatibility

To support IE8 or compatibility with other plugins, the 'extends' and 'super' functions can
be prefixed with an arbitrary value (defaults to '$') by calling extend.noConflict(),
allowing them to be called via '$extends' and '$super'

        // $extends() and $super(), the default noConflict settings
        extend.noConflict();
        extend.noConflict('$');

        // __extends() and __super()
        extend.noConflict('__');
