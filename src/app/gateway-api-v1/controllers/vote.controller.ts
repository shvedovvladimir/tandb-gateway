import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Inject,
    Injectable,
    Body,
    Get,
    Query,
    Request,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AbstractController } from '../../common/controller/abstract.controller';
import { CredentialsErrorResponse } from '../../common/response/credentials-error.response';
import { CommonErrorResponse } from '../../common/response/common-error.response';
import { DI_CONSTANTS } from '../di-constants';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { VoteResponse } from '../response/vote.response';
import { voteForJoiSchema } from '../schemas/vote-for.schemas';
import { VoteForDto } from '../dto/vote-for.dto';
import { VoteResultResponse } from '../response/vote-result.response';
import { IVoteResponse, IVoteResultsResponse, ITandbVoteProxyService } from '../services/microservices-proxy/tandb-vote/tandb-vote.interface';
import { getResultJoiSchema } from '../schemas/get-result.schemas';
import { GetResultDto } from '../dto/get-result.dto';
import { IRequest } from '../middleware/auth-middleware';

@Controller('api')
@ApiUseTags('Vote service api')
@Injectable()
export class VoteController extends AbstractController {

    constructor(
        @Inject(DI_CONSTANTS.ITandbVoidProxyService)
        private readonly _tandbVoidProxyService: ITandbVoteProxyService,
    ) {
        super();
    }

    @Post('vote')
    @ApiBearerAuth()
    @ApiOperation(
        {
            title: 'Adds new vote to database, if a record “voteFor” does not exist creates one',
        },
    )
    @ApiResponse({
        status: 200,
        type: VoteResponse,
    })
    @ApiResponse({
        status: 400,
        type: CredentialsErrorResponse,
    })
    @ApiResponse({
        status: 500,
        type: CommonErrorResponse,
    })
    @HttpCode(HttpStatus.OK)
    public async vote(
        @Body(new JoiValidationPipe(voteForJoiSchema)) voteForDto: VoteForDto,
        @Request() request: IRequest,
    ): Promise<IVoteResponse> {
        const resp = await this._tandbVoidProxyService.voteFor(voteForDto.voteFor, request.accessKeyId);

        return resp;
    }

    @Get('results')
    @ApiBearerAuth()
    @ApiOperation(
        {
            title: 'Returns a list of items of a poll which is available only for voted token',
        },
    )
    @ApiResponse({
        status: 200,
        type: VoteResultResponse,
        isArray: true,
    })
    @ApiResponse({
        status: 400,
        type: CredentialsErrorResponse,
    })
    @ApiResponse({
        status: 500,
        type: CommonErrorResponse,
    })
    @HttpCode(HttpStatus.OK)
    public async result(
        @Query(new JoiValidationPipe(getResultJoiSchema)) getResultDto: GetResultDto,
        @Request() request: IRequest,
    ): Promise<IVoteResultsResponse[]> {
        const resp = await this._tandbVoidProxyService
            .getVotedItemListForAccessKey(request.accessKeyId, getResultDto.limit, getResultDto.offset);

        return resp;
    }
}