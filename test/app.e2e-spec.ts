import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { AuthorModule } from '../src/author/author.module';
import { BookModule } from '../src/book/book.module';

describe('app e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthorModule,
        BookModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'username',
          password: 'password',
          database: 'bell_e2e',
          entities: ['./**/*.entity.ts'],
          dropSchema: true,
          synchronize: true,
          logging: false
        }),
        TypeGraphQLModule.forRoot({
          emitSchemaFile: true,
          validate: false
        })
      ]
    }).compile();
    app = module.createNestApplication();
    await app.init();

  });
  afterAll(async () => {
    await app.close();
  });

  it('should add an author', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
                  addAuthor(input:{authorId:1,name:"Vasil"})
                  {
                    authorId
                    name
                  }
                }`
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body.data.addAuthor).toEqual({ authorId: '1', name: 'Vasil' });
  });

  it('should add a book with author', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
                  addBook(
                    input: {
                      bookId: 1
                      name: "Book"
                      pageCount: 77
                      author: { authorId: 1 }
                    }
                  ) {
                    bookId
                    name
                  }
                }`
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body.data.addBook).toEqual({ bookId: '1', name: 'Book' });
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

    expect(body.data.Authors).toEqual([{ authorId: '1', name: 'Vasil' }]);
  });

  it('should return an array of books without authors', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ Books { bookId, name, pageCount} }'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body.data.Books).toEqual([{ bookId: '1', name: 'Book', pageCount: 77 }]);
  });

  it('should return an array of books with authors', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ Books { bookId, name, pageCount, author { authorId, name } } }'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body.data.Books).toEqual([
      { bookId: '1', name: 'Book', pageCount: 77, author: { authorId: '1', name: 'Vasil' } }
    ]);
  });
});
