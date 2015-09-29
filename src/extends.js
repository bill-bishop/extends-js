/*
 *  extend-js
 *
 *  usage:
 *  Class1.extends(Class2)
 *
 *  Class2 instances have access to the Class1 prototype
 *
 *  this.super can be called from within the Class2 constructor,
 *  to apply the Class1 constructor to the Class2 instance
 *
 */

var extend = (function () {
    var extendsFnName = 'extends', superFnName = 'super', noConflict = '';
    Function.prototype[noConflict + extendsFnName] = function (SuperConstructor) {
        var extender = this, extending = SuperConstructor.prototype;
        function ExtendedPrototype () {
            this.constructor = extender.prototype.constructor;
            this[noConflict + superFnName] = function () {
                var fn = extender.prototype[noConflict + superFnName];
                if(extending[noConflict + superFnName])  {
                    extender.prototype[noConflict + superFnName] = extending[noConflict + superFnName];
                }
                SuperConstructor.apply(this, arguments);
                extender.prototype[noConflict + superFnName] = fn;
            };

            for(var prop in extender.prototype) {
                if(extender.prototype.hasOwnProperty(prop)) {
                    this[prop] = extender.prototype[prop];
                }
            }
        }
        ExtendedPrototype.prototype = SuperConstructor.prototype;
        this.prototype = new ExtendedPrototype();
    };
    return {
        noConflict: function (str) {
            var fn = Function.prototype[noConflict + extendsFnName];
            delete Function.prototype[noConflict + extendsFnName];
            noConflict = str || '$';
            Function.prototype[noConflict + extendsFnName] = fn;
        }
    };
})();

if (typeof module === 'object') module.exports = extend;