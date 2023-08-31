import { ApiProperty } from '@nestjs/swagger';
import { Length, IsUrl } from 'class-validator';

export namespace PrefixCreateDto {
  export class Request {
    @IsUrl()
    @Length(3, 500)
    @ApiProperty()
    prefix: string;
  }

  export class Response {
    @ApiProperty()
    id: number;

    @ApiProperty()
    prefix: string;
  }
}

export interface FindOnePrefixResponse {
  id: number;
  created: Date;
  prefix: string;
}
