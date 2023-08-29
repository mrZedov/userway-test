import { Length, IsUrl } from 'class-validator';

export namespace ShortLinkCreateDto {
  export class Request {
    @IsUrl()
    @Length(3, 500)
    fulllink: string;
  }

  export class Response {
    shortlink: string;
  }
}
