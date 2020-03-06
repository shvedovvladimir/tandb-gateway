import { DI_CONSTANTS } from './di-constants';

export const serviceContainerModule = [
    {
        provide: 'any',
        useClass: 'some class',
    },
];