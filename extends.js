/*
 *  extends
 *
 *  usage:
 *  Class1.extends(Class2)
 */

Function.prototype.extends = function (o) {
    var proto = this.prototype, extending = o.prototype;
    Object.setPrototypeOf(proto, extending);
    this.prototype.super = function () {
        var fn = proto.super;
        delete proto.super;
        extending.constructor.apply(this, arguments);
        proto.super = fn;
    };
};
