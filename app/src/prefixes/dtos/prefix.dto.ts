import { Length, IsUrl } from 'class-validator';

export namespace PrefixCreateDto {
  export class Request {
    @IsUrl()
    @Length(3, 500)
    prefix: string;
  }

  export class Response {
    id: number;
    prefix: string;
  }
}
