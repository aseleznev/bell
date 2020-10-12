import { Injectable } from '@nestjs/common';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { AuthorService } from '../author/author.service';
import { Author } from '../author/author.entity';

@Injectable()
@Resolver(of => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService, private readonly authorService: AuthorService) {}

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
    return await this.authorService.findOne(book.authorId);
  }
}
