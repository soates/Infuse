"use strict";
const constants_1 = require('./constants');
exports.Inject = (meta) => {
    return (target) => {
        Reflect.defineMetadata(constants_1.MetaKeys.INJECTABLE, true, target);
    };
};
//# sourceMappingURL=inject-meta.js.map