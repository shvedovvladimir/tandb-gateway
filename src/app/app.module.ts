import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GatewayApiV1Module } from './gateway-api-v1/user-stats.module';
import { AuthController } from './gateway-api-v1/controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';

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
            .apply()  // use middleware
            .forRoutes(
                AuthController,
            );
    }
}