import { Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { AuthorService } from './author.service';
import { Author } from './author.entity';

@Injectable()
@Resolver(of => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => [Author])
  Authors() {
    return this.authorService.findAll();
  }

  @Mutation(returns => Author)
  addAuthor(@Arg('input') author: Author) {
    return this.authorService.save(author);
  }
}
