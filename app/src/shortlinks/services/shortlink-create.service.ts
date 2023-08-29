import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Shortlink } from '../entities/shortlink.entity';
import { ShortLinkCreateDto } from '../dtos/shortlink.dto';

export class ShortLinkCreateService {
  constructor(
    @InjectRepository(Shortlink)
    private readonly shortlinkRepo: EntityRepository<Shortlink>,
  ) {}

  create(
    data: ShortLinkCreateDto.Request,
  ): Promise<ShortLinkCreateDto.Response> {
    const shortLink = this.shortlinkRepo.create(data);
    return 'shortLink.id'
  }
}
