import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShortLinkCreateDto, ShortLinkGetDto } from './dtos/shortlink.dto';
import { ShortLinkCreateService } from './services/shortlink-create.service';
import { ShortLinkFindService } from './services/shortlink-find.service';

@ApiTags('shortlink')
@Controller('shortlink')
export class ShortLinkController {
  constructor(
    private readonly shortLinkCreateService: ShortLinkCreateService,
    private readonly shortLinkFindService: ShortLinkFindService,
  ) {}

  @Post()
  @ApiOperation({ description: 'Create short link by URL in fulllink' })
  @ApiOkResponse({ type: ShortLinkCreateDto.Response })
  @ApiBody({ type: ShortLinkCreateDto.Request })
  async create(
    @Body() data: ShortLinkCreateDto.Request,
  ): Promise<ShortLinkCreateDto.Response> {
    return await this.shortLinkCreateService.create(data);
  }

  @Get()
  @ApiOperation({ description: 'Get short link by URL in fulllink' })
  @ApiOkResponse({ type: ShortLinkGetDto.Response })
  async find(
    @Query('shortlink') shortlink: string,
  ): Promise<ShortLinkGetDto.Response> {
    return await this.shortLinkFindService.find(shortlink);
  }
}
