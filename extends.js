/*
 *  extends
 *
 *  usage:
 *  Class1.extends(Class2)
 */

Function.prototype.extends = function (o) {
    this.prototype = Object.create(o.prototype);
    this.prototype.super = function () {
        o.prototype.constructor.apply(this, arguments);
    };
};
