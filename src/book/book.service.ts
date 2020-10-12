import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne(id);
  }

  save(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }
}
