import { Length, IsUrl } from 'class-validator';

export namespace ShortLinkCreateDto {
  export class Request {
    @IsUrl()
    @Length(3, 500)
    fulllink: string;

    shortlink?: string;
  }

  export class Response {
    id?: number;
    fulllink: string;
    created: Date;
  }
}

export namespace ShortLinkGetDto {
  export class Response {
    fulllink: string;
  }
}
