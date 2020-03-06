import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class SampleDto {
    @ApiModelPropertyOptional()
    public readonly id: string;
}