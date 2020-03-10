import { DI_CONSTANTS, LOGGER } from './di-constants';
import { TandbAuthProxyService } from './services/microservices-proxy/tandb-auth/tandb-auth.service';
import { ILogger, WinstonLogger } from '../common/logger';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ILoggerConfig } from '../common/logger/logger.interface';
import { TandbVoteProxyService } from './services/microservices-proxy/tandb-vote/tandb-vote.service';

export const serviceContainerModule = [
    {
        provide: DI_CONSTANTS.ITandbAuthProxyService,
        useClass: TandbAuthProxyService,
    },
    {
        provide: DI_CONSTANTS.ITandbVoidProxyService,
        useClass: TandbVoteProxyService,
    },
];

export const loggerProvider = {
    provide: LOGGER,
    useFactory: (config: ConfigService): ILogger => {
        return new WinstonLogger(config.get<ILoggerConfig>('logger'));
    },
    imports: [ConfigModule],
    inject: [ConfigService],
};