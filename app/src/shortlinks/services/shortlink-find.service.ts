import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException } from '@nestjs/common';
import { RedisService } from '../../redis/services/redis.service';
import { Shortlink } from '../entities/shortlink.entity';

export class ShortLinkFindService {
  constructor(
    @InjectRepository(Shortlink)
    private readonly shortlinkRepo: EntityRepository<Shortlink>,
    private readonly redisService: RedisService,
  ) {}

  async find(shortlink: string): Promise<string> {
    const shortLinkId = parseInt(shortlink.split('/').at(-1));
    if (!shortLinkId) throw new BadRequestException('Bad shortlink request');

    let fulllink = await this.redisService.get('' + shortLinkId);
    if (!fulllink) {
      const shortLinkRec = await this.shortlinkRepo.findOne({
        id: shortLinkId,
      });
      if (!shortLinkRec) throw new BadRequestException('Shortlink not found');
      fulllink = shortLinkRec.fulllink;
      await this.redisService.set('' + shortLinkId, fulllink);
    }

    return fulllink;
  }
}
