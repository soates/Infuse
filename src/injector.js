"use strict";
const constants_1 = require('./constants');
class Injector {
    constructor() {
        this.items = new Array();
    }
    static get Current() {
        if (this.current === undefined) {
            this.current = new Injector();
        }
        return this.current;
    }
    register(imp) {
        this.items.push(this.registerType(imp));
    }
    get(type) {
        let candidate = this.items.find(f => f.name === type.name);
        if (candidate === undefined) {
            return undefined;
        }
        if (this.isResolved(candidate)) {
            return candidate.state.instance;
        }
        let meta = Reflect.getMetadata(constants_1.MetaKeys.PARAMTYPES, candidate.obj);
        if (meta === undefined || meta.length === 0) {
            return this.resolveTypeWithoutParams(candidate);
        }
        return this.resolveTypeWithParams(candidate, meta);
    }
    isResolved(c) {
        return c.state !== undefined && c.state.instance !== undefined;
    }
    registerType(target) {
        return {
            name: target.name,
            obj: target,
            state: undefined,
        };
    }
    resolveTypeWithParams(candidate, deps) {
        let args = new Array(deps.length);
        for (let i = 0; i < deps.length; i++) {
            let d = deps[i];
            let injectable = Reflect.getMetadata(constants_1.MetaKeys.INJECTABLE, d);
            if (injectable === true) {
                let resolved = this.get(d);
                args[i] = resolved;
            }
        }
        let ctor = (cargs) => {
            return new candidate.obj(...cargs);
        };
        candidate.state = {
            instance: ctor(args)
        };
        return candidate.state.instance;
    }
    resolveTypeWithoutParams(candidate) {
        candidate.state = {
            instance: new candidate.obj(),
        };
        this.items[this.items.findIndex(i => i.name === candidate.name)] = candidate;
        return candidate.state.instance;
    }
}
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map