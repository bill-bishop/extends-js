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
    Function.prototype[noConflict + extendsFnName] = function (o) {
        var proto = this.prototype;
        function ExtendedPrototype () {
            this.constructor = proto.constructor;
            this[noConflict + superFnName] = function () {
                var fn = proto[noConflict + superFnName];
                delete proto[noConflict + superFnName];
                o.apply(this, arguments);
                proto[noConflict + superFnName] = fn;
            };
        }
        ExtendedPrototype.prototype = o.prototype;
        for(var prop in proto) {
            if(proto.hasOwnProperty(prop)) {
                ExtendedPrototype.prototype[prop] = proto[prop];
            }
        }
        this.prototype = new ExtendedPrototype;
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