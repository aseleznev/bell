import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, InputType, ID, Root, FieldResolver, Int } from 'type-graphql';
import { Author } from '../author/author.entity';
import { ManyToOne, RelationId } from 'typeorm/index';

@ObjectType()
@InputType('BookInput')
@Entity()
export class Book {
  @Field(type => ID, { description: 'Идентификатор книги' })
  @PrimaryGeneratedColumn()
  bookId: number;

  @Field({ nullable: true, description: 'Название книги' })
  @Column()
  name?: string;

  @Field(type => Int, { nullable: true, description: 'Количество страниц', defaultValue: 0 })
  @Column()
  pageCount?: number;

  @Field(type => Author, { nullable: true, description: 'Автор книги' })
  @ManyToOne(type => Author)
  author?: Author;

  @RelationId((book: Book) => book.author)
  authorId: number;
}
