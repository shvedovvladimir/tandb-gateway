import { NestMiddleware, Injectable, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LOGGER, DI_CONSTANTS } from '../di-constants';
import { ILogger } from '../../common/logger';
import { AuthError } from '../../common/errors/auth.error';
import { ITandbAuthProxyService } from '../services/microservices-proxy/tandb-auth/tandb-auth.interface';

export interface IRequest extends Request {
    accessKeyId: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private readonly _loggerPrefix: string = `${AuthMiddleware.name}`;
    constructor(
        @Inject(LOGGER)
        protected readonly _logger: ILogger,
        @Inject(DI_CONSTANTS.ITandbAuthProxyService)
        private readonly _tandbAuthProxyService: ITandbAuthProxyService,
    ) {}

    public async use(req: IRequest, res: Response, next: NextFunction): Promise<void> {
            const processedToken = this._getTokenFromHeader(req);

            if (!processedToken) {
                throw new AuthError(AuthError.TOKEN_NOT_FOUND, '', processedToken);
            }

            try {
                    req.accessKeyId = (
                        await this._tandbAuthProxyService.getAccessKeyIdByToken(processedToken)
                    ).accessKeyId;
            } catch (err) {
                this._logger.error(this._loggerPrefix, `Got error:`, err.message, err.code, err.status);

                throw new AuthError(err.code, err.message, processedToken);
            }

            next();
    }

    protected _getTokenFromHeader(req: Request): string {
        const authValue = req.get('x-access-token');

        if (!authValue) {
            return;
        }

        return authValue;
    }
}