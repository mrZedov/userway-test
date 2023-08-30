import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PrefixModule } from 'src/prefixes/prefix.module';
import { RedisModule } from 'src/redis/redis.module';
import { Shortlink } from './entities/shortlink.entity';
import { ShortLinkCreateService } from './services/shortlink-create.service';
import { ShortLinkFindService } from './services/shortlink-find.service';
import { ShortLinkController } from './shortlink.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Shortlink] }),
    PrefixModule,
    RedisModule,
  ],
  controllers: [ShortLinkController],
  providers: [ShortLinkCreateService, ShortLinkFindService],
})
export class ShortLinkModule {}
