import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { AuthController } from './controllers/auth.controller';
import { serviceContainerModule, loggerProvider } from './gateway-api-v1.providers';
import { HealthCheckModule } from '../common/healthcheck/health-check.module';
import configuration from '../../../config/configuration';
import { ConfigModule } from '@nestjs/config';
import { VoteController } from './controllers/vote.controller';
import { AuthMiddleware } from './middleware/auth-middleware';

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
        VoteController,
    ],
    providers: [
        // main providers
        ...serviceContainerModule,

        loggerProvider,
    ],
    exports: [ loggerProvider ],
})
export class GatewayApiV1Module implements NestModule {

    public configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer
            .apply(AuthMiddleware)  // use middleware
            .forRoutes(
                VoteController,
            );
    }
}
