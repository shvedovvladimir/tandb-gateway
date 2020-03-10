import { HttpStatus } from '@nestjs/common';
import { CommonError } from './common';

export class AuthError extends CommonError {
    public static INVALID_TOKEN: string = 'AUTH_TOKEN_INVALID';
    public static TOKEN_NOT_FOUND: string = 'TOKEN_NOT_FOUND';
    public static ENOTFOUND: string = 'ENOTFOUND';

    public status: number = HttpStatus.UNAUTHORIZED;

    constructor(
        code: string = AuthError.INVALID_TOKEN, innerMessage?: string, token?: string,
    ) {
        super('Unauthorized', code, {message: innerMessage, token}, {});
        this.status = code === 'ENOTFOUND' ? 500 : this.status;
    }
}