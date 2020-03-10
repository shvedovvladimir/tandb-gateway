import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GatewayApiV1Module } from './gateway-api-v1/gateway-api-v1.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { RequestIdMiddleware } from './common/middleware/request-id-middleware';
import { VoteController } from './gateway-api-v1/controllers/vote.controller';
import { AuthMiddleware } from './gateway-api-v1/middleware/auth-middleware';
@Module({
    imports: [
        GatewayApiV1Module,
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
})
export class ApplicationModule implements NestModule {

    public configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer
            .apply(RequestIdMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}