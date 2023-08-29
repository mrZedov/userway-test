import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    //    ConfigModule.forRoot({ isGlobal: true, load: config, expandVariables: true }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'config/.env' }),
    MikroOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
