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
    
    
    Square.extends(Polygon); // give Squares access to Polygon shared properties & this.super() 
    function Square (width) {
        this.super(width, width);
    }
