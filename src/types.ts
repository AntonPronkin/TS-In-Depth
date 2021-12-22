import { Book, Person } from './interfaces';

type Library = {
    lib: string;
    books: number;
    avgPagesPerBook: number;
};

type BookProperties = keyof Book;

type PersonBook = Person & Book;

type BookOrUndefined = Book | undefined;

export {
    Library,
    BookProperties,
    PersonBook,
    BookOrUndefined
};