import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorLoader } from './author.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorResolver, AuthorLoader],
  exports: [AuthorLoader]
})
export class AuthorModule {}
