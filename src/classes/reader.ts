import { Book } from '../interfaces';

export default class Reader {
    private name: string;
    private books: Book[] = [];

    public take(book: Book): void {
        this.books.push(book);
    }
}