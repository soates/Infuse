import 'reflect-metadata';

import { Inject } from './../src/inject-meta';
import { Injector } from './../src/injector';

describe('Injector', () => {

    describe('Container', () => {

        it('Container is the same instance', () => {
            let injector: Injector = Injector.Current;

            expect(Injector.Current).toEqual(injector);
        });

    });

    describe('Resolution', () => {

        @Inject()
        class SimpleInjectable { }

        @Inject()
        class ComplexInjectable {
            constructor(public simpleInjectable: SimpleInjectable) { }
        }

        class NotInjectable { }

        it('Can Resolve a parameterless Injectable', () => {

            Injector.Current.register<SimpleInjectable>(SimpleInjectable);

            expect(Injector.Current.get<SimpleInjectable>(SimpleInjectable)).toBeDefined();

        });

        it('Can Resolve an Injectable with parameters', () => {

            Injector.Current.register<SimpleInjectable>(SimpleInjectable);

            Injector.Current.register<ComplexInjectable>(ComplexInjectable);

            let resolved = Injector.Current.get<ComplexInjectable>(ComplexInjectable);

            expect(resolved.simpleInjectable).toBeDefined();

        });

        it('Resolution fails for non injectable', () => {

            expect(Injector.Current.get<NotInjectable>(NotInjectable)).not.toBeDefined();

        })

        it('Instance is cached if already resolved', () => {

            Injector.Current.register<SimpleInjectable>(SimpleInjectable);

            let a = Injector.Current.get<SimpleInjectable>(SimpleInjectable);

            let b = Injector.Current.get<SimpleInjectable>(SimpleInjectable);

            expect(a).toEqual(b);

        })

    });

});
