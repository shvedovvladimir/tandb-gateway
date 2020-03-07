import * as got from 'got';
import {
    ITandbAuthProxyService, IProvidedCredentials, ITokenResponse,
} from './tandb-auth.interface';
import { ConfigService } from '@nestjs/config';
import { IMicroservicesProxyConfiguration } from '../../../../../../config/configuration.interface';
import { ProxyConnectionError } from '../../../../common/errors/proxy.error';
import { Injectable, Inject } from '@nestjs/common';
import { LOGGER } from '../../../di-constants';
import { ILogger } from '../../../../common/logger';

@Injectable()
export class TandbAuthProxyService implements ITandbAuthProxyService {
    protected readonly _config: IMicroservicesProxyConfiguration;

    constructor(
        @Inject(LOGGER)
        private readonly _logger: ILogger,
        private readonly _configService: ConfigService,
    ) {
        this._config = _configService.get('microservicesProxy.tandbAuth');
    }

    public async getTokenByProvidedCredentials(providedCredentials: IProvidedCredentials): Promise<ITokenResponse> {
        console.log('##############################')
        this._logger.debug('Trying get token by provided credentials from tandb-auth service', providedCredentials);

        const url = this._configService.get('microservicesProxy.tandbAuth.microserviceUrl');
        const method = 'POST';

        let response;

        try {
            response = await got(url, { method, json: true, providedCredentials });
        } catch (err) {
            this._logger.error(
                'Got error while proxy to tandb-auth url:',
                err.url,
                'error',
                err.body,
                'code',
                err.code,
            );

            throw err;
        }

        this._logger.debug('Request to tandb-auth got response: ', response.body);
        if (response && response.body) {

            return response.body;
        } else {
            throw new ProxyConnectionError('Request to sendsay is not replayed');
        }
    }
}