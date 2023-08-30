import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Prefix } from 'src/prefixes/entities/prefix.entity';

@Entity({ tableName: 'shortlink' })
export class Shortlink {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @Property({ length: 500 })
  fulllink: string;

  // @ApiProperty()
  // @Property({ length: 100 })
  // shortlink: string;
  @ManyToOne({ entity: () => Prefix })
  prefix: Prefix;

  @ApiProperty()
  @Property({ onCreate: () => new Date() })
  created: Date;
}
