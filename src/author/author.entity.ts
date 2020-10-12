import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, InputType, ID } from 'type-graphql';
import { Book } from '../book/book.entity';
import { OneToMany } from 'typeorm/index';

@ObjectType()
@InputType('AuthorInput')
@Entity()
export class Author {
  @Field(type => ID, { description: 'Идентификатор автора' })
  @PrimaryGeneratedColumn()
  authorId: number;

  @Field({ nullable: true, description: 'Имя автора' })
  @Column()
  name: string;

  @Field(type => [Book], { nullable: true, description: 'Книги автора' })
  @OneToMany(
    type => Book,
    book => book.author
  )
  books?: Book[];
}
