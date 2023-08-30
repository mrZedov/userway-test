import { Module } from '@nestjs/common';
import { ShortLinkCreateService } from './services/shortlink-create.service';
import { ShortLinkController } from './shortlink.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Shortlink } from './entities/shortlink.entity';
import { ShortLinkFindService } from './services/shortlink-find.service';
import { PrefixModule } from 'src/prefixes/prefix.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Shortlink] }), PrefixModule],
  controllers: [ShortLinkController],
  providers: [ShortLinkCreateService, ShortLinkFindService],
})
export class ShortLinkModule {}
