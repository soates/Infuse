import "reflect-metadata";
import { Inject } from './src/inject-meta';
import { Injector } from './src/injector';

@Inject()
export class ServiceA {
}

@Inject()
export class ServiceD {

}

@Inject()
export class ServiceC {
    constructor(private ServiceD: ServiceD) {
    }
}

@Inject()
export class ServiceB {
    constructor(private ServiceC: ServiceC) {
    }
}

@Inject()
export class Resolve {
    constructor(private ServiceA: ServiceA, private serviceB: ServiceB) {

    }
}

let container = Injector.Current;

container.register<ServiceA>(ServiceA);
container.register<ServiceB>(ServiceB);
container.register<ServiceC>(ServiceC);
container.register<ServiceD>(ServiceD);

container.register<Resolve>(Resolve);

let resolve = container.get<Resolve>(Resolve);

console.log(resolve);

