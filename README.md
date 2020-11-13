## Description

Тестовое задание: 
Используя минимум 2 библиотеки type-graphql и typeorm: 
1) Создать мутации на создание книги и автора в базе. 
2) Реализовать запрос на получение списка книг с авторами. Важно ограничиться двумя запросами к базе за один graphql запрос. Для author использовать fieldResolver. 
3) Тесты: -Создание автора -Создание книги -Получение книг без авторов -Получение книг с авторами
 
Типы graphql схемы:
type Book {   bookId: number;   name: string;   pageCount: number;   authorId: number;   author: Author; }
 type Author {   authorId: number;   name: string; }
 
Пример запроса к graphql:query {   books() {     name     author {       name     }   } }

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
