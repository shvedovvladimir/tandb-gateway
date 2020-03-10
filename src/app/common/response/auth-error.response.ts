import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class AuthErrorResponse {
    @ApiModelProperty({
        default: 401,
        example: 401,
    })
    public statusCode: number;

    @ApiModelProperty({enum: [
        'AUTH', 'AUTH_NO_TOKEN', 'AUTH_TOKEN_EXPIRED', 'AUTH_TOKEN_INVALID',
        'AUTH_TOKEN_LOCATION_MISMATCH',
    ]})
    public code: string;

    @ApiModelPropertyOptional()
    public details: object;
}
