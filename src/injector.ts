import { MetaKeys } from './constants';
import { Injectable } from './types';

export class Injector {

    private static current: Injector;

    public static get Current() {
        if (this.current === undefined) {
            this.current = new Injector();
        }
        return this.current;
    }

    private items: Array<Injectable>;

    constructor() {
        this.items = new Array<any>();
    }

    public register<T>(imp: any): void {
        this.items.push(this.registerType(imp));
    }

    public get<T>(type: Function): T {

        let candidate = this.items.find(f => f.name === type.name);

        if (candidate === undefined) {
            return undefined;
        }

        if (this.isResolved(candidate)) {
            return candidate.state.instance;
        }

        let meta = Reflect.getMetadata(MetaKeys.PARAMTYPES, candidate.obj);

        if (meta === undefined || meta.length === 0) {
            return this.resolveTypeWithoutParams(candidate);
        }

        return this.resolveTypeWithParams(candidate, meta);

    }

    private isResolved(c: Injectable): boolean {
        return c.state !== undefined && c.state.instance !== undefined;
    }

    private registerType(target: any): Injectable {
        return {
            name: target.name,
            obj: target,
            state: undefined,
        };
    }

    private resolveTypeWithParams(candidate: Injectable, deps: Array<any>): any {

        let args = new Array(deps.length);

        for (let i = 0; i < deps.length; i++) {

            let d = deps[i];

            let injectable = Reflect.getMetadata(MetaKeys.INJECTABLE, d);

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

    private resolveTypeWithoutParams(candidate: Injectable): any {

        candidate.state = {
            instance: new candidate.obj(),
        };

        this.items[this.items.findIndex(i => i.name === candidate.name)] = candidate;

        return candidate.state.instance;
    }

}
