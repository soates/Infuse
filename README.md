# Infuse
No frills Typescript Dependancy injection.

# Example usage

```javascript

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


    Injector.Current.register<ServiceA>(ServiceA);

    Injector.Current.register<ServiceB>(ServiceB);

    Injector.Current.register<ServiceC>(ServiceC);

    Injector.Current.register<ServiceD>(ServiceD);

    Injector.Current.register<Resolve>(Resolve);

    let resolve = Injector.Current.get<Resolve>(Resolve);

```