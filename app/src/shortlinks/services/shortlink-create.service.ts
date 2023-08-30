import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PrefixFindService } from 'src/prefixes/services/prefix-find.service';
import { ShortLinkCreateDto } from '../dtos/shortlink.dto';
import { Shortlink } from '../entities/shortlink.entity';
import { RedisService } from 'src/redis/services/redis.service';

export class ShortLinkCreateService {
  constructor(
    @InjectRepository(Shortlink)
    private readonly shortlinkRepo: EntityRepository<Shortlink>,
    private readonly em: EntityManager,
    private readonly prefixFindService: PrefixFindService,
    private readonly redisService: RedisService,
  ) {}

  async create(data: ShortLinkCreateDto.Request): Promise<any> {
    const prefixRec = await this.prefixFindService.findOneLast();
    const shortLinkRecNew = this.em.create(Shortlink, {
      ...data,
      prefix: prefixRec.id,
    });
    await this.em.persistAndFlush(shortLinkRecNew);

    await this.redisService.set('' + shortLinkRecNew.id, data.fulllink);

    const shortlink = prefixRec.prefix + '/' + shortLinkRecNew.id;
    return {
      id: shortLinkRecNew.id,
      fulllink: shortLinkRecNew.fulllink,
      shortlink: shortlink,
      created: shortLinkRecNew.created,
    };
  }
}
