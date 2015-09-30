var expect = require('expect.js');

// module to test
var extend = require('../.');


describe('extends-js', function () {
    describe('app entry', function () {
        it('should require extends.js', function () {
            expect(extend).to.be.ok();
            expect(extend.noConflict).to.be.ok();
            expect(Function.extends).to.be.ok();
        });
    });


    function Polygon(w, h) {
        this.width = w;
        this.height = h;
    }

    Polygon.prototype.area = function () {
        return this.width * this.height;
    };
    function Square(w) {
        this.super(w, w);
    }

    Square.extends(Polygon);

    function SquareFoot() {
        this.super(1);
    }

    SquareFoot.prototype.retain = true;
    SquareFoot.extends(Square);

    function MyList () {
        this.super.apply(this, arguments);
    }
    MyList.extends(Array);

    describe('Square (extended Polygon)', function () {
        var s = new Square(5);

        it('should be an instance of its constructor and all classes above it', function () {
            expect(s instanceof Square).to.be(true);
            expect(s instanceof Polygon).to.be(true);
            expect(s instanceof Object).to.be(true);
        });
        it('should have access to Polygon constructor via this.super()', function () {
            expect(s.hasOwnProperty('width')).to.be(true);
            expect(s.hasOwnProperty('height')).to.be(true);
            expect(s.width).to.be(5);
            expect(s.height).to.be(5);
        });
        it('should have access to Polygon prototype functions', function () {
            expect(s.hasOwnProperty('area')).to.be(false);
            expect(s.area()).to.be(25);
        });
    });

    describe('SquareFoot (extended Square)', function () {
        var sf = new SquareFoot();


        it('should be an instance of its constructor and all classes above it', function () {
            expect(sf instanceof SquareFoot).to.be(true);
            expect(sf instanceof Square).to.be(true);
            expect(sf instanceof Polygon).to.be(true);
            expect(sf instanceof Object).to.be(true);
        });
        it('should have access to Square constructor via this.super()', function () {
            expect(sf.hasOwnProperty('width')).to.be(true);
            expect(sf.hasOwnProperty('height')).to.be(true);
            expect(sf.width).to.be(1);
            expect(sf.height).to.be(1);
        });
        it('should have access to Polygon prototype functions', function () {
            expect(sf.hasOwnProperty('area')).to.be(false);
            expect(sf.area()).to.be(1);
        });
    });

    describe('Native classes', function () {
        it('should be extendable', function () {
            var myList = new MyList(1, 2, 3);
            myList.push('qwerty');
            expect(myList.forEach).to.be.ok();
            expect(myList.hasOwnProperty('forEach')).to.be(false);
            expect(myList.length).to.be(4);
            expect(myList[0]).to.be(1);
            expect(myList[3]).to.be('qwerty');
        });
    });

    describe('Subclass Prototype properties', function () {
        it('should persist after extending super class', function () {
            expect(new SquareFoot().retain).to.be(true);
        });
    });

    describe('noConflict()', function () {
        it('should prepend extends/super functions with supplied argument or $', function () {
            extend.noConflict();
            expect(Function.prototype.extends).not.to.be.ok();
            expect(Function.prototype.$extends).to.be.ok();

            function A () { this.a = true; }
            function B () { this.$super(); }
            B.$extends(A);
            expect(new B().a).to.be(true);
        });
    });
});