import { Extension, State, ValidationOptions, Root } from '@hapi/joi';
import * as joi from '@hapi/joi';
import * as validator from 'validator';

export function extendedString(joi: Root): Extension {
    return {
        base: joi.string(),
        name: 'extendedString',
        rules: [
            {
                name: 'escape',
                description: 'Escaped string',
                validate(params: object, value: string, state: State, options: ValidationOptions): string {
                    return options.convert ?
                        value.replace(/&/g, '&amp;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#x27;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/\//g, '&#x2F;')
                            .replace(/\\/g, '&#x5C;')
                            .replace(/`/g, '&#96;')
                        : value;
                },
            },
            {
                name: 'unescape',
                description: 'Unscaped string',
                validate(params: object, value: string, state: State, options: ValidationOptions): string {
                    return options.convert ?
                        value.replace(/&amp;/g, '&')
                            .replace(/&quot;/g, '"')
                            .replace(/&#x27;/g, '\'')
                            .replace(/lt;/g, '<')
                            .replace(/&gt;/, '>')
                            .replace(/&#x2F;/g, '/')
                            .replace(/&#x5C;/g, '\\')
                            .replace(/&#96;/g, '`')
                        : value;
                },
            },
            {
                name: 'normalizeEmail',
                description: 'Normalize email',
                validate(params: object, value: string, state: State, options: ValidationOptions): string {
                    const result = options.convert ?
                        (validator.default.normalizeEmail(value) || value)
                    : value;

                    if (!validator.default.isEmail(result)) {
                        return value;
                    }

                    return result;
                },
            },
        ],
    };
}

// tslint:disable
declare namespace JoiExtension {
    export interface ExtendedStringSchema extends joi.StringSchema {
        escape(): this;
        unescape(): this;
        normalizeEmail(): this;
    }

    export function extendedString(): ExtendedStringSchema;
}

export type JoiExtended = (typeof joi & typeof JoiExtension);

export const joiExtended: JoiExtended = joi.extend(extendedString(joi));
