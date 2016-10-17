"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("reflect-metadata");
const inject_meta_1 = require('./src/inject-meta');
const injector_1 = require('./src/injector');
let ServiceA = class ServiceA {
};
ServiceA = __decorate([
    inject_meta_1.Inject(), 
    __metadata('design:paramtypes', [])
], ServiceA);
exports.ServiceA = ServiceA;
let ServiceD = class ServiceD {
};
ServiceD = __decorate([
    inject_meta_1.Inject(), 
    __metadata('design:paramtypes', [])
], ServiceD);
exports.ServiceD = ServiceD;
let ServiceC = class ServiceC {
    constructor(ServiceD) {
        this.ServiceD = ServiceD;
    }
};
ServiceC = __decorate([
    inject_meta_1.Inject(), 
    __metadata('design:paramtypes', [ServiceD])
], ServiceC);
exports.ServiceC = ServiceC;
let ServiceB = class ServiceB {
    constructor(ServiceC) {
        this.ServiceC = ServiceC;
    }
};
ServiceB = __decorate([
    inject_meta_1.Inject(), 
    __metadata('design:paramtypes', [ServiceC])
], ServiceB);
exports.ServiceB = ServiceB;
let Resolve = class Resolve {
    constructor(ServiceA, serviceB) {
        this.ServiceA = ServiceA;
        this.serviceB = serviceB;
    }
};
Resolve = __decorate([
    inject_meta_1.Inject(), 
    __metadata('design:paramtypes', [ServiceA, ServiceB])
], Resolve);
exports.Resolve = Resolve;
injector_1.Injector.Current.register(ServiceA);
injector_1.Injector.Current.register(ServiceB);
injector_1.Injector.Current.register(ServiceC);
injector_1.Injector.Current.register(ServiceD);
injector_1.Injector.Current.register(Resolve);
let resolve = injector_1.Injector.Current.get(Resolve);
console.log(resolve);
//# sourceMappingURL=test.js.map