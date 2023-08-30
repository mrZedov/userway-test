import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { PrefixModule } from './prefixes/prefix.module';
import { ShortLinkModule } from './shortlinks/shortlink.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: 'config/.env' }), MikroOrmModule.forRoot(), ShortLinkModule, PrefixModule],
  controllers: [],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
  exports: [],
})
export class AppModule {}
