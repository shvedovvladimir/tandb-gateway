import * as got from 'got';
import { ConfigService } from '@nestjs/config';
import { IMicroservicesProxyConfiguration } from '../../../../../../config/configuration.interface';
import { ProxyConnectionError } from '../../../../common/errors/proxy.error';
import { Injectable, Inject } from '@nestjs/common';
import { LOGGER } from '../../../di-constants';
import { ILogger } from '../../../../common/logger';
import { IVoteResponse, IVoteResultsResponse, ITandbVoteProxyService } from './tandb-vote.interface';

@Injectable()
export class TandbVoteProxyService implements ITandbVoteProxyService {
    protected readonly _config: IMicroservicesProxyConfiguration;

    constructor(
        @Inject(LOGGER)
        private readonly _logger: ILogger,
        private readonly _configService: ConfigService,
    ) {
        this._config = _configService.get('microservicesProxy.tandbAuth');
    }

    public async voteFor(voteFor: string, accessKeyId: number): Promise<IVoteResponse> {
        this._logger
            .debug(`Trying add voteFor: ${voteFor} into tandb-vote service by accessKeyId: ${accessKeyId}`);

        const url = this._configService.get('microservicesProxy.tandbVote.microserviceUrl') + '/vote';
        const method = 'POST';

        let response;

        try {
            response = await got(url, { method, json: true, body: {
                voteFor,
                accessKeyId,
            } });
        } catch (err) {
            this._logger.error(
                'Got error while proxy to tandb-vote url:',
                err.url,
                'error',
                err.body,
                'code',
                err.code,
            );

            throw err;
        }

        this._logger.debug('Request to tandb-vote got response: ', response.body);
        if (response && response.body) {

            return response.body;
        } else {
            throw new ProxyConnectionError('Request to tandb-vote is not replayed');
        }
    }

    public async getVotedItemListForAccessKey(
        accessKeyId: number, limit: number, offset: number,
    ): Promise<IVoteResultsResponse[]> {
        this._logger
            .debug(`Trying get result for from accessKeyId: ${accessKeyId} from tandb-vote service`);

        const url = this._configService
            .get('microservicesProxy.tandbAuth.microserviceUrl') +
            `/results?limit=${limit}&offset=${offset}&accessKeyId=${accessKeyId}`;

        const method = 'GET';

        let response;

        try {
            response = await got(url, { method, json: true });
        } catch (err) {
            this._logger.error(
                'Got error while proxy to tandb-vote url:',
                err.url,
                'error',
                err.body,
                'code',
                err.code,
            );

            throw err;
        }

        this._logger.debug('Request to tandb-vote got response: ', response.body);
        if (response && response.body) {

            return response.body;
        } else {
            throw new ProxyConnectionError('Request to tandb-vote is not replayed');
        }
    }
}