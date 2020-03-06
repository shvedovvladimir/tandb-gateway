
import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@Controller('api')
@ApiUseTags('Auth service api')
export class AuthController {

    @Post('get-token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({title: 'create gratitude to user'})
    @ApiResponse({status: 200})
    public async getToken(): Promise<any> {
        return {};
    }
}