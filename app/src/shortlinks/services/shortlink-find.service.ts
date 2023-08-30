import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException } from '@nestjs/common';
import { Shortlink } from '../entities/shortlink.entity';

export class ShortLinkFindService {
  constructor(
    @InjectRepository(Shortlink)
    private readonly shortlinkRepo: EntityRepository<Shortlink>,
  ) {}

  async find(shortlink: string): Promise<any> {
    const shortLinkId = parseInt(shortlink.split('/').at(-1));
    if (!shortLinkId) throw new BadRequestException('Bad shortlink request');

    const shortLinkRec = await this.shortlinkRepo.findOne({ id: shortLinkId });
    if (!shortLinkRec) throw new BadRequestException('Shortlink not found');

    return shortLinkRec.fulllink;
  }
}
