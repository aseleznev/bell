import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { In } from 'typeorm/index';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  findOne(id: number): Promise<Author> {
    return this.authorRepository.findOne(id);
  }

  findByIds(ids: number[]): Promise<Author[]> {
    return this.authorRepository.find({ where: { authorId: In(ids) } });
  }

  save(author: Author): Promise<Author> {
    return this.authorRepository.save(author);
  }
}
