import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
@InputType('AuthorInput')
@Entity()
export class Author {
  @Field()
  @PrimaryGeneratedColumn()
  authorId: number;

  @Field()
  @Column()
  name: string;
}
