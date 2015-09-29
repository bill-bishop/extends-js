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
        this.prototype = (function (extender, extending) {
            var proto = extender.prototype;
            var extended = function () {
                this.constructor = proto.constructor;
                this[noConflict + superFnName] = function () {
                    var fn = extender.prototype[noConflict + superFnName];
                    delete extender.prototype[noConflict + superFnName];
                    extending.constructor.apply(this, arguments);
                    extender.prototype[noConflict + superFnName] = fn;
                };
            };
            extended.prototype = extending;
            for (var prop in proto) {
                if (proto.hasOwnProperty(prop)) {
                    extended.prototype[prop] = proto[prop];
                }
            }
            return new extended;
        })(this, o.prototype);
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