import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { buildSchema } from 'type-graphql';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [__dirname + '/**/*.resolver.{ts,js}']
  });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('port'));
}
bootstrap();
