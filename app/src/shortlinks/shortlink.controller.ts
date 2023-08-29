import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShortLinkCreateDto } from './dtos/shortlink.dto';
import { ShortLinkCreateService } from './services/shortlink-create.service';

@ApiTags('shortlink')
@Controller('shortlink')
export class FilesController {
  constructor(
    private readonly shortLinkCreateService: ShortLinkCreateService,
  ) {}

  @Post()
  @ApiOperation({ description: 'Upload file CSV' })
  @ApiOkResponse({ type: ShortLinkCreateDto.Response })
  @ApiBody({ type: ShortLinkCreateDto.Request })
  async uploadFile(
    @Body() data: ShortLinkCreateDto.Request,
  ): Promise<ShortLinkCreateDto.Response> {
    return await this.shortLinkCreateService.create(data);
  }
}
