import { MetaKeys } from './constants';

export let Inject: Function = (meta) => {
    return (target) => {
        Reflect.defineMetadata(MetaKeys.INJECTABLE, true, target);
    };
};
