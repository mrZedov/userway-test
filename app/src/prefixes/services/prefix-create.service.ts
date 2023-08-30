import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PrefixCreateDto } from '../dtos/prefix.dto';
import { Prefix } from '../entities/prefix.entity';

export class PrefixCreateService {
  constructor(
    @InjectRepository(Prefix)
    private readonly prefixRepo: EntityRepository<Prefix>,
    private readonly em: EntityManager,
  ) {}

  async create(data: PrefixCreateDto.Request): Promise<PrefixCreateDto.Response> {
    const prefixNew = this.em.create(Prefix, data);
    await this.em.persistAndFlush(prefixNew);
    return prefixNew;
  }
}
