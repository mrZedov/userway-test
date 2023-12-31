import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PrefixFindService } from '../../prefixes/services/prefix-find.service';
import { Shortlink } from '../entities/shortlink.entity';
import { RedisService } from '../../redis/services/redis.service';
import {
  ShortLinkCreateDtoRequest,
  ShortLinkCreateDtoResponse,
} from '../dtos/shortlink.dto';

export class ShortLinkCreateService {
  constructor(
    @InjectRepository(Shortlink)
    private readonly shortlinkRepo: EntityRepository<Shortlink>,
    private readonly em: EntityManager,
    private readonly prefixFindService: PrefixFindService,
    private readonly redisService: RedisService,
  ) {}

  async create(
    data: ShortLinkCreateDtoRequest,
  ): Promise<ShortLinkCreateDtoResponse> {
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
