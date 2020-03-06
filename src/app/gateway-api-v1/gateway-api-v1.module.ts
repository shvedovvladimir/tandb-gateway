import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { AuthController } from './controllers/auth.controller';
import { serviceContainerModule } from './gateway-api-v1.providers';

@Module({
    imports: [ CommonModule ],
    controllers: [
        AuthController,
    ],
    providers: [
        // main providers
        ...serviceContainerModule,
    ],
    exports: [ ],
})
export class GatewayApiV1Module { }
