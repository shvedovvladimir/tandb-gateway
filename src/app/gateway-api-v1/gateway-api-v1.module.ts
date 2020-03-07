import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { AuthController } from './controllers/auth.controller';
import { serviceContainerModule, loggerProvider } from './gateway-api-v1.providers';
import { HealthCheckModule } from '../common/healthcheck/health-check.module';
import configuration from '../../../config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        CommonModule,
        HealthCheckModule,
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        // main providers
        ...serviceContainerModule,

        loggerProvider,
    ],
    exports: [ loggerProvider ],
})
export class GatewayApiV1Module { }
