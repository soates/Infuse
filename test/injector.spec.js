"use strict";
const injector_1 = require('./../src/injector');
describe('Injector', () => {
    describe('Container', () => {
        it('Container is the same instance', () => {
            let injector = injector_1.Injector.Current;
            expect(injector_1.Injector.Current).toEqual(injector);
        });
    });
    describe('Register', () => {
        beforeEach(() => {
        });
    });
});
//# sourceMappingURL=injector.spec.js.map