import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import configuration from './config/configuration';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true
      }),
      inject: [ConfigService]
    }),
    TypeGraphQLModule.forRoot({
      emitSchemaFile: true,
      validate: false
    }),
    AuthorModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
