import { Injectable } from '@nestjs/common';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { Author } from '../author/author.entity';
import { AuthorLoader } from '../author/author.loader';

@Injectable()
@Resolver(of => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService, private readonly authorLoader: AuthorLoader) {}

  @Query(returns => [Book])
  Books() {
    return this.bookService.findAll();
  }

  @Mutation(returns => Book)
  addBook(@Arg('input') book: Book) {
    return this.bookService.save(book);
  }

  @FieldResolver()
  async author(@Root() book: Book): Promise<Author> {
    return await this.authorLoader.findById.load(book.authorId);
  }
}
