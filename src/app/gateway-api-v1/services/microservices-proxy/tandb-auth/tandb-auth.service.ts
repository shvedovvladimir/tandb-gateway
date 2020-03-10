import * as got from 'got';
import {
    ITandbAuthProxyService, IProvidedCredentials, ITokenResponse, IAccessKeyResponse, IAccessKeyIdResponse,
} from './tandb-auth.interface';
import { ConfigService } from '@nestjs/config';
import { IMicroservicesProxyConfiguration } from '../../../../../../config/configuration.interface';
import { ProxyConnectionError } from '../../../../common/errors/proxy.error';
import { Injectable, Inject } from '@nestjs/common';
import { LOGGER } from '../../../di-constants';
import { ILogger } from '../../../../common/logger';

@Injectable()
export class TandbAuthProxyService implements ITandbAuthProxyService {

    constructor(
        @Inject(LOGGER)
        private readonly _logger: ILogger,
        private readonly _configService: ConfigService,
    ) {}

    public async getTokenByProvidedCredentials(providedCredentials: IProvidedCredentials): Promise<ITokenResponse> {
        this._logger.debug('Trying get token by provided credentials from tandb-auth service', providedCredentials);

        const url = this._configService.get('microservicesProxy.tandbAuth.microserviceUrl') + '/add-token';
        const method = 'POST';

        let response;

        try {
            response = await got(url, { method, json: true, body: providedCredentials });
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
            throw new ProxyConnectionError('Request to tandb-auth is not replayed');
        }
    }

    public async addAccessKey(accessKey: string): Promise<IAccessKeyResponse> {
        this._logger.debug('Trying add access key into tandb-auth service', accessKey);

        const url = this._configService.get('microservicesProxy.tandbAuth.microserviceUrl') + '/add-access-key';
        const method = 'POST';

        let response;

        try {
            response = await got(url, { method, json: true, body: {accessKey} });
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
            throw new ProxyConnectionError('Request to tandb-auth is not replayed');
        }
    }

    public async getAccessKeyIdByToken(token: string): Promise<IAccessKeyIdResponse> {
        this._logger.debug('Trying GET access key id by token from tandb-auth service', token);

        const url = this._configService
            .get('microservicesProxy.tandbAuth.microserviceUrl') + `/access-key-id-by-token?accessToken=${token}`;
        const method = 'GET';

        let response;

        try {
            response = await got(url, { method, json: true });
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
            throw new ProxyConnectionError('Request to tandb-auth is not replayed');
        }
    }
}