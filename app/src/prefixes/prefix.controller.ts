import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrefixCreateDto } from './dtos/prefix.dto';
import { PrefixCreateService } from './services/prefix-create.service';

@ApiTags('prefix')
@Controller('prefix')
export class PrefixController {
  constructor(private readonly prefixCreateService: PrefixCreateService) {}

  @Post()
  @ApiOperation({ description: 'Create new domain-prefix for short link' })
  @ApiOkResponse({ type: PrefixCreateDto.Response })
  @ApiBody({ type: PrefixCreateDto.Request })
  async uploadFile(
    @Body() data: PrefixCreateDto.Request,
  ): Promise<PrefixCreateDto.Response> {
    return await this.prefixCreateService.create(data);
  }
}
