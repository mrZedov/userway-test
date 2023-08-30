import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'prefix' })
export class Prefix {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @Property()
  prefix: string;

  @ApiProperty()
  @Property({ onCreate: () => new Date() })
  created: Date;
}
