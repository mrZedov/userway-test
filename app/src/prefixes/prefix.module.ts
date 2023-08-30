import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Prefix } from './entities/prefix.entity';
import { PrefixController } from './prefix.controller';
import { PrefixCreateService } from './services/prefix-create.service';
import { PrefixFindService } from './services/prefix-find.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Prefix] })],
  controllers: [PrefixController],
  providers: [PrefixCreateService, PrefixFindService],
  exports: [PrefixFindService],
})
export class PrefixModule {}
