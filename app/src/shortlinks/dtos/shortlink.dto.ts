import { ApiProperty } from '@nestjs/swagger';
import { Length, IsUrl } from 'class-validator';

export class ShortLinkCreateDtoRequest {
  @IsUrl()
  @Length(3, 500)
  @ApiProperty({ description: 'dsdsdsd' })
  fulllink: string;

  shortlink?: string;
}

export class ShortLinkCreateDtoResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fulllink: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  shortlink: string;
}
