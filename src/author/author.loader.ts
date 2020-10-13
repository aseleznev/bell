import { Injectable, Scope } from '@nestjs/common';
import { AuthorService } from './author.service';
import * as DataLoader from 'dataloader';
import { Author } from './author.entity';

@Injectable({ scope: Scope.REQUEST })
export class AuthorLoader {
  constructor(private readonly authorService: AuthorService) {}

  public readonly findById = new DataLoader<number, Author>(async ids => {
    try {
      const codes = [];
      Object.assign(codes, ids);
      const authors = await this.authorService.findByIds(codes);
      return ids.map(id => authors.find(author => author.authorId === id));
    } catch (error) {
      throw error;
    }
  });
}
