import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'shortlink' })
export class Shortlink {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @Property({ length: 500 })
  fulllink: string;

  @ApiProperty()
  @Property({ onCreate: () => new Date() })
  created: Date;
}
