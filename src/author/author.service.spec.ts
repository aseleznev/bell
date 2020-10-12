import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthorModule } from './author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm/index';
import * as request from 'supertest';
import { BookModule } from '../book/book.module';
import { Book } from '../book/book.entity';
import { TypeGraphQLModule } from 'typegraphql-nestjs';

describe('authors query', () => {
  let app: INestApplication;
  // let authorRepository: Repository<Author>;
  // let bookRepository: Repository<Book>;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthorModule,
        BookModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'alexanderseleznev',
          password: 'archer2badly',
          database: 'bell_e2e',
          entities: ['./**/*.entity.ts'],
          synchronize: true,
          logging: true
        }),
        TypeGraphQLModule.forRoot({
          emitSchemaFile: true,
          validate: false
        })
      ]
    }).compile();
    app = module.createNestApplication();
    await app.init();
    // authorRepository = module.get('AuthorRepository');
    // bookRepository = module.get('BookRepository');
  });
  afterAll(async () => {
    await app.close();
  });

  it('should add an author', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
                  addAuthor(input:{authorId:1,name:"Vasil"}){
                    authorId
                  }
                }`
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body.data.Authors).toEqual([
      { authorId: '1', name: 'Author1' },
      { authorId: '2', name: 'Author2' }
    ]);
  });

  it('should return an array of authors', async () => {

    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ Authors { authorId, name} }'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body.data.Authors).toEqual([
      { authorId: '1', name: 'Vasil' }
    ]);
  });
});
