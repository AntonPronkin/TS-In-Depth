import { createCustomer, getBooksByCategoryPromise } from './functions';
import { Author, Book, Person } from './interfaces';

type Library = {
    lib: string;
    books: number;
    avgPagesPerBook: number;
};

type BookProperties = keyof Book;

type PersonBook = Person & Book;

type BookOrUndefined = Book | undefined;

type BookRequiredFields = Required<Book>;

type UpdatedBook = Partial<Book>;

type AuthorWoEmail = Omit<Author, 'email'>;

type CreateCustomerFunctionType = typeof createCustomer;

type fn = (a: string, b: number, c: boolean) => symbol;

/*
type Param1<T extends (...args: any) => any> = Parameters<T>[0];
type Param2<T extends (...args: any) => any> = Parameters<T>[1];
type Param3<T extends (...args: any) => any> = Parameters<T>[2];
*/

type Param1<T> = T extends (a: infer R, b: number, c: boolean) => symbol ? R : never;
type Param2<T> = T extends (a: string, b: infer R, c: boolean) => symbol ? R : never;
type Param3<T> = T extends (a: string, b: number, c: infer R) => symbol ? R : never;

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

type Unpromisify<T> = T extends Promise<infer P> ? P : never;

type BooksByCategoryPromiseReturnType = ReturnType<typeof getBooksByCategoryPromise>;
type BooksByCategoryReturnType = Unpromisify<BooksByCategoryPromiseReturnType>;

export {
    Library,
    BookProperties,
    PersonBook,
    BookOrUndefined,
    BookRequiredFields,
    UpdatedBook,
    AuthorWoEmail,
    CreateCustomerFunctionType
};