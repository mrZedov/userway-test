import { QueryOrder } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException } from '@nestjs/common';
import { FindOnePrefixResponse } from '../dtos/prefix.dto';
import { Prefix } from '../entities/prefix.entity';

export class PrefixFindService {
  constructor(
    @InjectRepository(Prefix)
    private readonly prefixRepo: EntityRepository<Prefix>,
  ) {}

  async findOneLast(): Promise<FindOnePrefixResponse> {
    const records = await this.prefixRepo
      .createQueryBuilder('p')
      .select('*')
      .limit(1)
      .orderBy({ created: QueryOrder.DESC })
      .execute();
    if (!records.length) throw new BadRequestException('No prefix data found');
    return records[0];
  }
}
